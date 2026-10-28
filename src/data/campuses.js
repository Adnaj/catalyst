// Campuses used by /campus/:campusSlug. Add a campus here and it gets its own page.
export const CAMPUS_TAGLINE = "India's Top Upskilling Platform";
export const DEFAULT_PHONE = "9745200500";

const loc = (name, area, mapUrl, image) => ({
  name,                 // shown in the heading, e.g. "Vadakara, Calicut"
  area,                 // used in chips, e.g. "Vadakara"
  mapUrl,
  image: image || "/assets/images/event/event-img-1.webp",
  phone: DEFAULT_PHONE,
});

export const campuses = [
  {
    slug: "kannur",
    name: "Kannur",
    image: "/assets/images/places/kannur.jpg",
    locations: [
      loc("Kannur", "Kannur", "https://share.google/ES9NgGLdq8945TAqe" ,  "/assets/images/places/location/kannur.webp"),
    ],
  },
  {
    slug: "kozhikode",
    name: "Calicut",
    image: "/assets/images/places/kozhikode.jpg",
    locations: [
      loc("Vadakara, Calicut", "Vadakara", "https://share.google/PraOiQ2ryEs1P6KNS",  "/assets/images/places/location/vadakara.webp"),
      loc("Calicut", "Calicut", "https://share.google/JrjYcGnrXFxiiQ1ew",  "/assets/images/places/location/calicut.webp"),
    ],
  },
  {
    slug: "malappuram",
    name: "Malappuram",
    image: "/assets/images/places/malappuram.jpg",
    locations: [
      loc("Manjeri, Malappuram", "Manjeri", "https://share.google/AOqMQQ70FSkTkQSc8",  "/assets/images/places/location/manjeri.webp"),
      loc("Kottakkal, Malappuram", "Kottakkal", "https://share.google/n1v7zAtdLwP3Mikpt",   "/assets/images/places/location/kotakkal.webp"),
      loc("Perinthalmanna, Malappuram", "Perinthalmanna", '#', "/assets/images/places/location/perinthalmanna.webp"), // TODO: add GBP map link
      loc("Edappal, Malappuram", "Edappal", "https://share.google/5CMxYJ9RlznpjbsK3",  "/assets/images/places/location/edappal.webp"),
    ],
  },
  {
    slug: "thrissur",
    name: "Thrissur",
     image: "/assets/images/places/thrissur.jpg",
    locations: [
      loc("Thrissur", "Thrissur", "https://share.google/mXGirVO9NfsKIlPXq",  "/assets/images/places/location/thrissur.webp"),
    ],
  },
  {
    slug: "ernakulam",
    name: "Ernakulam",
     image: "/assets/images/places/ernakulam.jpg",
    locations: [
      loc("Palarivattom", "Palarivattom", "https://share.google/NvJZOTXOd03VB9K6K",  "/assets/images/places/location/kochi.webp"),
    ],
  },
];

export const getCampus = (slug) => campuses.find((c) => c.slug === slug);
export const campusPath = (slug) => `/campus/${slug}`;