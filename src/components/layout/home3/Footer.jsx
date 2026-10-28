// Footer matching the Catalyst Skill Hub design mockup
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const campuses = [
  "Kannur",
  "Vadakara",
  "Calicut",
  "Manjeri",
  "Perinthalmanna",
  "Kottakkal",
  "Edappal",
  "Thrissur",
  "Kochi",
];

const marketing = ["Digital Marketing", "Office Administration", "HR Management"];
const accounting = ["CIFA", "SAP Accounting", "Business Accounting"];
const tech = ["Python full-stack with devops", "Data analytics with gen ai", "Cyber Security"];

const catalystLinks = ["Success stories", "Blogs & Insights", "Contact", "Careers", "Apply as mentor"];
const moreLinks = ["About", "Terms & Conditions", "Privacy policy"];

const learnOnline = [
  "Digital Marketing",
  "Office Administration",
  "HR Management",
  "CIFA",
  "SAP Accounting",
  "Business Accounting",
  "Python full-stack with devops",
  "Data analytics with gen ai",
  "Cyber Security",
];

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
  { name: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { name: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

const LinkList = ({ items }) => (
  <ul className="csh-list">
    {items.map((item) => (
      <li key={item}>
        <a href="#">{item}</a>
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

const Footer = () => (
  <>
    <style>{styles}</style>
    <footer id="scroll-target" className="csh-footer">
      <div className="csh-container">
        <div className="csh-grid">
          {/* Brand + contact */}
          <div className="csh-col-brand">
            <a href="/" className="csh-logo">
              <img src="/assets/images/hero/logo.png" alt="Catalyst Skill Hub" />
            </a>
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
                <a className="csh-box is-phone" href="tel:9745200500">
                  +91 45200500
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

            <div className="csh-group">
              <h4 className="csh-sub">Marketing &amp; Management</h4>
              <LinkList items={marketing} />
            </div>
            <div className="csh-group">
              <h4 className="csh-sub">Accounting</h4>
              <LinkList items={accounting} />
            </div>
            <div className="csh-group">
              <h4 className="csh-sub">Tech Courses</h4>
              <LinkList items={tech} />
            </div>
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
            <a key={c} href="#">
              {c}
            </a>
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

export default Footer;