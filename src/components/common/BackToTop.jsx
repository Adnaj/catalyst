import { useEffect, useState } from "react";
import { ArrowUp, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  const whatsappNumber = "974XXXXXXXX";
  const phoneNumber = "+974XXXXXXXX";

  const message = encodeURIComponent(
    "Hello! I would like to know more about your courses."
  );

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 0);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="back-to-top-btn-show">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className="floating-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us"
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-tooltip">Chat with us</span>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="floating-call"
        aria-label="Call us"
        title="Call us"
      >
        <Phone className="call-icon" size={30} />
        <span className="call-tooltip">Call us</span>
      </a>
    </div>
  );
};

export default BackToTop;