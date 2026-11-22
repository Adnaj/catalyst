// COURSE DETAIL PAGE CONTENT - one place for every course page.
//
// Structure:   mode  ->  category  ->  course (slug)
//
//   courseDetailContent.online.accounting["gcc-accounting"]    -> /courses/gcc-accounting
//   courseDetailContent.offline.accounting["gcc-accounting"]   -> /offline-courses/gcc-accounting
//
// 10 online + 10 offline = 20 separate entries. Each one is its own full copy, so you can
// change the offline text of a course without touching its online text (and the other way round).
// Offline currently starts as a copy of the matching online course.
//
// Category keys = slugs in data/categories.js. Course keys = slugs in data/courses.js.
// To add a course: copy one entry into the right category of BOTH `online` and `offline`.
// A course with no entry falls back to the generic content from data/courses.js.

// Learning options section (PDF Section 5: Join Online / Learn From Campus).
// Same card design for every course, only the course name changes. The buttons open the
// enroll popup. Pass overrides to change any line for one course, e.g.
//   learningOptions("SAP Accounting", { online: { description: "..." } })
const learningOptions = (name = "", o = {}) => ({
  eyebrow: "Learning Path",
  title: ["Learn Your Way.", "Build Your Future."], // one line each (a line break is added between them)
  online: {
    label: "Learn Online",
    title: `Learn ${name} Online`.replace("Learn  ", "Learn "),
    detail: "Join Online",
    description: `Build your ${name ? name + " " : ""}skills through flexible online learning. Attend sessions remotely, learn from experienced trainers, and access recorded classes for convenient learning and revision.`,
    button: "Enrol online",
    image: "/assets/images/course/mode1.jpg",
    ...o.online,
  },
  offline: {
    label: "Learn Offline",
    title: "Start your offline Learning Journey",
    detail: "Learn From Campus",
    description: `Prefer classroom learning? Join our offline ${name ? name + " " : ""}programme for direct interaction with mentors and a collaborative learning environment at Catalyst.`,
    button: "Enrol Offline",
    image: "/assets/images/course/mode2.jpg",
    ...o.offline,
  },
});

export const courseDetailContent = {
  online: {
    // ---------------- Accounting (online) ----------------
    accounting: {
      "gcc-accounting": {
        slug: "gcc-accounting-online",
        label: "GCC Accounting + AI",
        category: "Accounting",
        duration: "3 Months",
        heading: "GCC Accounting Course | Gulf Accounting Course in Kerala",
        summary:
          "Learn GCC Accounting Course with practical training in IFRS, GCC VAT, Corporate tax, audit, and compliance. Gain the knowledge and practical skills needed to pursue accounting and finance career opportunities in GCC Countries.",
        type: "Certification",

        overviewTitle: "GCC Accounting Course Overview",
        overview:
          "GCC Accounting course equips you with practical accounting and finance skills relevant to Gulf accounting practices. Learn IFRS, GCC VAT, UAE and Saudi corporate tax, audit, and financial reporting, along with industry-relevant software such as SAP S/4HANA FI & CO, Tally, Zoho Books, and QuickBooks. Build a strong foundation in accounting, taxation, and financial reporting for professional growth in the GCC.",
        gain: [
          "Practical Accounting & Financial Reporting",
          "IFRS & International Accounting Standards",
          "GCC VAT & Corporate Taxation",
          "Industry-relevant accounting software",
          "Expert-led training",
          "Assessments to track your progress",
          "Discussion & doubt-clearing support",
        ],

        learn: [
          {
            title: "Accounting Fundamentals",
            text: "Build a strong foundation in accounting principles, financial statements, reconciliation, depreciation, cash flow, fund flow, and ratio analysis. Learn key accounting functions including payroll, inventory, sales and asset accounting.",
          },
          {
            title: "IFRS & International Financial Reporting",
            text: "Develop an understanding of key IFRS and IAS standards covering leases, revenue recognition, inventories, financial statements, employee benefits, financial instruments, foreign currency transactions, consolidations, and business combinations.",
          },
          {
            title: "GCC VAT & Taxation",
            text: "Understand the GCC VAT process, including tax invoices, input VAT recovery, and VAT return filing. Learn key concepts related to GCC Corporate tax, tax types, filing requirements, penalties, and interest.",
          },
          {
            title: "UAE & Saudi Corporate Tax",
            text: "Learn the fundamentals of corporate tax requirements applicable in the UAE and Saudi Arabia, with an understanding of relevant tax rules and compliance requirements.",
          },
          {
            title: "Audit & Compliance",
            text: "Learn the fundamentals of internal auditing, audit documentation, supporting documents, reconciliations, internal control, and audit preparation.",
          },
          {
            title: "Financial Analysis & Reporting",
            text: "Develop your ability to work with financial information through reconciliation, financial statements, cash flow analysis, ratio analysis, and reporting.",
          },
          {
            title: "Accounting Software & Data Analytics",
            text: "Build practical skills using accounting, ERP, and reporting tools to manage financial information, accounting processes, and business data.",
          },
        ],

        skills: [
          "Financial accounting and reporting",
          "Account reconciliation and financial analysis",
          "IFRS and IAS application",
          "GCC VAT and corporate tax fundamentals",
          "Audit documentation and internal controls",
          "Accounting software and ERP Operations",
          "Excel-based analysis and Power BI Reporting",
        ],
        tools: ["Tally Prime", "Zoho Books", "QuickBooks", "Advanced Excel", "Power BI", "SAP S/4HANA FICO"],
        careers: [
          "GCC Accountant",
          "Accounts Executive",
          "Finance Executive",
          "Tax & VAT Accountant",
          "Payroll Executive",
          "Audit Assistant",
          "SAP Finance Professional",
        ],

        eligibilityTitle: "GCC Accounting Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the GCC Accounting course." },
          { label: "Commerce Background", text: "Suitable for students and graduates with a background in commerce or accounting." },
          { label: "Freshers & Beginners", text: "Beginners interested in building accounting and finance skills." },
          { label: "Working Professionals", text: "Accountants and finance professionals looking to upgrade their skills." },
        ],

        certificateTitle: "GCC Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/GCC-Accounting.webp',

        learningOptions: learningOptions("GCC Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Practical Accounting training", text: "Strengthen your understanding through accounting exercises, financial statements, reconciliations, taxation, and audit-related activities." },
          { icon: "Globe", title: "GCC-Focused Learning", text: "Gain knowledge of IFRS, GCC VAT, Corporate tax, and compliance areas relevant to accounting and finance opportunities in GCC Countries." },
          { icon: "Wrench", title: "Learn with advanced tools", text: "Develop hands-on skills with TallyPrime, Zoho Books, QuickBooks, advanced Excel, Power BI, and SAP S/4HANA FICO." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Develop relevant accounting, software, and analytical skills that can strengthen your CV and support your career goals." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on suitable career paths, required skills, and opportunities across accounting, finance, taxation, and related roles." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for accounting and finance opportunities through interview preparation, job readiness support, and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },

      "business-accounting": {
        slug: "business-accounting-online",
        label: "Business Accounting + AI",
        category: "Accounting",
    duration: "3 Months",
        heading: "Business Accounting Course in Kerala",
        summary:
          "Master Accounting, GST and Taxation, Payroll, reconciliation, financial reporting, audit, advanced Excel, ERP, and modern accounting software through a structured professional programme.",
        type: "Certification",

        overviewTitle: "Business Accounting Course Overview",
        overview:
          "Build Practical Skills in accounting, taxation, financial reporting, and accounting software. Learn essential accounting concepts, GST, Payroll, bank reconciliation, Advanced Excel, and business accounting tools such as Tally Prime, Zoho Books, and QuickBooks. Develop the knowledge and software skills needed for accounting and finance roles across businesses.",
        gain: [
          "Practical Accounting skills",
          "Financial Reporting & Reconciliation",
          "GST, TDS & Tax Accounting",
          "Accounting software training",
          "Doubt clearing & Support sessions",
          "Career-focused skill training",
        ],

        learn: [
          { title: "Fundamentals of Accounting", text: "Build a strong foundation in accounting principles, account types, debits and credits, journal entries, ledger posting, trial balance, and error rectification." },
          { title: "Financial Statements", text: "Learn how to prepare and understand the trading account, profit & loss account, balance sheet, and cash flow statement, along with financial statement and ratio analysis." },
          { title: "Business Transaction", text: "Understand the accounting treatment of sales, purchases, returns, credit and debit notes, discounts, expenses, income, petty cash, accounts payable (AP) and accounts receivable (AR)." },
          { title: "Bank & Cash Management", text: "Learn to manage cash and banking transactions through cash books, payment and receipt entries, cheque management, bank reconciliation, and cash flow management." },
          { title: "Taxation & GST", text: "Understanding GST fundamentals, CGST, SGST, IGST, input tax credit, GST invoicing and returns, along with TDS concepts and practical tax accounting entries." },
          { title: "Payroll Accounting", text: "Learn payroll accounting fundamentals, including salary structure, salary entries, deductions, employee advances, leave & attendance basics, and payroll reconciliation." },
          { title: "Advanced Excel for Accountants", text: "Develop accounting-focused Excel skills using formulas, lookup functions, Pivot tables, data validation, conditional formatting, MIS reporting, and reconciliation techniques." },
          { title: "Accounting Software Practical Training", text: "Gain practical exposure to Tally Prime, Zoho Books, QuickBooks for company setup, ledger management, sales and purchase entries, GST, inventory, bank reconciliation and financial reporting." },
          { title: "ERP Fundamentals", text: "Understand how accounting operates within ERP systems through SAP finance basics, general ledger, Accounts Payable, Accounts Receivable, Purchase to pay, order to cash and ERP Reporting." },
          { title: "Audit & Compliance", text: "Learn the fundamentals of internal audit, audit documentation, supporting records, reconciliation, internal controls, and audit preparation for accounting and compliance processes." },
        ],

        skills: [
          "Accounting & Bookkeeping",
          "Financial Reporting",
          "Bank Reconciliation",
          "Tax Compliance",
          "Payroll Processing",
          "Accounting Software Proficiency",
          "Excel & MIS Reporting",
          "ERP Operations",
          "Audit Documentation",
        ],
        tools: ["Tally Prime", "Zoho Books", "QuickBooks", "Advanced Excel", "Power BI", "SAP CO", "SAP MM", "ERP"],
        careers: [
          "Accounts Executive",
          "Junior Accountant",
          "Finance Executive",
          "Payroll Executive",
          "MIS Executive",
          "Audit Assistant",
          "Bookkeeping Executive",
        ],

        eligibilityTitle: "Business Accounting Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders." },
          { label: "Commerce Background", text: "Basic understanding of commerce or accounting is helpful." },
          { label: "Beginners", text: "Suitable for those starting their accounting journey." },
          { label: "Working Professionals", text: "Relevant for professionals looking to strengthen their accounting and software skills." },
        ],

        certificateTitle: "Business Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Business Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Practical Accounting training", text: "Develop practical accounting knowledge through financial transactions, financial statements, bank reconciliation, taxation, payroll, audit, and compliance-related activities." },
          { icon: "Wrench", title: "Learn industry-relevant tools", text: "Gain practical exposure to Tally Prime, Zoho Books, QuickBooks, Advanced Excel, Power BI, and SAP FI/CO & MM for modern accounting and finance operations." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Build a broader understanding of business accounting by learning GST, TDS, Payroll accounting, financial reporting, reconciliation, audit documentation, and internal controls." },
          { icon: "Network", title: "Understand Modern ERP Workflows", text: "Get introduced to how accounting functions operate within ERP environments, including general ledger, accounts payable, accounts receivable, purchase-to-pay, and order-to-cash processes." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on suitable career paths, required skills, and opportunities across accounting, finance, taxation, payroll, audit, MIS, and ERP Operations." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for employment opportunities through interview preparation, job readiness support and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },

      "sap-accounting": {
        slug: "sap-accounting-online",
        label: "SAP Accounting + AI",
        featured:true,
        category: "Accounting",
        duration: "2 Months",
        heading: "SAP Accounting Course in Kerala",
        summary:
          "Build Practical accounting and finance skills for today's evolving financial industry. Learn accounting fundamentals, taxation, financial reporting, compliance, analytics, ERP, and SAP FICO S/4HANA through a structured programme designed to connect accounting knowledge with modern financial technology.",
        type: "Certification",

        overviewTitle: "SAP Accounting Course Overview",
        overview:
          "The SAP Accounting course in Kerala at Catalyst Skillhub helps you develop practical skills in accounting, financial reporting, taxation, and SAP S/4HANA FICO. Learn core accounting concepts and work with tools such as Tally Prime, Zoho Books, QuickBooks, advanced Excel, and Power BI. The Programme connects accounting knowledge with ERP workflows and financial analytics to prepare you for accounting and finance roles across different industries.",
        gain: [
          "Practical accounting & Finance Training",
          "SAP S/4HANA FICO skills",
          "Hands-on accounting software practice",
          "Advanced Excel & Power BI Training",
        ],

        learn: [
          { title: "Accounting Fundamentals", text: "Build a strong foundation in accounting principles, Reconciliation, depreciation, financial statements, cash flow & fund flow statements, Ratio analysis, Payroll accounting, Store & inventory accounting, Sales and Asset accounting." },
          { title: "Business Laws & Corporate Compliance", text: "Understand key workplace and corporate compliance requirements, including ESI, PF, gratuity, minimum wages, and other employment-related statutory regulations." },
          { title: "Taxation and GST", text: "Develop practical knowledge of direct and indirect taxation, including income tax returns, TDS, advance tax, tax rates, heads of income, GST, GST filing, penalties, and interest." },
          { title: "GCC Taxation", text: "Understand the fundamentals of GCC taxation, including VAT and corporate tax concepts relevant to accounting and finance operations in GCC markets." },
          { title: "Advanced Excel for Accounting & Finance", text: "Develop advanced Excel skills for financial data handling, Formulas and functions, data analysis, visualisation, Excel 365 features, and tools such as map charts." },
          { title: "AI in Accounting", text: "Understand how artificial intelligence is being applied in accounting and finance through practical use cases, live examples, AI tools, and emerging applications in financial operations." },
          { title: "Power BI & Financial Analytics", text: "Learn to import and transform financial data, build data models using DAX, create interactive reports and visualizations, perform advanced analysis, and publish Power BI Reports." },
          { title: "Zoho Books", text: "Gain practical knowledge of cloud accounting through ledger management, vendor and customer management, stock items, journals, purchases, and sales." },
          { title: "QuickBooks", text: "Gain practical accounting workflows in QuickBooks, including company setup, opening balances, ledgers, purchases, sales, payments, inventory, vendors, customers, orders, and financial reports." },
          { title: "Tally Prime", text: "Develop practical skills in Tally Prime covering company creation, accounting and inventory masters, voucher entries, Payroll, GST, TDS/TCS, financial statements, cost centres, categories, and ratio analysis." },
          { title: "SAP FICO S/4HANA", text: "Understand SAP ERP and SAP FICO workflows, including enterprise structure, financial accounting, General ledger, accounts payable, accounts receivable, banking, asset accounting, controlling, and financial reporting within SAP S/4HANA." },
        ],

        skills: [
          "Financial Accounting & Reporting",
          "Taxation & Statutory Compliance",
          "SAP S/4HANA FICO Operations",
          "Accounting Software Proficiency",
          "Advanced Excel for Finance",
          "Power BI & Financial Analytics",
          "AI Applications in Accounting",
          "Business & Payroll Compliance",
          "Financial Data Management",
        ],
        tools: ["Tally Prime", "Advanced Excel & Excel 365", "Power BI", "SAP FICO – S/4HANA", "Zoho Books", "QuickBooks", "AI Tools for Accounting"],
        careers: [
          "Accountant",
          "Accounts Executive",
          "Taxation Executive",
          "Payroll Executive",
          "Accounts Payable Executive",
          "Accounts Receivable Executive",
          "MIS Executive",
          "Finance Executive",
          "ERP/SAP Finance Executive",
          "Junior Financial Analyst",
          "Bookkeeping Executive",
          "Accounting & Finance Operations Executive",
        ],

        eligibilityTitle: "SAP Accounting Course Eligibility",
        eligibility: [
          { label: "Students & Graduates", text: "Suitable for commerce, accounting, finance, and business graduates." },
          { label: "Accounting Beginners", text: "Ideal for those who want to build a foundation in accounting before learning SAP." },
          { label: "Accounting Professionals", text: "Relevant for accountants and finance executives looking to develop SAP and ERP skills." },
          { label: "Working Professionals", text: "Suitable for professionals who want to expand their knowledge of financial systems and accounting software." },
        ],

        certificateTitle: "SAP Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/SAP.webp',

        learningOptions: learningOptions("SAP Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Master Accounting & Finance", text: "Learn accounting from the fundamentals through taxation, compliance, financial reporting, analytics, ERP, and SAP FICO S/4HANA in one structured programme." },
          { icon: "Wrench", title: "Practical Software Training", text: "Gain Hands-on experience with Tally Prime, Advanced Excel, Power BI, Zoho Books, QuickBooks, and SAP FICO S/4HANA through practical accounting workflows." },
          { icon: "Sparkles", title: "Learn Modern Financial Technology", text: "Go beyond traditional accounting with Power BI, AI applications in accounting, data analysis, and digital accounting platforms used in modern finance operations." },
          { icon: "Network", title: "SAP FICO & ERP Exposure", text: "Understand how finance functions within an ERP Environment, including General ledger, Accounts payable, Accounts Receivable, Asset accounting, Banking and controlling." },
          { icon: "Layers", title: "Practical Learning", text: "Apply accounting concepts and software skills through practical knowledge of accounting, finance, taxation, and relevant software applications." },
          { icon: "UsersRound", title: "Learn from experienced Trainers", text: "Learn through structured guidance from trainers with practical knowledge of accounting, finance, taxation, and relevant software applications." },
          { icon: "Compass", title: "Career Guidance", text: "Get Guidance on career paths, resume development, interview preparation, and the skills expected for accounting, finance, taxation, and relevant software applications." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Receive career support and placement assistance to help connect your accounting and finance skills with relevant job opportunities." },
        ],
      },

      "certified-indian-foreign-accounting": {
        slug: "certified-indian-foreign-accounting-online",
        label: "Certified Indian & Foreign Accounting + AI",
        category: "Accounting",
    duration: "4 Months",
        heading: "Certified Indian and Foreign Accounting Course",
        summary:
          "Build practical accounting skills for Indian and international business environments with the CIFA Course. Learn SAP FICO, Tally Prime, taxation, financial reporting, and industry-relevant accounting tools through flexible online and offline training.",
        type: "Certification",
        duration: "4 Months",

        overviewTitle: "Course Overview",
        overview:
          "The Certified (Indian & Foreign Accounting) Course helps you develop practical accounting and financial management skills for Indian and international business environments. Learn accounting fundamentals, SAP FICO, Tally Prime, Zoho Books, taxation, financial reporting, and accounting compliance through flexible online or offline training.",
        gain: [
          "Comprehensive Accounting training",
          "Accounting Software skills",
          "Practical taxation training",
          "Financial reporting skills",
          "AI in accounting",
          "Career preparation",
          "Flexible learning options",
        ],

        learn: [
          { title: "Introduction to SAP & ERP", text: "Understand SAP, ERP Fundamentals, SAP installation, Server access, and SAP Learning Hub Business Edition." },
          { title: "Enterprise Structure & Financial Accounting", text: "Learn enterprise structure configuration and the basic settings required for financial accounting in SAP." },
          { title: "General Ledger Accounting", text: "Understand general ledger accounting and G/L transactions, Ledger balances, and financial statement versions, including balance sheets." },
          { title: "Accounts Payable & Receivable", text: "Learn business partner management, accounts payable and receivable, Partial payments, payment returns, and advanced payments." },
          { title: "Taxation & Accounting Transactions", text: "Understand input and output taxes on sales and purchases and their application in financial accounting." },
          { title: "Asset Accounting & Controlling", text: "Learn asset accounting and basic settings of controlling within SAP." },
          { title: "Banking & Check Management", text: "Explore house banking, check management, and related banking functions in SAP." },
        ],

        skills: [
          "Accounting & Bookkeeping",
          "Financial Reporting & Analysis",
          "Tax Filing & Compliance",
          "Financial Data Management",
          "Data Visualization & Reporting",
          "AI-Assisted Accounting",
          "Business Communications",
        ],
        tools: ["Tally Prime", "SAP FICO", "Zoho Books", "QuickBooks", "Microsoft Excel (Advanced)", "Microsoft Word", "Microsoft PowerPoint", "Power BI"],
        careers: [
          "Accountant",
          "Junior Accountant",
          "Accounts Executive",
          "Taxation Assistant",
          "Accounts Payable/Receivable Executive",
          "Payroll Executive",
          "GST and Tax Compliance Executive",
          "Financial Reporting Assistant",
          "Freelance Accountant",
          "Accounting Consultant",
        ],

        certificateTitle: "Certified Indian and Foreign Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Certified Indian and Foreign Accounting", {
          online: {
            title: "Become Certified Indian and Foreign Accountant Online",
            description:
              "Join live online sessions from anywhere through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Flexible Learning options", text: "Choose online or Offline Classes based on your Learning preferences." },
          { icon: "Calculator", title: "Comprehensive accounting Curriculum", text: "Build Knowledge across financial accounting, reporting, taxation, payroll, banking, and business compliance." },
          { icon: "Compass", title: "Career Preparation", text: "Develop professional communication, resume preparation, and interview skills alongside your accounting training." },
          { icon: "Wrench", title: "Learn with advanced tools", text: "Develop hands-on skills with TallyPrime, Zoho Books, QuickBooks, advanced Excel, Power BI, and SAP FICO." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for accounting and finance opportunities through interview preparation, job readiness support, and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },
    },

    // ---------------- Tech (online) ----------------
    tech: {
      "python-full-stack-devops": {
        slug: "https://www.catalysttech.in/course/python-full-stack-development-with-devops",
        label: "Python Full-Stack with DevOps + AI",
        category: "Tech",
    duration: "6 Months",
        heading: "Python Full-Stack with DevOps Course in Kerala",
        summary:
          "Learn to build complete web applications with Python, front-end technologies, databases and backend development, and gain practical experience in deployment, automation and DevOps workflows.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "Python Full-Stack with DevOps Course Overview",
        overview:
          "The Python Full-Stack with DevOps course takes you from programming basics to building and deploying complete web applications. Learn Python, front-end development, databases, APIs and backend frameworks, then use Git, Docker, CI/CD and cloud deployment the way modern engineering teams do.",
        gain: [
          "Practical Python programming skills",
          "Front-end and backend web development",
          "Database design and SQL",
          "REST API development",
          "DevOps, CI/CD and deployment skills",
          "Industry-relevant development tools",
          "Real projects for your portfolio",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Python Programming", text: "Build a strong foundation in Python syntax, data structures, functions, object-oriented programming, file handling and problem solving." },
          { title: "Front-End Development", text: "Create responsive web pages and interfaces using HTML, CSS and JavaScript, and learn the fundamentals of modern front-end development." },
          { title: "Backend with Django / Flask", text: "Develop backend applications with Django and Flask, including routing, templates, authentication, forms and application structure." },
          { title: "Databases & SQL", text: "Design relational databases, write SQL queries and connect your applications to databases using ORMs." },
          { title: "REST APIs", text: "Build, test and document REST APIs, and learn how front-end and backend applications communicate." },
          { title: "Git, GitHub & Linux", text: "Use Git and GitHub for version control and collaboration, and work confidently on the Linux command line." },
          { title: "Docker, CI/CD & Cloud Deployment", text: "Containerise applications with Docker, automate build and deployment pipelines with CI/CD tools and deploy applications to the cloud." },
        ],

        skills: [
          "Python programming",
          "Web application development",
          "REST API development",
          "SQL and database management",
          "Version control with Git and GitHub",
          "Containerisation with Docker",
          "CI/CD and deployment automation",
          "Linux fundamentals",
        ],
        tools: ["Python", "HTML, CSS & JavaScript", "Django / Flask", "SQL & Database Management", "Git & GitHub", "Docker & Kubernetes", "Linux & CI/CD Tools"],
        careers: [
          "Python Developer",
          "Full-stack Developer",
          "Backend Developer",
          "Web Application Developer",
          "DevOps Engineer",
          "Software Developer",
        ],

        eligibilityTitle: "Python Full-Stack with DevOps Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners with an interest in programming and web development. No prior coding experience required." },
          { label: "IT & Engineering Students", text: "Students and graduates who want to build job-ready development skills." },
          { label: "Working Professionals", text: "Professionals looking to move into software development or DevOps roles." },
        ],

        certificateTitle: "Python Full-Stack with DevOps Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Python Full-Stack with DevOps"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Build Real Projects", text: "Move beyond theory by building full-stack applications and working through the complete development and deployment cycle." },
          { icon: "UsersRound", title: "Industry Expert Mentors", text: "Learn from mentors with practical experience in software development and DevOps." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on experience with Python, Django, Git, Docker, Linux and CI/CD tools." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Create projects you can showcase on GitHub and in your CV." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on career paths, required skills and preparing for developer and DevOps roles." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },

      "data-analytics-gen-ai": {
        slug: "https://www.catalysttech.in/course/data-analytics-with-generative-ai",
        label: "Data Analytics with Gen AI",
        category: "Tech",
    duration: "5 Months",
        heading: "Data Analytics with Gen AI Course in Kerala",
        summary:
          "Learn to analyse data, identify business trends and build meaningful reports using Excel, SQL, Python, Power BI and generative AI tools, with practical projects across the complete analytics workflow.",
        type: "Certification",
        duration: "5 Months",

        overviewTitle: "Data Analytics with Gen AI Course Overview",
        overview:
          "The Data Analytics with Gen AI course covers the complete analytics workflow, from collecting and cleaning raw data to building decision-ready dashboards. Learn Excel, SQL, Python and Power BI, and use generative AI tools throughout to analyse faster and present insights clearly.",
        gain: [
          "Practical Data Analytics Skills",
          "Data cleaning and preparation",
          "SQL and Python for analysis",
          "Dashboard and report building",
          "Generative AI for analytics",
          "Industry-relevant analytics tools",
          "Real-world analytics projects",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Excel for Data Analysis", text: "Clean, organise and analyse data using advanced Excel functions, pivot tables, lookups and data visualisation." },
          { title: "SQL for Analysts", text: "Write SQL queries to extract, filter, join and summarise data from relational databases." },
          { title: "Python for Data Analysis", text: "Use Python with Pandas and NumPy to clean, transform and analyse datasets, and create visualisations." },
          { title: "Statistics for Business", text: "Understand descriptive statistics, distributions, correlation and hypothesis testing, and apply them to business problems." },
          { title: "Power BI & Tableau Dashboards", text: "Build interactive dashboards and reports that turn data into clear, decision-ready insights." },
          { title: "Generative AI for Analytics", text: "Use generative AI tools to speed up data exploration, query writing, analysis and reporting." },
          { title: "Data Storytelling & Reporting", text: "Present findings clearly through visual storytelling, business reports and stakeholder-ready presentations." },
        ],

        skills: [
          "Data cleaning and preparation",
          "Data analysis with Excel and SQL",
          "Python for data analysis",
          "Statistics for business problems",
          "Dashboard design and data visualisation",
          "AI-assisted analytics",
          "Business reporting and storytelling",
        ],
        tools: ["Microsoft Excel", "SQL", "Python for Data Analysis", "Power BI", "Tableau", "Generative AI Tools", "Data Visualisation & Reporting Tools"],
        careers: [
          "Data Analyst",
          "Business Intelligence Analyst",
          "Junior Business Analyst",
          "Reporting Analyst",
          "MIS Analyst",
          "Data Visualisation Analyst",
        ],

        eligibilityTitle: "Data Analytics with Gen AI Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners interested in data and analytics. No prior experience required." },
          { label: "Graduates from any stream", text: "Commerce, science, engineering and arts graduates looking to start a data career." },
          { label: "Working Professionals", text: "Professionals who want to add analytics and AI skills to their current role." },
        ],

        certificateTitle: "Data Analytics with Gen AI Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Data Analytics with Gen AI"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "ChartNoAxesCombined", title: "Real Data Projects", text: "Work with realistic datasets and business cases to build analysis and dashboard projects." },
          { icon: "Sparkles", title: "AI-Powered Analytics", text: "Learn how generative AI fits into everyday analytics work to improve speed, quality and productivity." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on skills with Excel, SQL, Python, Power BI and Tableau." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Create analytics projects and dashboards you can present in your CV and interviews." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on analytics career paths, skills to build and how to prepare for opportunities." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },

      "cyber-security": {
        slug: "https://www.catalysttech.in/course/cyber-security",
        label: "Cyber Security + AI",
        category: "Tech",
    duration: "5 Months",
        heading: "Cyber Security Course in Kerala",
        summary:
          "Learn the fundamentals of cyber security, network security, threat detection and vulnerability assessment through lab-driven training that builds practical skills to identify risks and respond to security incidents.",
        type: "Certification",
        duration: "5 Months",

        overviewTitle: "Cyber Security Course Overview",
        overview:
          "The Cyber Security course gives you a practical, lab-driven introduction to modern security. Learn how networks, systems and web applications work, how attacks happen, and, more importantly, how to detect, analyse and stop them using industry-standard tools.",
        gain: [
          "Practical Cyber Security Skills",
          "Networking and Linux fundamentals",
          "Ethical hacking in safe lab environments",
          "Vulnerability assessment skills",
          "Security monitoring and incident response",
          "Industry-relevant security tools",
          "Hands-on lab practice",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Networking Fundamentals", text: "Understand how networks work, including protocols, IP addressing, ports, firewalls and common network services." },
          { title: "Linux & Security Tools", text: "Work confidently on Linux and get hands-on with the command-line tools used in security work." },
          { title: "Security Fundamentals", text: "Learn core security concepts such as the CIA triad, threats, vulnerabilities, risk, authentication and access control." },
          { title: "Vulnerability Assessment", text: "Scan systems and networks, identify weaknesses, prioritise risks and document findings." },
          { title: "Ethical Hacking & Penetration Testing", text: "Practise ethical hacking techniques in safe, controlled labs to understand how attackers think and operate." },
          { title: "Web Application Security", text: "Learn common web application vulnerabilities and how to test for and secure against them." },
          { title: "SOC, SIEM & Incident Response", text: "Monitor logs and alerts with SIEM tools, analyse security events and follow incident response procedures." },
        ],

        skills: [
          "Network and system security fundamentals",
          "Vulnerability assessment",
          "Ethical hacking and penetration testing",
          "Web application security",
          "Log analysis and security monitoring",
          "Incident response",
          "Linux for security",
        ],
        tools: ["Linux", "Networking Tools", "Wireshark", "Nmap", "Burp Suite", "SIEM Tools"],
        careers: [
          "Cybersecurity Analyst",
          "SOC Analyst",
          "Information Security Analyst",
          "Vulnerability Assessment Analyst",
          "Network Security Associate",
          "Security Operations Associate",
        ],

        eligibilityTitle: "Cyber Security Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners interested in security. We start from networking and Linux basics." },
          { label: "IT & Engineering Students", text: "Students and graduates looking to specialise in cyber security." },
          { label: "Working Professionals", text: "IT professionals who want to move into security roles." },
        ],

        certificateTitle: "Cyber Security Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Cyber Security"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Network", title: "Lab-Driven Training", text: "Practise attack and defence techniques in safe lab environments instead of only reading theory." },
          { icon: "UsersRound", title: "Industry Expert Mentors", text: "Learn from mentors with practical experience in security and networking." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on skills with Wireshark, Nmap, Burp Suite and SIEM tools." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Develop practical security skills and documented lab work that strengthen your CV." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on security career paths, relevant certifications and skills to build." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },
    },

    // ---------------- Marketing & Management (online) ----------------
    "marketing-management": {
      "digital-marketing": {
        slug: "digital-marketing-online",
        label: "Digital Marketing + AI",
        category: "Marketing & Management",
    duration: "3 Months",
    featured:true,
        heading: "Digital Marketing Course in Kerala",
        summary:
          "Learn digital marketing through practical training in SEO, Social media marketing, Google Ads, Content marketing, Email marketing, and analytics. Develop practical skills in digital marketing tools and AI-assisted workflows to understand how campaigns are planned, managed, and improved.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "Digital Marketing Course Overview",
        overview:
          "The Digital Marketing course at Catalyst SkillHub helps you develop skills to plan, execute, and analyse digital marketing, email marketing, and website analytics, along with modern AI-powered marketing techniques. Gain knowledge of industry-relevant tools and strategies to understand how businesses build online visibility, reach target audiences, and measure marketing performance.",
        gain: [
          "Practical Digital Marketing Skills",
          "SEO and AI Search Optimization",
          "Social Media & Content Marketing",
          "Paid advertising skills",
          "Industry-relevant marketing tools",
          "AI-Assisted Marketing Workflows",
          "Analytics & Performance Reporting",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Digital Marketing Fundamentals", text: "Understand the foundations of digital marketing, customer journeys, marketing funnels, audience research, and digital marketing strategy." },
          { title: "Web Design Fundamentals", text: "Learn how to create and optimize marketing-focused websites and landing pages that support traffic generation and conversions." },
          { title: "Content Marketing", text: "Learn to plan, create, and distribute engaging content across digital channels, using content strategy, SEO principles, copywriting, and AI-powered tools to attract an audience and support business goals." },
          { title: "SEO, AEO, GEO & Google Business Profile", text: "Master modern search engine optimization across traditional search engines, AI-powered search, local search, and Google Business Profile to improve visibility and attract a relevant audience." },
          { title: "Social Media Marketing", text: "Develop strategies for social media platforms, content planning, audience engagement, brand building, and social media growth." },
          { title: "Google Ads & Performance Marketing", text: "Learn to plan, launch, manage, and optimise campaigns using Google Ads and performance marketing strategies, with a focus on audience targeting, conversion tracking, budget optimization, and analytics." },
          { title: "Email & WhatsApp Automation", text: "Learn to create automated email and WhatsApp workflows for lead nurturing, follow-ups, customer engagement, personalised communication, and conversions." },
        ],

        skills: [
          "Search Engine Optimization (SEO)",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimization (GEO)",
          "Social Media Marketing",
          "Google Ads and Performance Marketing",
          "Content Marketing",
          "Web Analytics & Tracking",
          "Local SEO & Google Business Profile",
          "AI-powered Digital Marketing",
        ],
        tools: [
          "WordPress", "Elementor", "Hostinger", "Ubersuggest", "Semrush", "Mailchimp", "Zapier",
          "Google Analytics", "Google Search Console", "Google Tag Manager", "Notion", "Shopify",
          "Canva", "Gemini", "ChatGPT",
        ],
        careers: [
          "Digital Marketing Executive",
          "SEO Specialist",
          "Social Media Manager",
          "Performance Marketer",
          "Google Ads Specialist",
        ],

        certificateTitle: "Digital Marketing Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/digital-marketing.webp',

        learningOptions: learningOptions("Digital Marketing", {
          online: {
            title: "Begin your Digital Marketing Career Online",
            description:
              "Flexible online learning with expert guidance and practical AI-integrated digital marketing training and access to recorded classes for convenient learning and revision.",
          },
          offline: {
            description:
              "Gain practical AI-integrated digital marketing skills through expert-led classroom training, hands-on sessions, and mentor guidance.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Work with Real Projects", text: "Move beyond theory with practical tasks, projects, campaign planning, execution, and performance analysis." },
          { icon: "ChartNoAxesCombined", title: "Live Projects", text: "Work on practical marketing campaigns and gain experience with real-world client requirements, strategies, and outcomes." },
          { icon: "Sparkles", title: "AI Advanced Marketing", text: "Learn how AI can be integrated into everyday marketing workflows to improve research, content creation, campaign planning, analysis, and productivity." },
          { icon: "BriefcaseBusiness", title: "Internship & Industry Exposure", text: "Gain practical industry exposure through internship opportunities and experience working on real marketing activities." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Work on practical projects and marketing work that can be presented as part of your professional portfolio." },
          { icon: "Compass", title: "Career Guidance", text: "Get personalised guidance on career paths, skill development, and preparing for opportunities in digital marketing." },
        ],
      },

      "human-resource-management": {
        slug: "human-resource-management-online",
        label: "Human Resource Management + AI",
        category: "Marketing & Management",
    duration: "3 Months",
        heading: "HR Management Course in Kerala",
        summary:
          "Master Human Resource Management skills through industry-focused training, real-world projects, and expert guidance.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "HR Management Course Overview",
        overview:
          "The HR Management Course in Kerala equips you with practical skills in recruitment, payroll, employee management, labour laws, and HR analytics. Learn to use HRMS, MS Excel, payroll systems, and AI tools for HR, with training in Indian and UAE labour law fundamentals to prepare for human resource management roles.",
        gain: [
          "Expert-led HR Training",
          "Practical HR Learning",
          "Indian & International Certification",
          "Internship opportunity",
          "Mock interviews & Soft skills",
          "Modern HR Tools & Technology",
          "Personalised mentor guidance",
          "Career Guidance & Placement Assistance",
        ],

        learn: [
          { title: "HR Fundamentals", text: "Understand the core principles, functions, and practice of modern Human Resource Management." },
          { title: "Recruitment and Talent Acquisition", text: "Learn how to source, screen, and select the right candidates for different roles." },
          { title: "Interviewing & Selection", text: "Develop skills to plan interviews, evaluate candidates, and make effective selection decisions." },
          { title: "Employee Onboarding", text: "Learn how to manage the onboarding process and create a smooth employee experience from day one." },
          { title: "Payroll and Salary Administration", text: "Understand salary structure, payroll practices, attendance, leave, and essential payroll administration." },
          { title: "Performance Management", text: "Learn how organizations set performance goals, conduct appraisals, and support employee development." },
          { title: "Employee Relations", text: "Develop the skills to manage workplace relationships, employee engagement, and common HR situations." },
          { title: "Labour Laws & Compliance", text: "Understand key Indian labour laws, statutory requirements, and HR compliance practices." },
          { title: "HR Analytics", text: "Learn how to use HR and data analytics to generate insights and support better workforce decisions." },
          { title: "HRMS & HR Technology", text: "Gain practical exposure to HRMS platforms and technology used to manage everyday HR operations." },
          { title: "Training & Development", text: "Understand how organizations identify training needs and plan employee learning and development programmes." },
          { title: "Workplace Communication", text: "Build professional communication skills for effective interaction with employees, managers, and teams." },
          { title: "UAE Labour Law & Compliance", text: "Gain an understanding of key UAE labour regulations and compliance practices relevant to HR professionals." },
        ],

        skills: [
          "Professional decision-making",
          "Employee record management",
          "HR data handling",
          "Workplace problem-solving",
          "Professional communication",
          "Time & task management",
          "Teamwork & coordination",
        ],
        tools: ["MS Excel for HR", "HRMS & HR Software", "Payroll & Attendance Systems", "HR Analytics Tools", "AI Tools for HR"],
        careers: [
          "HR Executive",
          "HR Generalist",
          "Talent Acquisition Specialist",
          "Recruitment Executive",
          "Payroll Executive",
          "HR Operations Executive",
          "HR Analyst",
          "Training & Development Executive",
        ],

        certificateTitle: "HR Management Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("HR Management", {
          online: {
            title: "Master HR Management Online",
            description:
              "Join live online sessions from anywhere through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "GraduationCap", title: "Indian & International Certification", text: "Earn Indian and international certifications that strengthen your professional profile." },
          { icon: "UsersRound", title: "Expert-led Training", text: "Learn from expert mentors who bring industry knowledge and practical perspective into the learning experience." },
          { icon: "UserRoundCheck", title: "Personalised Mentor Guidance", text: "Receive continuous guidance and feedback to make steady progress throughout the programme." },
          { icon: "Compass", title: "Career Guidance & Support", text: "Stay connected with mentors and the learning community for guidance, support, and continued development beyond individual training sessions." },
          { icon: "BriefcaseBusiness", title: "Mock Interviews & Soft Skills", text: "Strengthen communication and interview skills to approach opportunities with greater confidence." },
          { icon: "Layers", title: "Practical & Real-world Projects", text: "Practise through real-world projects that help you understand how HR functions in the actual workspace." },
        ],
      },

      "office-administration": {
        slug: "office-administration-online",
        label: "Office Administration + AI",
        category: "Marketing & Management",
    image: '/assets/images/course/allcourses/OFFICE-ADMINISTRATION.webp',
    duration: "2 Months",
        heading: "Best Office Administration Course in Kerala with Certification",
        summary:
          "Master office administration skills, Microsoft Office Excel, documentation, communication, business support, and AI-powered productivity tools through practical, career-focused training.",
        type: "Certification",
        duration: "3 Months",

        overviewTitle: "Office Administration Course Overview",
        overview:
          "The Office Administration course in Kerala helps you develop the practical skills needed to manage everyday office operations. Learn office procedures, documentation, data entry, business communication, MS Office, Advanced Excel, HR administration, basic office accounting, and AI-powered productivity tools. The course prepares you to handle administrative tasks, maintain records, coordinate office activities, and support business operations across different industries.",
        gain: [
          "Practical Office Administration training",
          "Hands-on MS Office & Excel practice",
          "Professional Communication skills",
          "Documentation & Record management",
          "AI & Digital Productivity skills",
          "Practical Projects & Activities",
          "Mock interviews & career guidance",
          "Placement Assistance",
        ],

        learn: [
          { title: "Office Administration Fundamentals", text: "Understand office procedures, workflow, coordination, and day-to-day administrative responsibilities." },
          { title: "Office Operations & Management", text: "Learn to organise schedules, coordinate tasks, manage resources, and support smooth office operations." },
          { title: "Documentation & Record Management", text: "Learn professional document preparation, filing, data organization, and record-keeping practices." },
          { title: "Business Communication", text: "Develop professional communication skills for emails, calls, meetings, clients, and workplace interactions." },
          { title: "Data Entry & Information Management", text: "Learn accurate data handling, information organisation, and efficient administrative record management." },
          { title: "MS Office & Productivity Skills", text: "Build practical skills in Word, Excel, PowerPoint, and other essential workplace productivity applications." },
          { title: "Advanced Excel for Office Work", text: "Work with formulas, functions, data organisation, reports, and spreadsheets used in everyday office tasks." },
          { title: "Email & Digital Office Management", text: "Learn professional email communication, digital file management, online collaboration, and workplace productivity." },
          { title: "HR & Employee Administration", text: "Understand basic HR processes, including employee records, attendance, leave, onboarding, and administrative support." },
          { title: "Accounting & Office Finance Basics", text: "Gain basic knowledge of invoices, expenses, billing, financial records, and everyday office transactions." },
          { title: "Customer & Client Handling", text: "Develop professional skills for handling customer queries, calls, visitors, and client communication." },
          { title: "AI for Office Productivity", text: "Learn how AI tools can support documentation, communication, research, data handling, and everyday administrative tasks." },
        ],

        skills: [
          "Office Coordination",
          "Document Preparation",
          "Data Accuracy & Management",
          "Spreadsheet & Reporting Skills",
          "Digital Workspace Productivity",
          "Administrative Problem-solving",
          "Time & Task Management",
          "Attention to Detail",
          "AI-Assisted Task Management",
        ],
        tools: [
          "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Outlook", "Google Workspace",
          "Google Docs & Sheets", "Tally / Accounting Software", "HRMS Platforms", "AI Productivity Tools",
          "Email & Communication Tools", "Cloud Storage & File Management Tools",
        ],
        careers: [
          "Office Administrator",
          "Administrative Assistant",
          "Office Executive",
          "Administrative Executive",
          "Office Coordinator",
          "Operations Executive",
          "Executive Assistant",
          "Personal Assistant",
          "Front Office Executive",
          "Back Office Executive",
          "Admin & HR Executive",
          "Documentation Executive",
          "Data Entry Executive",
          "Customer Support Executive",
          "Office Manager",
        ],

        certificateTitle: "Office Administration Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        // certificate:'/assets/images/certificate/CAT-Certificate.webp',

        learningOptions: learningOptions("Office Administration", {
          online: {
            title: "Master Office Administration Online",
            description:
              "Join live online sessions from anywhere. Learn through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Practical Training", text: "Get practical, workplace-focused training that helps you develop technical, administrative, and professional skills." },
          { icon: "Wrench", title: "Hands-on MS Office & Documentation Skills", text: "Develop practical skills in MS Office, document preparation, spreadsheets, presentations, and professional record management." },
          { icon: "Network", title: "HR, Payroll & Compliance Exposure", text: "Gain knowledge of essential HR administration, payroll processes, and workplace compliance." },
          { icon: "GraduationCap", title: "Industry-Relevant Skill Certification", text: "Earn a certification that validates your practical skills and strengthens your professional profile." },
          { icon: "BriefcaseBusiness", title: "100% Placement Assistance", text: "Get the right career guidance, interview preparation, and placement assistance to help you pursue relevant job opportunities." },
          { icon: "Sparkles", title: "AI Productivity Skills", text: "Learn how digital platforms and AI tools can simplify documentation, communication, research, and routine administrative work." },
        ],
      },
    },
  },

  offline: {
    // ---------------- Accounting (offline) ----------------
    accounting: {
      "gcc-accounting": {
        slug: "gcc-accounting",
        label: "GCC Accounting + AI",
        category: "Accounting",
    duration: "3 Months",
        heading: "GCC Accounting Course | Gulf Accounting Course in Kerala",
        summary:
          "Learn GCC Accounting Course with practical training in IFRS, GCC VAT, Corporate tax, audit, and compliance. Gain the knowledge and practical skills needed to pursue accounting and finance career opportunities in GCC Countries.",
        type: "Certification",
        brochure: "/assets/documents/Administration-Course-brochure.pdf",
        overviewTitle: "GCC Accounting Course Overview",
        overview:
          "GCC Accounting course equips you with practical accounting and finance skills relevant to Gulf accounting practices. Learn IFRS, GCC VAT, UAE and Saudi corporate tax, audit, and financial reporting, along with industry-relevant software such as SAP S/4HANA FI & CO, Tally, Zoho Books, and QuickBooks. Build a strong foundation in accounting, taxation, and financial reporting for professional growth in the GCC.",
        gain: [
          "Practical Accounting & Financial Reporting",
          "IFRS & International Accounting Standards",
          "GCC VAT & Corporate Taxation",
          "Industry-relevant accounting software",
          "Expert-led training",
          "Assessments to track your progress",
          "Discussion & doubt-clearing support",
        ],

        learn: [
          {
            title: "Accounting Fundamentals",
            text: "Build a strong foundation in accounting principles, financial statements, reconciliation, depreciation, cash flow, fund flow, and ratio analysis. Learn key accounting functions including payroll, inventory, sales and asset accounting.",
          },
          {
            title: "IFRS & International Financial Reporting",
            text: "Develop an understanding of key IFRS and IAS standards covering leases, revenue recognition, inventories, financial statements, employee benefits, financial instruments, foreign currency transactions, consolidations, and business combinations.",
          },
          {
            title: "GCC VAT & Taxation",
            text: "Understand the GCC VAT process, including tax invoices, input VAT recovery, and VAT return filing. Learn key concepts related to GCC Corporate tax, tax types, filing requirements, penalties, and interest.",
          },
          {
            title: "UAE & Saudi Corporate Tax",
            text: "Learn the fundamentals of corporate tax requirements applicable in the UAE and Saudi Arabia, with an understanding of relevant tax rules and compliance requirements.",
          },
          {
            title: "Audit & Compliance",
            text: "Learn the fundamentals of internal auditing, audit documentation, supporting documents, reconciliations, internal control, and audit preparation.",
          },
          {
            title: "Financial Analysis & Reporting",
            text: "Develop your ability to work with financial information through reconciliation, financial statements, cash flow analysis, ratio analysis, and reporting.",
          },
          {
            title: "Accounting Software & Data Analytics",
            text: "Build practical skills using accounting, ERP, and reporting tools to manage financial information, accounting processes, and business data.",
          },
        ],

        skills: [
          "Financial accounting and reporting",
          "Account reconciliation and financial analysis",
          "IFRS and IAS application",
          "GCC VAT and corporate tax fundamentals",
          "Audit documentation and internal controls",
          "Accounting software and ERP Operations",
          "Excel-based analysis and Power BI Reporting",
        ],
        tools: ["Tally Prime", "Zoho Books", "QuickBooks", "Advanced Excel", "Power BI", "SAP S/4HANA FICO"],
        careers: [
          "GCC Accountant",
          "Accounts Executive",
          "Finance Executive",
          "Tax & VAT Accountant",
          "Payroll Executive",
          "Audit Assistant",
          "SAP Finance Professional",
        ],

        eligibilityTitle: "GCC Accounting Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the GCC Accounting course." },
          { label: "Commerce Background", text: "Suitable for students and graduates with a background in commerce or accounting." },
          { label: "Freshers & Beginners", text: "Beginners interested in building accounting and finance skills." },
          { label: "Working Professionals", text: "Accountants and finance professionals looking to upgrade their skills." },
        ],

        certificateTitle: "GCC Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/GCC-Accounting.webp',

        learningOptions: learningOptions("GCC Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Practical Accounting training", text: "Strengthen your understanding through accounting exercises, financial statements, reconciliations, taxation, and audit-related activities." },
          { icon: "Globe", title: "GCC-Focused Learning", text: "Gain knowledge of IFRS, GCC VAT, Corporate tax, and compliance areas relevant to accounting and finance opportunities in GCC Countries." },
          { icon: "Wrench", title: "Learn with advanced tools", text: "Develop hands-on skills with TallyPrime, Zoho Books, QuickBooks, advanced Excel, Power BI, and SAP S/4HANA FICO." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Develop relevant accounting, software, and analytical skills that can strengthen your CV and support your career goals." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on suitable career paths, required skills, and opportunities across accounting, finance, taxation, and related roles." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for accounting and finance opportunities through interview preparation, job readiness support, and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },

      "business-accounting": {
        slug: "business-accounting",
  label: "Business Accounting + AI",
  category: "Accounting",
    duration: "3 Months",
        heading: "Business Accounting Course in Kerala",
        summary:
          "Master Accounting, GST and Taxation, Payroll, reconciliation, financial reporting, audit, advanced Excel, ERP, and modern accounting software through a structured professional programme.",
        type: "Certification",

        overviewTitle: "Business Accounting Course Overview",
        overview:
          "Build Practical Skills in accounting, taxation, financial reporting, and accounting software. Learn essential accounting concepts, GST, Payroll, bank reconciliation, Advanced Excel, and business accounting tools such as Tally Prime, Zoho Books, and QuickBooks. Develop the knowledge and software skills needed for accounting and finance roles across businesses.",
        gain: [
          "Practical Accounting skills",
          "Financial Reporting & Reconciliation",
          "GST, TDS & Tax Accounting",
          "Accounting software training",
          "Doubt clearing & Support sessions",
          "Career-focused skill training",
        ],

        learn: [
          { title: "Fundamentals of Accounting", text: "Build a strong foundation in accounting principles, account types, debits and credits, journal entries, ledger posting, trial balance, and error rectification." },
          { title: "Financial Statements", text: "Learn how to prepare and understand the trading account, profit & loss account, balance sheet, and cash flow statement, along with financial statement and ratio analysis." },
          { title: "Business Transaction", text: "Understand the accounting treatment of sales, purchases, returns, credit and debit notes, discounts, expenses, income, petty cash, accounts payable (AP) and accounts receivable (AR)." },
          { title: "Bank & Cash Management", text: "Learn to manage cash and banking transactions through cash books, payment and receipt entries, cheque management, bank reconciliation, and cash flow management." },
          { title: "Taxation & GST", text: "Understanding GST fundamentals, CGST, SGST, IGST, input tax credit, GST invoicing and returns, along with TDS concepts and practical tax accounting entries." },
          { title: "Payroll Accounting", text: "Learn payroll accounting fundamentals, including salary structure, salary entries, deductions, employee advances, leave & attendance basics, and payroll reconciliation." },
          { title: "Advanced Excel for Accountants", text: "Develop accounting-focused Excel skills using formulas, lookup functions, Pivot tables, data validation, conditional formatting, MIS reporting, and reconciliation techniques." },
          { title: "Accounting Software Practical Training", text: "Gain practical exposure to Tally Prime, Zoho Books, QuickBooks for company setup, ledger management, sales and purchase entries, GST, inventory, bank reconciliation and financial reporting." },
          { title: "ERP Fundamentals", text: "Understand how accounting operates within ERP systems through SAP finance basics, general ledger, Accounts Payable, Accounts Receivable, Purchase to pay, order to cash and ERP Reporting." },
          { title: "Audit & Compliance", text: "Learn the fundamentals of internal audit, audit documentation, supporting records, reconciliation, internal controls, and audit preparation for accounting and compliance processes." },
        ],

        skills: [
          "Accounting & Bookkeeping",
          "Financial Reporting",
          "Bank Reconciliation",
          "Tax Compliance",
          "Payroll Processing",
          "Accounting Software Proficiency",
          "Excel & MIS Reporting",
          "ERP Operations",
          "Audit Documentation",
        ],
        tools: ["Tally Prime", "Zoho Books", "QuickBooks", "Advanced Excel", "Power BI", "SAP CO", "SAP MM", "ERP"],
        careers: [
          "Accounts Executive",
          "Junior Accountant",
          "Finance Executive",
          "Payroll Executive",
          "MIS Executive",
          "Audit Assistant",
          "Bookkeeping Executive",
        ],

        eligibilityTitle: "Business Accounting Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders." },
          { label: "Commerce Background", text: "Basic understanding of commerce or accounting is helpful." },
          { label: "Beginners", text: "Suitable for those starting their accounting journey." },
          { label: "Working Professionals", text: "Relevant for professionals looking to strengthen their accounting and software skills." },
        ],

        certificateTitle: "Business Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Business Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Practical Accounting training", text: "Develop practical accounting knowledge through financial transactions, financial statements, bank reconciliation, taxation, payroll, audit, and compliance-related activities." },
          { icon: "Wrench", title: "Learn industry-relevant tools", text: "Gain practical exposure to Tally Prime, Zoho Books, QuickBooks, Advanced Excel, Power BI, and SAP FI/CO & MM for modern accounting and finance operations." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Build a broader understanding of business accounting by learning GST, TDS, Payroll accounting, financial reporting, reconciliation, audit documentation, and internal controls." },
          { icon: "Network", title: "Understand Modern ERP Workflows", text: "Get introduced to how accounting functions operate within ERP environments, including general ledger, accounts payable, accounts receivable, purchase-to-pay, and order-to-cash processes." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on suitable career paths, required skills, and opportunities across accounting, finance, taxation, payroll, audit, MIS, and ERP Operations." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for employment opportunities through interview preparation, job readiness support and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },

      "sap-accounting": {
        slug: "sap-accounting",
  label: "SAP Accounting + AI",
  category: "Accounting",
    duration: "2 Months",
        heading: "SAP Accounting Course in Kerala",
        summary:
          "Build Practical accounting and finance skills for today's evolving financial industry. Learn accounting fundamentals, taxation, financial reporting, compliance, analytics, ERP, and SAP FICO S/4HANA through a structured programme designed to connect accounting knowledge with modern financial technology.",
        type: "Certification",

        overviewTitle: "SAP Accounting Course Overview",
        overview:
          "The SAP Accounting course in Kerala at Catalyst Skillhub helps you develop practical skills in accounting, financial reporting, taxation, and SAP S/4HANA FICO. Learn core accounting concepts and work with tools such as Tally Prime, Zoho Books, QuickBooks, advanced Excel, and Power BI. The Programme connects accounting knowledge with ERP workflows and financial analytics to prepare you for accounting and finance roles across different industries.",
        gain: [
          "Practical accounting & Finance Training",
          "SAP S/4HANA FICO skills",
          "Hands-on accounting software practice",
          "Advanced Excel & Power BI Training",
        ],

        learn: [
          { title: "Accounting Fundamentals", text: "Build a strong foundation in accounting principles, Reconciliation, depreciation, financial statements, cash flow & fund flow statements, Ratio analysis, Payroll accounting, Store & inventory accounting, Sales and Asset accounting." },
          { title: "Business Laws & Corporate Compliance", text: "Understand key workplace and corporate compliance requirements, including ESI, PF, gratuity, minimum wages, and other employment-related statutory regulations." },
          { title: "Taxation and GST", text: "Develop practical knowledge of direct and indirect taxation, including income tax returns, TDS, advance tax, tax rates, heads of income, GST, GST filing, penalties, and interest." },
          { title: "GCC Taxation", text: "Understand the fundamentals of GCC taxation, including VAT and corporate tax concepts relevant to accounting and finance operations in GCC markets." },
          { title: "Advanced Excel for Accounting & Finance", text: "Develop advanced Excel skills for financial data handling, Formulas and functions, data analysis, visualisation, Excel 365 features, and tools such as map charts." },
          { title: "AI in Accounting", text: "Understand how artificial intelligence is being applied in accounting and finance through practical use cases, live examples, AI tools, and emerging applications in financial operations." },
          { title: "Power BI & Financial Analytics", text: "Learn to import and transform financial data, build data models using DAX, create interactive reports and visualizations, perform advanced analysis, and publish Power BI Reports." },
          { title: "Zoho Books", text: "Gain practical knowledge of cloud accounting through ledger management, vendor and customer management, stock items, journals, purchases, and sales." },
          { title: "QuickBooks", text: "Gain practical accounting workflows in QuickBooks, including company setup, opening balances, ledgers, purchases, sales, payments, inventory, vendors, customers, orders, and financial reports." },
          { title: "Tally Prime", text: "Develop practical skills in Tally Prime covering company creation, accounting and inventory masters, voucher entries, Payroll, GST, TDS/TCS, financial statements, cost centres, categories, and ratio analysis." },
          { title: "SAP FICO S/4HANA", text: "Understand SAP ERP and SAP FICO workflows, including enterprise structure, financial accounting, General ledger, accounts payable, accounts receivable, banking, asset accounting, controlling, and financial reporting within SAP S/4HANA." },
        ],

        skills: [
          "Financial Accounting & Reporting",
          "Taxation & Statutory Compliance",
          "SAP S/4HANA FICO Operations",
          "Accounting Software Proficiency",
          "Advanced Excel for Finance",
          "Power BI & Financial Analytics",
          "AI Applications in Accounting",
          "Business & Payroll Compliance",
          "Financial Data Management",
        ],
        tools: ["Tally Prime", "Advanced Excel & Excel 365", "Power BI", "SAP FICO – S/4HANA", "Zoho Books", "QuickBooks", "AI Tools for Accounting"],
        careers: [
          "Accountant",
          "Accounts Executive",
          "Taxation Executive",
          "Payroll Executive",
          "Accounts Payable Executive",
          "Accounts Receivable Executive",
          "MIS Executive",
          "Finance Executive",
          "ERP/SAP Finance Executive",
          "Junior Financial Analyst",
          "Bookkeeping Executive",
          "Accounting & Finance Operations Executive",
        ],

        eligibilityTitle: "SAP Accounting Course Eligibility",
        eligibility: [
          { label: "Students & Graduates", text: "Suitable for commerce, accounting, finance, and business graduates." },
          { label: "Accounting Beginners", text: "Ideal for those who want to build a foundation in accounting before learning SAP." },
          { label: "Accounting Professionals", text: "Relevant for accountants and finance executives looking to develop SAP and ERP skills." },
          { label: "Working Professionals", text: "Suitable for professionals who want to expand their knowledge of financial systems and accounting software." },
        ],

        certificateTitle: "SAP Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/SAP.webp',

        learningOptions: learningOptions("SAP Accounting"),


        whyTitle: "Why choose Catalyst", // small label above the heading
        whySubtitle: "Choose the Right Guidance", // heading (last two words are highlighted)
        why: [
          { icon: "Calculator", title: "Master Accounting & Finance", text: "Learn accounting from the fundamentals through taxation, compliance, financial reporting, analytics, ERP, and SAP FICO S/4HANA in one structured programme." },
          { icon: "Wrench", title: "Practical Software Training", text: "Gain Hands-on experience with Tally Prime, Advanced Excel, Power BI, Zoho Books, QuickBooks, and SAP FICO S/4HANA through practical accounting workflows." },
          { icon: "Sparkles", title: "Learn Modern Financial Technology", text: "Go beyond traditional accounting with Power BI, AI applications in accounting, data analysis, and digital accounting platforms used in modern finance operations." },
          { icon: "Network", title: "SAP FICO & ERP Exposure", text: "Understand how finance functions within an ERP Environment, including General ledger, Accounts payable, Accounts Receivable, Asset accounting, Banking and controlling." },
          { icon: "Layers", title: "Practical Learning", text: "Apply accounting concepts and software skills through practical knowledge of accounting, finance, taxation, and relevant software applications." },
          { icon: "UsersRound", title: "Learn from experienced Trainers", text: "Learn through structured guidance from trainers with practical knowledge of accounting, finance, taxation, and relevant software applications." },
          { icon: "Compass", title: "Career Guidance", text: "Get Guidance on career paths, resume development, interview preparation, and the skills expected for accounting, finance, taxation, and relevant software applications." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Receive career support and placement assistance to help connect your accounting and finance skills with relevant job opportunities." },
        ],
      },

      "certified-indian-foreign-accounting": {
        slug: "certified-indian-foreign-accounting",
  label: "Certified Indian & Foreign Accounting + AI",
  category: "Accounting",
    duration: "4 Months",
        heading: "Certified Indian and Foreign Accounting Course",
        summary:
          "Build practical accounting skills for Indian and international business environments with the CIFA Course. Learn SAP FICO, Tally Prime, taxation, financial reporting, and industry-relevant accounting tools through flexible online and offline training.",
        type: "Certification",
        duration: "4 Months",

        overviewTitle: "Course Overview",
        overview:
          "The Certified (Indian & Foreign Accounting) Course helps you develop practical accounting and financial management skills for Indian and international business environments. Learn accounting fundamentals, SAP FICO, Tally Prime, Zoho Books, taxation, financial reporting, and accounting compliance through flexible online or offline training.",
        gain: [
          "Comprehensive Accounting training",
          "Accounting Software skills",
          "Practical taxation training",
          "Financial reporting skills",
          "AI in accounting",
          "Career preparation",
          "Flexible learning options",
        ],

        learn: [
          { title: "Introduction to SAP & ERP", text: "Understand SAP, ERP Fundamentals, SAP installation, Server access, and SAP Learning Hub Business Edition." },
          { title: "Enterprise Structure & Financial Accounting", text: "Learn enterprise structure configuration and the basic settings required for financial accounting in SAP." },
          { title: "General Ledger Accounting", text: "Understand general ledger accounting and G/L transactions, Ledger balances, and financial statement versions, including balance sheets." },
          { title: "Accounts Payable & Receivable", text: "Learn business partner management, accounts payable and receivable, Partial payments, payment returns, and advanced payments." },
          { title: "Taxation & Accounting Transactions", text: "Understand input and output taxes on sales and purchases and their application in financial accounting." },
          { title: "Asset Accounting & Controlling", text: "Learn asset accounting and basic settings of controlling within SAP." },
          { title: "Banking & Check Management", text: "Explore house banking, check management, and related banking functions in SAP." },
        ],

        skills: [
          "Accounting & Bookkeeping",
          "Financial Reporting & Analysis",
          "Tax Filing & Compliance",
          "Financial Data Management",
          "Data Visualization & Reporting",
          "AI-Assisted Accounting",
          "Business Communications",
        ],
        tools: ["Tally Prime", "SAP FICO", "Zoho Books", "QuickBooks", "Microsoft Excel (Advanced)", "Microsoft Word", "Microsoft PowerPoint", "Power BI"],
        careers: [
          "Accountant",
          "Junior Accountant",
          "Accounts Executive",
          "Taxation Assistant",
          "Accounts Payable/Receivable Executive",
          "Payroll Executive",
          "GST and Tax Compliance Executive",
          "Financial Reporting Assistant",
          "Freelance Accountant",
          "Accounting Consultant",
        ],

        certificateTitle: "Certified Indian and Foreign Accounting Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Certified Indian and Foreign Accounting", {
          online: {
            title: "Become Certified Indian and Foreign Accountant Online",
            description:
              "Join live online sessions from anywhere through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Flexible Learning options", text: "Choose online or Offline Classes based on your Learning preferences." },
          { icon: "Calculator", title: "Comprehensive accounting Curriculum", text: "Build Knowledge across financial accounting, reporting, taxation, payroll, banking, and business compliance." },
          { icon: "Compass", title: "Career Preparation", text: "Develop professional communication, resume preparation, and interview skills alongside your accounting training." },
          { icon: "Wrench", title: "Learn with advanced tools", text: "Develop hands-on skills with TallyPrime, Zoho Books, QuickBooks, advanced Excel, Power BI, and SAP FICO." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for accounting and finance opportunities through interview preparation, job readiness support, and professional profile development." },
          { icon: "GraduationCap", title: "Professional Skill Development", text: "Strengthen your communication, analytical, and professional skills alongside your technical accounting knowledge." },
        ],
      },
    },

    // ---------------- Tech (offline) ----------------
    tech: {
      "python-full-stack-devops": {
        slug: "https://www.catalysttech.in/course/python-full-stack-development-with-devops",
  label: "Python Full-Stack with DevOps + AI",
  category: "Tech",
    duration: "6 Months",
        heading: "Python Full-Stack with DevOps Course in Kerala",
        summary:
          "Learn to build complete web applications with Python, front-end technologies, databases and backend development, and gain practical experience in deployment, automation and DevOps workflows.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "Python Full-Stack with DevOps Course Overview",
        overview:
          "The Python Full-Stack with DevOps course takes you from programming basics to building and deploying complete web applications. Learn Python, front-end development, databases, APIs and backend frameworks, then use Git, Docker, CI/CD and cloud deployment the way modern engineering teams do.",
        gain: [
          "Practical Python programming skills",
          "Front-end and backend web development",
          "Database design and SQL",
          "REST API development",
          "DevOps, CI/CD and deployment skills",
          "Industry-relevant development tools",
          "Real projects for your portfolio",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Python Programming", text: "Build a strong foundation in Python syntax, data structures, functions, object-oriented programming, file handling and problem solving." },
          { title: "Front-End Development", text: "Create responsive web pages and interfaces using HTML, CSS and JavaScript, and learn the fundamentals of modern front-end development." },
          { title: "Backend with Django / Flask", text: "Develop backend applications with Django and Flask, including routing, templates, authentication, forms and application structure." },
          { title: "Databases & SQL", text: "Design relational databases, write SQL queries and connect your applications to databases using ORMs." },
          { title: "REST APIs", text: "Build, test and document REST APIs, and learn how front-end and backend applications communicate." },
          { title: "Git, GitHub & Linux", text: "Use Git and GitHub for version control and collaboration, and work confidently on the Linux command line." },
          { title: "Docker, CI/CD & Cloud Deployment", text: "Containerise applications with Docker, automate build and deployment pipelines with CI/CD tools and deploy applications to the cloud." },
        ],

        skills: [
          "Python programming",
          "Web application development",
          "REST API development",
          "SQL and database management",
          "Version control with Git and GitHub",
          "Containerisation with Docker",
          "CI/CD and deployment automation",
          "Linux fundamentals",
        ],
        tools: ["Python", "HTML, CSS & JavaScript", "Django / Flask", "SQL & Database Management", "Git & GitHub", "Docker & Kubernetes", "Linux & CI/CD Tools"],
        careers: [
          "Python Developer",
          "Full-stack Developer",
          "Backend Developer",
          "Web Application Developer",
          "DevOps Engineer",
          "Software Developer",
        ],

        eligibilityTitle: "Python Full-Stack with DevOps Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners with an interest in programming and web development. No prior coding experience required." },
          { label: "IT & Engineering Students", text: "Students and graduates who want to build job-ready development skills." },
          { label: "Working Professionals", text: "Professionals looking to move into software development or DevOps roles." },
        ],

        certificateTitle: "Python Full-Stack with DevOps Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Python Full-Stack with DevOps"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Build Real Projects", text: "Move beyond theory by building full-stack applications and working through the complete development and deployment cycle." },
          { icon: "UsersRound", title: "Industry Expert Mentors", text: "Learn from mentors with practical experience in software development and DevOps." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on experience with Python, Django, Git, Docker, Linux and CI/CD tools." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Create projects you can showcase on GitHub and in your CV." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on career paths, required skills and preparing for developer and DevOps roles." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },

      "data-analytics-gen-ai": {
        slug: "https://www.catalysttech.in/course/data-analytics-with-generative-ai",
  label: "Data Analytics with Gen AI",
  category: "Tech",
    duration: "5 Months",
        heading: "Data Analytics with Gen AI Course in Kerala",
        summary:
          "Learn to analyse data, identify business trends and build meaningful reports using Excel, SQL, Python, Power BI and generative AI tools, with practical projects across the complete analytics workflow.",
        type: "Certification",
        duration: "5 Months",

        overviewTitle: "Data Analytics with Gen AI Course Overview",
        overview:
          "The Data Analytics with Gen AI course covers the complete analytics workflow, from collecting and cleaning raw data to building decision-ready dashboards. Learn Excel, SQL, Python and Power BI, and use generative AI tools throughout to analyse faster and present insights clearly.",
        gain: [
          "Practical Data Analytics Skills",
          "Data cleaning and preparation",
          "SQL and Python for analysis",
          "Dashboard and report building",
          "Generative AI for analytics",
          "Industry-relevant analytics tools",
          "Real-world analytics projects",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Excel for Data Analysis", text: "Clean, organise and analyse data using advanced Excel functions, pivot tables, lookups and data visualisation." },
          { title: "SQL for Analysts", text: "Write SQL queries to extract, filter, join and summarise data from relational databases." },
          { title: "Python for Data Analysis", text: "Use Python with Pandas and NumPy to clean, transform and analyse datasets, and create visualisations." },
          { title: "Statistics for Business", text: "Understand descriptive statistics, distributions, correlation and hypothesis testing, and apply them to business problems." },
          { title: "Power BI & Tableau Dashboards", text: "Build interactive dashboards and reports that turn data into clear, decision-ready insights." },
          { title: "Generative AI for Analytics", text: "Use generative AI tools to speed up data exploration, query writing, analysis and reporting." },
          { title: "Data Storytelling & Reporting", text: "Present findings clearly through visual storytelling, business reports and stakeholder-ready presentations." },
        ],

        skills: [
          "Data cleaning and preparation",
          "Data analysis with Excel and SQL",
          "Python for data analysis",
          "Statistics for business problems",
          "Dashboard design and data visualisation",
          "AI-assisted analytics",
          "Business reporting and storytelling",
        ],
        tools: ["Microsoft Excel", "SQL", "Python for Data Analysis", "Power BI", "Tableau", "Generative AI Tools", "Data Visualisation & Reporting Tools"],
        careers: [
          "Data Analyst",
          "Business Intelligence Analyst",
          "Junior Business Analyst",
          "Reporting Analyst",
          "MIS Analyst",
          "Data Visualisation Analyst",
        ],

        eligibilityTitle: "Data Analytics with Gen AI Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners interested in data and analytics. No prior experience required." },
          { label: "Graduates from any stream", text: "Commerce, science, engineering and arts graduates looking to start a data career." },
          { label: "Working Professionals", text: "Professionals who want to add analytics and AI skills to their current role." },
        ],

        certificateTitle: "Data Analytics with Gen AI Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Data Analytics with Gen AI"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "ChartNoAxesCombined", title: "Real Data Projects", text: "Work with realistic datasets and business cases to build analysis and dashboard projects." },
          { icon: "Sparkles", title: "AI-Powered Analytics", text: "Learn how generative AI fits into everyday analytics work to improve speed, quality and productivity." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on skills with Excel, SQL, Python, Power BI and Tableau." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Create analytics projects and dashboards you can present in your CV and interviews." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on analytics career paths, skills to build and how to prepare for opportunities." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },

      "cyber-security": {
        slug: "https://www.catalysttech.in/course/cyber-security",
  label: "Cyber Security + AI",
  category: "Tech",
    duration: "5 Months",
        heading: "Cyber Security Course in Kerala",
        summary:
          "Learn the fundamentals of cyber security, network security, threat detection and vulnerability assessment through lab-driven training that builds practical skills to identify risks and respond to security incidents.",
        type: "Certification",
        duration: "5 Months",

        overviewTitle: "Cyber Security Course Overview",
        overview:
          "The Cyber Security course gives you a practical, lab-driven introduction to modern security. Learn how networks, systems and web applications work, how attacks happen, and, more importantly, how to detect, analyse and stop them using industry-standard tools.",
        gain: [
          "Practical Cyber Security Skills",
          "Networking and Linux fundamentals",
          "Ethical hacking in safe lab environments",
          "Vulnerability assessment skills",
          "Security monitoring and incident response",
          "Industry-relevant security tools",
          "Hands-on lab practice",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Networking Fundamentals", text: "Understand how networks work, including protocols, IP addressing, ports, firewalls and common network services." },
          { title: "Linux & Security Tools", text: "Work confidently on Linux and get hands-on with the command-line tools used in security work." },
          { title: "Security Fundamentals", text: "Learn core security concepts such as the CIA triad, threats, vulnerabilities, risk, authentication and access control." },
          { title: "Vulnerability Assessment", text: "Scan systems and networks, identify weaknesses, prioritise risks and document findings." },
          { title: "Ethical Hacking & Penetration Testing", text: "Practise ethical hacking techniques in safe, controlled labs to understand how attackers think and operate." },
          { title: "Web Application Security", text: "Learn common web application vulnerabilities and how to test for and secure against them." },
          { title: "SOC, SIEM & Incident Response", text: "Monitor logs and alerts with SIEM tools, analyse security events and follow incident response procedures." },
        ],

        skills: [
          "Network and system security fundamentals",
          "Vulnerability assessment",
          "Ethical hacking and penetration testing",
          "Web application security",
          "Log analysis and security monitoring",
          "Incident response",
          "Linux for security",
        ],
        tools: ["Linux", "Networking Tools", "Wireshark", "Nmap", "Burp Suite", "SIEM Tools"],
        careers: [
          "Cybersecurity Analyst",
          "SOC Analyst",
          "Information Security Analyst",
          "Vulnerability Assessment Analyst",
          "Network Security Associate",
          "Security Operations Associate",
        ],

        eligibilityTitle: "Cyber Security Course Eligibility",
        eligibility: [
          { label: "Educational Qualification", text: "Plus two, Diploma, or degree holders can enrol in the course." },
          { label: "Freshers & Beginners", text: "Beginners interested in security. We start from networking and Linux basics." },
          { label: "IT & Engineering Students", text: "Students and graduates looking to specialise in cyber security." },
          { label: "Working Professionals", text: "IT professionals who want to move into security roles." },
        ],

        certificateTitle: "Cyber Security Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("Cyber Security"),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Network", title: "Lab-Driven Training", text: "Practise attack and defence techniques in safe lab environments instead of only reading theory." },
          { icon: "UsersRound", title: "Industry Expert Mentors", text: "Learn from mentors with practical experience in security and networking." },
          { icon: "Wrench", title: "Learn with Industry Tools", text: "Gain hands-on skills with Wireshark, Nmap, Burp Suite and SIEM tools." },
          { icon: "UserRoundCheck", title: "Build your Professional Profile", text: "Develop practical security skills and documented lab work that strengthen your CV." },
          { icon: "Compass", title: "Career Guidance", text: "Get guidance on security career paths, relevant certifications and skills to build." },
          { icon: "BriefcaseBusiness", title: "Placement Assistance", text: "Prepare for opportunities through interview preparation, job readiness support and professional profile development." },
        ],
      },
    },

    // ---------------- Marketing & Management (offline) ----------------
    "marketing-management": {
      "digital-marketing": {
        slug: "digital-marketing",
  label: "Digital Marketing + AI",
  category: "Marketing & Management",
    duration: "3 Months",
        heading: "Digital Marketing Course in Kerala",
        summary:
          "Learn digital marketing through practical training in SEO, Social media marketing, Google Ads, Content marketing, Email marketing, and analytics. Develop practical skills in digital marketing tools and AI-assisted workflows to understand how campaigns are planned, managed, and improved.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "Digital Marketing Course Overview",
        overview:
          "The Digital Marketing course at Catalyst SkillHub helps you develop skills to plan, execute, and analyse digital marketing, email marketing, and website analytics, along with modern AI-powered marketing techniques. Gain knowledge of industry-relevant tools and strategies to understand how businesses build online visibility, reach target audiences, and measure marketing performance.",
        gain: [
          "Practical Digital Marketing Skills",
          "SEO and AI Search Optimization",
          "Social Media & Content Marketing",
          "Paid advertising skills",
          "Industry-relevant marketing tools",
          "AI-Assisted Marketing Workflows",
          "Analytics & Performance Reporting",
          "Career development support",
          "Placement Assistance",
        ],

        learn: [
          { title: "Digital Marketing Fundamentals", text: "Understand the foundations of digital marketing, customer journeys, marketing funnels, audience research, and digital marketing strategy." },
          { title: "Web Design Fundamentals", text: "Learn how to create and optimize marketing-focused websites and landing pages that support traffic generation and conversions." },
          { title: "Content Marketing", text: "Learn to plan, create, and distribute engaging content across digital channels, using content strategy, SEO principles, copywriting, and AI-powered tools to attract an audience and support business goals." },
          { title: "SEO, AEO, GEO & Google Business Profile", text: "Master modern search engine optimization across traditional search engines, AI-powered search, local search, and Google Business Profile to improve visibility and attract a relevant audience." },
          { title: "Social Media Marketing", text: "Develop strategies for social media platforms, content planning, audience engagement, brand building, and social media growth." },
          { title: "Google Ads & Performance Marketing", text: "Learn to plan, launch, manage, and optimise campaigns using Google Ads and performance marketing strategies, with a focus on audience targeting, conversion tracking, budget optimization, and analytics." },
          { title: "Email & WhatsApp Automation", text: "Learn to create automated email and WhatsApp workflows for lead nurturing, follow-ups, customer engagement, personalised communication, and conversions." },
        ],

        skills: [
          "Search Engine Optimization (SEO)",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimization (GEO)",
          "Social Media Marketing",
          "Google Ads and Performance Marketing",
          "Content Marketing",
          "Web Analytics & Tracking",
          "Local SEO & Google Business Profile",
          "AI-powered Digital Marketing",
        ],
        tools: [
          "WordPress", "Elementor", "Hostinger", "Ubersuggest", "Semrush", "Mailchimp", "Zapier",
          "Google Analytics", "Google Search Console", "Google Tag Manager", "Notion", "Shopify",
          "Canva", "Gemini", "ChatGPT",
        ],
        careers: [
          "Digital Marketing Executive",
          "SEO Specialist",
          "Social Media Manager",
          "Performance Marketer",
          "Google Ads Specialist",
        ],

        certificateTitle: "Digital Marketing Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        certificate: '/assets/images/certificate/digital-marketing.webp',

        learningOptions: learningOptions("Digital Marketing", {
          online: {
            title: "Begin your Digital Marketing Career Online",
            description:
              "Flexible online learning with expert guidance and practical AI-integrated digital marketing training and access to recorded classes for convenient learning and revision.",
          },
          offline: {
            description:
              "Gain practical AI-integrated digital marketing skills through expert-led classroom training, hands-on sessions, and mentor guidance.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Work with Real Projects", text: "Move beyond theory with practical tasks, projects, campaign planning, execution, and performance analysis." },
          { icon: "ChartNoAxesCombined", title: "Live Projects", text: "Work on practical marketing campaigns and gain experience with real-world client requirements, strategies, and outcomes." },
          { icon: "Sparkles", title: "AI Advanced Marketing", text: "Learn how AI can be integrated into everyday marketing workflows to improve research, content creation, campaign planning, analysis, and productivity." },
          { icon: "BriefcaseBusiness", title: "Internship & Industry Exposure", text: "Gain practical industry exposure through internship opportunities and experience working on real marketing activities." },
          { icon: "UserRoundCheck", title: "Build your Portfolio", text: "Work on practical projects and marketing work that can be presented as part of your professional portfolio." },
          { icon: "Compass", title: "Career Guidance", text: "Get personalised guidance on career paths, skill development, and preparing for opportunities in digital marketing." },
        ],
      },

      "human-resource-management": {
        slug: "human-resource-management",
  label: "Human Resource Management + AI",
  category: "Marketing & Management",
    duration: "3 Months",
        heading: "HR Management Course in Kerala",
        summary:
          "Master Human Resource Management skills through industry-focused training, real-world projects, and expert guidance.",
        type: "Certification",
        duration: "6 Months",

        overviewTitle: "HR Management Course Overview",
        overview:
          "The HR Management Course in Kerala equips you with practical skills in recruitment, payroll, employee management, labour laws, and HR analytics. Learn to use HRMS, MS Excel, payroll systems, and AI tools for HR, with training in Indian and UAE labour law fundamentals to prepare for human resource management roles.",
        gain: [
          "Expert-led HR Training",
          "Practical HR Learning",
          "Indian & International Certification",
          "Internship opportunity",
          "Mock interviews & Soft skills",
          "Modern HR Tools & Technology",
          "Personalised mentor guidance",
          "Career Guidance & Placement Assistance",
        ],

        learn: [
          { title: "HR Fundamentals", text: "Understand the core principles, functions, and practice of modern Human Resource Management." },
          { title: "Recruitment and Talent Acquisition", text: "Learn how to source, screen, and select the right candidates for different roles." },
          { title: "Interviewing & Selection", text: "Develop skills to plan interviews, evaluate candidates, and make effective selection decisions." },
          { title: "Employee Onboarding", text: "Learn how to manage the onboarding process and create a smooth employee experience from day one." },
          { title: "Payroll and Salary Administration", text: "Understand salary structure, payroll practices, attendance, leave, and essential payroll administration." },
          { title: "Performance Management", text: "Learn how organizations set performance goals, conduct appraisals, and support employee development." },
          { title: "Employee Relations", text: "Develop the skills to manage workplace relationships, employee engagement, and common HR situations." },
          { title: "Labour Laws & Compliance", text: "Understand key Indian labour laws, statutory requirements, and HR compliance practices." },
          { title: "HR Analytics", text: "Learn how to use HR and data analytics to generate insights and support better workforce decisions." },
          { title: "HRMS & HR Technology", text: "Gain practical exposure to HRMS platforms and technology used to manage everyday HR operations." },
          { title: "Training & Development", text: "Understand how organizations identify training needs and plan employee learning and development programmes." },
          { title: "Workplace Communication", text: "Build professional communication skills for effective interaction with employees, managers, and teams." },
          { title: "UAE Labour Law & Compliance", text: "Gain an understanding of key UAE labour regulations and compliance practices relevant to HR professionals." },
        ],

        skills: [
          "Professional decision-making",
          "Employee record management",
          "HR data handling",
          "Workplace problem-solving",
          "Professional communication",
          "Time & task management",
          "Teamwork & coordination",
        ],
        tools: ["MS Excel for HR", "HRMS & HR Software", "Payroll & Attendance Systems", "HR Analytics Tools", "AI Tools for HR"],
        careers: [
          "HR Executive",
          "HR Generalist",
          "Talent Acquisition Specialist",
          "Recruitment Executive",
          "Payroll Executive",
          "HR Operations Executive",
          "HR Analyst",
          "Training & Development Executive",
        ],

        certificateTitle: "HR Management Course Certification",
        certificateText: "Earn a certificate that recognises your skills",

        learningOptions: learningOptions("HR Management", {
          online: {
            title: "Master HR Management Online",
            description:
              "Join live online sessions from anywhere through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "GraduationCap", title: "Indian & International Certification", text: "Earn Indian and international certifications that strengthen your professional profile." },
          { icon: "UsersRound", title: "Expert-led Training", text: "Learn from expert mentors who bring industry knowledge and practical perspective into the learning experience." },
          { icon: "UserRoundCheck", title: "Personalised Mentor Guidance", text: "Receive continuous guidance and feedback to make steady progress throughout the programme." },
          { icon: "Compass", title: "Career Guidance & Support", text: "Stay connected with mentors and the learning community for guidance, support, and continued development beyond individual training sessions." },
          { icon: "BriefcaseBusiness", title: "Mock Interviews & Soft Skills", text: "Strengthen communication and interview skills to approach opportunities with greater confidence." },
          { icon: "Layers", title: "Practical & Real-world Projects", text: "Practise through real-world projects that help you understand how HR functions in the actual workspace." },
        ],
      },

      "office-administration": {
        slug: "office-administration",
  label: "Office Administration + AI",
  category: "Marketing & Management",
    duration: "2 Months",
        heading: "Best Office Administration Course in Kerala with Certification",
        summary:
          "Master office administration skills, Microsoft Office Excel, documentation, communication, business support, and AI-powered productivity tools through practical, career-focused training.",
        type: "Certification",
        duration: "3 Months",

        overviewTitle: "Office Administration Course Overview",
        overview:
          "The Office Administration course in Kerala helps you develop the practical skills needed to manage everyday office operations. Learn office procedures, documentation, data entry, business communication, MS Office, Advanced Excel, HR administration, basic office accounting, and AI-powered productivity tools. The course prepares you to handle administrative tasks, maintain records, coordinate office activities, and support business operations across different industries.",
        gain: [
          "Practical Office Administration training",
          "Hands-on MS Office & Excel practice",
          "Professional Communication skills",
          "Documentation & Record management",
          "AI & Digital Productivity skills",
          "Practical Projects & Activities",
          "Mock interviews & career guidance",
          "Placement Assistance",
        ],

        learn: [
          { title: "Office Administration Fundamentals", text: "Understand office procedures, workflow, coordination, and day-to-day administrative responsibilities." },
          { title: "Office Operations & Management", text: "Learn to organise schedules, coordinate tasks, manage resources, and support smooth office operations." },
          { title: "Documentation & Record Management", text: "Learn professional document preparation, filing, data organization, and record-keeping practices." },
          { title: "Business Communication", text: "Develop professional communication skills for emails, calls, meetings, clients, and workplace interactions." },
          { title: "Data Entry & Information Management", text: "Learn accurate data handling, information organisation, and efficient administrative record management." },
          { title: "MS Office & Productivity Skills", text: "Build practical skills in Word, Excel, PowerPoint, and other essential workplace productivity applications." },
          { title: "Advanced Excel for Office Work", text: "Work with formulas, functions, data organisation, reports, and spreadsheets used in everyday office tasks." },
          { title: "Email & Digital Office Management", text: "Learn professional email communication, digital file management, online collaboration, and workplace productivity." },
          { title: "HR & Employee Administration", text: "Understand basic HR processes, including employee records, attendance, leave, onboarding, and administrative support." },
          { title: "Accounting & Office Finance Basics", text: "Gain basic knowledge of invoices, expenses, billing, financial records, and everyday office transactions." },
          { title: "Customer & Client Handling", text: "Develop professional skills for handling customer queries, calls, visitors, and client communication." },
          { title: "AI for Office Productivity", text: "Learn how AI tools can support documentation, communication, research, data handling, and everyday administrative tasks." },
        ],

        skills: [
          "Office Coordination",
          "Document Preparation",
          "Data Accuracy & Management",
          "Spreadsheet & Reporting Skills",
          "Digital Workspace Productivity",
          "Administrative Problem-solving",
          "Time & Task Management",
          "Attention to Detail",
          "AI-Assisted Task Management",
        ],
        tools: [
          "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Outlook", "Google Workspace",
          "Google Docs & Sheets", "Tally / Accounting Software", "HRMS Platforms", "AI Productivity Tools",
          "Email & Communication Tools", "Cloud Storage & File Management Tools",
        ],
        careers: [
          "Office Administrator",
          "Administrative Assistant",
          "Office Executive",
          "Administrative Executive",
          "Office Coordinator",
          "Operations Executive",
          "Executive Assistant",
          "Personal Assistant",
          "Front Office Executive",
          "Back Office Executive",
          "Admin & HR Executive",
          "Documentation Executive",
          "Data Entry Executive",
          "Customer Support Executive",
          "Office Manager",
        ],

        certificateTitle: "Office Administration Course Certification",
        certificateText: "Earn a certificate that recognises your skills",
        // certificate:'/assets/images/certificate/CAT-Certificate.webp',

        learningOptions: learningOptions("Office Administration", {
          online: {
            title: "Master Office Administration Online",
            description:
              "Join live online sessions from anywhere. Learn through live, interactive sessions with expert mentors and practical activities.",
          },
          offline: {
            title: "Begin your offline Learning Journey",
            description:
              "Learn in the classroom with direct mentor interactions, practical activities, and hands-on learning.",
          },
        }),

        whyTitle: "Why choose Catalyst",
        whySubtitle: "Choose the Right Guidance",
        why: [
          { icon: "Layers", title: "Practical Training", text: "Get practical, workplace-focused training that helps you develop technical, administrative, and professional skills." },
          { icon: "Wrench", title: "Hands-on MS Office & Documentation Skills", text: "Develop practical skills in MS Office, document preparation, spreadsheets, presentations, and professional record management." },
          { icon: "Network", title: "HR, Payroll & Compliance Exposure", text: "Gain knowledge of essential HR administration, payroll processes, and workplace compliance." },
          { icon: "GraduationCap", title: "Industry-Relevant Skill Certification", text: "Earn a certification that validates your practical skills and strengthens your professional profile." },
          { icon: "BriefcaseBusiness", title: "100% Placement Assistance", text: "Get the right career guidance, interview preparation, and placement assistance to help you pursue relevant job opportunities." },
          { icon: "Sparkles", title: "AI Productivity Skills", text: "Learn how digital platforms and AI tools can simplify documentation, communication, research, and routine administrative work." },
        ],
      },
    },
  },
};

// ---------------------------------------------------------------------
// Lookups used by the pages (mode = "online" | "offline")
// ---------------------------------------------------------------------

export const getCourseDetail = (slug, mode = "online") => {
  const categories = courseDetailContent[mode] || {};
  for (const courses of Object.values(categories)) {
    for (const course of Object.values(courses)) {
      if (course.slug === slug) return course;
    }
  }
  return undefined;
};

export const courseListPath = (mode = "online") =>
  mode === "offline" ? "/courses" : "/courses-online";

// Learning Path content for a slug; courses without their own entry get the generic text.
export const getLearningOptions = (slug, courseTitle = "", mode = "online") =>
  getCourseDetail(slug, mode)?.learningOptions ?? learningOptions(courseTitle);

// Generic "Why choose Catalyst" content, used by courses that have no `why` list of their own.
const defaultWhy = [
  { icon: "BriefcaseBusiness", title: "Real world projects", text: "Go beyond theory with hands-on practice with real world projects." },
  { icon: "UsersRound", title: "Industry expert mentors", text: "Learn from the mentors who have 8+ years of industry experience." },
  { icon: "Wrench", title: "Master advanced tools", text: "Gain hands-on experience with advanced tools, technologies and applications." },
  { icon: "Sparkles", title: "AI powered learning", text: "Develop the skills that help you lead in an increasingly AI powered industry." },
  { icon: "Compass", title: "Personalised guidance", text: "Get the right guidance for your career and future." },
  { icon: "GraduationCap", title: "Internship opportunities", text: "Apply your skills in a professional environment and gain valuable work experience." },
  { icon: "ChartNoAxesCombined", title: "Career & placement guidance", text: "Get the guidance and support you need to prepare for and find the right job." },
  { icon: "UserRoundCheck", title: "Professional skill development", text: "Build communication, problem-solving and professional skills needed to grow in your career." },
];

// "Why choose Catalyst" content for a slug (course-specific, else the generic list).
export const getWhyChoose = (slug, mode = "online") => {
  const d = getCourseDetail(slug, mode);
  return {
    label: d?.whyTitle ?? "Why choose Catalyst",
    heading: d?.whySubtitle ?? "Upskill with the right guidance for your career.",
    items: d?.why ?? defaultWhy,
  };
};