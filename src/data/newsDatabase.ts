import { Article, BriefingItem, PracticeQuizQuestion, NewsProviderStatus } from '../types/news';

export const CATEGORIES = [
  { id: 'indian-politics', name: 'Indian Politics', slug: 'indian-politics', count: 18, description: 'Electoral dynamics, coalition governance, party policies, and state legislative updates.' },
  { id: 'protests-and-public-movements', name: 'Protests & Movements', slug: 'protests-and-public-movements', count: 14, description: 'Public demonstrations, strikes, citizen assemblies, constitutional freedoms, and authority dialogues.' },
  { id: 'government-policies-and-schemes', name: 'Government Policies & Schemes', slug: 'government-policies-and-schemes', count: 24, description: 'Welfare schemes, digital public infrastructure, subsidies, and central sector programmes.' },
  { id: 'parliament-and-judiciary', name: 'Parliament & Judiciary', slug: 'parliament-and-judiciary', count: 16, description: 'Supreme Court constitution benches, legislative bills, legal reforms, and judicial precedents.' },
  { id: 'economy-and-finance', name: 'Economy & Finance', slug: 'economy-and-finance', count: 22, description: 'RBI monetary policy, GDP indicators, fiscal deficit, trade balance, GST, and capital markets.' },
  { id: 'international-relations', name: 'International Relations', slug: 'international-relations', count: 19, description: 'Bilateral summits, multilateral forums, QUAD, BRICS, G20, and strategic regional pacts.' },
  { id: 'defence-and-national-security', name: 'Defence & National Security', slug: 'defence-and-national-security', count: 14, description: 'Indigenous defence manufacturing, tri-service procurements, border management, and doctrine.' },
  { id: 'science-and-space', name: 'Science & Space', slug: 'science-and-space', count: 17, description: 'ISRO missions, planetary science, astronomical observatories, quantum computing, and biotechnology.' },
  { id: 'artificial-intelligence-and-technology', name: 'AI & Technology', slug: 'artificial-intelligence-and-technology', count: 21, description: 'IndiaAI Mission, sovereign compute clusters, semiconductor fabs, cyber sovereignty, and AI safety.' },
  { id: 'education-and-examinations', name: 'Education & Examinations', slug: 'education-and-examinations', count: 15, description: 'National Education Policy reforms, higher education rankings, examination commissions, and research.' },
  { id: 'environment-and-climate', name: 'Environment & Climate', slug: 'environment-and-climate', count: 16, description: 'COP climate commitments, Thar solar corridors, renewable green hydrogen, and wildlife conservation.' },
  { id: 'health-and-medicine', name: 'Health & Medicine', slug: 'health-and-medicine', count: 12, description: 'Ayushman Bharat expansions, genomic epidemiology, pharmaceuticals, and public health delivery.' },
  { id: 'awards-and-honours', name: 'Awards & Honours', slug: 'awards-and-honours', count: 10, description: 'National civilian honours, Nobel Prizes, Sahitya Akademi, military gallantry, and science awards.' },
  { id: 'sports', name: 'Sports', slug: 'sports', count: 13, description: 'Olympic discipline roadmaps, Asian Games preparations, cricket ICC championships, and athletics.' },
  { id: 'world-politics', name: 'World Politics', slug: 'world-politics', count: 15, description: 'Global democratic elections, geopolitical alignments, United Nations treaties, and governance.' },
  { id: 'global-economy', name: 'Global Economy', slug: 'global-economy', count: 14, description: 'IMF and World Bank assessments, Federal Reserve interest rates, commodity shocks, and supply chains.' },
  { id: 'international-conflicts', name: 'International Conflicts', slug: 'international-conflicts', count: 11, description: 'Strategic chokepoint security, maritime straits, geopolitical ceasefire negotiations, and humanitarian aid.' },
  { id: 'important-reports-and-rankings', name: 'Reports & Rankings', slug: 'important-reports-and-rankings', count: 13, description: 'Human Development Index, Global Hunger Index, NITI Aayog SDG dashboards, and World Bank Ease of Business.' },
  { id: 'appointments-and-resignations', name: 'Appointments & Resignations', slug: 'appointments-and-resignations', count: 11, description: 'Chief of Defence Staff, Governors, constitutional commissions, RBI governors, and UN envoys.' },
  { id: 'books-and-authors', name: 'Books & Authors', slug: 'books-and-authors', count: 9, description: 'Contemporary political memoirs, historical diplomacy volumes, and constitutional treatises.' },
  { id: 'important-days-and-events', name: 'Important Days & Events', slug: 'important-days-and-events', count: 12, description: 'National Constitution Day, World Ozone Day, National Space Day, and UN observance themes.' },
];

export const INITIAL_PROVIDERS: NewsProviderStatus[] = [
  { id: 'pib_india', name: 'PIB India Official Wire', category: 'Government & Schemes', tier: 'high_priority', pollIntervalSec: 45, lastSync: '12 seconds ago', status: 'healthy', latencyMs: 142, totalIngested: 84, errorCount: 0, rateLimitRemaining: 960 },
  { id: 'the_hindu_national', name: 'The Hindu National Feed', category: 'General & Politics', tier: 'high_priority', pollIntervalSec: 60, lastSync: '30 seconds ago', status: 'healthy', latencyMs: 175, totalIngested: 56, errorCount: 0, rateLimitRemaining: 980 },
  { id: 'isro_media', name: 'ISRO Mission Control Bulletin', category: 'Science & Space', tier: 'high_priority', pollIntervalSec: 60, lastSync: '48 seconds ago', status: 'healthy', latencyMs: 185, totalIngested: 32, errorCount: 0, rateLimitRemaining: 985 },
  { id: 'sci_bulletin', name: 'Supreme Court Registry & Bar', category: 'Judiciary', tier: 'high_priority', pollIntervalSec: 60, lastSync: '1 min ago', status: 'healthy', latencyMs: 210, totalIngested: 41, errorCount: 0, rateLimitRemaining: 970 },
  { id: 'rbi_press', name: 'RBI Monetary Policy Gazette', category: 'Economy & Finance', tier: 'official_gazette', pollIntervalSec: 120, lastSync: '2 mins ago', status: 'healthy', latencyMs: 160, totalIngested: 29, errorCount: 0, rateLimitRemaining: 990 },
  { id: 'bbc_world', name: 'BBC World News RSS', category: 'World Affairs', tier: 'standard_wire', pollIntervalSec: 90, lastSync: '1 min ago', status: 'healthy', latencyMs: 280, totalIngested: 63, errorCount: 0, rateLimitRemaining: 920 },
  { id: 'mnre_green', name: 'MNRE Renewable Energy Feed', category: 'Environment & Climate', tier: 'official_gazette', pollIntervalSec: 180, lastSync: '3 mins ago', status: 'healthy', latencyMs: 195, totalIngested: 22, errorCount: 0, rateLimitRemaining: 995 },
];

export const ARTICLES_DATABASE: Article[] = [
  // 1. LEAD STORY: ISRO Gaganyaan
  {
    id: 'pb-2026-isro-gaganyaan-orbital',
    slug: 'isro-advances-gaganyaan-orbital-module-test-flight',
    title: 'ISRO Clears Critical Uncrewed Test Flight for Gaganyaan Orbital Habitat Module',
    subtitle: 'High-altitude abort validation and human-rated LVM3 cryogenic stage tests achieve certified safety margins at Sriharikota.',
    summary: 'The Indian Space Research Organisation (ISRO) has successfully certified the cryogenic upper stage and automated crew escape parachute systems for the forthcoming uncrewed Gaganyaan-1 orbital module flight. The flight confirms India’s indigenous human spaceflight roadmap towards establishing the Bharatiya Antariksha Station.',
    content: `The Indian Space Research Organisation (ISRO) today announced the full certification of the human-rated LVM3 launch vehicle propulsion systems following comprehensive ground and environmental endurance runs at the Satish Dhawan Space Centre (SDSC-SHAR) in Sriharikota.

The milestone follows the integrated validation of the Crew Escape System (CES) and the environmental life support system designed to sustain astronaut crews in a 400 km low Earth orbit. The uncrewed test vehicle incorporates "Vyommitra," the half-humanoid robotics platform equipped with biometric sensors and telemetry systems to monitor cabin pressure, acceleration G-forces, and thermal parameters throughout orbital insertion and atmospheric re-entry.

ISRO Chairman highlighted that all structural telemetry complied with the stringent human-rating requirements established by the National Human Space Flight Programme Oversight Board. The orbital habitat module features dual redundant carbon-composite ablative thermal shields capable of withstanding peak re-entry temperatures exceeding 1,600°C prior to deceleration and splashdown in the Arabian Sea, where the Indian Navy and Coast Guard have stationed specialized recovery task units.

The success reinforces India's broader vision of launching an astronaut to the Moon by 2040 and constructing the modular Bharatiya Antariksha Station (BAS-1) module by 2028.`,
    category: 'Science & Space',
    subcategory: 'Human Spaceflight',
    region: 'india',
    tags: ['ISRO', 'Gaganyaan', 'Space Tech', 'LVM3', 'Vyommitra', 'Sriharikota'],
    publisher: 'ISRO Press Release / PIB India',
    publisherUrl: 'https://isro.gov.in',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=ISRO-GAGANYAAN-2026',
    imageUrl: '/src/assets/images/hero_isro_launch_1792217569504.jpg',
    publishedAt: '2026-10-16T14:30:00+05:30',
    updatedAt: '2026-10-16T18:15:00+05:30',
    ingestedAt: '2026-10-16T14:31:12+05:30',
    priority: 'breaking',
    readingTimeMinutes: 5,
    whyItMatters: 'Human spaceflight capability places India among only four nations globally with sovereign orbital launch proficiency, strengthening space diplomacy and downstream critical technology ecosystems.',
    keyFacts: [
      'Human-rated LVM3 (HLVM3) certified with 10% higher safety margins for payload bay and propellant tanks.',
      'Orbital trajectory target: 400 km circular low Earth orbit for a 3-day test mission.',
      'Splashdown and maritime retrieval perimeter coordinated with Indian Navy Western Naval Command.',
      'Paves the direct operational pathway for Bharatiya Antariksha Station (BAS) segment deployment by 2028.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'SSC', 'General Awareness'],
      paperMapping: 'UPSC GS Paper III: Achievements of Indians in Science & Technology; Indigenization of Technology',
      potentialQuestion: 'Examine the strategic and technological significance of the Gaganyaan mission in establishing India as a sovereign space power. How does it augment domestic aerospace manufacturing?',
      staticGkConnection: 'Satish Dhawan Space Centre established in 1971. Project Gaganyaan approved with central funding under the Department of Space. Key propulsion centers: LPSC (Valiamala) and VSSC (Thiruvananthapuram).',
      keyTerms: ['Human-Rating Certification', 'Ablative Heat Shield', 'Vyommitra', 'LVM3 Cryogenic CE-20', 'Low Earth Orbit (LEO)']
    },
    verified: true,
    status: 'official_release',
    sourcesCount: 6,
    viewsCount: 42890,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'इसरो ने गगनयान कक्षीय मॉड्यूल के लिए महत्वपूर्ण मानवरहित परीक्षण उड़ान को दी मंजूरी',
    hindiSubtitle: 'श्रीहरिकोटा में उच्च ऊंचाई वाले गर्भपात परीक्षण और मानव-रेटेड LVM3 क्रायोजेनिक चरण ने प्रमाणित सुरक्षा मानक हासिल किए।',
    hindiSummary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (इसरो) ने आगामी मानवरहित गगनयान-1 कक्षीय मॉड्यूल उड़ान के लिए क्रायोजेनिक ऊपरी चरण और स्वचालित क्रू एस्केप पैराशूट प्रणाली को सफलतापूर्वक प्रमाणित किया है। यह उड़ान 2028 तक भारतीय अंतरिक्ष स्टेशन स्थापित करने की दिशा में मील का पत्थर है।',
    hindiWhyItMatters: 'मानव अंतरिक्ष उड़ान क्षमता भारत को संप्रभु कक्षीय प्रक्षेपण क्षमता वाले दुनिया के केवल चार देशों में शामिल करती है, जिससे अंतरिक्ष कूटनीति और एयरोस्पेस विनिर्माण को भारी बढ़ावा मिलेगा।',
    hindiKeyFacts: [
      'मानव-रेटेड LVM3 (HLVM3) को पेलोड बे और प्रोपेलेंट टैंकों के लिए 10% अधिक सुरक्षा मार्जिन के साथ प्रमाणित किया गया।',
      'कक्षीय प्रक्षेपवक्र: 3-दिवसीय परीक्षण मिशन के लिए 400 किमी गोलाकार निम्न भू-कक्षा (LEO)।',
      'अरब सागर में स्प्लैशडाउन और समुद्री पुनर्प्राप्ति नौसेना की पश्चिमी नौसेना कमान के साथ समन्वित।',
      '2028 तक भारतीय अंतरिक्ष स्टेशन (BAS) के मॉड्यूल प्रक्षेपण का मार्ग प्रशस्त हुआ।'
    ]
  },

  // 2. MOVEMENT 1: Port Workers National Strike
  {
    id: 'pb-2026-protest-port-workers-strike',
    slug: 'all-india-major-ports-workers-wage-negotiations-strike',
    title: 'All-India Major Ports Workers Federation Holds Nationwide Strike Notice Review Amid Tripartite Talks',
    subtitle: 'Over 20,000 dock workers across 12 major ports press for 5-year wage revision settlement, pension parity, and productivity allowances.',
    summary: 'The Joint Action Committee of Port & Dock Workers representing six national federations convened emergency consultations following marathon conciliation proceedings with the Indian Ports Association (IPA) and Ministry of Ports, Shipping and Waterways.',
    content: `Conciliation talks between the Ministry of Ports, Shipping and Waterways, port administration chairmen, and the Joint Action Committee of major port workers entered their critical phase at New Delhi’s Shram Shakti Bhawan today.

The dispute stems from the pending implementation of the Bipartite Wage Negotiation Committee recommendations due since January 2022. Port workers across major economic transit conduits including Jawaharlal Nehru Port Trust (JNPT), Chennai Port, Deendayal Port (Kandla), V.O. Chidambaranar Port, and Visakhapatnam Port have staged peaceful gate demonstrations, wearing black badges while maintaining essential dry-bulk and container vessel operations under an interim truce.

The Union Government has proposed a revised 10.5% fitment benefit coupled with upgraded medical coverage and unified digital pension disbursements. Worker unions emphasized that container dwell times and logistics turnaround efficiencies have improved 30% under Sagarmala infrastructure upgrades, arguing that compensation should reflect operational productivity benchmarks.

Legal observers noted that the Industrial Disputes Act, 1947 mandates minimum notice provisions for public utility services, while essential goods including petroleum, LNG, and emergency medical cargo are exempted from industrial action under existing court orders.`,
    category: 'Protests & Movements',
    subcategory: 'Labour & Employment',
    region: 'india',
    tags: ['Port Strike', 'JNPT', 'Trade Unions', 'Sagarmala', 'Labour Law', 'Industrial Disputes Act'],
    publisher: 'The Hindu Businessline / PIB Labour Desk',
    publisherUrl: 'https://thehindubusinessline.com',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=LABOUR-PORT-STRIKE-2026',
    imageUrl: '/src/assets/images/workers_rally_mumbai_1792219370562.jpg',
    publishedAt: '2026-10-16T12:00:00+05:30',
    updatedAt: '2026-10-16T17:45:00+05:30',
    ingestedAt: '2026-10-16T12:02:15+05:30',
    priority: 'developing',
    readingTimeMinutes: 5,
    whyItMatters: 'Major ports handle over 65% of India’s foreign maritime merchandise trade. A prolonged shutdown directly impacts export commitments, container freight rates, and supply-chain stability.',
    keyFacts: [
      'Involves 12 Major Port Authorities across east and west coasts.',
      'Demands focus on 5-year bipartite wage revision due since 2022 and pension parity.',
      'Essential commodities (crude oil, LNG, defense shipments) fully exempted from agitation.',
      'Tripartite conciliation ongoing under Chief Labour Commissioner (Central).'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'Banking'],
      paperMapping: 'UPSC GS Paper II: Dispute Redressal Mechanisms and Institutions; Statutory, Regulatory and Quasi-judicial Bodies & Labour Codes',
      potentialQuestion: 'Analyze the constitutional and statutory framework governing the right to strike in public utility services in India. How do the new Labour Codes address collective bargaining?',
      staticGkConnection: 'Major Port Authorities Act, 2021 governs 12 major ports. Industrial Disputes Act, 1947 Section 22 imposes restrictions on strikes in public utility services. Sagarmala Programme initiated in 2015.',
      keyTerms: ['Bipartite Wage Agreement', 'Public Utility Service', 'Major Port Authorities Act 2021', 'Essential Services Maintenance Act (ESMA)']
    },
    verified: true,
    status: 'developing',
    sourcesCount: 8,
    viewsCount: 34100,
    isLiveUpdate: true,
    language: 'bilingual',
    hindiTitle: 'अखिल भारतीय प्रमुख बंदरगाह श्रमिक महासंघ की राष्ट्रव्यापी हड़ताल वार्ता: त्रिपक्षीय बैठक जारी',
    hindiSubtitle: '12 प्रमुख बंदरगाहों के 20,000 से अधिक गोदी श्रमिक 5-वर्षीय वेतन पुनरीक्षण और पेंशन समानता की मांग पर अड़े।',
    hindiSummary: 'भारतीय पत्तन संघ (IPA) और पत्तन, पोत परिवहन और जलमार्ग मंत्रालय के साथ मैराथन सुलह कार्यवाही के बाद बंदरगाह और गोदी श्रमिकों की संयुक्त कार्रवाई समिति ने आपातकालीन बैठक की है। प्रमुख बंदरगाहों पर शांतिपूर्ण प्रदर्शन जारी हैं।',
    hindiWhyItMatters: 'भारत के प्रमुख बंदरगाह देश के 65% से अधिक समुद्री व्यापार को संभालते हैं। हड़ताल से निर्यात और आपूर्ति श्रृंखला सीधे प्रभावित होती है।',
    hindiKeyFacts: [
      'देश के 12 प्रमुख बंदरगाहों (JNPT, चेन्नई, कांडला, विशाखापट्टनम आदि) के श्रमिक शामिल।',
      'जनवरी 2022 से लंबित द्विपक्षीय वेतन वार्ता समझौते को लागू करने की मांग।',
      'कच्चा तेल, एलएनजी और आवश्यक दवाओं को प्रदर्शन से पूरी तरह बाहर रखा गया है।',
      'मुख्य श्रम आयुक्त (केंद्रीय) की मध्यस्थता में त्रिपक्षीय बातचीत जारी।'
    ],
    isProtestMovement: true,
    protestDetails: {
      movementName: 'All-India Major Port & Dock Workers National Wage Agitation',
      category: 'Labour & Employment',
      location: {
        cityDistrict: 'Mumbai & Chennai (All 12 Major Ports)',
        state: 'Maharashtra / Tamil Nadu / Gujarat / Odisha',
        country: 'India',
        venue: 'Port Administrative Buildings & Gate Checkposts',
        coordinates: { lat: 18.9515, lng: 72.9525 }
      },
      demands: [
        'Immediate notification and execution of 5-year Bipartite Wage Revision effective from Jan 1, 2022.',
        '10.6% fitment benefit parity across Class III and Class IV dock staff.',
        'Protection of port health facilities and pension trust assets from privatization.',
        'Filling of 14,000 sanctioned operational vacancies in cargo handling units.'
      ],
      demandsHi: [
        '1 जनवरी 2022 से प्रभावी 5-वर्षीय द्विपक्षीय वेतन पुनरीक्षण की तत्काल अधिसूचना।',
        'तृतीय और चतुर्थ श्रेणी गोदी कर्मचारियों के लिए 10.6% फिटमेंट लाभ समानता।',
        'बंदरगाह स्वास्थ्य सुविधाओं और पेंशन ट्रस्ट परिसंपत्तियों का संरक्षण।',
        'कार्गो हैंडलिंग इकाइयों में 14,000 स्वीकृत परिचालन रिक्तियों को भरना।'
      ],
      officialResponse: 'Ministry of Ports and IPA have offered a revised 10.5% fitment package and constituted a dedicated joint implementation committee with union representatives.',
      officialResponseHi: 'पत्तन मंत्रालय और आईपीए ने 10.5% संशोधित फिटमेंट पैकेज की पेशकश की है और ट्रेड यूनियन प्रतिनिधियों के साथ संयुक्त कार्यान्वयन समिति गठित की है।',
      status: 'Under Negotiation',
      partiesInvolved: [
        'All India Port & Dock Workers Federation (HMS)',
        'Indian National Port & Dock Workers Federation (INTUC)',
        'Water Transport Workers Federation of India (CITU)',
        'Bharatiya Port and Dock Mazdoor Sangh (BMS)',
        'Indian Ports Association (IPA)'
      ],
      policeResponseOrLegalStatus: 'Conciliation proceedings active under Section 12 of Industrial Disputes Act; High Court directives mandate uninterrupted movement of pharmaceutical and petroleum vessels.',
      startDate: '2026-10-10',
      turnoutEstimate: '22,000 Dockers across 12 Port Trusts',
      civilLibertiesAnalysis: {
        constitutionalArticles: ['Article 19(1)(c) - Freedom to form associations/unions', 'Article 21 - Right to livelihood', 'Article 39(a) - Adequate means of livelihood'],
        legalFramework: 'Industrial Disputes Act, 1947 (Section 22: Notice in Public Utilities); Essential Services Maintenance Act (ESMA); Major Port Authorities Act, 2021',
        precedentsAndDoctrine: 'All India Bank Employees Association v. National Industrial Tribunal (1962) - Right to strike is a statutory right, not a fundamental right; subject to reasonable regulation.',
        examRelevance: 'UPSC GS Paper II: Statutory Bodies, Trade Union Rights, Industrial Dispute Conciliation & UPSC GS Paper III: Infrastructure & Ports'
      },
      impactSummary: {
        transitImpact: 'Container loading delayed by 6-12 hours; vessel berthing prioritized for perishables and hydrocarbons.',
        economicImpact: 'Estimated ₹120 crore daily cargo turnover deferred into bonded warehouses; no permanent freight diversions observed.',
        publicServices: 'Local ferry operations and civilian inland waterways operating normally without disruption.'
      }
    }
  },

  // 3. MOVEMENT 2: Ladakh Sixth Schedule & Statehood Peaceful March
  {
    id: 'pb-2026-protest-ladakh-sixth-schedule',
    slug: 'ladakh-apex-body-kargil-democratic-alliance-peace-march',
    title: 'Ladakh Apex Body and KDA Hold Mass Peaceful March Demanding Sixth Schedule and Full Statehood',
    subtitle: 'Thousands assemble in Leh and Kargil advocating constitutional safeguards under Article 244 to protect fragile Himalayan ecology and tribal culture.',
    summary: 'The Leh Apex Body (LAB) and Kargil Democratic Alliance (KDA) spearheaded a coordinated peaceful demonstration and climate march across the Union Territory of Ladakh, seeking constitutional tribal autonomy and legislative representation.',
    content: `Tens of thousands of citizens, environmental activists, Buddhist monks, and Islamic scholars assembled at Leh’s Polo Ground and Kargil’s historic market square today in a unified public demonstration organized by the Leh Apex Body and the Kargil Democratic Alliance.

The peaceful rally reiterated the joint four-point agenda formulated by regional stakeholders: extension of the Sixth Schedule of the Indian Constitution to Ladakh, full statehood with a bicameral or legislative assembly, separate Lok Sabha seats for Leh and Kargil districts, and an accelerated recruitment board for local tribal youths.

Activists highlighted that Ladakh’s tribal population exceeds 97%, making the region an archetypal candidate for Autonomous District Councils (ADCs) empowered to pass land tenure, customary civil, and ecological conservation laws. Prominent environmentalist and innovator Sonam Wangchuk addressed the gathering, emphasizing that the fragile Himalayan glacial ecosystem cannot sustain unregulated industrial exploitation without grassroots indigenous consent.

The Union Ministry of Home Affairs high-powered committee headed by the Minister of State for Home Affairs has scheduled the next round of formal consultations in New Delhi to examine constitutional devolution mechanisms tailored to border security and local aspirations.`,
    category: 'Protests & Movements',
    subcategory: 'Regional Movements',
    region: 'india',
    tags: ['Ladakh', 'Sixth Schedule', 'Article 244', 'Sonam Wangchuk', 'Tribal Rights', 'Statehood'],
    publisher: 'The Hindu / Greater Kashmir / PTI',
    publisherUrl: 'https://thehindu.com',
    sourceUrl: 'https://thehindu.com/news/national/ladakh-peace-march-sixth-schedule-talks-2026',
    imageUrl: '/src/assets/images/farmer_peaceful_march_1792219369436.jpg',
    publishedAt: '2026-10-15T10:15:00+05:30',
    updatedAt: '2026-10-15T15:30:00+05:30',
    ingestedAt: '2026-10-15T10:17:22+05:30',
    priority: 'important',
    readingTimeMinutes: 5,
    whyItMatters: 'Addresses the democratic governance architecture of an ecologically fragile strategic border territory flanking both China and Pakistan.',
    keyFacts: [
      'Ladakh has over 97% scheduled tribal population (Balti, Beda, Bot, Brokpa, Changpa, Garra, Mon, Purigpa).',
      'Demands Sixth Schedule protection under Article 244 of the Constitution.',
      'Core 4-point charter: Statehood, 6th Schedule, 2 parliamentary seats, dedicated PSC recruitment.',
      'Ministry of Home Affairs High-Powered Committee in active formal dialogue.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'General Awareness'],
      paperMapping: 'UPSC GS Paper II: Functions and Responsibilities of the Union and the States; Fifth and Sixth Schedules to the Constitution of India; Tribal Autonomy',
      potentialQuestion: 'Examine the administrative and constitutional provisions of the Sixth Schedule of the Indian Constitution. How does it safeguard tribal customary rights and environmental conservation in border regions?',
      staticGkConnection: 'Article 244(2) and Article 275(1) govern Sixth Schedule Autonomous District Councils (ADCs). Currently applies to 10 tribal areas in Assam, Meghalaya, Tripura, and Mizoram (AMTM). Jammu & Kashmir Reorganisation Act, 2019 bifurcated J&K into two UTs.',
      keyTerms: ['Sixth Schedule', 'Autonomous District Councils (ADC)', 'Article 244', 'Article 371', 'Ecological Vulnerability']
    },
    verified: true,
    status: 'confirmed',
    sourcesCount: 9,
    viewsCount: 41200,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'लद्दाख एपेक्स बॉडी और केडीए का विशाल शांति मार्च: छठी अनुसूची और पूर्ण राज्य के दर्जे की मांग',
    hindiSubtitle: 'लेह और कारगिल में हजारों लोगों ने हिमालयी पर्यावरण और जनजातीय संस्कृति के संरक्षण के लिए शांतिपूर्ण प्रदर्शन किया।',
    hindiSummary: 'लेह एपेक्स बॉडी (LAB) और कारगिल डेमोक्रेटिक अलायंस (KDA) ने लद्दाख में संयुक्त शांतिपूर्ण मार्च निकाला। प्रदर्शनकारियों ने संविधान के अनुच्छेद 244 के तहत छठी अनुसूची और लद्दाख को पूर्ण राज्य का दर्जा देने की मांग दोहराई।',
    hindiWhyItMatters: 'रणनीतिक सीमांत क्षेत्र में जनजातीय स्वशासन, भूमि अधिकारों की सुरक्षा और नाजुक हिमालयी ग्लेशियरों के पारिस्थितिक संरक्षण के लिए यह आंदोलन अत्यंत महत्वपूर्ण है।',
    hindiKeyFacts: [
      'लद्दाख में 97% से अधिक आबादी अनुसूचित जनजाति (ST) की है।',
      'मुख्य चार मांगें: पूर्ण राज्य का दर्जा, 6वीं अनुसूची, लेह-कारगिल के लिए दो लोकसभा सीटें, स्थानीय लोक सेवा आयोग।',
      'गृह मंत्रालय की उच्चाधिकार प्राप्त समिति के साथ नई दिल्ली में औपचारिक वार्ता निर्धारित।',
      'शांतिपूर्ण मार्च में पर्यावरण कार्यकर्ता सोनम वांगचुक सहित सभी नागरिक समाज संगठन शामिल।'
    ],
    isProtestMovement: true,
    protestDetails: {
      movementName: 'Ladakh Democratic Rights & Sixth Schedule Climate Assembly',
      category: 'Regional Movements',
      location: {
        cityDistrict: 'Leh & Kargil',
        state: 'UT of Ladakh',
        country: 'India',
        venue: 'Historic Polo Ground Leh & Kargil Main Bazaar',
        coordinates: { lat: 34.1526, lng: 77.5771 }
      },
      demands: [
        'Conferment of Sixth Schedule status under Article 244 for Ladakh.',
        'Grant of full statehood with a democratically elected Legislative Assembly.',
        'Creation of independent Public Service Commission (PSC) for Ladakh youth employment.',
        'Allocation of two dedicated Lok Sabha seats (one for Leh and one for Kargil).'
      ],
      demandsHi: [
        'लद्दाख के लिए अनुच्छेद 244 के तहत छठी अनुसूची का दर्जा।',
        'लोकतांत्रिक रूप से चुनी गई विधानसभा के साथ पूर्ण राज्य का दर्जा।',
        'लद्दाख के युवाओं के लिए स्वतंत्र राज्य लोक सेवा आयोग का गठन।',
        'संसद में लेह और कारगिल के लिए दो अलग-अलग लोकसभा सीटों का प्रावधान।'
      ],
      officialResponse: 'Ministry of Home Affairs High-Powered Committee has held multiple rounds of dialogue and offered 85% job reservation and administrative empowerment to existing Hill Councils.',
      officialResponseHi: 'गृह मंत्रालय की उच्च स्तरीय समिति ने कई दौर की वार्ता की है और मौजूदा स्वायत्त पर्वतीय परिषदों को सशक्त बनाने तथा नौकरियों में 85% स्थानीय आरक्षण की पेशकश की है।',
      status: 'Peaceful March',
      partiesInvolved: [
        'Leh Apex Body (LAB)',
        'Kargil Democratic Alliance (KDA)',
        'Ladakh Buddhist Association (LBA)',
        'Anjuman-e-Jamiat-ul-Ulama Isna Asharia Kargil',
        'Students’ Educational and Cultural Movement of Ladakh (SECMOL)'
      ],
      policeResponseOrLegalStatus: 'Entire rally conducted peacefully under permissions from District Magistrate Leh; comprehensive administrative security deployed with zero untoward incidents.',
      startDate: '2024-03-06',
      turnoutEstimate: '18,000+ Participants',
      civilLibertiesAnalysis: {
        constitutionalArticles: ['Article 19(1)(b) - Right to assemble peacefully without arms', 'Article 244 - Administration of Scheduled Areas and Tribal Areas', 'Article 29 - Protection of interests of minorities'],
        legalFramework: 'Sixth Schedule to the Indian Constitution; Jammu and Kashmir Reorganisation Act, 2019; Ladakh Autonomous Hill Development Council Act, 1995',
        precedentsAndDoctrine: 'Pu Myllai Hlychho v. State of Mizoram (2005) - Sixth Schedule ADCs constitute distinct constitutional mini-legislatures with sovereign local regulatory powers.',
        examRelevance: 'UPSC GS Paper II: Federal Structure, Asymmetric Federalism, Fifth vs Sixth Schedule, Border Area Governance'
      },
      impactSummary: {
        transitImpact: 'Local markets observed voluntary half-day closure; vehicular transit on Srinagar-Leh highway operating with police escort.',
        economicImpact: 'Tourism operators supported the ecological charter; zero disruption to airport or essential winter provisioning supplies.',
        publicServices: 'Hospitals, emergency ambulances, telecommunications, and defense logistics completely operational.'
      }
    }
  },

  // 4. MOVEMENT 3: Farmer MSP Statutory Guarantee Rally
  {
    id: 'pb-2026-protest-farmer-msp-statutory-rally',
    slug: 'samyukta-kisan-morcha-shambhu-border-tractor-assembly',
    title: 'Samyukta Kisan Morcha (Non-Political) Re-launches Shambhu Border Kisan Mahapanchayat Demanding Legal MSP Guarantee',
    subtitle: 'Agricultural unions press for C2+50% formula implementation, comprehensive farm debt waiver, and pension scheme for landless laborers.',
    summary: 'Farmer unions from Punjab, Haryana, and western Uttar Pradesh gathered at border transit points for a massive peaceful Mahapanchayat, presenting a multi-point charter on agricultural price security and crop diversification support.',
    content: `Hundreds of tractor-trolleys and thousands of farmers assembled at the Punjab-Haryana Shambhu barrier today as the Samyukta Kisan Morcha (Non-Political) and Kisan Mazdoor Morcha held a coordinated "Kisan Mahapanchayat".

The primary resolution passed by the assembly demands a statutory guarantee act for Minimum Support Price (MSP) across 23 essential crops, calculated according to the comprehensive cost methodology (C2+50%) outlined in the National Commission on Farmers (Swaminathan Commission) report. Union leaders argued that market volatility in pulses, oilseeds, and coarse grains forces agrarian distress unless public procurement is legally binding.

The farm leaders also urged central authorities to fast-track debt relief packages for small and marginal cultivators, withdraw proposed power distribution privatization amendments, and guarantee a monthly old-age pension of ₹10,000 for agricultural laborers aged 60 and above.

Law enforcement deployed multi-tiered barricades and drones along interstate highway perimeters, while maintaining dedicated green corridors for ambulances and passenger vehicles. Central ministers from the Ministry of Agriculture and Farmers Welfare confirmed that negotiations with union representatives remain open to formulate a viable crop diversification incentive mechanism.`,
    category: 'Protests & Movements',
    subcategory: 'Farmers & Agriculture',
    region: 'india',
    tags: ['Farmers Protest', 'MSP Guarantee', 'Swaminathan Commission', 'Shambhu Border', 'Agriculture', 'C2+50%'],
    publisher: 'The Tribune / Indian Express Rural Bureau',
    publisherUrl: 'https://indianexpress.com',
    sourceUrl: 'https://indianexpress.com/article/india/farmers-shambhu-border-mahapanchayat-msp-demands-2026',
    imageUrl: '/src/assets/images/farmer_peaceful_march_1792219369436.jpg',
    publishedAt: '2026-10-14T09:30:00+05:30',
    updatedAt: '2026-10-14T16:45:00+05:30',
    ingestedAt: '2026-10-14T09:32:40+05:30',
    priority: 'developing',
    readingTimeMinutes: 5,
    whyItMatters: 'Agricultural economics and price support mechanisms directly impact livelihoods of over 45% of India’s workforce and national food security.',
    keyFacts: [
      'Core demand: Statutory legal backing for MSP across 23 crops based on Swaminathan C2+50% formula.',
      'Farmers seek comprehensive debt restructuring and crop diversification incentives.',
      'Tractor rally remained peaceful; dedicated emergency corridors maintained by organizers.',
      'Government offers 5-year guaranteed contract procurement for pulses, maize, and cotton through NAFED/NCCF.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'Banking'],
      paperMapping: 'UPSC GS Paper III: Issues related to Direct and Indirect Farm Subsidies and Minimum Support Prices; Public Distribution System',
      potentialQuestion: 'Critically analyze the economic and fiscal feasibility of providing a statutory legal guarantee for Minimum Support Price (MSP) in India. What alternative market stabilization reforms can protect farmer incomes?',
      staticGkConnection: 'National Commission on Farmers constituted under Dr. M.S. Swaminathan submitted reports in 2004-2006. CACP (Commission for Agricultural Costs and Prices) recommends MSP for 22 mandated crops and FRP for sugarcane. Formulated under Ministry of Agriculture in 1965.',
      keyTerms: ['A2, A2+FL, C2 Costs', 'CACP Mandate', 'Fair and Remunerative Price (FRP)', 'NAFED Procurement', 'Market Intervention Scheme (MIS)']
    },
    verified: true,
    status: 'developing',
    sourcesCount: 8,
    viewsCount: 39500,
    isLiveUpdate: true,
    language: 'bilingual',
    hindiTitle: 'संयुक्त किसान मोर्चा का शंभू बॉर्डर पर किसान महापंचायत: कानूनी एमएसपी गारंटी की मांग तेज',
    hindiSubtitle: 'पंजाब, हरियाणा और पश्चिमी उत्तर प्रदेश के किसान संगठनों ने स्वामीनाथन सी2+50% फॉर्मूले को कानूनी रूप देने की मांग की।',
    hindiSummary: 'शंभू बॉर्डर पर संयुक्त किसान मोर्चा (गैर-राजनीतिक) और किसान मजदूर मोर्चा के नेतृत्व में विशाल किसान महापंचायत आयोजित हुई। सभा ने 23 फसलों के लिए न्यूनतम समर्थन मूल्य (MSP) की कानूनी गारंटी और कृषि ऋण माफी की मांग उठाई।',
    hindiWhyItMatters: 'देश की 45% से अधिक कार्यबल कृषि पर निर्भर है। एमएसपी की कानूनी गारंटी और मूल्य स्थिरीकरण सीधे ग्रामीण अर्थव्यवस्था और खाद्य सुरक्षा से जुड़ा है।',
    hindiKeyFacts: [
      'स्वामीनाथन आयोग के सी2+50% फॉर्मूले पर आधारित 23 फसलों पर कानूनी एमएसपी की मांग।',
      'छोटे एवं सीमांत किसानों के लिए कृषि ऋण माफी और वृद्ध खेतिहर मजदूरों के लिए पेंशन की मांग।',
      'प्रदर्शन शांतिपूर्ण रहा; एम्बुलेंस और आवश्यक सेवाओं के लिए ग्रीन कॉरिडोर खुला रखा गया।',
      'सरकार ने नाफेड और एनसीसीएफ के जरिए दालों, मक्का और कपास की 5 साल की गारंटीशुदा खरीद का प्रस्ताव रखा।'
    ],
    isProtestMovement: true,
    protestDetails: {
      movementName: 'Kisan Mahapanchayat for Statutory MSP & Agrarian Reforms',
      category: 'Farmers & Agriculture',
      location: {
        cityDistrict: 'Shambhu Border (Ambala - Patiala)',
        state: 'Punjab / Haryana Border',
        country: 'India',
        venue: 'National Highway 44 Transit Corridor',
        coordinates: { lat: 30.2922, lng: 76.7329 }
      },
      demands: [
        'Enactment of central legislation guaranteeing Minimum Support Price (MSP) at C2+50% formula.',
        'Nationwide agrarian institutional debt relief package for small and marginal farmers.',
        'Withdrawal of proposed Electricity (Amendment) Bill regarding agricultural tariff meters.',
        'Pension of ₹10,000/month for landless agricultural laborers and farmers above 60 years of age.'
      ],
      demandsHi: [
        'सी2+50% फॉर्मूले पर न्यूनतम समर्थन मूल्य (MSP) की कानूनी गारंटी का केंद्रीय कानून।',
        'छोटे और सीमांत किसानों के लिए व्यापक कृषि ऋण माफी पैकेज।',
        'कृषि बिजली मीटरों से संबंधित प्रस्तावित विद्युत (संशोधन) विधेयक को वापस लेना।',
        '60 वर्ष से अधिक उम्र के भूमिहीन कृषि श्रमिकों और किसानों के लिए ₹10,000/माह पेंशन।'
      ],
      officialResponse: 'Ministry of Agriculture proposed multi-year contract procurement at assured MSP for pulses, maize, and cotton through cooperative federations (NAFED and NCCF).',
      officialResponseHi: 'कृषि मंत्रालय ने सहकारी महासंघों (नाफेड और एनसीसीएफ) के माध्यम से दालों, मक्का और कपास के लिए सुनिश्चित एमएसपी पर बहु-वर्षीय अनुबंध खरीद का प्रस्ताव दिया है।',
      status: 'Active Demonstration',
      partiesInvolved: [
        'Samyukta Kisan Morcha (Non-Political)',
        'Kisan Mazdoor Morcha (KMM)',
        'Bharatiya Kisan Union (Sidhupur)',
        'Kisan Mazdoor Sangharsh Committee (KMSC)'
      ],
      policeResponseOrLegalStatus: 'Section 144 restrictions imposed in adjoining border districts; highway diversions implemented for civilian transit while staging grounds remain peaceful.',
      startDate: '2024-02-13',
      turnoutEstimate: '15,000+ Cultivators with Tractor-Trolleys',
      civilLibertiesAnalysis: {
        constitutionalArticles: ['Article 19(1)(a) - Freedom of speech and expression', 'Article 19(1)(b) - Assembly without arms', 'Article 19(1)(d) - Freedom of movement throughout territory of India'],
        legalFramework: 'National Highways Act, 1956; Section 144 BNSS (former CrPC); Essential Commodities Act, 1955',
        precedentsAndDoctrine: 'Amit Sahni v. Commissioner of Police (Shaheen Bagh Case 2020) - Right to protest is a fundamental right but must be exercised in designated areas without blocking public transit corridors.',
        examRelevance: 'UPSC GS Paper II: Fundamental Freedoms & Reasonable Restrictions; UPSC GS Paper III: MSP Pricing Dynamics & Food Corporation Procurement'
      },
      impactSummary: {
        transitImpact: 'Interstate commercial freight redirected via alternate link roads adding 35-50 km transit detour.',
        economicImpact: 'Toll collections suspended on isolated barrier plazas; wholesale grain mandis functioning under adjusted delivery timetables.',
        publicServices: 'Dedicated emergency humanitarian corridor maintained continuously for medical vehicles and students.'
      }
    }
  },

  // 5. MOVEMENT 4: Healthcare Doctors & Medics Protection Act
  {
    id: 'pb-2026-protest-resident-doctors-safety-act',
    slug: 'forda-ima-candlelight-march-central-protection-act',
    title: 'Federation of Resident Doctors Association (FORDA) Leads Mass Candlelight Assembly for Central Healthcare Protection Act',
    subtitle: 'Medical professionals across premier institutions urge parliamentary enactment of codified hospital security zones and fast-track tribunals.',
    summary: 'Resident doctors associations, nursing federations, and the Indian Medical Association staged peaceful solidarity assemblies across New Delhi, Mumbai, and Kolkata, presenting a model Central Healthcare Protection Act to address workplace violence in hospitals.',
    content: `Thousands of resident doctors, medical interns, senior faculty, and nursing staff observed a unified peaceful candlelight vigil in front of Nirman Bhawan and major government tertiary hospitals today, demanding the immediate legislative enactment of the Central Healthcare Service Personnel and Clinical Establishments (Prohibition of Violence and Damage to Property) Bill.

The demonstration follows nationwide consultations spearheaded by the Federation of Resident Doctors Association (FORDA) and the Indian Medical Association (IMA). Healthcare workers emphasized that existing state-level Medicare Protection Acts lack uniform non-bailable enforcement teeth, resulting in minimal deterrent consequences against recurrent mob vandalism in emergency triage wards.

The charter submitted to the Ministry of Health and Family Welfare urges the designation of government teaching hospitals as institutional security zones, deployment of trained institutional marshals, mandatory installation of 360-degree CCTV surveillance in emergency wings, and the constitution of designated Fast-Track Special Courts to adjudicate hospital violence offenses within 90 days.

Representatives emphasized that intensive care units (ICUs) and emergency casualty services remained fully operational throughout the agitation, demonstrating a commitment to patient welfare while exercising fundamental democratic assembly rights.`,
    category: 'Protests & Movements',
    subcategory: 'Civil Liberties & Healthcare',
    region: 'india',
    tags: ['Doctors Strike', 'FORDA', 'Healthcare Protection Act', 'IMA', 'Nirman Bhawan', 'Workplace Safety'],
    publisher: 'The Hindu / ANI Medical Wire',
    publisherUrl: 'https://thehindu.com',
    sourceUrl: 'https://thehindu.com/news/national/resident-doctors-candlelight-march-central-protection-act-2026',
    imageUrl: '/src/assets/images/student_youth_march_1792219370683.jpg',
    publishedAt: '2026-10-13T19:00:00+05:30',
    updatedAt: '2026-10-13T22:30:00+05:30',
    ingestedAt: '2026-10-13T19:02:18+05:30',
    priority: 'important',
    readingTimeMinutes: 4,
    whyItMatters: 'Safeguards the integrity of public tertiary health delivery while balancing emergency medical accessibility and constitutional safety guarantees for doctors.',
    keyFacts: [
      'Organized by FORDA, IMA, and Joint Resident Doctors Councils across central institutes (AIIMS, Safdarjung, KGMU).',
      'Demands codification of non-bailable Central Protection Act for clinical establishments.',
      'Emergency casualty and ICU operations maintained 100% functional throughout the assembly.',
      'Supreme Court National Task Force (NTF) has formulated safety protocol recommendations for hospital perimeters.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'SSC'],
      paperMapping: 'UPSC GS Paper II: Issues Relating to Development and Management of Social Sector/Services relating to Health; Fundamental Rights (Article 21)',
      potentialQuestion: 'Workplace safety for healthcare professionals directly intersects with the constitutional right to health under Article 21. Examine the need for a unified Central legislation on hospital violence.',
      staticGkConnection: 'Right to Health recognized as intrinsic to Article 21 (Right to Life) in Paschim Banga Khet Mazdoor Samity v. State of West Bengal (1996). Health is Entry 6 of List II (State List) under Seventh Schedule.',
      keyTerms: ['Central Protection Act', 'National Task Force (NTF)', 'Institutional Security Zone', 'Article 21', 'State List Entry 6']
    },
    verified: true,
    status: 'confirmed',
    sourcesCount: 7,
    viewsCount: 29400,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'रेजिडेंट डॉक्टरों के संघ (FORDA) का विशाल कैंडललाइट मार्च: केंद्रीय स्वास्थ्य सेवा सुरक्षा कानून की मांग',
    hindiSubtitle: 'देशभर के सरकारी मेडिकल कॉलेजों के डॉक्टरों ने अस्पतालों को सुरक्षित क्षेत्र घोषित करने और गैर-जमानती कानून बनाने का आग्रह किया।',
    hindiSummary: 'एम्स, सफदरजंग और अन्य प्रमुख अस्पतालों के रेजिडेंट डॉक्टरों ने निर्माण भवन के सामने शांतिपूर्ण कैंडललाइट मार्च निकाला। डॉक्टरों ने अस्पतालों में हिंसा के खिलाफ केंद्रीय स्वास्थ्य सुरक्षा अधिनियम पारित करने और आपातकालीन वार्डों में सुरक्षा मार्शल तैनात करने की मांग की।',
    hindiWhyItMatters: 'डॉक्टरों और स्वास्थ्य कर्मियों की सुरक्षा सीधे तौर पर सार्वजनिक स्वास्थ्य व्यवस्था की विश्वसनीयता और संविधान के अनुच्छेद 21 के तहत स्वास्थ्य के अधिकार से जुड़ी है।',
    hindiKeyFacts: [
      'फोर्डा (FORDA), आईएमए और प्रमुख रेजिडेंट डॉक्टर्स संघों द्वारा आयोजित शांतिपूर्ण मार्च।',
      'अस्पतालों में हिंसा को गैर-जमानती अपराध घोषित करने वाला केंद्रीय कानून बनाने की मांग।',
      'प्रदर्शन के दौरान सभी आपातकालीन वार्ड और आईसीयू सेवाएं पूरी तरह चालू रहीं।',
      'सुप्रीम कोर्ट द्वारा गठित राष्ट्रीय टास्क फोर्स (NTF) ने अस्पतालों के लिए सुरक्षा प्रोटोकॉल का मसौदा तैयार किया।'
    ],
    isProtestMovement: true,
    protestDetails: {
      movementName: 'National Healthcare Professionals Safety & Central Protection Act Movement',
      category: 'Civil Liberties',
      location: {
        cityDistrict: 'New Delhi (AIIMS & Nirman Bhawan)',
        state: 'Delhi NCT',
        country: 'India',
        venue: 'Nirman Bhawan & Maulana Azad Medical College Campus',
        coordinates: { lat: 28.6143, lng: 77.2189 }
      },
      demands: [
        'Enactment of codified Central Healthcare Protection Act with non-bailable penal sanctions.',
        'Institutional declaration of central and state teaching hospitals as high-security protected zones.',
        'Deployment of dedicated trained security personnel and installation of central panic buttons in emergency triage wards.',
        'Constitution of designated Fast-Track Courts to conclude trials for violence against medics within 90 days.'
      ],
      demandsHi: [
        'गैर-जमानती दंडात्मक प्रावधानों के साथ केंद्रीय स्वास्थ्य सुरक्षा अधिनियम का निर्माण।',
        'सरकारी मेडिकल कॉलेजों और तृतीयक अस्पतालों को उच्च सुरक्षा क्षेत्र घोषित करना।',
        'आपातकालीन वार्डों में प्रशिक्षित सुरक्षा गार्डों की तैनाती और पैनिक बटन सिस्टम।',
        'स्वास्थ्य कर्मियों पर हिंसा के मामलों की सुनवाई 90 दिनों में पूरी करने के लिए फास्ट-ट्रैक कोर्ट।'
      ],
      officialResponse: 'Ministry of Health and Family Welfare confirmed the adoption of the Supreme Court National Task Force (NTF) recommendations on physical security audits across central hospitals.',
      officialResponseHi: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय ने केंद्रीय अस्पतालों में सुरक्षा ऑडिट पर सुप्रीम कोर्ट के राष्ट्रीय टास्क फोर्स (NTF) की सिफारिशों को लागू करने की पुष्टि की है।',
      status: 'Peaceful March',
      partiesInvolved: [
        'Federation of Resident Doctors Association (FORDA)',
        'Indian Medical Association (IMA)',
        'Federation of All India Medical Association (FAIMA)',
        'Resident Doctors Association AIIMS New Delhi'
      ],
      policeResponseOrLegalStatus: 'Peaceful assembly permitted along designated service lanes; memorandum formally submitted to Health Ministry officials without disruption.',
      startDate: '2024-08-12',
      turnoutEstimate: '10,000+ Doctors and Medical Students',
      civilLibertiesAnalysis: {
        constitutionalArticles: ['Article 21 - Right to live with dignity and safe workplace conditions', 'Article 19(1)(b) - Peaceful assembly', 'Article 47 - Duty of State to improve public health'],
        legalFramework: 'Bharatiya Nyaya Sanhita (BNS) 2023; State Medicare Protection Acts; Supreme Court Guidelines on Institutional Security',
        precedentsAndDoctrine: 'Pt. Parmanand Katara v. Union of India (1989) - Professional medical duty to preserve life is paramount; Paschim Banga Khet Mazdoor Samity (1996) - Right to health integral to Article 21.',
        examRelevance: 'UPSC GS Paper II: Public Health, Right to Life, Judicial Intervention; UPSC Ethics (GS IV): Medical Professionalism'
      },
      impactSummary: {
        transitImpact: 'Minor evening pedestrian slowdown near Maulana Azad Road; general traffic remained normal.',
        economicImpact: 'Zero financial loss; voluntary donations funded logistics and informational placards.',
        publicServices: 'Out-Patient Departments (OPD) worked on token shifts; Trauma and Emergency Care maintained 100% service.'
      }
    }
  },

  // 6. ARTICLE: Semiconductor Dholera Fab
  {
    id: 'pb-2026-semiconductor-dholera-fab',
    slug: 'india-inaugurates-first-commercial-semiconductor-wafer-fab',
    title: 'First Commercial 28nm Semiconductor Fabrication Facility Begins Pilot Wafers in Dholera',
    subtitle: 'Under the India Semiconductor Mission (ISM), commercial pilot runs commence for automotive, power electronics, and 5G transceiver chips.',
    summary: 'India’s semiconductor self-reliance marked an unprecedented milestone as the Dholera multi-billion-dollar cleanroom facility initiated its first pilot wafer runs, creating domestic supply resilience for automotive microcontrollers and industrial IoT hardware.',
    content: `The India Semiconductor Mission (ISM) achieved a historic turning point today with the commissioning of pilot silicon wafer production at the Dholera Special Investment Region in Gujarat. The facility, built with collaborative technology partnerships and central capital support, features an ultra-clean ISO Class 1 to Class 5 cleanroom footprint.

The 300mm wafer line is calibrated to manufacture mature 28-nanometer and 40-nanometer nodes, addressing the critical global shortage of automotive microcontrollers, power management integrated circuits (PMICs), and defence-grade embedded controllers.

Officials from the Ministry of Electronics and Information Technology (MeitY) noted that the plant is powered by 100% renewable energy channeled from the neighboring Dholera Solar Park and utilizes closed-loop ultra-pure water recycling systems to meet environmental zero-liquid discharge benchmarks.

Simultaneously, two outsourced semiconductor assembly and test (OSAT) units in Sanand and Morigaon, Assam, are entering qualification phases to establish a complete end-to-end domestic value chain from silicon boule slicing to final packaging.`,
    category: 'AI & Technology',
    subcategory: 'Hardware & Semiconductors',
    region: 'india',
    tags: ['Semiconductor', 'MeitY', 'Dholera', 'Make in India', 'Electronics', 'Silicon Wafers'],
    publisher: 'Ministry of Electronics & IT / Press Information Bureau',
    publisherUrl: 'https://meity.gov.in',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=MEITY-FAB-DHOLERA-2026',
    imageUrl: '/src/assets/images/india_semiconductor_fab_1792217569953.jpg',
    publishedAt: '2026-10-15T11:00:00+05:30',
    updatedAt: '2026-10-15T16:20:00+05:30',
    ingestedAt: '2026-10-15T11:02:40+05:30',
    priority: 'breaking',
    readingTimeMinutes: 4,
    whyItMatters: 'Directly secures critical domestic supply chains against global chip embargoes and geopolitical disruptions while anchoring high-value engineering jobs.',
    keyFacts: [
      'Facility capacity projected at 50,000 wafer starts per month (WSPM) at peak operational scale.',
      'Initial node focus: 28nm and 40nm mature semiconductor fabrication.',
      'Total capital outlay under the Modified Scheme for Setting Up of Semiconductor Fabs backed by 50% central fiscal incentive.',
      'Supported by dedicated OSAT units across Gujarat and Assam.'
    ],
    examRelevance: {
      exams: ['UPSC', 'Banking', 'State PCS', 'SSC'],
      paperMapping: 'UPSC GS Paper III: Industrial Policy, Manufacturing, and Electronic Hardware Ecosystem',
      potentialQuestion: 'Critically analyze the government’s India Semiconductor Mission (ISM). What structural bottlenecks must India address to compete with East Asian semiconductor giants?',
      staticGkConnection: 'India Semiconductor Mission (ISM) launched under Digital India Corporation. First semiconductor laboratory (SCL) was established in Mohali, Punjab in 1984.',
      keyTerms: ['Wafer Fabrication', 'OSAT / ATMP', '28nm Node', 'Silicon Ingot', 'Zero Liquid Discharge']
    },
    verified: true,
    status: 'official_release',
    sourcesCount: 8,
    viewsCount: 38240,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'धोलेरा में भारत की पहली वाणिज्यिक 28nm सेमीकंडक्टर फैब सुविधा ने शुरू किया पायलट वेफर उत्पादन',
    hindiSubtitle: 'इंडिया सेमीकंडक्टर मिशन (ISM) के तहत ऑटोमोटिव और औद्योगिक IoT चिप्स के लिए पहला घरेलू फैब्रिकेशन शुरू।',
    hindiSummary: 'गुजरात के धोलेरा विशेष निवेश क्षेत्र (SIR) में भारत की पहली वाणिज्यिक सेमीकंडक्टर फैब सुविधा ने 28nm और 40nm सिलिकॉन वेफर्स का उत्पादन शुरू कर दिया है। यह घरेलू इलेक्ट्रॉनिक सुरक्षा के लिए ऐतिहासिक छलांग है।',
    hindiWhyItMatters: 'वैश्विक चिप आपूर्ति पर निर्भरता समाप्त करने और भारत को वैश्विक इलेक्ट्रॉनिक्स विनिर्माण हब बनाने में यह परियोजना गेम-चेंजर साबित होगी।',
    hindiKeyFacts: [
      'शिखर परिचालन पर प्रति माह 50,000 वेफर उत्पादन (WSPM) की क्षमता।',
      '28-नैनोमीटर और 40-नैनोमीटर परिपक्व नोड्स पर विशेष ध्यान।',
      'परियोजना को केंद्र सरकार से 50% वित्तीय प्रोत्साहन सहायता प्राप्त।',
      'असम के मोरीगांव और गुजरात के साणंद में OSAT पैकेजिंग इकाइयों से जुड़ा।'
    ]
  },

  // 7. ARTICLE: Supreme Court Federalism
  {
    id: 'pb-2026-supreme-court-federalism-ruling',
    slug: 'supreme-court-nine-judge-constitution-bench-federalism-verdict',
    title: 'Supreme Court 9-Judge Constitution Bench Reaffirms Fiscal Federalism in State Taxation Powers',
    subtitle: 'Landmark verdict clarifies mineral and resource cess jurisdiction under Seventh Schedule Entries, strengthening state fiscal autonomy.',
    summary: 'A nine-judge Constitution Bench of the Supreme Court delivered an authoritative ruling upholding the constitutional authority of State Legislatures to levy taxes and cesses on mineral-bearing land under Entry 49 and Entry 50 of the State List.',
    content: `In a landmark pronouncement on constitutional federalism, a nine-judge Constitution Bench headed by the Chief Justice of India resolved decades-long legal disputes regarding mineral taxation powers between the Union Government and State Legislatures.

By an 8:1 majority, the apex court held that royalties paid under the Mines and Minerals (Development and Regulation) Act, 1957 (MMDR Act) do not constitute a "tax", but rather a statutory extraction charge. Consequently, Parliament’s power under Entry 54 of List I (Union List) does not extinguish the sovereign legislative field of States under Entry 50 of List II (State List) to impose cesses on mineral rights, subject only to valid parliamentary limitations.

The judgment is expected to provide substantial revenue predictability to mineral-rich states including Odisha, Jharkhand, Chhattisgarh, and Karnataka, while establishing strict guidelines against arbitrary or retrospective levies that could disrupt national mining commerce.

Legal scholars describe this as one of the most consequential fiscal federalism verdicts since the S.R. Bommai case, reinforcing the cooperative federal balance enshrined in the Basic Structure of the Indian Constitution.`,
    category: 'Parliament & Judiciary',
    subcategory: 'Constitutional Law',
    region: 'india',
    tags: ['Supreme Court', 'Constitution Bench', 'Federalism', 'Seventh Schedule', 'Taxation', 'MMDR Act'],
    publisher: 'Supreme Court of India Official Bulletin / Bar & Bench',
    publisherUrl: 'https://main.sci.gov.in',
    sourceUrl: 'https://main.sci.gov.in/judgments/2026/const-bench-mineral-taxation',
    imageUrl: '/src/assets/images/supreme_court_india_1792217571586.jpg',
    publishedAt: '2026-10-14T10:30:00+05:30',
    updatedAt: '2026-10-14T15:00:00+05:30',
    ingestedAt: '2026-10-14T10:31:05+05:30',
    priority: 'important',
    readingTimeMinutes: 6,
    whyItMatters: 'Decisively settles constitutional boundaries between Central regulatory powers and State fiscal autonomy, directly impacting state balance sheets and national resource pricing.',
    keyFacts: [
      'Verdict delivered by 9-Judge Bench with 8:1 majority opinion.',
      'Held that royalty under Section 9 of the MMDR Act is not a tax.',
      'Reaffirmed Entry 49 and Entry 50 of List II (State List) of the Seventh Schedule.',
      'Overruled previous conflicting 1989 five-judge bench precedent in India Cement case.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'Banking'],
      paperMapping: 'UPSC GS Paper II: Functions and Responsibilities of the Union and the States, Issues and Challenges Pertaining to the Federal Structure',
      potentialQuestion: 'How does the Supreme Court’s interpretation of Seventh Schedule entries balance fiscal decentralization with unified national economic interests? Discuss with relevant case laws.',
      staticGkConnection: 'Article 246 governs distribution of legislative subjects across Seventh Schedule (Union List, State List, Concurrent List). Article 141 establishes Supreme Court precedent as binding law.',
      keyTerms: ['Seventh Schedule', 'Fiscal Federalism', 'Doctrine of Pith and Substance', 'MMDR Act 1957', 'List II Entry 50']
    },
    verified: true,
    status: 'confirmed',
    sourcesCount: 7,
    viewsCount: 31200,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'सुप्रीम कोर्ट की 9-न्यायाधीशों की संविधान पीठ: राज्यों को खनिज भूमि पर टैक्स लगाने का संप्रभु अधिकार',
    hindiSubtitle: 'ऐतिहासिक 8:1 फैसले ने सातवीं अनुसूची के तहत राज्यों की वित्तीय स्वायत्तता को पुनः पुष्ट किया।',
    hindiSummary: 'सर्वोच्च न्यायालय की 9-न्यायाधीशों की संविधान पीठ ने फैसला सुनाया है कि MMDR अधिनियम की धारा 9 के तहत भुगतान की जाने वाली रॉयल्टी कोई कर नहीं है। अतः राज्य विधायिकाओं को सातवीं अनुसूची की सूची II की प्रविष्टि 50 के तहत उपकर लगाने का अधिकार है।',
    hindiWhyItMatters: 'ओडिशा, झारखंड, छत्तीसगढ़ जैसे खनिज समृद्ध राज्यों के राजस्व में भारी वृद्धि होगी और केंद्र-राज्य वित्तीय संघवाद मजबूत होगा।',
    hindiKeyFacts: [
      'प्रधान न्यायाधीश की अध्यक्षता वाली 9-न्यायाधीशों की पीठ का 8:1 बहुमत से फैसला।',
      'रॉयल्टी कर (Tax) नहीं है, बल्कि खनिज उत्खनन का वैधानिक शुल्क है।',
      'सातवीं अनुसूची की राज्य सूची (प्रविष्टि 49 और 50) के अधिकारों को बरकरार रखा।',
      '1989 के पुराने इंडिया सीमेंट मामले के फैसले को खारिज किया।'
    ]
  },

  // 8. ARTICLE: Thar Mega Solar-Wind Hybrid Corridor
  {
    id: 'pb-2026-thar-solar-energy-grid',
    slug: 'thar-desert-mega-solar-storage-hybrid-park-grid-sync',
    title: 'Thar Mega Solar-Wind Hybrid Corridor Synchronizes 10GW Clean Power to National Grid',
    subtitle: 'Integrated battery energy storage systems (BESS) ensure round-the-clock baseload stability from western desert renewable zones.',
    summary: 'The Ministry of New and Renewable Energy (MNRE) confirmed the synchronization of Phase-III of the Thar Hybrid Energy Park, providing 10 Gigawatts of renewable generation integrated with grid-scale lithium-iron-phosphate battery storage.',
    content: `India’s clean energy transition took another monumental leap today as the Power Grid Corporation of India (POWERGRID) energized the 765kV High Voltage Direct Current (HVDC) corridor linking the Thar Mega Solar-Wind Hybrid Complex in western Rajasthan directly to the northern and western industrial consumption nodes.

The facility represents one of the world's most concentrated renewable energy installations, harnessing superior solar irradiance and steady desert winds across a 45,000-acre non-arable parcel. Crucially, the park includes 2,400 MWh of co-located Battery Energy Storage Systems (BESS), mitigating solar duck-curve intermittency and supplying dispatchable round-the-clock green power.

MNRE spokespersons stated that this project directly accelerates India’s revised National Determined Contributions (NDCs) under the Paris Agreement, targeting 500 GW of non-fossil installed electric capacity ahead of the 2030 timeline.

The installation also incorporates bird-diverter technology across overhead transmission lines to protect the endangered Great Indian Bustard (GIB) habitats, complying with Supreme Court conservation directives.`,
    category: 'Environment & Climate',
    subcategory: 'Renewable Energy',
    region: 'india',
    tags: ['Solar Energy', 'Rajasthan', 'MNRE', 'COP30', 'BESS', 'Green Grid', 'Great Indian Bustard'],
    publisher: 'Ministry of New & Renewable Energy / Central Electricity Authority',
    publisherUrl: 'https://mnre.gov.in',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=MNRE-THAR-SOLAR-2026',
    imageUrl: '/src/assets/images/thar_solar_energy_1792217571328.jpg',
    publishedAt: '2026-10-13T09:15:00+05:30',
    updatedAt: '2026-10-13T14:40:00+05:30',
    ingestedAt: '2026-10-13T09:16:33+05:30',
    priority: 'important',
    readingTimeMinutes: 4,
    whyItMatters: 'Demonstrates technological viability of utility-scale renewable baseload with storage, reducing reliance on thermal coal during peak evening demand hours.',
    keyFacts: [
      'Synchronized capacity: 10 Gigawatts of combined solar photovoltaic and wind capacity.',
      'Co-located Battery Storage: 2,400 MWh capacity for peak-load shifting.',
      'HVDC link operates at 765kV with transmission line loss under 3.5%.',
      'Incorporates wildlife-friendly underground cabling in priority GIB sanctuaries.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'SSC', 'General Awareness'],
      paperMapping: 'UPSC GS Paper III: Conservation, Environmental Pollution and Degradation, Infrastructure: Energy',
      potentialQuestion: 'Examine the technological challenges of integrating large-scale variable renewable energy into the national grid. How do Battery Energy Storage Systems (BESS) address grid resilience?',
      staticGkConnection: 'Bhadla Solar Park in Phalodi, Rajasthan was previously the largest single-site solar park. National Solar Mission was initiated under the National Action Plan on Climate Change (NAPCC) in 2010.',
      keyTerms: ['Round-The-Clock (RTC) Renewable', 'BESS', 'HVDC Transmission', 'Duck Curve', 'Great Indian Bustard Habitat']
    },
    verified: true,
    status: 'official_release',
    sourcesCount: 5,
    viewsCount: 29800,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'थार मेगा सौर-पवन हाइब्रिड पार्क: 10GW स्वच्छ ऊर्जा राष्ट्रीय ग्रिड से जुड़ी',
    hindiSubtitle: 'एकीकृत बैटरी भंडारण (BESS) ने पश्चिमी राजस्थान से 24x7 हरित ऊर्जा की निरंतर आपूर्ति सुनिश्चित की।',
    hindiSummary: 'नवीन और नवीकरणीय ऊर्जा मंत्रालय (MNRE) ने थार हाइब्रिड ऊर्जा पार्क के तीसरे चरण के सफल ग्रिड सिंक्रोनाइज़ेशन की घोषणा की है। 2,400 MWh बैटरी स्टोरेज के साथ यह दुनिया का सबसे बड़ा एकीकृत स्वच्छ ऊर्जा परिसर बन गया है।',
    hindiWhyItMatters: 'शाम के पीक ऑवर्स में कोयला आधारित बिजली पर निर्भरता कम होगी और भारत 2030 तक 500 GW गैर-जीवाश्म बिजली क्षमता के लक्ष्य को तेजी से हासिल करेगा।',
    hindiKeyFacts: [
      '10 गीगावाट सौर फोटोवोल्टिक और पवन ऊर्जा क्षमता सक्रिय।',
      '2,400 MWh क्षमता की अत्याधुनिक लिथियम-आयरन-फॉस्फेट बैटरी स्टोरेज प्रणाली।',
      'ग्रेट इंडियन बस्टर्ड (गोडावण) के संरक्षण के लिए भूमिगत केबल और बर्ड-डायवर्टर स्थापित।',
      '765kV HVDC ट्रांसमिशन लाइन से ट्रांसमिशन हानि 3.5% से भी कम।'
    ]
  },

  // 9. ARTICLE: RBI Monetary Policy Review
  {
    id: 'pb-2026-rbi-monetary-policy-review',
    slug: 'rbi-mpc-maintains-repo-rate-economic-outlook',
    title: 'RBI Monetary Policy Committee Keeps Repo Rate at 6.50% Amid Resilient Domestic Growth',
    subtitle: 'Central bank raises FY27 GDP projection to 7.4% while preserving disinflationary stance against food price shocks.',
    summary: 'The Reserve Bank of India’s Monetary Policy Committee (MPC) voted unanimously to keep the policy benchmark repo rate unchanged at 6.50%, highlighting strong capital expenditure momentum and robust banking balance sheets.',
    content: `The Monetary Policy Committee of the Reserve Bank of India concluded its bi-monthly deliberations today, resolving to maintain the policy repo rate at 6.50% while sustaining a stance focused on withdrawal of accommodation to align inflation durability with the 4.0% headline target.

Governor Shaktikanta Das announced that the real GDP growth projection for the ongoing fiscal year has been revised upward to 7.4%, buoyed by double-digit expansion in manufacturing indices, high-frequency services exports, and robust agricultural output.

The headline Consumer Price Index (CPI) inflation was projected at 4.2% for the year, with core inflation remaining comfortably anchored at 3.3%. However, the MPC cautioned that recurring geopolitical volatility in international maritime freight routes and uneven monsoon precipitation require vigilant liquidity management.

The Governor also unveiled new regulatory guidelines expanding Unified Payments Interface (UPI) credit lines to non-resident Indian bank accounts and introducing AI-driven fraud mitigation standards across scheduled commercial banks.`,
    category: 'Economy & Finance',
    subcategory: 'Banking & Monetary Policy',
    region: 'india',
    tags: ['RBI', 'MPC', 'Repo Rate', 'Inflation', 'GDP Growth', 'Banking', 'UPI'],
    publisher: 'Reserve Bank of India Monetary Policy Statement',
    publisherUrl: 'https://rbi.org.in',
    sourceUrl: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=MPC-OCT-2026',
    imageUrl: '/src/assets/images/india_semiconductor_fab_1792217569953.jpg',
    publishedAt: '2026-10-12T11:45:00+05:30',
    updatedAt: '2026-10-12T16:10:00+05:30',
    ingestedAt: '2026-10-12T11:46:18+05:30',
    priority: 'important',
    readingTimeMinutes: 5,
    whyItMatters: 'Directly dictates borrowing costs for businesses and home mortgages across the country while signaling macroeconomic stability to global institutional investors.',
    keyFacts: [
      'Policy Repo Rate maintained at 6.50% by unanimous vote.',
      'Real GDP growth forecast for the fiscal year upgraded to 7.4%.',
      'Headline CPI inflation forecasted at 4.2%; Core inflation at 3.3%.',
      'UPI offline credit line interoperability widened to tier-3 rural cooperatives.'
    ],
    examRelevance: {
      exams: ['Banking', 'UPSC', 'SSC', 'State PCS'],
      paperMapping: 'UPSC GS Paper III: Indian Economy and Issues Relating to Planning, Mobilization of Resources, Growth, Development and Employment',
      potentialQuestion: 'Explain the composition, voting procedure, and mandate of the RBI Monetary Policy Committee under the amended RBI Act, 1934.',
      staticGkConnection: 'MPC statutory framework constituted under Section 45ZB of the amended RBI Act, 1934 in 2016. Six members: 3 from RBI (including Governor with casting vote) and 3 external experts appointed by Central Government.',
      keyTerms: ['Repo Rate', 'Monetary Transmission', 'Withdrawal of Accommodation', 'Core Inflation vs Headline Inflation', 'Section 45ZB']
    },
    verified: true,
    status: 'confirmed',
    sourcesCount: 9,
    viewsCount: 26400,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'आरबीआई मौद्रिक नीति समिति ने रेपो रेट 6.50% पर बरकरार रखा: जीडीपी वृद्धि अनुमान बढ़कर 7.4%',
    hindiSubtitle: 'मजबूत विनिर्माण और घरेलू मांग के बीच केंद्रीय बैंक ने मुद्रास्फीति पर सतर्क रुख बनाए रखा।',
    hindiSummary: 'भारतीय रिजर्व बैंक की मौद्रिक नीति समिति (MPC) ने सर्वसम्मति से नीतिगत रेपो दर को 6.50% पर अपरिवर्तित रखने का निर्णय लिया है। चालू वित्त वर्ष के लिए वास्तविक जीडीपी वृद्धि अनुमान को बढ़ाकर 7.4% कर दिया गया है।',
    hindiWhyItMatters: 'घर, वाहन और व्यापारिक ऋणों की ईएमआई स्थिर रहेगी और भारतीय अर्थव्यवस्था की मजबूत वृहद-आर्थिक बुनियाद रेखांकित होती है।',
    hindiKeyFacts: [
      'रेपो दर 6.50% पर स्थिर; रुख \'विड्रॉल ऑफ एकोमोडेशन\' बना रहेगा।',
      'वित्त वर्ष के लिए जीडीपी विकास दर का अनुमान बढ़ाकर 7.4% किया गया।',
      'खुदरा मुद्रास्फीति (CPI) 4.2% और कोर मुद्रास्फीति 3.3% पर अनुमानित।',
      'ग्रामीण सहकारी बैंकों में यूपीआई क्रेडिट लाइन का दायरा बढ़ाया गया।'
    ]
  },

  // 10. ARTICLE: IMEC Corridor Diplomacy
  {
    id: 'pb-2026-imec-corridor-diplomacy-talks',
    slug: 'india-middle-east-europe-corridor-operational-charter',
    title: 'IMEC Ministerial Conclave Ratifies Unified Digital Customs and Rail-Port Interoperability Charter',
    subtitle: 'Signatory nations finalize standardized multimodal logistics protocols connecting Arabian Gulf ports to Mumbai and Mundra.',
    summary: 'Senior delegations from India, the United Arab Emirates, Saudi Arabia, the European Union, and the United States met to establish unified customs tariffs, digital port clearances, and green hydrogen bunkering protocols along the India-Middle East-Europe Economic Corridor.',
    content: `High-level delegations representing member nations of the India-Middle East-Europe Economic Corridor (IMEC) concluded a three-day ministerial conclave today, formalizing the operational charter for cross-continental trade infrastructure.

The agreement establishes a seamless "single-window" digital customs declaration protocol connecting the Jawaharlal Nehru Port (JNPT) and Mundra Port in India with Jebel Ali in the UAE and Haifa in the Mediterranean. By integrating blockchain-verified shipping manifests and standardized container clearance, transit latency for Indian exports bound for European markets will decrease by up to 40% compared to traditional Suez Canal maritime routing.

The charter also outlines joint financing commitments for laying subsea high-bandwidth fiber optic telecommunications cables and a dedicated green hydrogen pipeline parallel to the rail interconnectivity segments.

Diplomatic observers regard the operationalization of IMEC as an indispensable geoeconomic pillar promoting alternative supply-chain resilience and enhancing multilateral cooperation across West Asia.`,
    category: 'International Relations',
    subcategory: 'Geopolitics & Trade',
    region: 'world',
    tags: ['IMEC', 'Diplomacy', 'Trade Corridor', 'JNPT', 'Middle East', 'European Union', 'Logistics'],
    publisher: 'Ministry of External Affairs / Reuters Diplomatic Wire',
    publisherUrl: 'https://mea.gov.in',
    sourceUrl: 'https://mea.gov.in/press-releases.htm?dtl/38902/IMEC-Charter-2026',
    imageUrl: '/src/assets/images/supreme_court_india_1792217571586.jpg',
    publishedAt: '2026-10-11T16:00:00+05:30',
    updatedAt: '2026-10-11T19:30:00+05:30',
    ingestedAt: '2026-10-11T16:03:00+05:30',
    priority: 'trending',
    readingTimeMinutes: 5,
    whyItMatters: 'Reduces Indian export transit time to Europe by 40%, bypassing volatile maritime chokepoints and unlocking multi-billion dollar trade avenues.',
    keyFacts: [
      'Corridor comprises Eastern corridor connecting India to Arabian Gulf and Northern corridor connecting Gulf to Europe.',
      'Standardized digital customs clearance reduces port dwell time from 72 hours to under 6 hours.',
      'Includes parallel transmission infrastructure: electricity grid cables, green hydrogen pipelines, and high-speed data cables.',
      'Key participating hubs: Mundra, JNPT, Fujairah, Jebel Ali, Haifa, Piraeus.'
    ],
    examRelevance: {
      exams: ['UPSC', 'State PCS', 'Banking'],
      paperMapping: 'UPSC GS Paper II: Bilateral, Regional and Global Groupings and Agreements Involving India and/or Affecting India’s Interests',
      potentialQuestion: 'Analyze the strategic, geopolitical, and economic ramifications of the India-Middle East-Europe Economic Corridor (IMEC) for Indian foreign policy.',
      staticGkConnection: 'IMEC was originally announced on the sidelines of the G20 New Delhi Leaders’ Summit in September 2023. Key straits involved: Strait of Hormuz, Bab-el-Mandeb, Suez Canal.',
      keyTerms: ['IMEC', 'Multimodal Logistics', 'Suez Route Disruption', 'Strategic Chokepoint', 'Trade Transit Parity']
    },
    verified: true,
    status: 'confirmed',
    sourcesCount: 8,
    viewsCount: 33700,
    isLiveUpdate: false,
    language: 'bilingual',
    hindiTitle: 'आईएमईसी मंत्रिस्तरीय सम्मेलन: एकीकृत डिजिटल सीमा शुल्क और रेल-पोर्ट कनेक्टिविटी चार्टर पर हस्ताक्षर',
    hindiSubtitle: 'भारत, यूएई, सऊदी अरब, यूरोपीय संघ और अमेरिका ने भारत-मध्य पूर्व-यूरोप आर्थिक गलियारे की रूपरेखा तय की।',
    hindiSummary: 'आईएमईसी (IMEC) सदस्य देशों ने तीन दिवसीय मंत्रिस्तरीय सम्मेलन के बाद ऐतिहासिक परिचालन चार्टर को अंतिम रूप दिया है। इससे यूरोप के लिए भारतीय निर्यात का पारगमन समय स्वेज नहर मार्ग की तुलना में 40% तक घट जाएगा।',
    hindiWhyItMatters: 'सामरिक समुद्री चोकपॉइंट्स के विकल्प के रूप में भारत को वैश्विक व्यापार मार्ग के केंद्र में स्थापित करेगा।',
    hindiKeyFacts: [
      'पूर्वी गलियारा (भारत से अरब की खाड़ी) और उत्तरी गलियारा (खाड़ी से यूरोप) शामिल।',
      'डिजिटल सिंगल-विंडो सीमा शुल्क से पोर्ट क्लीयरेंस समय 72 घंटे से घटकर 6 घंटे से कम होगा।',
      'समानांतर हरित हाइड्रोजन पाइपलाइन और सबसी हाई-स्पीड डेटा केबल बिछाने का समझौता।'
    ]
  }
];

export const BRIEFING_ITEMS: BriefingItem[] = [
  {
    id: 'b-1',
    title: 'Gaganyaan-1 Uncrewed Mission: Cryogenic CE-20 Stage Cleared for Flight',
    category: 'Science & Space',
    summary: 'ISRO completes flight certification for human-rated rocket at Sriharikota, setting up orbital module test.',
    sourceUrl: 'https://isro.gov.in',
    publisher: 'ISRO / PIB',
    publishedAt: '2026-10-16T14:30:00+05:30',
    region: 'india',
    badge: 'Verified Lead'
  },
  {
    id: 'b-2',
    title: 'Major Ports Dock Strike: Conciliation Proceedings Active at Shram Shakti Bhawan',
    category: 'Protests & Movements',
    summary: 'Tripartite committee considers 10.5% wage fitment; port essential freight safeguarded.',
    sourceUrl: 'https://pib.gov.in',
    publisher: 'Ministry of Ports / PIB',
    publishedAt: '2026-10-16T12:00:00+05:30',
    region: 'india',
    badge: 'Active Movement'
  },
  {
    id: 'b-3',
    title: 'Dholera Fab Pilot Run: 28nm Semiconductor Wafers Commence Production',
    category: 'AI & Technology',
    summary: 'India Semiconductor Mission commissions first domestic 300mm commercial wafer facility in Gujarat.',
    sourceUrl: 'https://meity.gov.in',
    publisher: 'MeitY',
    publishedAt: '2026-10-15T11:00:00+05:30',
    region: 'india',
    badge: 'National Milestone'
  },
  {
    id: 'b-4',
    title: 'Supreme Court 9-Judge Bench: State Legislatures Hold Mineral Cess Powers',
    category: 'Parliament & Judiciary',
    summary: 'Landmark 8:1 constitutional verdict affirms state tax jurisdiction under Seventh Schedule Entry 50.',
    sourceUrl: 'https://main.sci.gov.in',
    publisher: 'Supreme Court of India',
    publishedAt: '2026-10-14T10:30:00+05:30',
    region: 'india',
    badge: 'Constitutional Verdict'
  },
  {
    id: 'b-5',
    title: 'Ladakh Sixth Schedule Peace Assembly: Joint Charter Presented to MHA',
    category: 'Protests & Movements',
    summary: 'Leh Apex Body and KDA rally concludes peacefully; formal statehood dialogue scheduled in New Delhi.',
    sourceUrl: 'https://thehindu.com',
    publisher: 'The Hindu',
    publishedAt: '2026-10-15T10:15:00+05:30',
    region: 'india',
    badge: 'Civic Assembly'
  },
  {
    id: 'b-6',
    title: 'Thar Desert Renewable Hybrid Park: 10GW Synchronized to National Grid',
    category: 'Environment & Climate',
    summary: 'Integrated solar-wind-BESS complex powers round-the-clock green energy corridor.',
    sourceUrl: 'https://mnre.gov.in',
    publisher: 'MNRE / POWERGRID',
    publishedAt: '2026-10-13T09:15:00+05:30',
    region: 'india',
    badge: 'Clean Energy'
  }
];

export const PRACTICE_QUIZ_QUESTIONS: PracticeQuizQuestion[] = [
  {
    id: 'q-1',
    articleId: 'pb-2026-protest-port-workers-strike',
    articleTitle: 'Major Ports Dock Strike & Labour Conciliation',
    exam: 'UPSC',
    question: 'With reference to the right to strike and dispute settlement under Indian Law, consider the following statements:\n1. The right to strike is a Fundamental Right guaranteed under Article 19(1)(c) of the Constitution.\n2. Under Section 22 of the Industrial Disputes Act, 1947, employees in public utility services must give at least 14 days notice before striking.\n3. The Major Port Authorities Act, 2021 empowers the Central Government to invoke emergency dispute settlement powers.\nWhich of the statements given above are correct?',
    options: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    correctIndex: 1,
    explanation: 'Statements 2 and 3 are correct. The Supreme Court (All India Bank Employees Association case and T.K. Rangarajan case) affirmed that the right to strike is a statutory/legal right subject to regulatory limits, NOT a fundamental right under Article 19(1)(c). Section 22 of the Industrial Disputes Act mandates minimum 14-day advance notice for public utilities.',
    staticTopic: 'Fundamental Rights & Labour Codes (Polity & Governance)'
  },
  {
    id: 'q-2',
    articleId: 'pb-2026-protest-ladakh-sixth-schedule',
    articleTitle: 'Ladakh Sixth Schedule Assembly',
    exam: 'UPSC',
    question: 'Which of the following constitutional provisions empowers the creation of Autonomous District Councils (ADCs) with delegated legislative and judicial powers?',
    options: [
      'Fifth Schedule under Article 244(1)',
      'Sixth Schedule under Article 244(2) and 275(1)',
      'Article 371A of the Constitution',
      'Article 239AA of the Constitution'
    ],
    correctIndex: 1,
    explanation: 'The Sixth Schedule under Article 244(2) and 275(1) provides for the administration of tribal areas through Autonomous District Councils (ADCs) and Regional Councils, currently operational in Assam, Meghalaya, Tripura, and Mizoram.',
    staticTopic: 'Fifth & Sixth Schedules (Indian Polity)'
  },
  {
    id: 'q-3',
    articleId: 'pb-2026-supreme-court-federalism-ruling',
    articleTitle: 'Supreme Court 9-Judge Constitution Bench Federalism Verdict',
    exam: 'State PCS',
    question: 'Under the Seventh Schedule of the Constitution of India, in which List is "Taxes on mineral rights subject to any limitations imposed by Parliament by law relating to mineral development" enumerated?',
    options: [
      'Union List (List I, Entry 54)',
      'State List (List II, Entry 50)',
      'Concurrent List (List III, Entry 23)',
      'Residuary Powers under Article 248'
    ],
    correctIndex: 1,
    explanation: 'Entry 50 of List II (State List) provides for taxes on mineral rights subject to any limitations imposed by Parliament by law. The 9-Judge Supreme Court bench confirmed that royalties are statutory charges and not taxes.',
    staticTopic: 'Seventh Schedule & Fiscal Federalism (Polity)'
  },
  {
    id: 'q-4',
    articleId: 'pb-2026-isro-gaganyaan-orbital',
    articleTitle: 'ISRO Gaganyaan Orbital Test Flight',
    exam: 'SSC',
    question: 'Which half-humanoid female robot has been engineered by ISRO to fly aboard the uncrewed Gaganyaan orbital module flights?',
    options: [
      'Mitra',
      'Vyommitra',
      'Rashmi',
      'Manav'
    ],
    correctIndex: 1,
    explanation: 'Vyommitra (Sanskrit: \'Vyoma\' space + \'Mitra\' friend) is the half-humanoid robotics payload designed by ISRO to simulate human vital functions and monitor environmental control parameters in the crew module.',
    staticTopic: 'Indian Space Technology & ISRO Missions (Static GK)'
  },
  {
    id: 'q-5',
    articleId: 'pb-2026-rbi-monetary-policy-review',
    articleTitle: 'RBI Monetary Policy Committee Review',
    exam: 'Banking',
    question: 'Under Section 45ZB of the Reserve Bank of India Act, 1934, how many total members constitute the Monetary Policy Committee (MPC)?',
    options: [
      '5 members',
      '6 members',
      '7 members',
      '9 members'
    ],
    correctIndex: 1,
    explanation: 'The MPC consists of exactly six members: three internal members from the RBI (including the Governor, Deputy Governor in charge of monetary policy, and one RBI official) and three external members appointed by the Central Government.',
    staticTopic: 'Monetary Policy Framework & RBI Structure (Economics)'
  }
];
