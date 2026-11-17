import Faq from "../home3/Faq";
import { getCourseFaqs } from "../../../data/faq";

// FAQ for one course page, grouped into tabs: [Online or Offline] + General.
//   mode="online"  -> Online + General tabs   (used by the online course page)
//   mode="offline" -> Offline + General tabs  (used by the offline course page)
// To show all three tabs on a page, add the third entry to `categories` below.
const CourseFaq = ({ slug, title, mode = "online" }) => {
  const f = getCourseFaqs(slug, title);
  const isOffline = mode === "offline";
  const modeTab = isOffline
    ? { key: "offline", label: "Offline", faqs: f.offline }
    : { key: "online", label: "Online", faqs: f.online };

  return (
    <Faq
      idPrefix={`course-${mode}-${slug}`}
      heading={`${title} FAQs`}
      description={`Common questions about the ${title} ${isOffline ? "offline" : "online"} course. Can’t find what you’re looking for?`}
      defaultCategory={modeTab.key}
      categories={[modeTab, { key: "general", label: "General", faqs: f.general }]}
    />
  );
};

export default CourseFaq;