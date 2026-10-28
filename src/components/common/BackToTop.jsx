
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  const whatsappNumber = "974XXXXXXXX";
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
    <div
      className='back-to-top-btn-show'
    >
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

      {/* Back to top */}
      {/* <button
        id="back-to-top"
        type="button"
        className="back-to-top-btn"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <span className="back-to-top-icon">
          <ArrowUp size={23} strokeWidth={2.5} />
        </span>
      </button> */}
    </div>
  );
};

export default BackToTop;

