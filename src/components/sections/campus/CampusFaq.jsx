import Faq from "../home3/Faq";
import useCampus from "./useCampus";

// FAQ for one district page (/campus/:campusSlug) - single list, no tabs.
// Questions come from `faqs` in data/campuses.js; a campus without `faqs` shows the general FAQ.
const CampusFaq = () => {
  const { campus } = useCampus();
  if (!campus) return null;

  return (
    <Faq
      idPrefix={`campus-${campus.slug}`}
      heading={`${campus.heading} FAQs`}
      description={`Common questions about studying at ${campus.heading}. Can’t find what you’re looking for?`}
      faqs={campus.faqs?.length ? campus.faqs : undefined}
    />
  );
};

export default CampusFaq;