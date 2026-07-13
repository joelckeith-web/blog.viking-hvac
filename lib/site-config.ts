export const siteConfig = {
  // Company Information
  companyName: "Viking Heating and Air Conditioning",
  legalName: "Viking Heating and Air Conditioning, LLC",
  shortName: "Viking HVAC",
  tagline: "The Bridge Between You and Comfort",
  description:
    "Family-owned HVAC company serving the Greater Phoenix area. 340+ five-star reviews at a 4.9-star rating. 24/7 emergency service. Honest, affordable, and quality heating and air conditioning services for residential and commercial clients.",
  reviews: "340+ Five-Star Reviews",

  // V.I.K.I.N.G. Promise — brand values
  brandPromise: {
    V: "Value — Exceptional service at fair, transparent prices",
    I: "Integrity — Always do what's right for customers",
    K: "Knowledge — Ongoing training, cutting-edge expertise",
    I2: "Innovation — Latest HVAC technologies",
    N: "Neighborly — Treat customers like community members",
    G: "Guarantee — 100% satisfaction guaranteed",
  },

  // Core promise: On time, Fair, Empathetic, Helpful, Diligent, Excellent
  corePromise: "We promise same-day repair when possible, no dishonesty, no hassle, no falsified repairs.",

  // keyFacts REMOVED 2026-07-13 — it injected unverified figures ("20-30%
  // energy reduction", "$500+/month") into every generated post. The 2026-07
  // fabrication audit traced 3 live false-claim posts to it. Verified facts
  // now live in lib/viking-truth.json; unverified ones sit in its
  // pendingVerification block until Viking confirms each with a source.
  foundedYear: 2016,
  // Per the TRUTH doc (resolved 2026-05-05): Nikki Bridge = owner/founder;
  // Kelly Bridge = Master Technician (technical byline for E-E-A-T).
  owners: "Nikki Bridge (owner/founder)",
  license: "AZ ROC #316534",
  email: "info@viking-hvac.com",

  // Contact
  phone: "(480) 689-5167",
  phoneRaw: "+14806895167",
  address: {
    street: "3225 N Arizona Ave, Suite C-12",
    city: "Chandler",
    state: "Arizona",
    stateAbbr: "AZ",
    zip: "85225",
    country: "US",
  },

  // Hours
  businessHours: "24/7 Emergency Service | Office: Mon-Fri 9AM-6PM",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],

  // URLs
  mainSiteUrl: "https://www.viking-hvac.com",
  blogUrl: "https://blog.viking-hvac.com",

  // Social / Entity Bridge sameAs
  sameAs: [
    "https://www.google.com/maps?cid=2705406831989590961",
    "https://www.facebook.com/vikingheatingandair/",
    "https://www.instagram.com/vikingheatingandair/",
    "https://www.linkedin.com/company/viking-heating-and-air-conditioning-llc",
    "https://www.yelp.com/biz/viking-heating-and-air-conditioning-chandler-4",
    "https://www.bbb.org/us/az/chandler/profile/heating-and-air-conditioning/viking-heating-and-air-conditioning-llc-1126-1000075245",
    "https://nextdoor.com/pages/viking-heating-and-air-conditioning-chandler-az/",
  ],

  // Brand Colors
  colors: {
    primary: "#004281",
    secondary: "#eb1c23",
    dark: "#000000",
    light: "#f5f5f5",
    text: "#333333",
  },

  // Primary Service Area
  primaryCity: "Chandler",
  primaryState: "AZ",

  // All Service Areas (verified from website crawl — 29 cities)
  serviceAreas: [
    "Chandler",
    "Gilbert",
    "Mesa",
    "Phoenix",
    "Scottsdale",
    "Tempe",
    "Queen Creek",
    "Apache Junction",
    "Ahwatukee",
    "Coolidge",
    "Anthem",
    "Avondale",
    "Buckeye",
    "Carefree",
    "Cave Creek",
    "Florence",
    "Fountain Hills",
    "Glendale",
    "Goodyear",
    "Guadalupe",
    "Laveen",
    "Litchfield Park",
    "Maricopa",
    "Paradise Valley",
    "Peoria",
    "Sun City",
    "Superior",
    "Surprise",
  ],

  // Neighborhoods for Geo-Footer (Chandler neighborhoods/areas)
  neighborhoods: [
    "Downtown Chandler",
    "Ocotillo",
    "Sun Lakes",
    "Andersen Springs",
    "Cooper Commons",
    "Clemente Ranch",
    "Chandler Heights",
    "Riggs Ranch",
    "Circle G",
    "Fulton Ranch",
    "Carino Estates",
    "Springfield Lakes",
    "South Chandler",
    "West Chandler",
    "North Chandler",
  ],

  // Services with URLs (verified from sitemap)
  services: [
    {
      name: "Air Conditioning",
      slug: "air-conditioning",
      url: "https://www.viking-hvac.com/air-conditioning",
      subpages: [
        {
          name: "AC Repair & Service",
          url: "https://www.viking-hvac.com/services/air-conditioning",
        },
      ],
    },
    {
      name: "Heating Services",
      slug: "heating-services",
      url: "https://viking-hvac.com/residential/heating-repair/",
      subpages: [
        {
          name: "Heating Repair",
          url: "https://www.viking-hvac.com/services/heating-repair",
        },
      ],
    },
    {
      name: "HVAC Installation",
      slug: "hvac-installation",
      url: "https://www.viking-hvac.com/install",
      subpages: [
        {
          name: "Installation Details",
          url: "https://www.viking-hvac.com/services/hvac-installation",
        },
      ],
    },
    {
      name: "Repairs & Services",
      slug: "repairs-and-services",
      url: "https://viking-hvac.com/residential/",
      subpages: [
        {
          name: "Emergency HVAC Repair",
          url: "https://www.viking-hvac.com/services/emergency-hvac-repair",
        },
      ],
    },
    {
      name: "Preventative Maintenance",
      slug: "preventative-maintenance",
      url: "https://www.viking-hvac.com/preventative-maintenance",
      subpages: [],
    },
    {
      name: "Swamp Cooler Services",
      slug: "swamp-cooler-services",
      url: "https://www.viking-hvac.com/swamp-cooler-services",
      subpages: [],
    },
    {
      name: "Air Quality",
      slug: "air-quality",
      url: "https://www.viking-hvac.com/air-quality",
      subpages: [
        {
          name: "Commercial Ventilation & Air Quality",
          url: "https://viking-hvac.com/commercial/ventilation/",
        },
      ],
    },
    {
      name: "Commercial HVAC",
      slug: "commercial-hvac",
      url: "https://viking-hvac.com/commercial/",
      subpages: [
        {
          name: "Commercial Retrofits & Upgrades",
          url: "https://viking-hvac.com/commercial/hvac-retrofits-and-upgrades/",
        },
      ],
    },
    {
      name: "Ductwork Services",
      slug: "ductwork-services",
      url: "https://www.viking-hvac.com/services/ductwork-services",
      subpages: [],
    },
    {
      name: "Thermostat Installation",
      slug: "thermostat-installation",
      url: "https://www.viking-hvac.com/services/thermostat-installation",
      subpages: [],
    },
  ],

  // Industry pages (for internal linking)
  // The /industries/* pages were removed in the 2026 site restructure — no
  // equivalents exist on the new site. Keep empty until Viking publishes new ones.
  industryPages: [] as { name: string; url: string }[],

  // Location pages (for internal linking)
  locationPages: {
    // The 2026 site restructure replaced the per-service city pages with
    // unified /locations/<city>/ pages covering residential + commercial.
    residential: [
      {
        city: "Mesa",
        url: "https://viking-hvac.com/locations/mesa/",
      },
      {
        city: "Phoenix",
        url: "https://viking-hvac.com/locations/phoenix/",
      },
      {
        city: "Chandler",
        url: "https://viking-hvac.com/locations/chandler/",
      },
      {
        city: "Apache Junction",
        url: "https://viking-hvac.com/locations/apache-junction/",
      },
      {
        city: "Gilbert",
        url: "https://viking-hvac.com/locations/gilbert/",
      },
      // Added 2026-07-13 — live 200s (site crawl), already used by the
      // geo-footer in ~49 posts; absent here made the gate flag them.
      {
        city: "Tempe",
        url: "https://viking-hvac.com/locations/tempe/",
      },
      {
        city: "Scottsdale",
        url: "https://viking-hvac.com/locations/scottsdale/",
      },
      {
        city: "Queen Creek",
        url: "https://viking-hvac.com/locations/queen-creek-partly-in-pinal/",
      },
    ],
    commercial: [
      {
        city: "Mesa",
        url: "https://viking-hvac.com/locations/mesa/",
      },
      {
        city: "Phoenix",
        url: "https://viking-hvac.com/locations/phoenix/",
      },
      {
        city: "Ahwatukee",
        url: "https://viking-hvac.com/locations/ahwatukee/",
      },
      {
        city: "Gilbert",
        url: "https://viking-hvac.com/locations/gilbert/",
      },
      {
        city: "Chandler",
        url: "https://viking-hvac.com/locations/chandler/",
      },
    ],
  },

  // Key pages
  keyPages: {
    locations: "https://viking-hvac.com/locations/",
    about: "https://www.viking-hvac.com/about-us",
    contact: "https://www.viking-hvac.com/contact-us",
    financing: "https://www.viking-hvac.com/financing",
    pricing: "https://www.viking-hvac.com/pricing-and-coupons",
    repairOrReplace: "https://www.viking-hvac.com/repair-or-replace-hvac-guide",
    blog: "https://blog.viking-hvac.com",
  },

  // Weather-to-Service Mapping
  weatherServiceMap: {
    extremeHeat: {
      threshold: 105, // °F — common AZ summer temps
      services: ["Air Conditioning", "HVAC Installation", "Preventative Maintenance"],
      urgency: "high",
      topics: [
        "AC breaking down during heat wave",
        "emergency cooling solutions",
        "when to replace vs repair AC in extreme heat",
        "protecting your HVAC system during 110°+ days",
        "signs your AC can't keep up with Arizona heat",
      ],
    },
    heat: {
      threshold: 95, // °F
      services: ["Air Conditioning", "Thermostat Installation", "Air Quality"],
      urgency: "medium",
      topics: [
        "preparing your AC for summer",
        "smart thermostat settings for Arizona heat",
        "indoor air quality during hot months",
        "energy-efficient cooling tips",
        "swamp cooler vs AC in dry heat",
      ],
    },
    coldSnap: {
      threshold: 35, // °F — rare but happens in AZ desert nights
      services: ["Heating Services", "HVAC Installation", "Preventative Maintenance"],
      urgency: "high",
      topics: [
        "furnace not working during cold snap",
        "heat pump performance in cold weather",
        "protecting pipes and HVAC during freeze warning",
        "emergency heating solutions Chandler AZ",
      ],
    },
    cool: {
      threshold: 55, // °F
      services: ["Heating Services", "Preventative Maintenance", "Thermostat Installation"],
      urgency: "low",
      topics: [
        "fall HVAC maintenance checklist Arizona",
        "switching from AC to heat",
        "programmable thermostat winter settings",
        "heating system tune-up before winter",
      ],
    },
    dustStorm: {
      condition: "dust",
      services: ["Air Quality", "Preventative Maintenance", "Ductwork Services"],
      urgency: "high",
      topics: [
        "protecting your HVAC during haboob season",
        "changing air filters after dust storm",
        "indoor air quality during monsoon dust storms",
        "duct cleaning after Arizona dust storms",
        "HVAC maintenance after haboob",
      ],
    },
    monsoon: {
      condition: "thunderstorm",
      services: ["Repairs & Services", "Air Quality", "Commercial HVAC"],
      urgency: "high",
      topics: [
        "HVAC damage from monsoon storms",
        "humidity and your AC system",
        "monsoon season HVAC preparation",
        "power surge protection for HVAC",
        "dealing with humidity spikes in normally dry climate",
      ],
    },
    wind: {
      condition: "wind",
      threshold: 30, // mph
      services: ["Repairs & Services", "Ductwork Services", "Commercial HVAC"],
      urgency: "medium",
      topics: [
        "wind damage to outdoor AC units",
        "protecting condenser from debris",
        "HVAC noise from high winds",
        "checking ductwork after wind storm",
      ],
    },
    rain: {
      condition: "rain",
      services: ["Repairs & Services", "Air Quality", "Preventative Maintenance"],
      urgency: "low",
      topics: [
        "rain and your outdoor AC unit",
        "humidity control during rare Arizona rain",
        "HVAC and indoor air quality on rainy days",
      ],
    },
    mild: {
      condition: "clear",
      services: ["Preventative Maintenance", "HVAC Installation", "Swamp Cooler Services"],
      urgency: "low",
      topics: [
        "best time to schedule HVAC maintenance",
        "spring AC tune-up before summer heat",
        "should you replace your HVAC during mild weather",
        "swamp cooler startup guide for spring",
        "energy audit during comfortable weather",
      ],
    },
  },
} as const;

export type ServiceCategory = (typeof siteConfig.services)[number]["name"];
