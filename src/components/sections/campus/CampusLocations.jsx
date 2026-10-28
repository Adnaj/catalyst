import { Link } from "react-router-dom";
import {
    GraduationCap,
    MapPin,
    Map,
    MousePointerClick,
    Phone,
    ExternalLink,
} from "lucide-react";
import { categoryPath } from "../../../data/categories";
import useCampus from "./useCampus";
import "./Campus.css";

const BADGE = "Campus"; // text of the chip on the image

const CampusLocations = () => {
    const { campus, categories } = useCampus();
    if (!campus) return null;

    return (
        <section id="campus-locations" className="cl-section section-gap fix">
            <div className="container">
                <div className="sec-heading sec-heading-center">
                    <span
                        className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                        data-direction="top"
                    >
                        <i className="tji-subtitle-2"></i>
                        {" Campuse"}
                    </span>{" "}
                    <h2 className="sec-title tj-fade-anim" data-delay=".3">
                        {" "}
                        Explore Campuses{" "}
                    </h2>
                </div>
                <div className="cl-list row">
                    {campus.locations.map((l) => {
                        const enquire = `/contact?campus=${campus.slug}&location=${encodeURIComponent(l.area)}`;
                        return (
                            <div className="col-lg-6" key={l.name}>
                                {/* left: image + badge */}
                                <div className="cl-card tj-fade-anim" >
                                    <div className="cl-media">
                                        <img src={l.image} alt={l.name} />
                                        <span className="cl-badge">
                                            <MapPin size={16} /> {l.area}
                                        </span>
                                    </div>

                                    {/* right: details */}
                                    <div className="cl-body">


                                        <h2 className="cl-title">Upskilling Platform in {l.name}</h2>

                                        <div className="cp-chips">
                                            {categories.map((c) => (
                                                <Link key={c.slug} className="cp-chip" to={categoryPath(c.slug)}>
                                                    {c.subtitle.replace("&", "and")} courses
                                                    in {l.area}
                                                </Link>
                                            ))}
                                        </div>

                                        <ul className="cl-rows">
                                            <li className="cl-row">
                                                <span className="cl-icon cl-icon--blue"><Map size={22} /></span>
                                                <div>
                                                    <strong>View Map</strong>
                                                    <a href={l.mapUrl} target="_blank" rel="noreferrer" className="cl-link">
                                                        {l.mapUrl === "#" ? "Map link coming soon" : l.mapUrl}
                                                        <ExternalLink size={14} />
                                                    </a>
                                                </div>
                                            </li>



                                            <li className="cl-row">
                                                <span className="cl-icon cl-icon--green"><Phone size={22} /></span>
                                                <div>
                                                    <strong>Connect us</strong>
                                                    <a href={`tel:${l.phone}`} className="cl-phone">{l.phone}</a>
                                                </div>
                                            </li>
                                            <li className="cl-row">

                                                <div>

                                                    <div className="cl-buttons">
                                                        <Link className="tj-btn-primary tj-btn-primary-sm flip-text-wrap" to={enquire}>
                                                            <span className="btn-text">Enquire now</span>
                                                        </Link>
                                                        <Link
                                                            className="tj-btn-primary tj-btn-primary-border tj-btn-primary-border-sm flip-text-wrap"
                                                            to={`${enquire}&enrol=1`}
                                                        >
                                                            <span className="btn-text">Enrol Now</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CampusLocations;