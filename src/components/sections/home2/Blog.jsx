import { Link } from "react-router-dom";
import { blogPosts, blogPath } from "../../../data/BlogPosts";

// Home page blog section. Shows the latest 3 posts from data/BlogPosts.js
// (the first 3 posts in that file) - edit / reorder the posts there and this section updates.
// Class names are the same as index-2.html.
const HOME_POSTS = 3;

const Blog = () => {
  const posts = blogPosts.slice(0, HOME_POSTS);

  return (
    <>
      <section className="tj-blog-section section-gap fix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle sec-subtitle-2 tj-fade-anim"
                  data-direction="top"
                >
                  Explore Blogs
                </span>
                <h2 className="sec-title tj-fade-anim" data-delay=".3">
                  {" "}
                  Explore Latest Blog and Insights.{" "}
                </h2>
              </div>
            </div>
          </div>

          <div className="row rg-30">
            {posts.map((post, i) => (
              <div
                className="col-lg-4 tj-fade-anim"
                data-delay={((i + 1) * 0.2).toFixed(1)}
                key={post.slug}
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
                        <Link
                          className="blog-category"
                          to={`/blog?category=${post.category.toLowerCase()}`}
                        >
                          {post.category}
                        </Link>
                      </div>
                      {/* <div className="blog-meta-item author">
                        <i className="tji-user"></i>
                        <span>By {post.author?.name}</span>
                      </div> */}
                      <div className="blog-meta-item date">
                        <i className="tji-calendar"></i>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    {i === 0 ? (
                      <h3 className="blog-title tj-fs-h5">
                        <Link to={blogPath(post.slug)}>{post.title}</Link>
                      </h3>
                    ) : (
                      <h4 className="blog-title tj-fs-h5">
                        <Link to={blogPath(post.slug)}>{post.title}</Link>
                      </h4>
                    )}
                    <p className="blog-desc"> {post.excerpt} </p>
                    <div className="blog-btn">
                      <Link
                        className="tj-text-btn flip-text-wrap"
                        to={blogPath(post.slug)}
                      >
                        <span className="btn-text">Read more</span>{" "}
                        <span className="btn-icon">
                          <i className="tji-arrow-right-2"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}

            <div className="col-12">
              <div
                className="bottom-btn-wrap text-center tj-fade-anim"
                data-delay=".3"
              >
                <Link className="tj-btn-primary-2" to="/blog">
                  <span className="btn-inner">
                    <span className="btn-text">
                      <span>Explore more blog</span>
                    </span>{" "}
                    <span className="btn-icon">
                      <span>
                        <i className="tji-arrow-right-2"></i>
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;