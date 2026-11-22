import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Link2, ListChecks } from "lucide-react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ErrorContent from "../error/ErrorContent";
import {
  blogPath,
  categoryPath,
  getPost,
  getRelatedPosts,
  defaultContent,
} from "../../../data/BlogPosts";
import { courses, coursePath, coursesByCategory } from "../../../data/courses";

// Blog details page (route: /blog/:slug) - article layout in the style of upGrad blogs:
// breadcrumb > title > byline + share > table of contents > article > FAQ > author > suggested blogs,
// with a sticky "Speak with an Expert" sidebar.
//
// CONTENT BLOCKS (post.content in data/BlogPosts.js). Old posts keep working as they are.
//   p("text")                       paragraph (**bold** works inside text)
//   h("Heading")                    section heading (H2). A heading that starts with "1." / "2." ... becomes a sub heading (H3)
//   { type: "h2" | "sub", text }    force H2 / H3
//   list(["a", "b"])                bullet list. "Lead – text" or "Lead: text" shows the lead in bold
//   { type: "ol", items: [] }       numbered list (same bold-lead rule)
//   quote("text")                   highlighted note
//   { type: "callout", text, label?, to?, cta? }       purple call-to-action box
//   { type: "mustread", text, to }  "Must Read: ..." link line
//   { type: "table", head: [], rows: [[]] }
//   { type: "image", src, alt, caption? }
//   { type: "faq", items: [{ q, a }] }   (or put post.faqs = [{ q, a }])
// The table of contents is built automatically from the H2 headings (+ FAQ).

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// The site uses GSAP ScrollSmoother, so native "#anchor" jumps break scrolling (the page gets stuck).
// Always scroll through the smoother (falls back to window.scrollTo when it is not active).
const scrollToId = (id, offset = 110) => {
  const el = document.getElementById(id);
  if (!el) return;
  const wrapper = document.getElementById("smooth-wrapper");
  if (wrapper) {
    wrapper.scrollTop = 0; // undo any native jump the browser made inside the wrapper
    wrapper.scrollLeft = 0;
  }
  const smoother = ScrollSmoother.get?.();
  if (smoother) {
    smoother.scrollTo(el, true, `top ${offset}px`);
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const isSubHeading = (t) => /^\d+\s*[.)]\s+/.test(t);

const textOf = (b) =>
  [b.text, ...(b.items || []).map((i) => (typeof i === "string" ? i : `${i.q || ""} ${i.a || ""}`))]
    .filter(Boolean)
    .join(" ");

// **bold** inside any text
const Rich = ({ text }) =>
  String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
    );

// "Lead – rest" or "Lead: rest" -> bold lead
const ListText = ({ text }) => {
  const m = String(text).match(/^(.{2,70}?)(\s[–—-]\s|:\s)([\s\S]+)$/);
  if (m && m[1].split(" ").length <= 8) {
    return (
      <>
        <strong>{m[1]}</strong>
        {m[2].trim() === ":" ? ": " : " – "}
        <Rich text={m[3]} />
      </>
    );
  }
  return <Rich text={text} />;
};


const ConsultForm = ({ slug }) => {
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!phone || !isValidPhoneNumber(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      // same endpoint + payload shape as LeadPopup
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          phone,
          formTitle: "Get Free Consultation",
          source: "blog-details-sidebar",
          meta: { source: "blog-details-sidebar", blog: slug },
          pageUrl: window.location.href,
          pagePath: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch {
      /* same behaviour as LeadPopup: failures are not shown to the visitor */
    }
    setStatus("done");
    setPhone(undefined);
  };

  return (
    <div className="bd-consult">
      <h4>Get Free Consultation</h4>
      {status === "done" ? (
        <p className="bd-consult-done">
          <Check size={18} /> Thank you! Our counsellor will call you shortly.
        </p>
      ) : (
        <form onSubmit={submit} noValidate>
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="IN"
            placeholder="Phone Number *"
            value={phone}
            onChange={setPhone}
          />
          {error && <span className="bd-consult-error">{error}</span>}
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Submitting..." : "Submit"}
          </button>
          <small>
            By submitting, I accept the <Link to="/privacy-policy">T&amp;C</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </small>
        </form>
      )}
    </div>
  );
};

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 id={slugify(block.text)}>{block.text}</h2>;
    case "sub":
      return <h3 id={slugify(block.text)}>{block.text}</h3>;
    case "h3":
      return isSubHeading(block.text) ? (
        <h3 id={slugify(block.text)}>{block.text}</h3>
      ) : (
        <h2 id={slugify(block.text)}>{block.text}</h2>
      );
    case "list":
      return (
        <ul className="bd-list">
          {block.items.map((t, i) => (
            <li key={i}>
              <ListText text={t} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="bd-olist">
          {block.items.map((t, i) => (
            <li key={i}>
              <ListText text={t} />
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="bd-note">
          <Rich text={block.text} />
        </blockquote>
      );
    case "callout":
      return (
        <div className="bd-callout">
          <p>
            {block.label && <strong>{block.label} </strong>}
            <Rich text={block.text} />
          </p>
          {block.to && (
            <Link to={block.to} className="bd-callout-btn">
              {block.cta || "Know more"} <ArrowRight size={16} />
            </Link>
          )}
        </div>
      );
    case "mustread":
      return (
        <p className="bd-mustread">
          <em>Must Read:</em>{" "}
          {block.to ? (
            block.to.startsWith("http") ? (
              <a href={block.to} target="_blank" rel="noreferrer">
                {block.text}
              </a>
            ) : (
              <Link to={block.to}>{block.text}</Link>
            )
          ) : (
            block.text
          )}
        </p>
      );
    case "table":
      return (
        <div className="bd-table-wrap">
          <table>
            {block.head && (
              <thead>
                <tr>
                  {block.head.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure className="bd-figure">
          <img src={block.src} alt={block.alt || ""} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "faq":
      return null; // rendered once, after the article
    default:
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
  }
};



const BlogDetailsContent = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  // reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // opening a link that already has #section - scroll there through the smoother
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace("#", ""));
    if (!id) return;
    const t = setTimeout(() => scrollToId(id), 600);
    return () => clearTimeout(t);
  }, [slug]);

  const goTo = (e, id) => {
    e.preventDefault();
    scrollToId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  // Sticky sidebar. CSS "position: sticky" does not work here because ScrollSmoother moves the whole
  // page with a transform, so the sidebar is pinned with ScrollTrigger instead (desktop only).
  const asideRef = useRef(null);
  const stickyRef = useRef(null);
  const articleRef = useRef(null);
  useEffect(() => {
    const col = asideRef.current;
    const box = stickyRef.current;
    if (!col || !box) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px)", () => {
      const st = ScrollTrigger.create({
        trigger: col,
        start: "top 110px",
        end: () => `+=${Math.max(0, col.offsetHeight - box.offsetHeight)}`,
        pin: box,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      return () => st.kill();
    });

    // article height changes (TOC open, FAQ open, images loading) -> recalculate the pin range
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(refresh);
    if (articleRef.current) ro.observe(articleRef.current);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [slug]);

  const data = useMemo(() => {
    if (!post) return null;
    const blocks = post.content?.length ? post.content : defaultContent;
    const body = blocks.filter((b) => b.type !== "faq");


    const toc = body
      .filter((b) => b.type === "h2" || (b.type === "h3" && !isSubHeading(b.text)))
      .map((b) => ({ id: slugify(b.text), text: b.text }));

    const words = blocks.map(textOf).join(" ").split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));

    // newsletter box goes in front of the H2 nearest to 60 % of the article (only for longer posts)


    return { body, toc, minutes };
  }, [post]);

  if (!post) return <ErrorContent />;

  const { body, toc, minutes } = data;
  const suggested = getRelatedPosts(slug, 3);
  const author = post.author || {};
  const url = typeof window !== "undefined" ? window.location.href : "";
  const catKey = String(post.category || "").toLowerCase();

  const sameCat = coursesByCategory(post.category);
  const programs = (sameCat.length ? sameCat : courses).slice(0, 4);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked - ignore */
    }
  };

  const collapsedCount = 4;
  const visibleToc = tocOpen ? toc : toc.slice(0, collapsedCount);

  return (
    <>
      <style>{css}</style>
      <div className="bd-progress" style={{ width: `${progress}%` }} />
      <div className="space-for-header" />

      <div className="bd-page">
        <div className="container">
          <div className="row g-5">
            {/* ================= ARTICLE ================= */}
            <div className="col-lg-8">
              <article className="bd-article" ref={articleRef}>
                {/* breadcrumb */}
                <nav className="bd-breadcrumb" aria-label="Breadcrumb">
                  <Link to="/">Home</Link>
                  <span>&gt;</span>
                  <Link to="/blog">Blog</Link>
                  {post.category && (
                    <>
                      <span>&gt;</span>
                      <Link to={categoryPath(catKey)}>{post.category}</Link>
                    </>
                  )}
                  <span>&gt;</span>
                  <strong>{post.title}</strong>
                </nav>

                <h1 className="bd-title">{post.title}</h1>

                <div className="bd-meta-row">
                  <div className="bd-byline">
                    <span className="bd-by">
                      By <Link to="/blog">{author.name || "Catalyst SkillHub"}</Link>
                    </span>
                    <span className="bd-updated">
                      Updated on {post.date} | {minutes} min read
                      {post.views ? ` | ${post.views} views` : ""}
                    </span>
                  </div>

                  <div className="bd-share">
                    <span>Share:</span>
                    <button type="button" onClick={copyLink} aria-label="Copy link" title={copied ? "Link copied" : "Copy link"}>
                      {copied ? <Check size={16} /> : <Link2 size={16} />}
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on WhatsApp"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <FaLinkedinIn size={16} />
                    </a>
                  </div>
                </div>

                {/* table of contents */}
                {toc.length > 1 && (
                  <div className="bd-toc">
                    <div className="bd-toc-head">
                      <span className="bd-toc-icon">
                        <ListChecks size={16} />
                      </span>
                      <h4>Table of Contents</h4>
                    </div>
                    <ul className={!tocOpen && toc.length > collapsedCount ? "faded" : ""}>
                      {visibleToc.map((t, i) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`} onClick={(e) => goTo(e, t.id)}>
                            {i + 1}. {t.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {toc.length > collapsedCount && (
                      <button type="button" className="bd-toc-more" onClick={() => setTocOpen(!tocOpen)}>
                        {tocOpen ? "View less" : "View all"}
                        <ChevronDown size={16} className={tocOpen ? "up" : ""} />
                      </button>
                    )}
                  </div>
                )}

                {/* article body */}
                <div className="bd-content">
                  {body.map((block, i) => (
                    <div key={i} className="bd-block">
                      <Block block={block} />
                    </div>
                  ))}

              
                </div>

     
     
              </article>
            </div>

            {/* ================= SIDEBAR ================= */}
            <aside className="col-lg-4" ref={asideRef}>
              <div className="bd-sidebar" ref={stickyRef}>
                <ConsultForm slug={slug} />

                <div className="bd-widget">
                  <h4>Recommended Programs</h4>
                  <ul className="bd-programs">
                    {programs.map((c) => (
                      <li key={c.slug}>
                        <Link to={coursePath(c.slug)}>
                          {c.image && <img src={c.image} alt={c.title} loading="lazy" />}
                          <span>
                            <strong>{c.title}</strong>
                            <small>
                              {c.type} · {c.duration}
                            </small>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* ================= SUGGESTED BLOGS ================= */}
          {suggested.length > 0 && (
            <section className="bd-suggested">
              <div className="bd-suggested-head">
                <h3>Suggested Blogs</h3>
                <Link to="/blog">
                  View all blogs <ArrowRight size={16} />
                </Link>
              </div>
              <div className="row g-4">
                {suggested.map((s) => (
                  <div className="col-md-6 col-lg-4" key={s.slug}>
                    <Link to={blogPath(s.slug)} className="bd-card">
                      <img src={s.image} alt={s.title} loading="lazy" />
                      <div>
                        <span className="bd-card-cat">{s.category}</span>
                        <h5>{s.title}</h5>
                        <small>{s.date}</small>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

const css = `
.bd-page{--bd-accent:#313085;--bd-accent-dark:#313085;--bd-accent-soft:#e1e0ff;--bd-accent-line:#e1e0ff;--bd-ink:#1f1f2e;--bd-text:#3a3a4a;--bd-muted:#6f7080;--bd-line:#e6e6ee}
.bd-progress{position:fixed;top:0;left:0;height:3px;background:#e8334f;z-index:10000;transition:width .1s linear}
.bd-page{background:#fff;padding:20px 0 80px;color:var(--bd-ink)}
.bd-page *{box-sizing:border-box}
.bd-page a{text-decoration:none}

/* breadcrumb */
.bd-breadcrumb{display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-size:12.5px;color:var(--bd-muted);margin-bottom:22px}
.bd-breadcrumb a{color:var(--bd-muted)}
.bd-breadcrumb a:hover{color:var(--bd-accent)}
.bd-breadcrumb strong{color:var(--bd-ink);font-weight:600;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;max-width:380px}

/* title + meta */
.bd-title{font-size:clamp(26px,3.4vw,36px);line-height:1.3;font-weight:700;color:var(--bd-ink);margin:0 0 20px}
.bd-meta-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:22px}
.bd-byline{display:grid;gap:4px;font-size:13px;color:var(--bd-muted);line-height:1.5}
.bd-by{color:var(--bd-ink)}
.bd-by a{color:var(--bd-ink);font-weight:600;text-decoration:underline!important}
.bd-by a:hover{color:var(--bd-accent)}
.bd-share{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bd-muted)}
.bd-share>span{margin-right:2px}
.bd-share a,.bd-share button{width:32px;height:32px;border-radius:50%;border:1px solid var(--bd-line);background:#fff;color:var(--bd-ink);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s;padding:0}
.bd-share a:hover,.bd-share button:hover{background:var(--bd-accent);border-color:var(--bd-accent);color:#fff}

/* table of contents */
.bd-toc{position:relative;border:1px solid var(--bd-line);border-radius:10px;padding:18px 22px 14px;margin-bottom:30px;background:#fff}
.bd-toc-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}
.bd-toc-icon{width:26px;height:26px;border-radius:6px;background:var(--bd-accent-soft);color:var(--bd-accent);display:inline-flex;align-items:center;justify-content:center}
.bd-toc-head h4{margin:0;font-size:17px;font-weight:700;color:var(--bd-ink)}
.bd-toc ul{list-style:none;margin:0;padding:0 0 0 6px;display:grid;gap:10px;position:relative}
.bd-toc ul.faded{max-height:128px;overflow:hidden}
.bd-toc ul.faded:after{content:"";position:absolute;left:0;right:0;bottom:0;height:56px;background:linear-gradient(to bottom,rgba(255,255,255,0),#fff 90%);pointer-events:none}
.bd-toc li a{color:var(--bd-text);font-size:15px;font-weight:600;line-height:1.5;display:block}
.bd-toc li a:hover{color:var(--bd-accent)}
.bd-toc-more{display:flex;margin:6px 0 0 auto;background:none;border:0;color:var(--bd-accent);font-weight:600;font-size:14px;align-items:center;gap:4px;cursor:pointer;padding:0}
.bd-toc-more svg{transition:.2s}
.bd-toc-more svg.up{transform:rotate(180deg)}

/* article content */
.bd-content{font-size:16.5px;line-height:1.8;color:var(--bd-text)}
.bd-content p{margin:0 0 16px}
.bd-content h2{font-size:26px;line-height:1.35;font-weight:700;color:var(--bd-ink);margin:38px 0 14px;scroll-margin-top:110px}
.bd-content h3{font-size:20px;line-height:1.4;font-weight:700;color:var(--bd-ink);margin:28px 0 10px;scroll-margin-top:110px}
.bd-content strong{color:var(--bd-ink)}
.bd-content a{color:var(--bd-accent);text-decoration:underline}
.bd-list{list-style:none;padding:0;margin:0 0 20px}
.bd-list li{position:relative;padding-left:26px;margin-bottom:9px}
.bd-list li:before{content:"";position:absolute;left:6px;top:12px;width:7px;height:7px;border-radius:50%;background:var(--bd-ink)}
.bd-olist{margin:0 0 20px;padding-left:22px}
.bd-olist li{margin-bottom:11px;padding-left:6px}
.bd-olist li::marker{color:var(--bd-ink);font-weight:700}
.bd-note{background:var(--bd-accent-soft);border-left:4px solid var(--bd-accent);border-radius:0 8px 8px 0;padding:16px 20px;margin:24px 0;font-style:italic;color:var(--bd-ink)}
.bd-callout{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:var(--bd-accent-soft);border:1px solid var(--bd-accent-line);border-radius:10px;padding:18px 22px;margin:26px 0}
.bd-callout p{margin:0;flex:1 1 280px;color:var(--bd-ink)}
.bd-callout-btn{display:inline-flex;align-items:center;gap:6px;background:var(--bd-accent);color:#fff!important;text-decoration:none!important;font-weight:600;font-size:14.5px;padding:10px 20px;border-radius:8px}
.bd-callout-btn:hover{background:var(--bd-accent-dark)}
.bd-mustread{font-size:15px;margin:0 0 20px!important}
.bd-mustread em{font-weight:700;color:var(--bd-ink)}
.bd-figure{margin:24px 0}
.bd-figure img{width:100%;border-radius:10px;display:block}
.bd-figure figcaption{font-size:13.5px;color:var(--bd-muted);text-align:center;margin-top:8px}
.bd-table-wrap{overflow-x:auto;margin:22px 0;border:1px solid var(--bd-line);border-radius:8px}
.bd-table-wrap table{width:100%;border-collapse:collapse;font-size:15px;min-width:520px}
.bd-table-wrap th{background:#f4f4f8;color:var(--bd-ink);text-align:left;padding:12px 16px;font-weight:700}
.bd-table-wrap td{padding:12px 16px;border-top:1px solid var(--bd-line)}





.bd-author-box{display:flex;gap:18px;align-items:flex-start;border:1px solid var(--bd-line);border-radius:10px;padding:22px;margin-top:40px}
.bd-author-box img{width:76px;height:76px;border-radius:50%;object-fit:cover;flex:0 0 auto}
.bd-author-box h5{margin:0 0 2px;font-size:19px;color:var(--bd-ink)}
.bd-author-box .role{color:var(--bd-accent);font-weight:600;font-size:14px;margin:0 0 8px}
.bd-author-box p{margin:0;font-size:14.5px;line-height:1.7;color:var(--bd-muted)}

/* sidebar */
.bd-sidebar{display:grid;gap:22px}
.bd-consult{border:1px solid var(--bd-line);border-radius:12px;padding:22px 22px 18px;background:#fff;box-shadow:0 4px 20px rgba(31,31,46,.06)}
.bd-consult h4{font-size:17px;font-weight:700;margin:0 0 16px;color:var(--bd-ink)}
.bd-consult form{display:grid;gap:12px}
.bd-consult .PhoneInput{border:1px solid var(--bd-line);border-radius:8px;padding:0 12px;height:46px;background:#fff;--PhoneInputCountryFlag-height:1em}
.bd-consult .PhoneInput:focus-within{border-color:var(--bd-accent)}
.bd-consult .PhoneInputInput{border:0;outline:none;background:transparent;font-size:15px;height:100%;min-width:0;color:var(--bd-ink)}
.bd-consult-error{color:#d12b43;font-size:13px;margin-top:-4px}
.bd-consult button[type=submit]{background:var(--bd-accent);color:#fff;border:0;border-radius:8px;height:46px;font-weight:700;font-size:16px;cursor:pointer;transition:.2s}
.bd-consult button[type=submit]:hover{background:var(--bd-accent-dark)}
.bd-consult button[type=submit]:disabled{opacity:.7;cursor:default}
.bd-consult small{text-align:center;font-size:11.5px;color:var(--bd-muted);line-height:1.5}
.bd-consult small a{color:var(--bd-ink);font-weight:700}
.bd-consult-done{display:flex;gap:8px;align-items:flex-start;margin:0;font-size:15px;line-height:1.6;color:var(--bd-ink)}
.bd-consult-done svg{color:#2e8b57;flex:0 0 auto;margin-top:3px}
.bd-widget{border:1px solid var(--bd-line);border-radius:12px;padding:20px;background:#fff}
.bd-widget h4{font-size:17px;font-weight:700;margin:0 0 14px;color:var(--bd-ink)}
.bd-programs{list-style:none;margin:0;padding:0;display:grid;gap:14px}
.bd-programs a{display:flex;gap:12px;align-items:center;color:var(--bd-ink)}
.bd-programs img{width:60px;height:60px;border-radius:8px;object-fit:cover;flex:0 0 auto;background:#f3f3f8}
.bd-programs strong{display:block;font-size:14.5px;line-height:1.4;font-weight:600}
.bd-programs small{color:var(--bd-muted);font-size:12.5px}
.bd-programs a:hover strong{color:var(--bd-accent)}

/* suggested blogs */
.bd-suggested{margin-top:64px;padding-top:40px;border-top:1px solid var(--bd-line)}
.bd-suggested-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;gap:12px}
.bd-suggested-head h3{margin:0;font-size:26px;font-weight:700;color:var(--bd-ink)}
.bd-suggested-head a{display:inline-flex;align-items:center;gap:6px;color:var(--bd-accent);font-weight:600}
.bd-card{display:block;height:100%;border:1px solid var(--bd-line);border-radius:12px;overflow:hidden;background:#fff;transition:.25s;color:var(--bd-ink)}
.bd-card:hover{box-shadow:0 10px 28px rgba(31,31,46,.1);transform:translateY(-3px)}
.bd-card img{width:100%;height:180px;object-fit:cover;display:block}
.bd-card div{padding:16px 18px 20px}
.bd-card-cat{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:var(--bd-accent);margin-bottom:8px}
.bd-card h5{font-size:16.5px;line-height:1.45;font-weight:600;margin:0 0 10px;color:var(--bd-ink);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.bd-card small{color:var(--bd-muted)}

@media(max-width:991px){
  .bd-content h2{font-size:23px}
}
@media(max-width:575px){
  .bd-content{font-size:16px}
  .bd-author-box{flex-direction:column}
}
`;

export default BlogDetailsContent;