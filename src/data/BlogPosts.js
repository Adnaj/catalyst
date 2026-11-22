// Demo blog content (replace later with real posts / backend data).
//
// One post = { slug, title, category, date, image, excerpt, content, author, tags, comments }
//   category  ONE of the names in blogCategories (shown on the card, used by the filter + sidebar)
//   image     card + article banner            tags     shown under the article
//   excerpt   short text on the blog cards     content  the article body (list of blocks, see below)
//
// `content` is a list of blocks, written with the helpers below:
//   p("paragraph")   h("sub heading")   list(["point 1", "point 2"])   quote("highlighted text")
// A post without `content` shows `defaultContent`. (A backend can return the same blocks as JSON:
//   [{ type: "p", text }, { type: "h3", text }, { type: "list", items: [] }, { type: "quote", text }])

export const blogCategories = [
  { key: "career", label: "Career" },
  { key: "learning", label: "Learning" },
  { key: "skills", label: "Skills" },
  { key: "design", label: "Design" },
  { key: "marketing", label: "Marketing" },
];

// ---- content block helpers ----
const p = (text) => ({ type: "p", text });
const h = (text) => ({ type: "h3", text });
const list = (items) => ({ type: "list", items });
const quote = (text) => ({ type: "quote", text });

// shown for any post that has no `content` of its own
export const defaultContent = [
  p("The way people build careers has changed dramatically over the past decade. Traditional education is no longer the only route to professional success. Today, online learning provides flexible, affordable, and industry-focused education that helps individuals develop practical skills from anywhere in the world."),
  p("Whether you're a student, working professional, freelancer, or entrepreneur, online courses allow you to learn at your own pace while keeping up with rapidly evolving industries."),
  list(["Personalization at Scale", "Improved Customer Retention", "Data-Driven Insights", "Omni-channel Integration"]),
];

const AUTHOR = {
  name: "Burdee Nicolas",
  role: "Co founder",
  image: "/assets/images/instructor/instructor-4.webp",
  avatar: "/assets/images/users/user-img-7.png",
};

// `filters` (used by the filter buttons on /blog) is derived from `category`, so a post always
// belongs to exactly the category shown on its card.
const post = (p) => ({
  author: AUTHOR,
  comments: 3,
  date: "Feb - 20 - 2026",
  tags: ["Growth", "Success", "Innovate"],
  ...p,
  filters: [p.category.toLowerCase()],
});

export const blogPosts = [

  post({
  slug: "accounting-courses-in-kerala-explore-5-professional-accounting-programmes-catalyst-skillhub",
  title: "Accounting Courses in Kerala: Explore 5 Professional Accounting Programmes",
  category: "Accounting",
 image: "/assets/images/blog/blog-1.webp",
  excerpt: "Explore 5 professional accounting courses in Kerala that can help you build practical skills, earn industry-recognised certifications, and advance your accounting career.",
  content: [
    p("Accounting is one of the most valuable career fields for students and professionals looking for opportunities in India and abroad. With growing demand for skilled accountants, choosing the right professional accounting course can help you develop practical knowledge and improve your career prospects. Catalyst SkillHub offers career-focused accounting programmes designed to prepare learners for real-world finance and accounting roles."),

    h("Why choose a professional accounting course?"),
    p("A professional accounting programme goes beyond basic theoretical knowledge. It helps you understand accounting principles, financial reporting, taxation, business operations, and industry-standard accounting software."),
    list([
      "Develop practical accounting and financial management skills",
      "Learn industry-relevant accounting software and tools",
      "Improve your job opportunities in India and GCC countries",
      "Build confidence in handling real-world accounting tasks",
      "Earn professional certificates to strengthen your resume"
    ]),

    h("5 Professional Accounting Courses to Explore in Kerala"),
    p("If you are planning to build a career in accounting, here are five professional programmes worth considering."),

    h("1. Certified Indian and Foreign Accounting (CIFA)"),
    p("CIFA is designed for learners who want to understand both Indian and international accounting practices. The programme covers essential accounting concepts, financial management, taxation, and practical accounting applications, helping students prepare for accounting opportunities in different industries."),

    h("2. GCC Accounting Course"),
    p("The GCC Accounting programme focuses on accounting practices and financial operations relevant to Gulf countries. It is suitable for students and professionals who want to explore accounting and finance job opportunities in Qatar, UAE, Saudi Arabia, and other GCC countries."),

    h("3. Business Accounting Course"),
    p("Business Accounting helps learners understand everyday financial operations within an organisation. Students develop knowledge of bookkeeping, financial statements, business transactions, accounts management, and essential accounting software."),

    h("4. SAP Accounting Course"),
    p("SAP Accounting introduces learners to enterprise-level financial management using SAP systems. It helps students understand financial accounting processes, reporting, business transactions, and how large organisations manage financial data."),

    h("5. Professional Accounting and Taxation"),
    p("Professional Accounting and Taxation focuses on accounting fundamentals, taxation concepts, financial records, and compliance-related activities. It is a useful learning path for students interested in accounting, taxation, and finance-related roles."),

    h("Career Opportunities After Accounting Courses"),
    p("Completing a professional accounting course can open doors to several entry-level and experienced positions depending on your qualifications, practical skills, and experience."),
    list([
      "Accountant",
      "Junior Accountant",
      "Accounts Executive",
      "Accounts Assistant",
      "Payroll Executive",
      "Taxation Assistant",
      "Financial Reporting Assistant",
      "SAP Finance Executive"
    ]),

    h("Who Can Join These Accounting Courses?"),
    p("These programmes are suitable for commerce students, graduates, job seekers, freshers, and working professionals who want to develop their accounting knowledge. Beginners can also start with foundational accounting concepts and gradually build advanced skills."),

    h("Why Choose Catalyst SkillHub Academy?"),
    p("Catalyst SkillHub Academy focuses on practical, career-oriented training designed to help students develop industry-relevant skills. With online and offline learning options, experienced trainers, and a structured learning approach, students can work towards their professional goals."),
    list([
      "Industry-focused accounting programmes",
      "Practical training and hands-on learning",
      "Online and offline class options",
      "Career guidance and placement assistance",
      "Professional certification opportunities"
    ]),

    h("Start Your Accounting Career with the Right Course"),
    p("Choosing the right accounting course is an important step towards building a successful career. Whether your goal is to work in India or explore opportunities in the GCC region, developing practical accounting skills can give you a strong foundation. Explore the accounting programmes at Catalyst SkillHub Academy and take the next step towards your career.")
  ],
}),
  post({
  slug: "office-administration-course-skills-career-oppurtunities-and-future-scope-catalyst-skillhub",
  title: "Office Administration Course: Skills, Career Opportunities and Future Scope",
  category: "Career",
  image: "/assets/images/blog/blog-2.webp",
  excerpt: "Discover how an Office Administration course can help you develop essential workplace skills, explore career opportunities, and build a successful professional future.",
  content: [
    p("Every successful organisation depends on efficient office administration. From managing daily operations and coordinating meetings to maintaining records and supporting different departments, office administrators play an important role in keeping businesses organised. As companies continue to grow, the demand for skilled administrative professionals is creating opportunities across industries. An Office Administration course can help you develop the practical knowledge and workplace skills needed to start your career."),

    h("What Is Office Administration?"),
    p("Office Administration involves managing and coordinating the everyday activities of an organisation. It includes documentation, communication, scheduling, data management, record keeping, customer support, and general office operations. An office administrator ensures that business activities run smoothly and that employees have the administrative support they need."),

    h("Why Choose an Office Administration Course?"),
    p("An Office Administration course provides practical training in essential administrative tasks and modern workplace tools. It is suitable for freshers, graduates, job seekers, and working professionals who want to improve their organisational and professional skills."),
    list([
      "Develop professional communication and coordination skills",
      "Learn office documentation and record management",
      "Improve computer and administrative software skills",
      "Understand business operations and workplace procedures",
      "Build confidence for administrative and support roles",
      "Prepare for opportunities in different industries"
    ]),

    h("Essential Skills You Will Learn"),
    p("A successful office administrator needs a combination of technical knowledge, communication abilities, and organisational skills. A professional training programme helps learners develop the following competencies."),

    h("1. Computer and MS Office Skills"),
    p("Learn to work with Microsoft Word, Excel, PowerPoint, and other essential office applications. These tools are widely used for preparing documents, managing spreadsheets, creating reports, and presenting business information."),

    h("2. Communication and Email Management"),
    p("Professional communication is essential in every workplace. Learn how to prepare business emails, handle telephone enquiries, communicate with clients, and coordinate with colleagues."),

    h("3. Data Entry and Documentation"),
    p("Understand how to enter, organise, verify, and maintain business information accurately. Documentation skills help organisations manage records, invoices, reports, and important office files."),

    h("4. Time Management and Scheduling"),
    p("Office administrators frequently manage appointments, meetings, deadlines, and daily schedules. Strong time management and coordination skills help maintain productivity and avoid operational delays."),

    h("5. Customer Service and Coordination"),
    p("Learn how to respond to customer enquiries, support internal teams, manage visitors, and maintain professional relationships with clients and business partners."),

    h("Career Opportunities After an Office Administration Course"),
    p("After developing the necessary administrative and computer skills, learners can explore different entry-level and professional roles depending on their qualifications and experience."),
    list([
      "Office Administrator",
      "Administrative Assistant",
      "Office Coordinator",
      "Receptionist",
      "Data Entry Operator",
      "Document Controller",
      "HR Assistant",
      "Secretary",
      "Customer Service Executive",
      "Operations Assistant"
    ]),

    h("Industries That Hire Office Administration Professionals"),
    p("Office administration skills are useful across almost every business sector. Professionals with strong organisational and communication abilities can explore opportunities in:"),
    list([
      "Corporate offices and business organisations",
      "Healthcare centres and hospitals",
      "Educational institutions and training academies",
      "Construction and engineering companies",
      "Hotels and hospitality businesses",
      "Retail and trading companies",
      "Logistics and transportation organisations",
      "Government and private-sector offices"
    ]),

    h("Future Scope of Office Administration"),
    p("The future of office administration is evolving with digital transformation and modern business technologies. Many organisations are moving towards digital documentation, cloud-based collaboration, automated workflows, and integrated business management systems. This creates opportunities for administrative professionals who can combine traditional office management skills with digital knowledge."),
    p("Professionals who continuously improve their computer skills, communication abilities, data management knowledge, and understanding of modern office software can strengthen their career prospects. Administrative experience can also provide a pathway towards office management, operations coordination, and HR support roles."),

    h("Who Can Join an Office Administration Course?"),
    p("An Office Administration course is suitable for students who have completed their higher secondary education, graduates looking for employment, freshers entering the job market, and working professionals who want to improve their administrative capabilities. Basic computer knowledge can be helpful, but beginners can also develop their skills through structured training."),

    h("Why Choose Catalyst SkillHub Academy?"),
    p("Catalyst SkillHub Academy offers career-focused training designed to help learners develop practical workplace skills. The Office Administration programme focuses on building the knowledge and confidence required for modern administrative roles."),
    list([
      "Practical, career-oriented training",
      "Industry-relevant computer and office skills",
      "Professional communication and documentation training",
      "Online and offline learning options",
      "Expert guidance and structured learning",
      "Career guidance and placement support"
    ]),

   
  ],
}),
  post({
  slug: "what-an-hr-management-course-a-beginners-guide-to-building-a-careeer-in-human-resources-catalyst-skillhub",
  title: "What Is an HR Management Course? A Beginner's Guide to Building a Career in Human Resources",
  category: "Career",
  image: "/assets/images/blog/blog-3.webp",
  excerpt: "Discover what an HR Management course covers, the essential skills you need, career opportunities, and how to start a successful career in Human Resources.",
  content: [
    p("Human Resources (HR) is one of the most important departments in any organisation. From recruiting employees and managing workplace relationships to handling payroll, training, and performance evaluations, HR professionals help businesses build productive and successful teams. As organisations continue to expand, the demand for skilled HR professionals is growing. An HR Management course can help beginners develop the knowledge and practical skills required to enter this rewarding career field."),

    h("What Is Human Resource Management?"),
    p("Human Resource Management (HRM) refers to the process of managing an organisation's workforce. It involves recruiting suitable candidates, supporting employees, maintaining workplace policies, managing employee records, and ensuring smooth HR operations. HR professionals work closely with management and employees to create a positive and productive working environment."),

    h("What Is an HR Management Course?"),
    p("An HR Management course is a professional training programme that introduces learners to the fundamental principles and practices of human resource management. It helps students understand how organisations recruit, manage, develop, and retain employees."),
    p("For beginners, this course provides a structured introduction to HR operations and prepares learners for entry-level opportunities in human resources and administration."),

    h("Why Should You Choose an HR Management Course?"),
    p("If you enjoy communicating with people, organising activities, solving workplace challenges, and supporting business operations, human resources could be a suitable career path. Professional HR training helps you understand the responsibilities of an HR department and prepares you for real workplace situations."),
    list([
      "Understand recruitment and employee selection processes",
      "Learn employee records and documentation management",
      "Develop professional communication skills",
      "Understand payroll and attendance administration",
      "Learn performance management and employee engagement",
      "Explore modern HR practices and workplace policies"
    ]),

    h("Important Topics Covered in HR Management Training"),

    h("1. Recruitment and Selection"),
    p("Recruitment is one of the primary responsibilities of an HR department. Learn how to prepare job descriptions, publish vacancies, screen resumes, coordinate interviews, and support the candidate selection process."),

    h("2. Employee Onboarding and Documentation"),
    p("Understand how organisations welcome new employees, collect necessary documents, maintain employee information, and coordinate onboarding activities. Accurate documentation is essential for effective HR administration."),

    h("3. Payroll and Attendance Management"),
    p("Learn the fundamentals of salary administration, attendance tracking, leave management, overtime records, and payroll coordination. These activities help organisations maintain accurate employee compensation records."),

    h("4. Training and Development"),
    p("Employee development plays an important role in organisational growth. Explore how HR teams identify training requirements, coordinate learning programmes, monitor employee development, and support career growth."),

    h("5. Performance Management"),
    p("Understand how organisations evaluate employee performance through appraisals, feedback, performance reviews, and goal-setting processes. Effective performance management helps improve productivity and employee development."),

    h("6. Employee Relations and HR Policies"),
    p("Learn how HR professionals support workplace communication, handle employee concerns, maintain organisational policies, and encourage a healthy working environment."),

    h("7. HR Software and Digital Tools"),
    p("Modern HR departments use digital systems to manage employee records, recruitment activities, attendance, and payroll. Familiarity with spreadsheets and HR management systems can improve your ability to handle everyday HR responsibilities."),

    h("Essential Skills Required to Become an HR Professional"),
    p("A successful HR professional needs a combination of interpersonal, organisational, and technical skills. Some of the most important skills include:"),
    list([
      "Communication and interpersonal skills",
      "Recruitment and interview coordination",
      "Problem-solving and decision-making",
      "Time management and organisation",
      "Confidentiality and attention to detail",
      "Documentation and data management",
      "Basic payroll and HR administration knowledge",
      "Computer proficiency and spreadsheet skills"
    ]),

    h("Career Opportunities After an HR Management Course"),
    p("After completing relevant training and developing practical skills, learners can explore various entry-level HR and administrative positions. Career opportunities may include:"),
    list([
      "HR Assistant",
      "HR Executive",
      "HR Coordinator",
      "Recruitment Assistant",
      "Talent Acquisition Executive",
      "Payroll Assistant",
      "HR Administrator",
      "Training and Development Assistant",
      "Employee Relations Assistant"
    ]),
    p("Your career progression will depend on your educational qualifications, practical experience, professional skills, and the requirements of individual employers."),

    h("Industries That Offer HR Career Opportunities"),
    p("Human resource professionals are required in almost every industry because all organisations need effective workforce management. Some common sectors include:"),
    list([
      "Corporate offices and multinational companies",
      "Healthcare and hospital management",
      "Educational institutions",
      "Construction and engineering companies",
      "Hotels and hospitality businesses",
      "Retail and trading organisations",
      "Banking and financial services",
      "Information technology companies",
      "Logistics and transportation businesses"
    ]),

    h("Future Scope of Human Resource Management"),
    p("The HR profession is evolving as businesses adopt digital technologies and modern workforce management practices. Recruitment platforms, HR management software, employee analytics, and automated payroll systems are transforming traditional HR operations."),
    p("Organisations increasingly value professionals who understand both people management and digital HR processes. Developing skills in recruitment technology, employee engagement, data management, and HR software can help learners prepare for changing workplace requirements."),
    p("With relevant qualifications and experience, HR professionals can progress from assistant and executive positions into roles such as HR Manager, Talent Acquisition Manager, HR Business Partner, and Human Resources Director."),

    h("Who Can Join an HR Management Course?"),
    p("An HR Management course can be suitable for graduates, freshers, job seekers, and working professionals who want to enter the human resources field or improve their existing administrative knowledge. Students from commerce, business administration, arts, and other academic backgrounds may also explore HR as a career option, depending on course eligibility requirements."),

    h("Why Choose Catalyst SkillHub Academy?"),
    p("Catalyst SkillHub Academy focuses on practical, career-oriented education that helps learners develop skills relevant to today's job market. The HR Management programme is designed to introduce students to important HR functions and workplace practices."),
    list([
      "Career-focused professional training",
      "Practical learning and industry-relevant concepts",
      "Recruitment and HR administration fundamentals",
      "Professional communication and workplace skills",
      "Online and offline learning options",
      "Career guidance and placement support"
    ]),

    h("Start Your Career in Human Resources"),
    p("Human Resources offers an exciting career path for individuals who enjoy working with people, supporting employees, and contributing to organisational growth. With the right training, practical knowledge, and continuous learning, beginners can build a strong foundation for a career in HR."),
    p("Take the first step towards your professional journey with Catalyst SkillHub Academy. Explore HR Management training and develop the skills needed to pursue opportunities in the growing field of Human Resources.")
  ],
}),


];

// Demo comments (same for every post)
export const blogComments = [
  {
    id: 1,
    name: "Eleanor Pena",
    avatar: "/assets/images/users/user-img-2.png",
    date: "June 18, 2026 at 08:00 pm",
    text: "\"I completely agree that embracing innovation and leveraging data are crucial for any business looking to stay competitive in today's market. The focus on leadership and adaptability really resonated with me. Looking forward to implementing these strategies\"",

  },
  {
    id: 2,
    name: "Darrell Steward",
    avatar: "/assets/images/users/user-img-2.png",
    date: "June 18, 2026 at 08:00 pm",
    text: "\"I completely agree that embracing innovation and leveraging data are crucial for any business looking to stay competitive in today's market. The focus on leadership and adaptability really resonated with me. Looking forward to implementing these strategies\"",
    replies: [],
  },
];

export const blogTags = [
  "Career", "Business", "Finance", "Growth", "Digital",
  "Transform", "Tech", "Data", "Innovation", "Drive",
];

// ---- helpers ----
export const blogPath = (slug) => `/blog/${slug}`;
export const getPost = (slug) => blogPosts.find((p) => p.slug === slug);
export const featuredPosts = blogPosts.slice(0, 3);
export const gridPosts = blogPosts

// category sidebar: [{ key, label, count }]  - count = number of posts in that category
export const categoryCounts = () =>
  blogCategories.map((c) => ({
    ...c,
    count: blogPosts.filter((p) => p.category.toLowerCase() === c.key).length,
  }));

// posts of one category (all of them, including the 3 featured ones)
export const postsByCategory = (key) =>
  blogPosts.filter((p) => p.category.toLowerCase() === key);

// related posts: same category first, then the newest others, never the post itself
export const getRelatedPosts = (slug, limit = 3) => {
  const current = getPost(slug);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...same, ...rest].slice(0, limit);
};

// link to the blog list with one category selected
export const categoryPath = (key) => `/blog?category=${key}`;