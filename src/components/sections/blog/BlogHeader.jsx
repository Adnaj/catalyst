import { Link } from "react-router-dom";
import { featuredPosts, blogPath } from "../../../data/BlogPosts";

// Page header + the 3 featured posts. Class names are the same as blog.html.
const BlogHeader = () => (
  <>
    <div className="space-for-header" />

    <section className="tj-page-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-page-header-content">
              <h1 className="tj-page-title">Blogs</h1>
              <div className="tj-page-link">
                <span>
                  <i className="tji-home"></i>
                </span>
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <i className="tji-arrow-right-4"></i>
                </span>
                <span>
                  <span>Blog</span>
                </span>
              </div>
              <div className="shape">
                <img src="/assets/images/shapes/stars.png" alt="" />
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  </>
);

export default BlogHeader;