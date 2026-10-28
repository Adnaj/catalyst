// Course catalogue used by the course-details page (/courses/:slug).
// NOTE: ratings, student counts, lesson lists, instructor names etc. are PLACEHOLDER
// content — replace with real data. Add a course here and it gets its own page.
//
// Per-course overrides for the info box:
//   type: "Diploma"
//   admissionStart: "2026-11-15"   (ISO format YYYY-MM-DD)

const lessonsFor = (topic) => [
  { title: `Welcome & course roadmap`, duration: "4:20", preview: true },
  { title: `${topic}: core concepts`, duration: "12:10" },
  { title: `${topic}: guided practice`, duration: "15:30" },
  { title: `Module quiz`, duration: "8:00" },
];

const make = (c) => ({
  rating: "4.8",
  ratingCount: "1K+",
  students: "1.2k",
  level: "Beginner to Advanced",
  mode: "Online / Offline",
  type: "Certificate",
  admissionStart: "2026-10-31",
  instructor: {
    name: "Catalyst Faculty",
    role: "Industry Expert & Mentor",
    image: "/assets/images/instructor/instructor-8.webp",
    bio: "Our trainers are working professionals who combine years of industry experience with a practical, project-first teaching style.",
  },
  image: "/assets/images/course/course-img-4.webp",
  requirements: [
    "A computer or laptop with a stable internet connection",
    "No prior experience required — we start from the basics",
    "Willingness to practise through hands-on assignments",
  ],
  audience: [
    "Students and fresh graduates starting their careers",
    "Working professionals who want to upskill or switch fields",
    "Anyone looking for job-ready, certified training",
  ],
  faqs: [
    {
      q: "Who can join this course?",
      a: "Anyone with an interest in the subject can join. The course starts from fundamentals and builds up step by step.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes. You receive a course completion certificate from Catalyst SkillHub after finishing the programme and assessments.",
    },
    {
      q: "Do you offer placement support?",
      a: "We provide career guidance, resume preparation and interview training. Please contact us for details on current placement assistance.",
    },
    {
      q: "Are classes live or recorded?",
      a: "Online batches are delivered through live sessions with recordings available for revision. Contact us for the latest batch timings.",
    },
  ],
  ...c,
  modules: c.modules.map((m) => ({ title: m, lessons: lessonsFor(m) })),
});

export const courses = [
  // ---------- Accounting ----------
  make({
    slug: "gcc-accounting",
    title: "GCC Accounting",
    featured:true,
    category: "Accounting",
    duration: "3 Months",
    mode: "Online / Offline",
    lessons: 40,
    image:'/assets/images/course/allcourses/GCC-ACCOUNTING.png',
    certificate:'/assets/images/certificate/CAT-Certificate.webp',
    tools: [
      "Tally Prime",
      "Zoho Books",
      "QuickBooks",
      "Advanced Excel",
      "Power BI",
      "SAP S/4HANA FICO"
    ],
    jobRoles: [
      "GCC Accountant",
      "Accounts Executive",
      "Finance Executive",
      "Tax & VAT Accountant",
      "Payroll Executive",
      "Audit Assistant",
      "SAP Finance Professional"
    ],
    listingDescription: "Learn GCC Accounting with a strong foundation in accounting principles, IFRS, GCC VAT, corporate tax, and compliance. Build accounting software and financial analysis skills for accounting and finance roles across GCC countries.",
    summary: "Learn GCC Accounting with practical training in IFRS, GCC VAT, Corporate tax, audit, and compliance. Gain the knowledge and practical skills needed to pursue accounting and finance career opportunities in GCC Countries.",
    goals: [
      "Maintain books of accounts to GCC standards",
      "Handle VAT filing and compliance",
      "Prepare financial statements and reports",
      "Use accounting software confidently",
      "Understand payroll and WPS basics",
      "Reconcile bank and ledger accounts",
    ],
    skills: ["Bookkeeping", "VAT", "Tally", "Financial Statements", "Payroll", "Reconciliation"],
    description: [
      "This programme prepares you for accounting roles in the GCC job market. You will learn the full accounting cycle and how it applies to businesses operating under VAT regimes.",
      "Practical assignments mirror real company workflows so you graduate with job-ready skills.",
    ],
    modules: ["Accounting Fundamentals", "Ledgers & Trial Balance", "VAT & Compliance", "Accounting Software", "Financial Reporting"],
  }),
  make({
    slug: "business-accounting",
    title: "Business Accounting",
    category: "Accounting",
    duration: "3 Months",
    mode: "Online / Offline",
    lessons: 36,
    image: '/assets/images/course/allcourses/BUSINESS-ACCOUNTING.png',
    certificate:'/assets/images/certificate/CAT-Certificate.webp',
    tools: [
      "Tally Prime",
      "Zoho Books",
      "QuickBooks",
      "Advanced Excel",
      "Power BI",
      "SAP S/4HANA FICO"
    ],
    jobRoles: [
      "Accountant",
      "Accounts Executive",
      "Finance Executive",
      "Tax Assistant",
      "Payroll Executive",
      "Accounts Assistant",
      "Audit Assistant"
    ],
    listingDescription: "Build practical accounting skills in accounting principles, GST, taxation, financial reporting, and business finance. Learn to manage day-to-day accounts using industry-relevant accounting tools and develop skills for accounting and finance roles.",

    summary: "A complete foundation in business accounting, taxation basics and Tally for small and mid-sized organisations.",
    goals: [
      "Record day-to-day business transactions",
      "Prepare final accounts and balance sheets",
      "Understand GST and basic taxation",
      "Work with Tally and Excel",
      "Analyse financial statements",
      "Manage inventory and cost records",
    ],
    skills: ["Accounting", "GST", "Tally", "Excel", "Taxation", "Costing"],
    description: [
      "Designed for aspiring accountants and business owners, this course covers the principles and practice of business accounting from scratch.",
      "You will work through realistic case studies and finish with a practical capstone.",
    ],
    modules: ["Principles of Accounting", "Final Accounts", "GST & Taxation", "Tally Practice", "Excel for Accountants"],
  }),
  make({
    slug: "sap-accounting",
    title: "SAP Accounting",
    featured:true,
    category: "Accounting",
    duration: "2 Months",
    mode: "Online / Offline",
    certificate:'/assets/images/certificate/CAT-Certificate.webp',
    lessons: 30,
    image: '/assets/images/course/allcourses/SAP-ACCOUNTING.png',
    tools: [
      "SAP S/4HANA FICO",
      "Tally Prime",
      "Advanced Excel",
      "Power BI",
      "Zoho Books",
      "QuickBooks"
    ],
    jobRoles: [
      "SAP FICO Consultant",
      "SAP Finance Executive",
      "SAP Accounting Executive",
      "Accounts Executive",
      "Finance Executive",
      "Financial Reporting Executive",
      "Accounts Assistant"
    ],
    listingDescription: "Build practical accounting and finance skills in financial accounting, business processes, taxation, compliance, and financial reporting. Learn SAP S/4HANA FICO alongside industry-relevant accounting and analytics tools to prepare for accounting and finance roles.",

    summary: "Get hands-on with SAP FICO modules used by large enterprises for finance and controlling.",
    level: "Intermediate",
    goals: [
      "Navigate the SAP interface with confidence",
      "Configure and use General Ledger",
      "Process accounts payable and receivable",
      "Handle asset accounting",
      "Run financial reports in SAP",
      "Understand controlling fundamentals",
    ],
    skills: ["SAP FICO", "General Ledger", "AP / AR", "Asset Accounting", "Reporting"],
    description: [
      "This course introduces the SAP finance modules through practical, scenario-based training.",
      "By the end you will be able to execute core finance processes in an SAP environment.",
    ],
    modules: ["SAP Navigation", "General Ledger", "Accounts Payable & Receivable", "Asset Accounting", "Financial Reports"],
  }),
  make({
    slug: "certified-indian-foreign-accounting",
    title: "Certified Indian & Foreign Accounting",
    category: "Accounting",
    duration: "4 Months",
    mode: "Online / Offline",
    certificate:'/assets/images/certificate/CAT-Certificate.webp',
    image: '/assets/images/course/allcourses/INDIAN-AND-FOREIGN-ACCOUNTING.png',
    lessons: 48,
    summary: "Build practical accounting skills for indian and international business environments with the CIFA Course. Learn SAP FICO, Tally Prime, taxation, financial reporting, and industry-relevant accounting tools through flexible online and offline training.",
    level: "Intermediate",
    tools: [
      "Tally Prime",
      "Zoho Books",
      "QuickBooks",
      "Advanced Excel",
      "Power BI",
      "SAP S/4HANA FICO"
    ],
    jobRoles: [
      "Accountant",
      "Accounts Executive",
      "Finance Executive",
      "Taxation Executive",
      "Payroll Executive",
      "Audit Assistant",
      "Financial Reporting Executive",
      "Bookkeeping Executive"
    ],
    listingDescription: "Develop practical skills in Indian and international accounting, taxation, GST, financial reporting, and compliance. Learn industry-relevant accounting software and strengthen your capabilities for accounting and finance opportunities in India and abroad.",
    goals: [
      "Apply Indian accounting standards and GST",
      "Understand international accounting practices",
      "Prepare multi-currency records",
      "Handle statutory compliance",
      "Use industry accounting software",
      "Earn a recognised course certificate",
    ],
    skills: ["Indian Accounting", "International Accounting", "GST", "Compliance", "Tally", "Reporting"],
    description: [
      "Build a versatile skill set that works for Indian firms and overseas employers alike.",
      "Training combines theory, software practice and assessments.",
    ],
    modules: ["Indian Accounting Standards", "GST & Taxation", "International Practices", "Multi-currency Accounting", "Compliance & Reporting"],
  }),

  // ---------- Tech ----------
  make({
    slug: "python-full-stack-devops",
    title: "Python Full-Stack with DevOps",
    category: "Tech",
    duration: "6 Months",
    mode: "Online / Offline",
    image: '/assets/images/course/allcourses/PYTHON-FULL-STACK.png', 
    lessons: 90,
    listingDescription: "Learn to build complete web applications using Python, front-end technologies, databases, and backend development. Gain practical experience in deployment, automation, and DevOps practices.",
    summary: "Become a job-ready full-stack developer: Python, Django, React, databases and modern DevOps practices.",
    level: "Beginner to Advanced",
    tools: ["Python", "HTML, CSS & JavaScript", "Django / Flask", "SQL & Database Management", "Git & GitHub", "Docker & Kubernetes", "Linux & CI/CD Tools"],
    jobRoles: ["Python Developer", "Full-stack Developer", "Backend Developer", "Web Application Developer", "DevOps Engineer", "Software Developer"],
    goals: [
      "Write clean Python and build REST APIs",
      "Create responsive front-ends with React",
      "Design and query SQL databases",
      "Use Git, Docker and CI/CD pipelines",
      "Deploy applications to the cloud",
      "Build a portfolio of real projects",
    ],
    skills: ["Python", "Django", "React", "SQL", "Git", "Docker", "CI/CD", "AWS"],
    description: [
      "This end-to-end programme takes you from programming basics to deploying production applications.",
      "You will build several projects and learn the DevOps workflow used by modern engineering teams.",
    ],
    modules: ["Python Programming", "Django & REST APIs", "React Front-end", "Databases", "Docker & CI/CD", "Cloud Deployment"],
  }),
  make({
    slug: "data-analytics-gen-ai",
    title: "Data Analytics with Gen AI",
    category: "Tech",
    duration: "5 Months",
    mode: "Online / Offline",
    image: '/assets/images/course/allcourses/DATA-ANALYTICS.png',
    lessons: 70,
    summary: "Master data analysis with Excel, SQL, Python and Power BI — supercharged with generative AI tools.",
    tools: ["Microsoft Excel", "SQL", "Python for Data Analysis", "Power BI", "Tableau", "Generative AI Tools", "Data Visualisation & Reporting Tools"],
    jobRoles: ["Data Analyst", "Business Intelligence Analyst", "Junior Business Analyst", "Reporting Analyst", "MIS Analyst", "Data Visualisation Analyst"],
    listingDescription: "Learn to analyse data, identify business trends, and create meaningful reports using data analytics tools and generative AI. Develop practical skills in data preparation, visualisation, dashboard creation, and data-driven decision-making.",
    goals: [
      "Clean and analyse data with Excel and SQL",
      "Use Python (Pandas) for analytics",
      "Build dashboards in Power BI",
      "Apply statistics to business problems",
      "Use Gen AI to speed up analysis",
      "Present insights with clear storytelling",
    ],
    skills: ["Excel", "SQL", "Python", "Pandas", "Power BI", "Statistics", "Gen AI"],
    description: [
      "Learn the complete data analytics workflow, from raw data to decision-ready dashboards.",
      "Generative AI tools are integrated throughout so you work the way modern analysts do.",
    ],
    modules: ["Excel & Data Cleaning", "SQL for Analysts", "Python for Data", "Power BI Dashboards", "Gen AI for Analytics"],
  }),
  make({
    slug: "cyber-security",
    title: "Cyber Security",
    mode: "Online / Offline",
    category: "Tech",
    image: '/assets/images/course/allcourses/CYBER-SECURITY.png',
    duration: "5 Months",
    lessons: 64,
    summary: "Learn to defend systems and networks: ethical hacking, network security and incident response.",
    level: "Intermediate",
    listingDescription: "Learn the fundamentals of cyber security, network security, threat detection, and vulnerability assessment. Develop practical skills to identify security risks, understand cyber threats, and support the protection of systems, networks, and digital information.",
    goals: [
      "Understand networking and security fundamentals",
      "Perform vulnerability assessments",
      "Practise ethical hacking in safe labs",
      "Secure web applications and servers",
      "Respond to security incidents",
      "Prepare for industry certifications",
    ],
    tools: ["Linux", "Networking Tools", "Wireshark", "Nmap", "Burp Suite", "SIEM Tools"],
    jobRoles: ["Cybersecurity Analyst", "SOC Analyst", "Information Security Analyst", "Vulnerability Assessment Analyst", "Network Security Associate", "Security Operations Associate"],
    skills: ["Networking", "Ethical Hacking", "Linux", "Penetration Testing", "SIEM", "Incident Response"],
    description: [
      "A practical, lab-driven introduction to modern cyber security.",
      "You will learn how attacks work and, more importantly, how to detect and stop them.",
    ],
    modules: ["Networking Basics", "Linux & Security Tools", "Ethical Hacking", "Web Application Security", "Incident Response"],
  }),

  // ---------- Marketing & Management ----------
  make({
    slug: "digital-marketing",
    thumb: "/assets/images/course/course-img-3.webp",
    featured:true,
    brochure: "#", // replace with brochure PDF link
    listingDescription: "Master Search Engine Optimization (SEO), AEO, GEO, Social Media Marketing, Content Marketing, Web Designing, Google Ads, and Performance Marketing. Learn from expert mentors, master industry-leading tools, work on live projects, and drive real-world impact.",
    tools: ["Google Analytics", "Google Search Console", "Tag Manager", "Meta Business Suite", "Meta Ads Manager"],
    jobRoles: ["Digital Marketing Executive", "SEO Strategist", "Social Media Manager"],
    mode: "Online / Offline",
    certificate:'/assets/images/certificate/digital-marketing.webp',
    image: '/assets/images/course/allcourses/DIGITAL-MARKETING.png',
    title: "Digital Marketing",
    category: "Marketing & Management",
    duration: "3 Months",
    lessons: 45,
    summary: "SEO, social media, paid ads, email and analytics — everything you need to run digital campaigns.",
    goals: [
      "Plan and execute digital marketing strategy",
      "Rank websites with SEO",
      "Run Google and Meta ad campaigns",
      "Grow audiences on social media",
      "Create email marketing funnels",
      "Measure results with analytics",
    ],
    skills: ["SEO", "Google Ads", "Meta Ads", "Social Media", "Email Marketing", "Analytics"],
    description: [
      "Learn to build and optimise campaigns across every major digital channel.",
      "Live projects let you practise with real tools and budgets.",
    ],
    modules: ["Digital Marketing Foundations", "SEO", "Paid Advertising", "Social Media Marketing", "Analytics & Reporting"],
  }),
  make({
    slug: "human-resource-management",
    thumb: "/assets/images/course/course-img-3.webp",
    brochure: "#", // replace with brochure PDF link
    listingDescription: "Build practical HR skills across recruitment, talent acquisition, payroll, employee relations, labour laws, performance management, HR operations, HR analytics, and HR technology. Learn from experienced professionals and apply your knowledge through practical activities and workplace-focused learning designed to prepare you for HR roles.",
    tools: ["MS Excel for HR", "HRMS & HR Software", "Payroll & Attendance Systems", "HR Analytics Tools", "AI Tools for HR"],
    jobRoles: ["HR Executive", "HR Generalist", "Talent Acquisition Executive", "Payroll Executive", "HR Recruiter", "HR Operations Executive", "HR Analyst"],
    title: "Human Resource Management",
    image: '/assets/images/course/allcourses/HUMAN-RESOURCE-MANAGEMENT.png',
    mode: "Online / Offline",
    certificate:'/assets/images/certificate/digital-marketing.webp',
    category: "Marketing & Management",
    duration: "3 Months",
    lessons: 36,
    summary: "Recruitment, payroll, employee relations and HR analytics for modern organisations.",
    goals: [
      "Manage end-to-end recruitment",
      "Understand payroll and labour compliance",
      "Handle employee engagement and relations",
      "Design performance management systems",
      "Use HR analytics and tools",
      "Build professional HR documentation",
    ],
    skills: ["Recruitment", "Payroll", "Compliance", "Performance Management", "HR Analytics"],
    description: [
      "This course covers the core functions of HR with practical templates and case studies.",
      "It is ideal for aspiring HR professionals and managers.",
    ],
    modules: ["HR Fundamentals", "Recruitment & Onboarding", "Payroll & Compliance", "Performance Management", "HR Analytics"],
  }),
  make({
    slug: "office-administration",
    thumb: "/assets/images/course/course-img-3.webp",
    certificate:'/assets/images/certificate/digital-marketing.webp',
    brochure: "#", // replace with brochure PDF link
    listingDescription: "Build practical skills to manage office operations, documentation, communication, scheduling, coordination, MS Office, records, and day-to-day administrative workflows. Learn from experienced professionals and develop the organisational, technical, and workspace skills needed to work confidently in a modern office environment.",
    tools: ["MS Word", "MS Excel", "MS PowerPoint", "Google Workspace", "Office & Documentation Tools", "AI Tools for Office Productivity"],
    jobRoles: ["Office Administrator", "Administrative Executive", "Office Coordinator", "Administrative Assistant", "Front Office Executive", "Operations Assistant", "Executive Assistant"],
    mode: "Online / Offline",
    title: "Office Administration",
    category: "Marketing & Management",
    image: '/assets/images/course/allcourses/OFFICE-ADMINISTRATION.png',
    duration: "2 Months",
    lessons: 28,
    summary: "Practical office skills: MS Office, business communication, documentation and workplace management.",
    level: "Beginner",
    goals: [
      "Work fluently with MS Word, Excel and PowerPoint",
      "Write professional emails and reports",
      "Manage records and documentation",
      "Handle scheduling and front-office tasks",
      "Improve workplace communication",
      "Use basic office accounting tools",
    ],
    skills: ["MS Office", "Communication", "Documentation", "Scheduling", "Typing"],
    description: [
      "Gain the everyday skills every employer expects from an administrative professional.",
      "The course is hands-on and suitable for complete beginners.",
    ],
    modules: ["MS Word & PowerPoint", "Excel Essentials", "Business Communication", "Records & Documentation", "Front-office Management"],
  }),
];

export const getCourse = (slug) => courses.find((c) => c.slug === slug);
export const courseByTitle = (title) => courses.find((c) => c.title === title);
export const coursePath = (slug) => `/courses/${slug}`;

// ---- category helpers (used by /category/:categorySlug) ----
export const coursesByCategory = (categoryLabel) =>
  courses.filter((c) => c.category === categoryLabel);