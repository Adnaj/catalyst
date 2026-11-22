import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  blogCategories,
  gridPosts,
  postsByCategory,
  blogPath,
} from "../../../data/BlogPosts";

const PAGE_SIZE = 6;

// Filterable blog grid + pagination. Class names are the same as blog.html.
// The selected category lives in the URL (/blog?category=design), so the sidebar links on the
// blog details page open the list already filtered.
// "All" shows the grid posts (the 3 featured posts are in the strip above);
// a category shows EVERY post of that category, so the numbers match the sidebar counts.
const BlogList = () => {
  const [params, setParams] = useSearchParams();
  const wanted = params.get("category");
  const filter = blogCategories.some((c) => c.key === wanted) ? wanted : "*";
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [filter]);

  const filtered = filter === "*" ? gridPosts : postsByCategory(filter);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const changeFilter = (key) => {
    setParams(key === "*" ? {} : { category: key }, { replace: true });
    setPage(1);
  };

  const goTo = (e, n) => {
    e.preventDefault();
    setPage(n);
  };

  return (
    <section className="tj-blog-section section-gap-bottom fix">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span className="sec-subtitle tj-fade-anim" data-direction="top">
                <i className="tji-subtitle"></i>Latest blogs
              </span>
              <h2 className="sec-title tj-fade-anim">
                Explore Latest Blog and Insights.
              </h2>
            </div>

            <div className="tj-filter-btn-wrap">
              <div className="tj_filter_btn_group">
                <button
                  type="button"
                  data-filter="*"
                  className={`tj_filter_btn${filter === "*" ? " active" : ""}`}
                  onClick={() => changeFilter("*")}
                >
                  <span>All</span>
                </button>
                {blogCategories.map((c) => (
                  <button
                    type="button"
                    key={c.key}
                    data-filter={`.${c.key}`}
                    className={`tj_filter_btn${filter === c.key ? " active" : ""}`}
                    onClick={() => changeFilter(c.key)}
                  >
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row tj-course-filter tj_filter_item_wrapper tj-fade-anim">
          {visible.map((post) => (
            <div
              key={post.slug}
              className={`col-lg-4 col-md-6 tj_filter_item ${post.filters.join(" ")}`}
            >
              <article className="blog-item">
                <div className="blog-thumb">
                  <Link to={blogPath(post.slug)}>
                    <img src={post.image} alt={post.title} />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <div className="tj-categories">
                      <Link className="blog-category" to={blogPath(post.slug)}>
                        {post.category}
                      </Link>
                    </div>
                    <div className="blog-meta-item date">
                      <i className="tji-calendar"></i>
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h4 className="blog-title tj-fs-h5">
                    <Link to={blogPath(post.slug)}>{post.title}</Link>
                  </h4>
                  <p className="blog-desc">{post.excerpt}</p>
                  <div className="blog-btn">
                    <Link
                      className="tj-text-btn flip-text-wrap"
                      to={blogPath(post.slug)}
                    >
                      <span className="btn-text">Read more</span>
                      <span className="btn-icon">
                        <i className="tji-arrow-right-2"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div className="tj-pagination justify-content-center tj-fade-anim">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
              n === current ? (
                <span key={n} aria-current="page" className="page-numbers current">
                  {n}
                </span>
              ) : (
                <a key={n} className="page-numbers" href="#" onClick={(e) => goTo(e, n)}>
                  {n}
                </a>
              )
            )}
            {current < pages && (
              <a
                className="next page-numbers"
                href="#"
                onClick={(e) => goTo(e, current + 1)}
              >
                <i className="tji-arrow-right-3"></i>
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;