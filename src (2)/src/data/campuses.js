// =====================================================================
// CAMPUS DATA - one entry per district. Each entry gets its own page: /campus/:slug
// Content source: "Location detail pages" document (13 districts).
//
// Per district:
//   heading      big title on the landing banner
//   description  text under the title on the landing banner
//   image        banner image
//   locations    the branches shown in "Explore Campuses" (heading = "Upskilling Platform in <name>")
//   faqs         that district's FAQ list (shown on its page - no tabs)
//
// To change a district: edit its block below. To add one: copy a block, change the slug,
// and add the same slug in components/sections/home3/Centers.jsx so it becomes "live" there.
// =====================================================================
export const CAMPUS_TAGLINE = "India's Top Upskilling Platform";
export const DEFAULT_PHONE = "9207300700";

// Dummy map link until the real Google Business Profile link is added (page shows "Map link coming soon").
const MAP_TODO = "https://share.google/NvJZOTXOd03VB9K6K";
const DEFAULT_IMAGE = "/assets/images/cities/placeholder.png";

const loc = (name, area, mapUrl, image) => ({
  name,                 // shown in "Upskilling Platform in <name>"
  area,                 // used in the image badge / enquiry link, e.g. "Vadakara"
  mapUrl,
  image: image || DEFAULT_IMAGE,
  phone: DEFAULT_PHONE,
});

// Same text on every district banner, with the district name filled in.
const describe = (name) =>
  `Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our ${name} Campus.`;

export const campuses = [
  // ===================== KASARGOD =====================
  {
    slug: "kasargod",
    name: "Kasargod",
    heading: "Catalyst Skill Hub Kasargod",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Kasargod Campus.",
    image: "/assets/images/cities/kasargod.jpg", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Kasargod", "Kasargod", MAP_TODO),
      loc("Kanhagad", "Kanhagad", MAP_TODO),
    ],
    faqs: [
      {
        q: "What courses are available at the Catalyst Skill Hub Kasargod campus?",
        a: "Catalyst Skill Hub Kasargod offers job-oriented programmes accounting courses including Certified Indian and Foreign Accounting (CIFA), GCC Accounting, Business Accounting, SAP Accounting, Marketing and Management Courses including Digital Marketing, HR Management, Office Administration.",
      },
      {
        q: "Can I get career guidance before choosing a course?",
        a: "Yes. You can speak with a Career advisor before enrolling. Our career advisors can help you understand all programmes based on your interests, background and career goals, so you can make more informed choices.",
      },
      {
        q: "Is Skill Hub Courses Suitable for beginners with no prior experience?",
        a: "Yes. Skill Hub offers programmes designed to help beginners learn from the fundamentals and build practical skills step by step. You don’t need prior experience in the field to get started.",
      },
      {
        q: "Does Catalyst Skill Hub provide Placement Assistance?",
        a: "Yes. Catalyst Skill Hub provides placement assistance to help learners prepare for relevant job opportunities. Our Support includes job readiness sessions, CV and LinkedIn guidance, mock interviews, interview preparations and guidance throughout the job search process.",
      },
      {
        q: "Can I visit the Catalyst Skill Hub Kasargod before enrolling?",
        a: "Yes, you can contact our team to enquire about visiting the Kasargod campus. You can learn more about the programmes, learning environment, and available options before making your decisions.",
      },
    ],
  },

  // ===================== KANNUR =====================
  {
    slug: "kannur",
    name: "Kannur",
    heading: "Catalyst Skill Hub Kannur",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing& Management, and Technology at our Kannur Campus.",
    image: "/assets/images/places/kannur.jpg",
    locations: [
      loc("Kannur", "Kannur", "https://share.google/ES9NgGLdq8945TAqe", "/assets/images/places/location/kannur.webp"),
      loc("Payyannur", "Payyannur", MAP_TODO),
      loc("Thalassery", "Thalassery", MAP_TODO),
    ],
    faqs: [
      {
        q: "What courses are available at the Catalyst Skill Hub Kannur campus?",
        a: "Catalyst Skill Hub Kannur offers job-oriented programmes accounting courses including Certified Indian and Foreign Accounting (CIFA), GCC Accounting, Business Accounting, SAP Accounting, Marketing and Management Courses including Digital Marketing, HR Management, Office Administration.",
      },
      {
        q: "Can I get career guidance before choosing a course?",
        a: "Yes. You can speak with a Career advisor before enrolling. Our career advisors can help you understand all programmes based on your interests, background and career goals, so you can make more informed choices.",
      },
      {
        q: "Is Skill Hub Courses Suitable for beginners with no prior experience?",
        a: "Yes. Skill Hub offers programmes designed to help beginners learn from the fundamentals and build practical skills step by step. You don’t need prior experience in the field to get started.",
      },
      {
        q: "Does Catalyst Skill Hub provide Placement Assistance?",
        a: "Yes. Catalyst Skill Hub provides placement assistance to help learners prepare for relevant job opportunities. Our Support includes job readiness sessions, CV and LinkedIn guidance, mock interviews, interview preparations and guidance throughout the job search process.",
      },
      {
        q: "Can I visit the Catalyst Skill Hub Kannur before enrolling?",
        a: "Yes, you can contact our team to enquire at 9207300700 or visit the Kannur campus. You can learn more about the programmes, learning environment, and available options before making your decisions.",
      },
    ],
  },

  // ===================== CALICUT =====================
  {
    slug: "kozhikode",
    name: "Calicut",
    heading: "Catalyst Skill Hub Calicut",
    description:"India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing& Management, and Technology at our Calicut Campus.",
    image: "/assets/images/places/kozhikode.jpg",
    locations: [
      loc("Calicut", "Calicut", "https://share.google/JrjYcGnrXFxiiQ1ew", "/assets/images/places/location/calicut.webp"),
      loc("Koyilandi", "Koyilandi", MAP_TODO),
      loc("Vadakara", "Vadakara", "https://share.google/PraOiQ2ryEs1P6KNS", "/assets/images/places/location/vadakara.webp"),
      loc("Mukkom", "Mukkom", MAP_TODO),
    ],
    faqs: [
      {
        q: "What courses are available at the Catalyst Skill Hub Calicut campus?",
        a: "Catalyst Skill Hub Calicut offers job-oriented programmes accounting courses including Certified Indian and Foreign Accounting (CIFA), GCC Accounting, Business Accounting, SAP Accounting, Marketing and Management Courses including Digital Marketing, HR Management, Office Administration, and Tech Courses including Python full-stack with DevOps, Data Analytics with Gen AI and Cyber security.",
      },
      {
        q: "Can I get career guidance before choosing a course?",
        a: "Yes. You can speak with a Career advisor before enrolling. Our career advisors can help you understand all programmes based on your interests, background and career goals, so you can make more informed choices.",
      },
      {
        q: "Is Skill Hub Courses Suitable for beginners with no prior experience?",
        a: "Yes. Skill Hub offers programmes designed to help beginners learn from the fundamentals and build practical skills step by step. You don’t need prior experience in the field to get started.",
      },
      {
        q: "Does Catalyst Skill Hub provide Placement Assistance?",
        a: "Yes. Catalyst Skill Hub provides placement assistance to help learners prepare for relevant job opportunities. Our Support includes job readiness sessions, CV and LinkedIn guidance, mock interviews, interview preparations and guidance throughout the job search process.",
      },
      {
        q: "Can I visit the Catalyst Skill Hub Calicut before enrolling?",
        a: "Yes you can contact our team to enquire about visiting the Calicut campus. You can learn more about the programmes, learning environment, and available options before making your decisions.",
      },
    ],
  },

  // ===================== WAYANAD =====================
  {
    slug: "wayanad",
    name: "Wayanad",
    heading: "Catalyst Skill Hub Wayanad",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketin & Management, and Technology at our Wayanad Campus.",
    image: "/assets/images/cities/wayanad.jpg", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Sulthan Bathery", "Sulthan Bathery", MAP_TODO),
    ],
    faqs: [
      {
        q: "What courses can I study at Catalyst Skill Hub Wayanad?",
        a: "Catalyst Skill Hub Wayanad offers career-focused courses across Accounting, Marketing, and Management. Programmes include CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management, Office Administration.",
      },
      {
        q: "How do I choose the right course for my career goals?",
        a: "Choosing the right programme depends on your educational background, interests and career plans. You can connect with our academic advisors at the Wayanad campus to explore suitable courses, understand career opportunities and get guidance before enrolling.",
      },
      {
        q: "Can I join Catalyst Skill Hub without any previous knowledge of the subject?",
        a: "Absolutely. Several programmes are suitable for beginners and introduce concepts from the foundational level. With structured learning and practical sessions, students can gradually develop the knowledge and skills required for their chosen career path.",
      },
      {
        q: "What placement support is available after completing a course?",
        a: "Catalyst Skill Hub provides career and placement assistance to help students prepare for employment opportunities. This includes resume building, LinkedIn profile guidance, mock interviews, interview preparation and job-readiness support.",
      },
      {
        q: "How can I enquire about admissions at the Wayanad campus?",
        a: "You can contact the Catalyst Skill Hub Wayanad at 9207300700 to learn about available programmes, course details, admission procedures and upcoming batches. You can also arrange a campus visit to understand the learning environment before making your enrolment decision.",
      },
    ],
  },

  // ===================== MALAPPURAM =====================
  {
    slug: "malappuram",
    name: "Malappuram",
    heading: "Catalyst Skill Hub Malappuram",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Malappuram Campus.",
    image: "/assets/images/places/malappuram.jpg",
    locations: [
      loc("Manjeri", "Manjeri", "https://share.google/AOqMQQ70FSkTkQSc8", "/assets/images/places/location/manjeri.webp"),
      loc("Perinthalmanna", "Perinthalmanna", MAP_TODO, "/assets/images/places/location/perinthalmanna.webp"),
      loc("Kottakkal", "Kottakkal", "https://share.google/n1v7zAtdLwP3Mikpt", "/assets/images/places/location/kotakkal.webp"),
      loc("Edappal", "Edappal", "https://share.google/5CMxYJ9RlznpjbsK3", "/assets/images/places/location/edappal.webp"),
      loc("Nilambur", "Nilambur", MAP_TODO),
      loc("Valanchery", "Valanchery", MAP_TODO),
      loc("Tirur", "Tirur", MAP_TODO),
      loc("Malappuram Town", "Malappuram Town", MAP_TODO),
    ],
    faqs: [
      {
        q: "Which professional courses are offered at Catalyst Skill Hub Malappuram?",
        a: "Students can explore career-oriented programmes in three major areas: Accounting, Marketing and Management. The course options include CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management, Office Administration.",
      },
      {
        q: "Will someone help me understand the career opportunities associated with each course?",
        a: "Yes. Our academic guidance team can help you explore different programmes and their career prospects. You can discuss your qualifications, areas of interest and future ambitions to identify a course that aligns with your professional goals.",
      },
      {
        q: "Are the courses suitable for students who have just completed their education?",
        a: "Yes. Many of our programmes are structured to accommodate learners starting with little or no subject knowledge. The learning process introduces essential concepts before progressing to more advanced topics and practical applications.",
      },
      {
        q: "What career development support do students receive at Skill Hub?",
        a: "Learning goes beyond completing the course syllabus. Students receive career preparation support through resume development, LinkedIn profile improvement, mock interviews, interview guidance and assistance in exploring relevant employment opportunities.",
      },
      {
        q: "How can I get admission details for the Malappuram campus?",
        a: "To get started, contact our Malappuram campus at 9207300700 for information about course eligibility, fees, batch schedules and admission procedures. You can also visit the campus to discuss your learning options with the team before enrolling.",
      },
      {
        q: "How many Catalyst Skill Hub branches are there in Malappuram district?",
        a: "Catalyst SkillHub has 8 branches across Malappuram district, including Manjeri, Perinthalmanna, Kottakkal, Edappal, Nilambur, Valanchery, Tirur and Malappuram Town. Students can contact their nearest campus to explore available courses and admission opportunities.",
      },
    ],
  },

  // ===================== PALAKKAD =====================
  {
    slug: "palakkad",
    name: "Palakkad",
    heading: "Catalyst Skill Hub Palakkad",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Calicut Campus",
    image: "/assets/images/cities/palakkad.jpg", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Palakkad", "Palakkad", MAP_TODO),
      loc("Mannarkad", "Mannarkad", MAP_TODO),
    ],
    faqs: [
      {
        q: "What professional courses are available at Catalyst Skill Hub Palakkad?",
        a: "Catalyst Skill Hub Palakkad provides career-oriented programmes in Accounting, Marketing, and Management. Students can choose from CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management, Office Administration.",
      },
      {
        q: "How can I identify which course is right for me?",
        a: "The right course depends on your interests, qualifications and career expectations. You can speak with our course advisors to understand the programme structure, skills covered and potential career paths before deciding which programme to pursue.",
      },
      {
        q: "Can students from non-commerce or non-technical backgrounds enrol?",
        a: "Yes. Course eligibility varies by programme, but several Skill Hub courses are accessible to learners from different educational backgrounds. Our team can help you understand the prerequisites and identify programmes that match your current qualifications.",
      },
      {
        q: "Does Catalyst Skill Hub focus on practical skill development?",
        a: "Yes. Our programmes combine subject knowledge with practical learning activities to help students develop skills relevant to the workplace. The learning approach is designed to help learners understand concepts and apply them in real-world professional settings.",
      },
      {
        q: "What assistance can I expect when preparing for job interviews?",
        a: "Students receive career preparation support that includes resume development, LinkedIn profile guidance, mock interview sessions and interview preparation. This support helps learners build confidence and prepare for employment opportunities after completing their courses.",
      },
      {
        q: "How can I get information about fees and admissions at the Palakkad campus?",
        a: "You can contact our Palakkad campus at 9207300700 or visit us enquire about course fees, eligibility criteria, admission procedures and upcoming batches. Our team will help you understand the available options and guide you through the enrolment process.",
      },
    ],
  },

  // ===================== THRISSUR =====================
  {
    slug: "thrissur",
    name: "Thrissur",
    heading: "Catalyst Skill Hub Thrissur",
    description:"India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Calicut Campus.",
    image: "/assets/images/places/thrissur.jpg",
    locations: [
      loc("Thrissur", "Thrissur", "https://share.google/mXGirVO9NfsKIlPXq", "/assets/images/places/location/thrissur.webp"),
      loc("Kunnumkulam", "Kunnumkulam", MAP_TODO),
      loc("Chavakkad", "Chavakkad", MAP_TODO),
    ],
    faqs: [
      {
        q: "What career-oriented courses can I pursue at Catalyst Skill Hub Thrissur?",
        a: "Catalyst Skill Hub Thrissur offers programmes in Accounting, Marketing and Management to help learners develop industry-relevant skills. Available courses include CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Are there courses available for students who want to develop job-ready skills?",
        a: "Yes. Our programmes are designed to help students build practical knowledge and professional competencies relevant to their chosen fields. Whether you are interested in accounting, digital marketing or management, you can explore courses that support your career development.",
      },
      {
        q: "Do I need a commerce background to enrol in an accounting course?",
        a: "Not necessarily. Eligibility requirements differ between programmes, and some courses are suitable for beginners from different educational backgrounds. You can consult our academic team to understand the requirements for your preferred course.",
      },
      {
        q: "What practical skills will I develop during the course?",
        a: "Students develop subject-specific knowledge alongside practical skills through structured learning activities and industry-relevant applications. The focus is on helping learners understand professional concepts and build the confidence to use them in workplace situations.",
      },
      {
        q: "Can I receive career guidance before applying for admission?",
        a: "Yes. You can discuss your career interests and educational qualifications with our course advisors. They can help you compare available programmes, understand course expectations and identify a suitable learning path.",
      },
      {
        q: "Does Catalyst Skill Hub help students prepare for employment?",
        a: "Yes. Students receive placement and career assistance, including resume preparation, LinkedIn profile guidance, mock interviews and interview readiness support. These initiatives help learners prepare for job applications and professional opportunities.",
      },
      {
        q: "How can I find out about the next admission batch at Thrissur?",
        a: "Contact the Catalyst Skill Hub Thrissur campus at 9207300700 or visit us directly for the latest information on course availability, fee details, eligibility and upcoming batch schedules. You can also enquire about the admission process before choosing your programme.",
      },
    ],
  },

  // ===================== ERNAKULAM =====================
  {
    slug: "ernakulam",
    name: "Ernakulam",
    heading: "Catalyst Skill Hub Ernakulam",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Ernakulam Campus.",
    image: "/assets/images/places/ernakulam.jpg",
    locations: [
      loc("Palarivattom", "Palarivattom", "https://share.google/NvJZOTXOd03VB9K6K", "/assets/images/places/location/kochi.webp"),
      loc("Muvattupuzha", "Muvattupuzha", MAP_TODO),
    ],
    faqs: [
      {
        q: "Which professional courses can I study at Catalyst Skill Hub Ernakulam?",
        a: "Catalyst Skill Hub Ernakulam offers career-oriented programmes in Accounting, Marketing and Management. Students can choose from CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Are there career-focused courses available for fresh graduates in Ernakulam?",
        a: "Yes. Fresh graduates can explore programmes that help them develop specialised knowledge and practical skills in accounting, digital marketing and management. These courses are suitable for learners looking to strengthen their professional qualifications and prepare for new career opportunities.",
      },
      {
        q: "Can I learn accounting software and industry-relevant tools through these courses?",
        a: "Yes. Accounting programmes introduce learners to relevant accounting concepts, software and professional tools based on the course syllabus. For example, SAP Accounting focuses on SAP S/4HANA Finance (FICO), while GCC Accounting covers tools used in accounting and business operations.",
      },
      {
        q: "What makes Catalyst Skill Hub suitable for professional skill development?",
        a: "Catalyst Skill Hub combines structured course content with practical learning to help students understand how their knowledge applies in professional environments. The programmes focus on developing relevant skills rather than limiting learning to theoretical concepts.",
      },
      {
        q: "Does Catalyst Skill Hub Ernakulam provide placement assistance?",
        a: "Yes. Students receive career support through resume development, LinkedIn profile guidance, mock interviews, interview preparation and job-readiness sessions. These initiatives help learners prepare for relevant employment opportunities.",
      },
      {
        q: "How can I check course fees, eligibility and admission details?",
        a: "You can contact the Catalyst Skill Hub Ernakulam campus team to understand course fees, eligibility requirements, programme duration and upcoming batches. The team can also help you identify a suitable course based on your educational background and career interests.",
      },
    ],
  },

  // ===================== ALAPPUZHA =====================
  {
    slug: "alappuzha",
    name: "Alappuzha",
    heading: "Catalyst Skill Hub Alappuzha",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Alappuzha Campus.",
    image: "/assets/images/cities/ALAPPUZHA.png", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Alappuzha", "Alappuzha", MAP_TODO, "/assets/images/places/location/alapuzha.webp"),
    ],
    faqs: [
      {
        q: "What professional programmes are available at Catalyst Skill Hub Alappuzha?",
        a: "Learners at Catalyst Skill Hub Alappuzha can explore programmes across Accounting, Marketing and Management. The available options include Certified Indian and Foreign Accounting (CIFA), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Are these courses suitable for someone planning to start a new career?",
        a: "Yes. These programmes can help individuals build knowledge and professional skills in their chosen field. Whether you are a recent graduate or looking to move into a different career, you can explore courses that match your interests and career plans.",
      },
      {
        q: "What will I learn in the Digital Marketing course?",
        a: "The Digital Marketing programme covers key areas of the digital marketing industry, including SEO, social media marketing, paid advertising, content marketing and analytics. It also introduces AI-integrated marketing practices and relevant industry tools.",
      },
      {
        q: "Does Skill Hub provide guidance on course selection and admission?",
        a: "Yes. Our team can help you understand the available programmes, course requirements and admission process. You can discuss your educational background and career interests with an advisor before selecting a course.",
      },
      {
        q: "What support is provided to students looking for jobs after course completion?",
        a: "Catalyst Skill Hub offers placement assistance and career preparation support. This includes resume development, LinkedIn profile guidance, mock interviews and interview preparation to help students approach employment opportunities with greater confidence.",
      },
      {
        q: "How can I find out about course schedules and fees at the Alappuzha campus?",
        a: "You can contact the Catalyst Skill Hub Alappuzha team for details about programme fees, course duration, eligibility and upcoming batches. The team can also guide you through the enrolment process and answer your admission-related questions.",
      },
      {
        q: "Can I enrol in a course if I am currently working?",
        a: "Yes. Working professionals can explore suitable learning options. Contact the Alappuzha campus at 9207300700 to understand the available schedules and choose a programme that fits your commitments.",
      },
    ],
  },

  // ===================== IDUKKI =====================
  {
    slug: "idukki",
    name: "Idukki",
    heading: "Catalyst Skill Hub Idukki",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Idukki Campus.",
    image: "/assets/images/cities/idukki.jpg", // TODO: placeholder (Kasargod photo) - add an Idukki image
    locations: [
      loc("Thodupuzha", "Thodupuzha", MAP_TODO),
    ],
    faqs: [
      {
        q: "What can I study at Catalyst Skill Hub Idukki?",
        a: "Catalyst Skill Hub Idukki offers specialised programmes in Accounting, Marketing and Management. Course options include CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Are Skill Hub courses helpful for improving my career?",
        a: "Yes. The programmes are designed to develop professional knowledge and practical competencies that can support your career development. Whether you want to enter the accounting field, explore digital marketing or build management skills, you can choose a programme aligned with your goals.",
      },
      {
        q: "What are the options for students interested in international accounting careers?",
        a: "Students interested in accounting opportunities in international markets can explore programmes such as GCC Accounting and CIFA. These courses introduce relevant accounting practices, tools and concepts that can help learners develop skills for accounting-related roles.",
      },
      {
        q: "Can I speak with someone before deciding on a course?",
        a: "Yes. You can connect with our academic team to discuss your qualifications, interests and career expectations. They can explain the course structure, learning requirements and available programmes to help you make a suitable choice.",
      },
      {
        q: "How does Catalyst Skill Hub help students become employment-ready?",
        a: "Students receive career preparation and placement assistance, including resume development, LinkedIn profile guidance, mock interviews and interview preparation. These initiatives are intended to help learners build confidence and prepare for professional opportunities.",
      },
      {
        q: "What details should I know before enrolling at the Idukki campus?",
        a: "Before enrolling, you can enquire about course eligibility, programme duration, fees and upcoming batch schedules. The Catalyst Skill Hub Idukki team can provide the necessary information and assist you with the admission process.",
      },
      {
        q: "Are there courses available for working professionals who want to upgrade their skills?",
        a: "Yes. Professionals looking to improve their existing skills or explore a new career direction can consider programmes in Accounting, Digital Marketing and Management. You can contact the campus team to find a course and batch schedule that suits your learning needs.",
      },
    ],
  },

  // ===================== KOTTAYAM =====================
  {
    slug: "kottayam",
    name: "Kottayam",
    heading: "Catalyst Skill Hub Kottayam",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Kottayam Campus.",
    image: "/assets/images/cities/KOTTAYAM.png", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Kottayam", "Kottayam", MAP_TODO),
    ],
    faqs: [
      {
        q: "What are the different courses available at Catalyst Skill Hub Kottayam?",
        a: "Catalyst Skill Hub Kottayam offers professional programmes in three key areas: Accounting, Marketing and Management. Students can choose from CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Which course should I consider after completing my degree?",
        a: "Your choice depends on your academic background and the career you want to pursue. Graduates interested in finance can explore accounting programmes, while those looking for opportunities in marketing or administration can consider Digital Marketing, HR Management or Office Administration.",
      },
      {
        q: "What software and professional tools are covered in the accounting programmes?",
        a: "Depending on the selected programme, students can gain exposure to industry-relevant accounting tools and software. For example, GCC Accounting covers tools such as Tally Prime, Zoho Books, QuickBooks, Advanced Excel, Power BI and SAP S/4HANA FICO.",
      },
      {
        q: "Are the programmes focused on practical knowledge or theoretical learning?",
        a: "The programmes combine conceptual learning with practical applications to help students understand how professional skills are used in real workplace situations. The aim is to develop knowledge that learners can apply beyond the classroom.",
      },
      {
        q: "Can I get assistance with job applications after completing my course?",
        a: "Yes. Catalyst Skill Hub provides placement assistance and career preparation support, including CV development, LinkedIn profile guidance, mock interviews and interview preparation to help students approach job opportunities.",
      },
      {
        q: "How do I apply for a course at Catalyst Skill Hub Kottayam?",
        a: "You can contact the Kottayam campus at 9207300700 or visit us directly to enquire about available programmes, eligibility, fees and admission schedules. The team will help you understand the enrolment requirements and guide you through the application process.",
      },
      {
        q: "Can I join a course while continuing my studies or current job?",
        a: "You can pursue a Skill Hub course while continuing your studies or current job. Depending on the programme and batch schedule, you can choose a learning option that fits your routine and helps you develop additional professional skills alongside your existing commitments.",
      },
    ],
  },

  // ===================== KOLLAM =====================
  {
    slug: "kollam",
    name: "Kollam",
    heading: "Catalyst Skill Hub Kollam",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Kollam Campus.",
    image: "/assets/images/cities/KOLLAM.png", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Kollam", "Kollam", MAP_TODO),
      loc("Kottarakkara", "Kottarakkara", MAP_TODO),
    ],
    faqs: [
      {
        q: "What courses can I enrol in at Catalyst Skill Hub Kollam?",
        a: "Catalyst Skill Hub Kollam offers career-oriented programmes in Accounting, Marketing and Management. Students can explore CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Which Skill Hub courses are suitable for students interested in finance and accounting?",
        a: "Students looking to build a career in accounting and finance can consider CIFA, GCC Accounting, Business Accounting and SAP Accounting. Each programme focuses on different aspects of accounting knowledge and professional applications, helping learners develop skills relevant to the field.",
      },
      {
        q: "Does the Digital Marketing course cover AI-based marketing practices?",
        a: "Yes. The Digital Marketing programme introduces modern marketing practices, including SEO, social media marketing, paid advertising, content marketing, analytics and AI-integrated marketing approaches. Students also get exposure to relevant digital marketing tools.",
      },
      {
        q: "Can I join a course if I have no professional experience?",
        a: "Yes. Several programmes are suitable for beginners and help students develop their knowledge progressively. You can explore the course requirements with our academic advisors to identify a programme that matches your educational background.",
      },
      {
        q: "What kind of practical learning opportunities are available at Skill Hub?",
        a: "Our programmes incorporate practical activities and industry-relevant applications to help students understand how professional concepts work in real business environments. This approach supports the development of skills needed in their chosen fields.",
      },
      {
        q: "Does Catalyst Skill Hub provide placement and career support?",
        a: "Yes. Students receive career preparation and placement assistance, including CV development, LinkedIn profile guidance, mock interviews and interview preparation to help them get ready for employment opportunities.",
      },
      {
        q: "Can I study at Skill Hub while continuing my degree or current job?",
        a: "Yes. You can pursue a Skill Hub programme alongside your degree or current job. Depending on the course and available batch schedules, you can explore a suitable learning option that fits your routine.",
      },
      {
        q: "How can I get started with admissions at the Kollam campus?",
        a: "Contact the Catalyst Skill Hub Kollam at 9207300700 to enquire about course fees, eligibility, programme duration and upcoming batches. The team can help you understand the available options and guide you through the admission process.",
      },
    ],
  },

  // ===================== THIRUVANANTHAPURAM =====================
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    heading: "Catalyst Skill Hub Thiruvananthapuram",
    description: "India's Top Upskilling Platform Explore Upskilling programmes in Accounting, Marketing & Management, and Technology at our Thiruvananthapuram Campus.",
    image: "/assets/images/cities/THIRUVANANTHAPURAM.png", // reuses the district image from the Centers section - replace with a campus photo when ready
    locations: [
      loc("Thiruvananthapuram", "Thiruvananthapuram", MAP_TODO),
      loc("Neyyatinkara", "Neyyatinkara", MAP_TODO),
      loc("Attingal", "Attingal", MAP_TODO),
    ],
    faqs: [
      {
        q: "What career-oriented programmes are available at Catalyst Skill Hub Thiruvananthapuram?",
        a: "Catalyst Skill Hub Thiruvananthapuram offers courses across Accounting, Marketing and Management. Students can explore CIFA (Certified Indian and Foreign Accounting), GCC Accounting, Business Accounting, SAP Accounting, Digital Marketing, HR Management and Office Administration.",
      },
      {
        q: "Which course can help me build a career in business and administration?",
        a: "If you are interested in business operations and administrative roles, you can consider programmes such as Office Administration, HR Management and Business Accounting. Each course focuses on different professional skills that can support your career interests.",
      },
      {
        q: "What makes the accounting courses relevant to today's job market?",
        a: "The accounting programmes introduce learners to professional accounting practices, financial concepts and relevant industry software. Depending on the course, students can develop knowledge in areas such as business accounting, GCC accounting practices and SAP S/4HANA Finance (FICO).",
      },
      {
        q: "Can I learn Digital Marketing even if I have no marketing background?",
        a: "Yes. The Digital Marketing programme is suitable for beginners who want to understand how businesses build and manage their online presence. It covers areas such as SEO, social media marketing, paid advertising, content strategy, analytics and AI-integrated marketing practices.",
      },
      {
        q: "How does Skill Hub prepare students for professional environments?",
        a: "The learning approach combines subject knowledge with practical applications to help students understand workplace requirements. Students also receive career preparation support through resume development, LinkedIn guidance, mock interviews and interview preparation.",
      },
      {
        q: "Can I pursue a Skill Hub course alongside my college studies?",
        a: "Yes. You can develop additional professional skills while continuing your degree or other studies. Depending on the programme and available batch timings, you can choose a suitable learning schedule that fits your academic routine.",
      },
      {
        q: "How do I get information about admissions at the Thiruvananthapuram campus?",
        a: "You can contact the Catalyst Skill Hub Thiruvananthapuram at 9207300700 to learn about course availability, eligibility, fees and upcoming batches. The team can also help you understand the admission requirements and choose a programme based on your interests.",
      },
    ],
  },
];

export const getCampus = (slug) => campuses.find((c) => c.slug === slug);
export const campusPath = (slug) => `/campus/${slug}`;