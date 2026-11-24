// All FAQ content lives here. Every item is { q, a }. Dummy text - replace with real answers.
//
// Listing pages / other pages (one shared list each):
//   generalFaqs  -> home, about, campus, success-stories, category pages
//   onlineFaqs   -> /courses listing page
//   offlineFaqs  -> /offline-courses listing page
//
// Course pages (/courses/:slug and /offline-courses/:slug):
//   every course has its OWN FAQ, split into 3 categories: general, online, offline.
//   See courseFaqs below. getCourseFaqs(slug, title) returns { general, online, offline }.

export const generalFaqs = [
  {
    q: "Who can join Catalyst SkillHub courses?",
    a: "Catalyst SkillHub courses are suitable for students, graduates, job seekers, and working professionals at different stages of their careers. Whether you want to start a new career, switch fields, or upskill for better opportunities, our programmes are designed to help you build relevant, practical skills for the workplace.",
  },
  {
    q: "Are SkillHub courses available online and offline?",
    a: "Yes. SkillHub offers both online and offline learning options across all programmes. Join classes at our offline centres in Kannur, Calicut, Vadakara, Manjeri, Kottakkal, Perinthalmanna, Edappal, Thrissur, and Kochi, or choose flexible online learning with live classes and recorded sessions for convenient learning and revision.",
  },
  {
    q: "What courses are offered by Catalyst SkillHub?",
    a: "SkillHub offers programmes across three categories: Accounting courses including Certified Indian and Foreign Accounting (CIFA), GCC Accounting, Business Accounting, and SAP Accounting; Marketing and Management courses including Digital Marketing, HR Management, and Office Administration; and Tech courses including Python Full-Stack with DevOps, Data Analytics with Gen AI, and Cyber Security.",
  },
  {
    q: "Will I get practical learning along with the course?",
    a: "Yes. SkillHub courses include practical, industry-relevant learning to help you apply what you learn. Depending on the programme, you’ll work with practical tasks, projects, tools, case studies, and workplace-based activities to build skills you can use in real professional settings.",
  },
  {
    q: "Do you provide placement assistance for all courses?",
    a: "Yes. SkillHub provides placement assistance to help you prepare for relevant job opportunities. Depending on the programme, support may include job readiness sessions, CV and LinkedIn optimization, mock interviews, interview preparation, career guidance, and assistance in exploring suitable opportunities.",
  },
];

// ---------------------------------------------------------------
// Listing pages (dummy data)
// ---------------------------------------------------------------
export const onlineFaqs = [
  {
    q: "How are the online classes conducted?",
    a: "Online classes are delivered live through a video platform by experienced trainers. You can ask questions in real time, take part in discussions, and complete assignments from home.",
  },
  {
    q: "Will I get recordings if I miss a live class?",
    a: "Yes. Every live session is recorded and shared with you, so you can catch up on missed classes or revise topics whenever you need.",
  },
  {
    q: "What do I need to attend an online course?",
    a: "A laptop or desktop computer, a stable internet connection, and a headset are enough. Our team will help you install any required software during the first week.",
  },
  {
    q: "Can I switch from an online batch to an offline batch later?",
    a: "Yes, subject to seat availability at your preferred campus. Please contact our admissions team to discuss batch transfers and any fee differences.",
  },
  {
    q: "Are online course certificates the same as offline certificates?",
    a: "Yes. Students who complete the programme and assessments receive the same Catalyst SkillHub completion certificate, whether they study online or offline.",
  },
  {
    q: "Is placement assistance available for online students?",
    a: "Yes. Online students get the same career support, including CV preparation, mock interviews and interview guidance.",
  },
];

export const offlineFaqs = [
  {
    q: "Where are the offline classes conducted?",
    a: "Offline classes run at our campuses in Kannur, Calicut, Vadakara, Manjeri, Kottakkal, Perinthalmanna, Edappal, Thrissur and Kochi. Course availability may vary by campus, so please check with the centre you prefer.",
  },
  {
    q: "What are the offline batch timings?",
    a: "We usually run morning, afternoon and weekend batches. Exact timings depend on the campus and the course, and our admissions team will share the current schedule.",
  },
  {
    q: "Can I visit the campus before I enrol?",
    a: "Absolutely. You are welcome to visit your nearest campus, meet the mentors, see the classrooms and ask any questions before you decide to join.",
  },
  {
    q: "Do offline courses include hands-on lab or practical sessions?",
    a: "Yes. Offline programmes include practical sessions on campus systems, with direct guidance from trainers and the chance to work alongside classmates on projects.",
  },
  {
    q: "Are there fee instalment options for offline courses?",
    a: "Instalment options may be available depending on the course. Please contact the admissions team for current fee details and payment plans.",
  },
  {
    q: "Is placement assistance available for offline students?",
    a: "Yes. Offline students receive career guidance, interview preparation and support in exploring suitable job opportunities.",
  },
];

// ---------------------------------------------------------------
// Per-course FAQs (dummy content). Key = course slug from data/courses.js
// Each course: { general: [...], online: [...], offline: [...] }  (items are { q, a })
// ---------------------------------------------------------------
const courseFaqs = {
  // ============================ ACCOUNTING ============================
  "gcc-accounting": {
    general: [
      { q: "What is the GCC Accounting course about?", a: "It trains you in accounting fundamentals, IFRS, GCC VAT, UAE and Saudi corporate tax, audit basics and accounting software, so you can pursue accounting roles in Gulf countries." },
      { q: "Who is eligible for GCC Accounting?", a: "Commerce graduates, accounting professionals and job seekers can join. No prior GCC experience is required." },
      { q: "How long is the course and will I get a certificate?", a: "The programme runs for about three months. On completing the assessments you receive a Catalyst SkillHub certificate." },
      { q: "Will this course help me find a job?", a: "We provide CV preparation, mock interviews and career guidance. Job offers are not guaranteed, but the syllabus targets skills Gulf employers look for." },
    ],
    online: [
      { q: "How are the GCC Accounting online classes conducted?", a: "Live interactive sessions with experienced trainers, covering IFRS, VAT and tax with practical exercises." },
      { q: "Can I watch recordings of the VAT and tax sessions?", a: "Yes. All live sessions are recorded so you can revise VAT filing and corporate tax topics before assessments." },
      { q: "Which software will I practise on online?", a: "Tally Prime, Zoho Books and QuickBooks, plus an introduction to SAP FICO. Trainers help with setup in the first week." },
      { q: "What do I need to attend online?", a: "A laptop or desktop, a stable internet connection and a headset." },
      { q: "Can I study while working?", a: "Yes. Online batches and recordings make it easy to fit classes around a job." },
    ],
    offline: [
      { q: "At which campuses is GCC Accounting taught offline?", a: "At selected Catalyst campuses. Please contact admissions to confirm the batch at your preferred centre." },
      { q: "Is there a computer lab for accounting software?", a: "Yes. Offline students practise on campus computers with Tally, Zoho Books and QuickBooks under trainer guidance." },
      { q: "Will I work on real GCC VAT case studies?", a: "Yes. Classroom sessions include VAT invoice, return filing and corporate tax case studies." },
      { q: "What are the offline batch timings?", a: "Weekday and weekend batches may be available. Admissions will share the latest schedule." },
      { q: "Can I attend a demo class first?", a: "Yes. Request a free demo class and meet the mentors before you decide." },
    ],
  },

  "business-accounting": {
    general: [
      { q: "What will I learn in Business Accounting?", a: "Recording transactions, final accounts, balance sheets, GST basics, taxation fundamentals and day-to-day accounting in Tally." },
      { q: "Is it suitable for beginners and commerce students?", a: "Yes. The course starts from basics, so beginners, commerce students and graduates can all join." },
      { q: "How long is the course?", a: "About three months, with assignments and a final assessment." },
      { q: "What jobs can I apply for afterwards?", a: "Accountant, accounts executive, accounts assistant and tax assistant roles in small and mid-sized businesses." },
    ],
    online: [
      { q: "Will I learn GST and Tally in the online classes?", a: "Yes. GST fundamentals, return concepts and day-to-day entries in Tally Prime are part of the live sessions." },
      { q: "Can I do this course while working full time?", a: "Yes. Recorded sessions and flexible batches help you study around a job." },
      { q: "Are there assignments online?", a: "Yes. You get practical assignments after each module and a final assessment." },
      { q: "How do I get help with doubts?", a: "Ask in live sessions or through the doubt-clearing channel shared with your batch." },
      { q: "Do I need to install Tally myself?", a: "Trainers will guide you in installing a trial version during the first week." },
    ],
    offline: [
      { q: "Do offline classes include hands-on Tally practice?", a: "Yes. Every offline batch has practical Tally sessions on campus systems." },
      { q: "What are the offline batch timings?", a: "Morning and weekend batches are common. Timings depend on the campus." },
      { q: "Can I get help with doubts after class?", a: "Yes. Trainers are available on campus for doubt clearing and extra practice." },
      { q: "Are there fee instalments for the offline course?", a: "Instalment options may be available. Ask the admissions team for current details." },
      { q: "Can I visit the campus before joining?", a: "Yes. You are welcome to visit, meet the trainers and attend a demo class." },
    ],
  },

  "sap-accounting": {
    general: [
      { q: "What does the SAP Accounting course cover?", a: "Core SAP finance modules such as FI and CO: general ledger, accounts payable, accounts receivable, asset accounting and cost centres." },
      { q: "Do I need accounting knowledge to join?", a: "Basic accounting knowledge helps, but key concepts are revisited so beginners can follow." },
      { q: "Will I get a certificate?", a: "You receive a Catalyst SkillHub completion certificate after passing the assessments." },
      { q: "Which careers does it prepare me for?", a: "Entry-level SAP finance roles, and it helps working accountants add a valuable software skill." },
    ],
    online: [
      { q: "Do I get access to an SAP practice system online?", a: "Yes. Students receive guided access to a practice environment to complete exercises remotely." },
      { q: "Are online SAP sessions live?", a: "Yes. Live classes with a trainer, recorded for revision." },
      { q: "What are the system requirements?", a: "A laptop with a stable internet connection. Specific requirements are shared at enrolment." },
      { q: "Can I ask questions during the session?", a: "Yes. Live sessions are interactive and doubts are answered in real time." },
      { q: "Is there support for assignments?", a: "Yes. Mentors review assignments and give feedback." },
    ],
    offline: [
      { q: "Where can I attend SAP Accounting classes in person?", a: "At selected campuses. Contact admissions to confirm the nearest centre and next batch." },
      { q: "Are SAP sessions held in a lab?", a: "Yes. Offline students work on campus systems connected to the SAP practice environment." },
      { q: "How big is an offline batch?", a: "Batches are kept small for individual attention. Exact numbers vary by campus." },
      { q: "Will I practise end-to-end finance scenarios?", a: "Yes. Classroom exercises walk through purchase-to-pay and order-to-cash accounting." },
      { q: "Can I try a demo class?", a: "Yes. You can visit, meet the trainers and sit in on a demo class." },
    ],
  },

  "certified-indian-foreign-accounting": {
    general: [
      { q: "What is the Certified Indian & Foreign Accounting course?", a: "A programme covering Indian accounting and taxation along with international accounting practices, so you can work with Indian and overseas clients." },
      { q: "Who should take this course?", a: "Commerce graduates, accounting professionals and job seekers who want a broad, certified accounting profile." },
      { q: "Does it include software training?", a: "Yes. Tally, Excel and other accounting tools are included to build practical skills." },
      { q: "What certificate will I receive?", a: "A Catalyst SkillHub completion certificate after finishing the programme and assessments." },
    ],
    online: [
      { q: "Are the online classes live?", a: "Yes. Live sessions with experienced trainers, recorded for revision." },
      { q: "How do online assessments work?", a: "Module quizzes and a final assessment are taken online." },
      { q: "Can I switch batches if I miss classes?", a: "Recordings let you catch up, and batch changes can be discussed with admissions." },
      { q: "What do I need to attend?", a: "A computer, stable internet and a headset." },
      { q: "Is placement guidance available online?", a: "Yes. CV help, mock interviews and career guidance are available to online students." },
    ],
    offline: [
      { q: "Is the course available at all campuses?", a: "Availability varies by campus. Please contact admissions for the centre nearest to you." },
      { q: "How is the offline batch structured?", a: "Classroom teaching, practical sessions and assessments over the course duration." },
      { q: "Will I practise Indian and foreign case studies?", a: "Yes. Trainers use case studies comparing Indian and international accounting treatments." },
      { q: "Can I get placement guidance offline?", a: "Yes. Offline students get CV help, mock interviews and career guidance." },
      { q: "Can I attend a trial class?", a: "Yes. Ask admissions to arrange a demo class at your campus." },
    ],
  },

  // ============================== TECH ================================
  "python-full-stack-devops": {
    general: [
      { q: "What technologies are taught in this course?", a: "Python, web frameworks, databases, front-end basics, Git, Docker and CI/CD tools to build and deploy complete applications." },
      { q: "Do I need coding experience?", a: "No. The course begins with Python basics and gradually moves to advanced full-stack and DevOps topics." },
      { q: "Will I build real projects?", a: "Yes. You will build and deploy projects for your portfolio and interviews." },
      { q: "What roles can I apply for?", a: "Junior Python developer, full-stack developer and DevOps trainee roles are common paths." },
    ],
    online: [
      { q: "What laptop do I need for online classes?", a: "A laptop with at least 8 GB RAM and a stable internet connection works well." },
      { q: "Can I get help if I get stuck while coding?", a: "Yes. Mentors help in live sessions and through doubt-clearing channels outside class hours." },
      { q: "Are coding sessions recorded?", a: "Yes. Recordings are available so you can rewatch demos and code-alongs." },
      { q: "How are projects reviewed online?", a: "Mentors review your repositories and deployments remotely and give written feedback." },
      { q: "Can I join if I work full time?", a: "Yes. Recordings and flexible timings make it possible, though regular practice is needed." },
    ],
    offline: [
      { q: "Do offline students get lab time for coding?", a: "Yes. Campus labs are available for hands-on coding and project work." },
      { q: "Is pair programming part of offline classes?", a: "Yes. Pair programming and group projects build teamwork skills." },
      { q: "Will mentors review my project in person?", a: "Yes. Mentors review projects face to face and give feedback on code quality and deployment." },
      { q: "How long is the offline programme?", a: "Duration depends on the batch. Check with admissions for the current schedule." },
      { q: "Can I switch to the online batch later?", a: "Possibly, based on availability. Talk to admissions about batch transfers." },
    ],
  },

  "data-analytics-gen-ai": {
    general: [
      { q: "What is covered in Data Analytics with Gen AI?", a: "Excel, SQL, Python, Power BI and data visualisation, plus using generative AI tools to speed up analysis and reporting." },
      { q: "Do I need a maths or statistics background?", a: "Basic comfort with numbers is enough. Statistics concepts are explained from the ground up." },
      { q: "Will I use real datasets?", a: "Yes. Assignments and projects use realistic business datasets." },
      { q: "What roles can I apply for?", a: "Data analyst, business analyst and reporting analyst roles." },
    ],
    online: [
      { q: "Will I learn to use Gen AI tools at work?", a: "Yes. You will learn practical ways to use Gen AI for data cleaning, insight generation and report writing." },
      { q: "Which tools do I need to install?", a: "Excel, Python and Power BI Desktop. Trainers help you set up in the first week." },
      { q: "Are online sessions recorded?", a: "Yes. Recordings are available for revision." },
      { q: "How do I submit projects?", a: "Projects are shared digitally and reviewed by mentors with feedback." },
      { q: "Can beginners join the online batch?", a: "Yes. The course starts from basics and builds up gradually." },
    ],
    offline: [
      { q: "Are classes held in a computer lab?", a: "Yes. Offline sessions are held in labs where you practise SQL, Python and Power BI." },
      { q: "Do I work on team projects offline?", a: "Yes. Group projects simulate workplace collaboration." },
      { q: "What are the batch timings?", a: "Weekday and weekend batches may be available. Contact the campus for the latest timings." },
      { q: "Is portfolio review included?", a: "Yes. Offline students get portfolio review and mock interviews." },
      { q: "Can I try a demo session first?", a: "Yes. A demo session can be arranged at the campus on request." },
    ],
  },

  "cyber-security": {
    general: [
      { q: "What topics does the Cyber Security course include?", a: "Networking basics, ethical hacking, vulnerability assessment, security tools, incident response and security best practices." },
      { q: "Is it suitable for beginners?", a: "Yes. It begins with IT and networking fundamentals before moving to security topics." },
      { q: "What careers can it lead to?", a: "Entry-level roles such as security analyst, SOC analyst and junior penetration tester." },
      { q: "Does it prepare me for industry certifications?", a: "The syllabus builds the knowledge needed for certifications, but exam registration is separate." },
    ],
    online: [
      { q: "Will I practise in a safe lab environment online?", a: "Yes. Practical exercises run in controlled virtual labs so you can learn without risk." },
      { q: "What do I need for online practicals?", a: "A laptop with 8 GB RAM or more and a stable internet connection." },
      { q: "Are the sessions live?", a: "Yes. Live classes with trainers, recorded for revision." },
      { q: "How do I get help with lab problems?", a: "Mentors assist during live sessions and through the doubt-clearing channel." },
      { q: "Can I join without a technical degree?", a: "Yes. Motivated beginners can join, as foundations are covered early." },
    ],
    offline: [
      { q: "Is there a dedicated security lab?", a: "Yes. Offline students use campus labs set up for hands-on security exercises." },
      { q: "Will there be attack and defence demonstrations?", a: "Yes. Trainers run guided demonstrations in a controlled environment." },
      { q: "How are offline batches scheduled?", a: "Schedules vary by campus. Check with admissions for current batches." },
      { q: "Do offline students get placement help?", a: "Yes. Interview preparation and career guidance are provided." },
      { q: "Can I attend a demo class?", a: "Yes. Ask the campus to arrange one." },
    ],
  },

  // ====================== MARKETING & MANAGEMENT ======================
  "digital-marketing": {
    general: [
      { q: "What will I learn in Digital Marketing?", a: "SEO, social media marketing, paid ads, content marketing, email marketing and analytics tools." },
      { q: "Do I need marketing experience?", a: "No. The course starts with marketing fundamentals and is open to beginners." },
      { q: "Will I get a portfolio?", a: "Yes. You build a portfolio of campaigns and reports to show employers." },
      { q: "Which jobs can I apply for?", a: "Digital marketing executive, SEO executive, social media manager and content marketer." },
    ],
    online: [
      { q: "Will I run real ad campaigns online?", a: "Yes. You plan and run practice campaigns and review results with your mentor." },
      { q: "Are the online classes live?", a: "Yes. Live sessions with practical demos, recorded for revision." },
      { q: "Do I need to pay for ad platforms?", a: "Practice campaigns can use small or sandbox budgets. Trainers explain options in class." },
      { q: "How is feedback given on my work?", a: "Mentors review your campaigns and reports and give written feedback." },
      { q: "Can I study while working?", a: "Yes. Flexible batches and recordings help you fit classes around work." },
    ],
    offline: [
      { q: "Do offline classes include live campaign practice?", a: "Yes. You work on practice campaigns in class with direct mentor feedback." },
      { q: "Is there a group project?", a: "Yes. Group projects simulate agency work, from strategy to reporting." },
      { q: "Are tools available on campus?", a: "Campus systems are available for practice, and trainers help you set up free tool accounts." },
      { q: "What are the offline class timings?", a: "Timings vary by campus and batch. Admissions will share the latest schedule." },
      { q: "Can I attend a demo class?", a: "Yes. Request one to meet the trainers before enrolling." },
    ],
  },

  "human-resource-management": {
    general: [
      { q: "What does the HR Management course cover?", a: "Recruitment, onboarding, payroll basics, performance management, labour law fundamentals and HR analytics." },
      { q: "Is it useful for fresh graduates?", a: "Yes. Graduates can use it to move into entry-level HR roles with practical knowledge." },
      { q: "Are interview and soft-skill sessions included?", a: "Yes. Communication and interview-skill sessions are part of the course." },
      { q: "What jobs can I get afterwards?", a: "HR executive, recruiter, HR assistant and payroll coordinator roles." },
    ],
    online: [
      { q: "Will I practise with HR tools online?", a: "Yes. You work with sample HR documents, spreadsheets and basic HR software." },
      { q: "Are online classes live?", a: "Yes. Live sessions with case discussions, recorded for revision." },
      { q: "How do online role-plays work?", a: "Interview and feedback role-plays are held in breakout groups during live sessions." },
      { q: "Do I get templates and study material?", a: "Yes. Sample policies, offer letters and trackers are shared digitally." },
      { q: "Can working professionals join?", a: "Yes. Flexible batches and recordings suit working professionals." },
    ],
    offline: [
      { q: "Do offline classes have role-play activities?", a: "Yes. Role-plays for interviews, conflict handling and feedback are part of the classroom experience." },
      { q: "Will I meet industry guest speakers?", a: "We try to arrange guest sessions with HR professionals. Details depend on the batch." },
      { q: "How long is the offline HR course?", a: "Duration depends on the batch. Check with admissions for the current schedule." },
      { q: "Is placement assistance provided offline?", a: "Yes. Offline students get CV help and interview preparation." },
      { q: "Can I visit the campus first?", a: "Yes. Visit, meet mentors and attend a demo class." },
    ],
  },

  "office-administration": {
    general: [
      { q: "What is taught in Office Administration?", a: "MS Office, business communication, documentation, scheduling, basic accounting and office management skills." },
      { q: "Is it suitable for beginners?", a: "Yes. No prior experience is required and the course starts with computer basics." },
      { q: "Will I learn advanced Excel?", a: "Yes. Practical Excel skills such as formulas, tables and reports are included." },
      { q: "What jobs can it lead to?", a: "Office administrator, admin executive, front-office executive and data entry operator roles." },
    ],
    online: [
      { q: "Can I learn MS Office online from scratch?", a: "Yes. Live sessions guide you step by step, starting from the basics." },
      { q: "Do online classes include communication practice?", a: "Yes. Email writing, professional communication and presentation practice are included." },
      { q: "What do I need to attend online?", a: "A computer with MS Office, a stable internet connection and a headset." },
      { q: "Are recordings available?", a: "Yes. Recordings help you revise and catch up on missed classes." },
      { q: "Is placement guidance available online?", a: "Yes. CV writing and interview preparation support are provided." },
    ],
    offline: [
      { q: "Do offline students get hands-on computer practice?", a: "Yes. Daily practice on campus computers is part of the offline course." },
      { q: "Is office etiquette practised in class?", a: "Yes. Classroom activities cover etiquette, telephone handling and customer interaction." },
      { q: "What are the batch timings?", a: "Morning, afternoon and weekend batches may be available depending on the campus." },
      { q: "Can I get help with job applications?", a: "Yes. We guide you on CV writing and interview preparation." },
      { q: "Can I try a demo class?", a: "Yes. A demo class can be arranged on request." },
    ],
  },
};

// Fallback for a course that has no entry above (generic text built from its title)
const fallbackFaqs = (title) => ({
  general: [
    { q: `What is the ${title} course about?`, a: `${title} is a job-focused programme with practical training from experienced mentors.` },
    { q: "Will I receive a certificate?", a: `Yes. After completing ${title} and its assessments you receive a Catalyst SkillHub completion certificate.` },
    { q: "Is placement support available?", a: "We provide career guidance, CV preparation and interview training. Contact us for current opportunities." },
  ],
  online: [
    { q: `How is ${title} delivered online?`, a: "Through live interactive sessions with recordings available for revision." },
    { q: "What do I need to attend online?", a: "A computer or laptop with a stable internet connection." },
  ],
  offline: [
    { q: `Where can I study ${title} offline?`, a: "At selected Catalyst SkillHub campuses. Contact admissions to confirm availability." },
    { q: "Can I attend a demo class?", a: "Yes. Request a demo class to meet the trainers before enrolling." },
  ],
});

// Returns { general, online, offline } for one course
export const getCourseFaqs = (slug, title = "this course") => {
  const own = courseFaqs[slug];
  return own ? { ...fallbackFaqs(title), ...own } : fallbackFaqs(title);
};