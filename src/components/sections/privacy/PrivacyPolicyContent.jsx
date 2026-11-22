import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Privacy policy page. Class names are the same as privacy-policy.html.
// To change the policy text, edit LAST_UPDATED / INTRO / SECTIONS below - the "On this page"
// list and the numbering (01., 02. ...) are generated from SECTIONS automatically.
//
// A section is { id, title, text?, items?: [{ label, text }], textAfter? }
//   text   -> paragraph shown under the title        items -> bullet list (bold label + text)

const LAST_UPDATED = "05 November 2026";

const INTRO =
  "The purpose of this document is to outline how Catalyst collects, uses, stores, and protects your personal information when you visit our website (catalystskillhub.in), enquire about courses, request a callback or interact with our services. In this policy, “Catalyst SkillHub”, “we”, “our”, and “us” refer to the entity operating the Catalyst SkillHub website.";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    text: "We may collect personal information that you voluntarily provide through our website forms or other communication channels, including:",
    items: [
      {
        label: "Personal information",
        text: "Name, phone number, email address, your preferred city or learning location, where requested, or any other information you voluntarily provide to us.",
      },
      {
        label: "Non-personal information",
        text: "IP addresses, browser type, operating system, and other technical information.",
      },
    ],
  },
  {
    id: "how-we-collect-data",
    title: "How we collect data",
    items: [
      {
        label: "Directly from you",
        text: "When you submit an enquiry form, request a callback, or request a brochure download.",
      },
      {
        label: "Automatically",
        text: "Certain technical and usage information may be collected through tools like Google Analytics to understand user behaviour and to improve our services.",
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How we use your information",
    items: [
      {
        label: "To provide services",
        text: "To process course registration and admission-related processes. To provide access to relevant course information, learning resources and student support services.",
      },
      {
        label: "Communication and updates",
        text: "To provide relevant updates about courses, programmes and services. To communicate updates, announcements, and marketing materials related to our academy.",
      },
      {
        label: "Website improvement and analytics",
        text: "To understand how visitors use our website. To evaluate marketing performance and improve our website content and functionality.",
      },
      {
        label: "Security",
        text: "To protect our website, prevent fraudulent or unauthorised activities, and safeguard personal information against unauthorised access or misuse.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data security",
    text: "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, disclosure, alteration, loss or misuse. Only authorised personnel can access the personal information collected through our website. We also take steps to maintain website security and prevent unauthorised activities.",
  },
  {
    id: "information-sharing",
    title: "Information sharing with third parties",
    text: "We do not sell or rent your personal information to third parties. We may share your information in limited circumstances when it is necessary for the purposes described in this privacy policy.",
    items: [
      {
        label: "Service providers",
        text: "We may share relevant information with trusted service providers that help us operate our website, manage enquiries, communicate with users, or maintain our systems.",
      },
      {
        label: "Legal requirements",
        text: "We may disclose your information when required to comply with applicable laws, regulations, legal proceedings or requests from authorised government or regulatory authorities.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    text: "You have the following rights regarding your personal information, subject to applicable laws:",
    items: [
      {
        label: "Access",
        text: "You can request information about the personal data we hold about you.",
      },
      {
        label: "Correction",
        text: "You can request corrections to inaccurate or incomplete personal information.",
      },
      {
        label: "Deletion",
        text: "You can request the deletion of your personal information, subject to applicable legal requirements.",
      },
      {
        label: "Marketing preference",
        text: "You can opt out of promotional communication at any time by using the unsubscribe option, or by contacting us directly.",
      },
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to this privacy policy",
    text: "We may update this privacy policy from time to time to reflect changes in our services, website, data practices or applicable laws. Any changes will be published on this page along with the updated date. We encourage you to review this privacy policy periodically to stay informed.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const PrivacyPolicyContent = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // highlight the "On this page" item of the block that is currently on screen
  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      });
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="space-for-header"></div>

      {/* start: Page Header Section */}
      <section className="tj-page-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tj-page-header-content">
                <h1 className="tj-page-title">Privacy Policy</h1>
                <div className="tj-page-link">
                  <span>
                    <i className="tji-home"></i>
                  </span>
                  <span>
                    <Link to="/">Home</Link>
                  </span>
                  <span>
                    <i className="tji-arrow-right-4"></i>
                  </span>
                  <span>
                    <span>Privacy policy</span>
                  </span>
                </div>
                <div className="shape">
                  <img src="/assets/images/shapes/stars.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end: Page Header Section */}

      {/* start: Privacy Policy Section */}
      <section className="tj-privacy-section section-gap-bottom fix tj-sticky-container">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4">
              <div className="tj-sticky-item">
                <div className="tj-privacy-sidebar">
                  <div className="tj-privacy-toc">
                    <h3 className="toc-title">On this page</h3>
                    <ul className="toc-list">
                      {SECTIONS.map((s) => (
                        <li key={s.id} className={activeId === s.id ? "active" : ""}>
                          <a href={`#${s.id}`}>{s.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-xl-8 col-lg-8">
              <div className="tj-privacy-content">
                <div className="privacy-meta">
                  <span className="meta-badge">
                    <i className="tji-guarantee"></i> Your privacy matters
                  </span>
                  <span className="meta-updated">
                    Last updated: <strong>{LAST_UPDATED}</strong>
                  </span>
                </div>

                <p className="privacy-intro">{INTRO}</p>

    

                {SECTIONS.map((s, i) => (
                  <div className="privacy-block" id={s.id} key={s.id}>
                    <h3 className="block-title">
                      {pad(i + 1)}. {s.title}
                    </h3>
                    {s.text && <p>{s.text}</p>}
                    {s.items && (
                      <ul className="privacy-list">
                        {s.items.map((it) => (
                          <li key={it.label}>
                            <i className="tji-check"></i>
                            <span>
                              <strong>{it.label}</strong> — {it.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="privacy-cta tj-fade-anim">
                  <div className="cta-text">
                    <h3 className="cta-title">Still have questions?</h3>
                    <p>
                      If you have any questions about this privacy policy or how your
                      information is handled, please get in touch with us.
                    </p>
                  </div>
                  <Link
                    className="tj-btn-primary tj-btn-primary-light flip-text-wrap"
                    to="/contact"
                  >
                    <span className="btn-text">Contact us</span>
                    <span className="btn-icon">
                      <i className="tji-arrow-right-2"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end: Privacy Policy Section */}
    </>
  );
};

export default PrivacyPolicyContent;