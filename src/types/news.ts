export type Region = 'all' | 'india' | 'world';

export type TimeFilterPreset =
  | 'latest'
  | 'today'
  | 'yesterday'
  | 'last_7_days'
  | 'last_30_days'
  | 'this_month'
  | 'last_month'
  | 'this_year'
  | 'prev_year'
  | 'custom';

export type ExamCategory = 'UPSC' | 'SSC' | 'Banking' | 'State PCS' | 'General Awareness' | 'Defence (CDS/NDA)';

export interface ExamRelevance {
  exams: ExamCategory[];
  potentialQuestion: string;
  staticGkConnection: string;
  keyTerms: string[];
  paperMapping?: string; // e.g., "GS Paper II: Constitutional Institutions"
}

export type PriorityTier = 'breaking' | 'developing' | 'important' | 'trending' | 'analysis' | 'explainer';

export interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
}

export interface NewsProviderStatus {
  id: string;
  name: string;
  category: string;
  tier: 'high_priority' | 'standard_wire' | 'official_gazette';
  pollIntervalSec: number;
  lastSync: string;
  status: 'healthy' | 'degraded' | 'rate_limited' | 'syncing';
  latencyMs: number;
  totalIngested: number;
  errorCount: number;
  rateLimitRemaining: number;
}

export type LanguageCode = 'en' | 'hi' | 'bilingual';

export type ProtestCategory =
  | 'Government Policy'
  | 'Students & Education'
  | 'Farmers & Agriculture'
  | 'Labour & Employment'
  | 'Economic Issues'
  | 'Social Justice'
  | 'Environment'
  | 'Civil Liberties'
  | 'Regional Movements'
  | 'International Protests';

export interface ProtestLocation {
  cityDistrict: string;
  state: string;
  country: string;
  venue?: string;
  coordinates?: { lat: number; lng: number };
}

export interface CivilLibertiesAnalysis {
  constitutionalArticles: string[]; // e.g., ["Article 19(1)(b)", "Article 19(1)(a)", "Article 21"]
  legalFramework: string;           // e.g., "Section 144 BNSS / Police Act 1861 / ESMA"
  precedentsAndDoctrine: string;    // e.g., "Himat Lal K. Shah v. Commissioner of Police (1973)"
  examRelevance: string;            // UPSC GS Paper II: Fundamental Rights & Judicial Doctrine
}

export interface MovementImpact {
  transitImpact: string;
  economicImpact: string;
  publicServices: string;
}

export interface ProtestDetails {
  movementName: string;
  category: ProtestCategory;
  location: ProtestLocation;
  demands: string[];
  demandsHi?: string[];
  officialResponse?: string;
  officialResponseHi?: string;
  status: 'Active Demonstration' | 'Peaceful March' | 'Under Negotiation' | 'Peaceful Dispersal' | 'Court / Tribunal Review' | 'Section 144 Imposed';
  partiesInvolved: string[];
  policeResponseOrLegalStatus?: string;
  civilLibertiesAnalysis?: CivilLibertiesAnalysis;
  impactSummary?: MovementImpact;
  startDate?: string;
  turnoutEstimate?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  category: string;
  subcategory?: string;
  region: 'india' | 'world';
  tags: string[];
  publisher: string;
  publisherUrl: string;
  sourceUrl: string;
  imageUrl: string;
  publishedAt: string; // ISO string
  updatedAt?: string;  // ISO string
  ingestedAt: string;  // Real-time server ingestion timestamp
  priority: PriorityTier;
  readingTimeMinutes: number;
  whyItMatters: string;
  keyFacts: string[];
  examRelevance: ExamRelevance;
  verified: boolean;
  status: 'confirmed' | 'developing' | 'official_release' | 'analysis';
  sourcesCount: number;
  timeline?: TimelineEvent[];
  viewsCount?: number;
  isLiveUpdate?: boolean;
  // Bilingual Hindi Support
  language?: 'en' | 'hi' | 'bilingual';
  hindiTitle?: string;
  hindiSubtitle?: string;
  hindiSummary?: string;
  hindiContent?: string;
  hindiWhyItMatters?: string;
  hindiKeyFacts?: string[];
  // Dedicated Protest & Public Movement Fields
  isProtestMovement?: boolean;
  protestDetails?: ProtestDetails;
}

export interface BriefingItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  sourceUrl: string;
  publisher: string;
  publishedAt: string;
  region: 'india' | 'world';
  badge?: string;
}

export interface PracticeQuizQuestion {
  id: string;
  articleId: string;
  articleTitle: string;
  exam: ExamCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  staticTopic: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tag: string;
  articleId: string;
}

export interface NewsQueryFilters {
  category?: string;
  region?: Region;
  timeRange?: TimeFilterPreset;
  startDate?: string;
  endDate?: string;
  search?: string;
  exam?: ExamCategory | 'all';
  sort?: 'newest' | 'relevance' | 'salience';
  page?: number;
  limit?: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  timezone: 'IST' | 'UTC' | 'LOCAL';
  defaultRegion: Region;
  preferredCategories: string[];
  targetExam: ExamCategory | 'All';
  fontSize: 'normal' | 'large';
  bookmarks: string[]; // article IDs
  readingHistory: { articleId: string; readAt: string }[];
}
