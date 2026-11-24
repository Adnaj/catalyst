import { Link } from "react-router-dom";
import useNavigation, { isExternal } from "../../../hooks/useNavigation";
// Footer matching the Catalyst Skill Hub design mockup
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

// `to` = internal route. Items without `to` have no page yet (render as inert links).
const L = (label, to) => ({ label, to });

// Campus names -> the campus page that contains them (same mapping as the navbar)
const campuses = [
  L("Kannur", "/campus/kannur"),
  L("Vadakara", "/campus/kozhikode"),
  L("Calicut", "/campus/kozhikode"),
  L("Manjeri", "/campus/malappuram"),
  L("Perinthalmanna", "/campus/malappuram"),
  L("Kottakkal", "/campus/malappuram"),
  L("Edappal", "/campus/malappuram"),
  L("Thrissur", "/campus/thrissur"),
  L("Kochi", "/campus/ernakulam"),
];

const marketing = [
  L("Digital Marketing", "/courses/digital-marketing"),
  L("Office Administration", "/courses/office-administration"),
  L("HR Management", "/courses/human-resource-management"),
];
const accounting = [
  L("CIFA", "/courses/certified-indian-foreign-accounting"),
  L("SAP Accounting", "/courses/sap-accounting"),
  L("Business Accounting", "/courses/business-accounting"),
];
const tech = [
  L("Python full-stack with devops", "https://www.catalysttech.in/course/python-full-stack-development-with-devops"),
  L("Data analytics with gen ai", "https://www.catalysttech.in/course/data-analytics-with-generative-ai"),
  L("Cyber Security", "https://www.catalysttech.in/course/cyber-security"),
];

const catalystLinks = [
  L("Success stories", "/success-stories"),
  L("Blogs & Insights", "/blog"),
  L("Contact", "/contact"),
  L("Careers", "/career"), 
  L("Apply as mentor", "/contact"), // no page yet
];
const moreLinks = [
  L("About", "/about"),
  L("Privacy policy", "/privacy-policy"),
];

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { name: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

// Internal link when `to` exists, otherwise an inert placeholder (no jump to top)
const FooterLink = ({ to, external, children, ...rest }) =>
  to && (external || isExternal(to)) ? (
    <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  ) : to ? (
    <Link to={to} {...rest}>
      {children}
    </Link>
  ) : (
    <a href="#" onClick={(e) => e.preventDefault()} {...rest}>
      {children}
    </a>
  );

const LinkList = ({ items }) => (
  <ul className="csh-list">
    {items.map((item) => (
      <li key={item.label}>
        <FooterLink to={item.to} external={item.external}>
          {item.label}
        </FooterLink>
      </li>
    ))}
  </ul>
);

const styles = `
.csh-footer {
  background: #fafafa;
  color: #1a1a1a;
  font-size: 14px;
  line-height: 1.5;
  padding: 36px 0 28px;
}
.csh-footer * { box-sizing: border-box; }
.csh-footer a { color: inherit; text-decoration: none; }
.csh-footer a:hover { text-decoration: underline; }
.csh-footer a:focus-visible { outline: 2px solid #4b3fd6; outline-offset: 2px; }
.csh-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

.csh-grid {
  display: grid;
  grid-template-columns: 1.1fr 1.2fr 1fr 1fr;
  gap: 32px 40px;
}
.csh-logo img { height: 35px; width: auto; display: block; }
.csh-tagline { margin: 28px 0 0; }
.csh-block { margin-top: 28px; }
.csh-block strong { display: block; font-weight: 700; }
.csh-block address { font-style: normal; max-width: 160px; }

.csh-contact { margin-top: 12px; display: flex; flex-direction: column; gap: 16px; }
.csh-box {
  display: block;
  width: 245px;
  padding: 8px 8px;
  border: 1px solid #8a8a8a;
  border-radius: 8px;
  background: #fff;
  color: #1a1a1a;
}
.csh-box.is-phone { background: #dedbff; border-color: #8f86e8; }

.csh-heading { font-size: 19px; font-weight: 700; margin: 0 0 12px; }
.csh-sub { font-size: 16px; font-weight: 600; margin: 0 0 10px; }
.csh-group{ margin-top: 18px; }
.csh-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.csh-col-programmes .csh-list { gap: 12px; }

.csh-campus {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 0;
}
.csh-campus strong { margin-right: 8px; }
.csh-campus a { padding-right: 10px; margin-right: 10px; border-right: 1px solid #1a1a1a; line-height: 1.1; }

.csh-divider { border: 0; border-top: 1px solid #c9c9c9; margin: 28px 0 20px; }

.csh-bottom { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.csh-socials { list-style: none; margin: 0; padding: 0; display: flex; gap: 10px; }
.csh-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 16px;
  width: 37px;
  height: 37px;
  border-radius: 8px;
  background: #d4d4d4;
  border: 1px solid #bdbdbd;
}
.csh-socials a:hover { background: #c4c4c4; text-decoration: none; }

@media (max-width: 991px) {
  .csh-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 575px) {
  .csh-grid { grid-template-columns: 1fr; }
  .csh-campus a { margin-right: 8px; padding-right: 8px; }
}
`;

const Footer = () => {
  const { groups } = useNavigation();

  // API data when loaded, otherwise the static lists above
  const fallback = [
    { label: "Marketing & Management", slug: "marketing-management", to: "/category/marketing-management", children: marketing },
    { label: "Accounting", slug: "accounting", to: "/category/accounting", children: accounting },
    { label: "Tech Courses", slug: "tech", to: "https://www.catalysttech.in/courses", external: true, children: tech },
  ];
  const programmes = groups ? groups.offline.filter((g) => g.children.length) : fallback;
  const learnOnline = groups
    ? groups.online.flatMap((g) => g.children)
    : fallback.flatMap((g) => g.children);

  return (
  <>
    <style>{styles}</style>
    <footer id="scroll-target" className="csh-footer">
      <div className="csh-container">
        <div className="csh-grid">
          {/* Brand + contact */}
          <div className="csh-col-brand">
            <Link to="/" className="csh-logo">
              <img src="/assets/images/hero/logo.png" alt="Catalyst Skill Hub" />
            </Link>
            <p className="csh-tagline">South Indias NO.1 Upskilling Platform</p>

            <div className="csh-block">
              <strong>Head quaters Address:</strong>
              <p>
                Happy Tower, Bypass Junction, Mankave, Kozhikode, Keralam 673007
              </p>
            </div>

            <div className="csh-block">
              <strong>Connect Us</strong>
              <div className="csh-contact">
                <a className="csh-box is-phone" href="tel:+91 9207300700">
                  +91 9207300700
                </a>
                <a className="csh-box" href="mailto:Hello@catalysthub.in">
                  Hello@catalysthub.in
                </a>
              </div>
            </div>
          </div>

          {/* Programmes */}
          <div className="csh-col-programmes">
            <h3 className="csh-heading">Programmes</h3>

            {programmes.map((g) => (
              <div className="csh-group" key={g.slug}>
                <h4 className="csh-sub">
                  <FooterLink to={g.to} external={g.external}>
                    {g.label.replace(/ Courses$/, "")}
                  </FooterLink>
                </h4>
                <LinkList items={g.children} />
              </div>
            ))}
          </div>

          {/* Catalyst + More */}
          <div className="csh-col-catalyst">
            <h3 className="csh-heading">Catalyst</h3>
            <LinkList items={catalystLinks} />

            <div className="csh-group">
              <h4 className="csh-heading">More</h4>
              <LinkList items={moreLinks} />
            </div>
          </div>

          {/* Learn Online */}
          <div className="csh-col-learn">
            <h3 className="csh-heading">Learn Online</h3>
            <LinkList items={learnOnline} />
          </div>
        </div>

        {/* Campuses */}
        <div className="csh-campus">
          <strong>Campus:</strong>
          {campuses.map((c) => (
            <Link key={c.label} to={c.to}>
              {c.label}
            </Link>
          ))}
        </div>

        <hr className="csh-divider" />

        {/* Copyright + socials */}
        <div className="csh-bottom">
          <p style={{ margin: 0 }}>copyright@catalystskillhub</p>
          <ul className="csh-socials">
            {socials.map(({ name, href, Icon }) => (
              <li key={name}>
                <a href={href} aria-label={name} target="_blank" rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  </>
  );
};

export default Footer;