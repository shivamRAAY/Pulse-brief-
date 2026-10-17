import { useState, useEffect, useRef, useCallback } from 'react';
import { Article, NewsProviderStatus } from '../types/news';

export type LiveConnectionState = 'connected' | 'connecting' | 'reconnecting' | 'paused' | 'offline';

export function useRealTimeNews(initialArticles: Article[]) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [incomingBuffer, setIncomingBuffer] = useState<Article[]>([]);
  const [connectionState, setConnectionState] = useState<LiveConnectionState>('connecting');
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toISOString());
  const [autoInsert, setAutoInsert] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [providers, setProviders] = useState<NewsProviderStatus[]>([]);
  const [activeClientsCount, setActiveClientsCount] = useState<number>(1);
  const [notificationToast, setNotificationToast] = useState<{ title: string; category: string } | null>(null);

  const lastSyncTimestampRef = useRef<string>(new Date().toISOString());
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);

  // Synthesize gentle pleasant chime via Web Audio API
  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {
      // AudioContext policy handled gracefully
    }
  }, [soundEnabled]);

  // Catch-up missed articles upon reconnect
  const fetchMissedArticles = useCallback(async (sinceTime: string) => {
    try {
      const res = await fetch(`/api/news/since?timestamp=${encodeURIComponent(sinceTime)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          setArticles((prev) => {
            const existingIds = new Set(prev.map((a) => a.id));
            const fresh = data.articles.filter((a: Article) => !existingIds.has(a.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch (err) {
      console.warn('[Real-Time] Catch-up sync failed:', err);
    }
  }, []);

  // Connect to SSE stream
  const connectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setConnectionState(reconnectAttemptsRef.current > 0 ? 'reconnecting' : 'connecting');

    const sse = new EventSource('/api/live/stream');
    eventSourceRef.current = sse;

    sse.addEventListener('init', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setConnectionState('connected');
        reconnectAttemptsRef.current = 0;
        setLastSyncTime(data.serverTime);
        setActiveClientsCount(data.activeListeners || 1);

        // Fetch missed articles if we had a prior sync time
        if (lastSyncTimestampRef.current) {
          fetchMissedArticles(lastSyncTimestampRef.current);
        }
        lastSyncTimestampRef.current = data.serverTime;
      } catch (err) {
        console.error('SSE init error:', err);
      }
    });

    sse.addEventListener('article:new', (e: MessageEvent) => {
      try {
        const newArt: Article = JSON.parse(e.data);
        lastSyncTimestampRef.current = new Date().toISOString();
        setLastSyncTime(new Date().toISOString());

        playChime();
        setNotificationToast({ title: newArt.title, category: newArt.category });
        setTimeout(() => setNotificationToast(null), 5000);

        if (autoInsert) {
          setArticles((prev) => {
            if (prev.some((a) => a.id === newArt.id)) return prev;
            return [newArt, ...prev];
          });
        } else {
          setIncomingBuffer((prev) => {
            if (prev.some((a) => a.id === newArt.id)) return prev;
            return [newArt, ...prev];
          });
        }
      } catch (err) {
        console.error('SSE article:new parse error:', err);
      }
    });

    sse.addEventListener('article:update', (e: MessageEvent) => {
      try {
        const updatedArt: Article = JSON.parse(e.data);
        setArticles((prev) => prev.map((a) => (a.id === updatedArt.id ? updatedArt : a)));
      } catch (err) {
        console.error('SSE article:update error:', err);
      }
    });

    sse.addEventListener('ingestion:sync', (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        setLastSyncTime(data.timestamp);
        lastSyncTimestampRef.current = data.timestamp;
      } catch {}
    });

    sse.onerror = () => {
      setConnectionState('reconnecting');
      sse.close();
      const backoff = Math.min(1000 * Math.pow(1.5, reconnectAttemptsRef.current), 10000);
      reconnectAttemptsRef.current += 1;
      setTimeout(connectSSE, backoff);
    };
  }, [autoInsert, playChime, fetchMissedArticles]);

  useEffect(() => {
    connectSSE();

    // Fetch initial provider status
    fetch('/api/providers')
      .then((r) => r.json())
      .then((d) => {
        if (d.providers) setProviders(d.providers);
      })
      .catch(() => {});

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [connectSSE]);

  // Flush buffer manually
  const flushBuffer = () => {
    if (incomingBuffer.length === 0) return;
    setArticles((prev) => [...incomingBuffer, ...prev]);
    setIncomingBuffer([]);
  };

  // Toggle Auto-Insert
  const toggleAutoInsert = () => {
    if (!autoInsert && incomingBuffer.length > 0) {
      flushBuffer();
    }
    setAutoInsert((prev) => !prev);
  };

  // Trigger manual provider poll
  const triggerManualPoll = async () => {
    try {
      const res = await fetch('/api/ingest/trigger', { method: 'POST' });
      const data = await res.json();
      setLastSyncTime(new Date().toISOString());
      return data;
    } catch (err) {
      console.error('Manual poll failed:', err);
    }
  };

  // Simulate Instant Breaking Story
  const simulateBreakingWire = async () => {
    try {
      const res = await fetch('/api/ingest/simulate-breaking', { method: 'POST' });
      return await res.json();
    } catch (err) {
      console.error('Simulate breaking failed:', err);
    }
  };

  return {
    articles,
    incomingBuffer,
    flushBuffer,
    connectionState,
    lastSyncTime,
    autoInsert,
    toggleAutoInsert,
    soundEnabled,
    setSoundEnabled,
    providers,
    activeClientsCount,
    notificationToast,
    triggerManualPoll,
    simulateBreakingWire,
  };
}
