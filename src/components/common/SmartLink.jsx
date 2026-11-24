import { Link } from "react-router-dom";

// Drop-in replacement for react-router's <Link>.
//   to = "https://..."  -> normal <a> that opens in a NEW TAB (tech courses on catalysttech.in)
//   to = "/courses/.."  -> normal <Link> (same tab, no reload)
const SmartLink = ({ to, children, ...rest }) =>
  /^https?:\/\//i.test(to || "") ? (
    <a href={to} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  ) : (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );

export default SmartLink;