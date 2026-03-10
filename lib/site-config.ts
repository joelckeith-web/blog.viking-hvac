export const siteConfig = {
  // Company Information
  companyName: "Viking Heating and Air Conditioning",
  legalName: "Viking Heating and Air Conditioning, LLC",
  shortName: "Viking HVAC",
  tagline: "The Bridge Between You and Comfort",
  description:
    "Family-owned HVAC company serving the Greater Phoenix area with over 40 years of combined experience. 240+ 5-star reviews. 24/7 emergency service. Honest, affordable, and quality heating and air conditioning services for residential and commercial clients.",
  reviews: "240+ 5-Star Reviews",

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

  // Key facts for content generation
  keyFacts: {
    arizonaSummersExceed: "115°F",
    acLifespan: "12-15 years (18+ with maintenance)",
    coolingPerSqFt: "1 ton per 400-500 sq ft",
    filterChangeInterval: "every 60-90 days in Arizona dust",
    newerSystemEfficiency: "30-50% more efficient",
    smartThermostatSavings: "20-30% energy reduction",
    summerCoolingCost: "$500+/month during peak summer",
    coolingSeasonLength: "April through October (up to 9 months)",
    utilityProviders: ["SRP (Salt River Project)", "APS (Arizona Public Service)"],
  },
  foundedYear: 2016,
  owners: "Nicole & Kelly Bridge",
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
      url: "https://www.viking-hvac.com/heating-services",
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
      url: "https://www.viking-hvac.com/repairs-and-services",
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
          url: "https://www.viking-hvac.com/services/commercial-ventilation-air-quality",
        },
      ],
    },
    {
      name: "Commercial HVAC",
      slug: "commercial-hvac",
      url: "https://www.viking-hvac.com/commercial-hvac-services",
      subpages: [
        {
          name: "Commercial Retrofits & Upgrades",
          url: "https://www.viking-hvac.com/services/commercial-hvac-retrofits-and-upgrades",
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
  industryPages: [
    {
      name: "Healthcare HVAC",
      url: "https://www.viking-hvac.com/industries/healthcare-hvac-services",
    },
    {
      name: "Retail HVAC",
      url: "https://www.viking-hvac.com/industries/retail-hvac-services",
    },
    {
      name: "Manufacturing HVAC",
      url: "https://www.viking-hvac.com/industries/manufacturing-hvac-services",
    },
    {
      name: "Restaurant HVAC",
      url: "https://www.viking-hvac.com/industries/restaurant-hvac-services",
    },
  ],

  // Location pages (for internal linking)
  locationPages: {
    residential: [
      {
        city: "Mesa",
        url: "https://www.viking-hvac.com/locations/mesa-hvac-services",
      },
      {
        city: "Phoenix",
        url: "https://www.viking-hvac.com/locations/phoenix-hvac-services",
      },
      {
        city: "Chandler",
        url: "https://www.viking-hvac.com/locations/chandler-hvac-services",
      },
      {
        city: "Apache Junction",
        url: "https://www.viking-hvac.com/locations/apache-junction-hvac-services",
      },
      {
        city: "Gilbert",
        url: "https://www.viking-hvac.com/locations/gilbert-hvac-services",
      },
    ],
    commercial: [
      {
        city: "Mesa",
        url: "https://www.viking-hvac.com/location/commercial-hvac-services-mesa-az",
      },
      {
        city: "Phoenix",
        url: "https://www.viking-hvac.com/location/commercial-hvac-services-phoenix-az",
      },
      {
        city: "Ahwatukee",
        url: "https://www.viking-hvac.com/location/commercial-hvac-services-ahwatukee-az",
      },
      {
        city: "Gilbert",
        url: "https://www.viking-hvac.com/location/commercial-hvac-services-gilbert-az",
      },
      {
        city: "Chandler",
        url: "https://www.viking-hvac.com/location/commercial-hvac-services-chandler-az",
      },
    ],
  },

  // Key pages
  keyPages: {
    about: "https://www.viking-hvac.com/about-us",
    contact: "https://www.viking-hvac.com/contact-us",
    financing: "https://www.viking-hvac.com/financing",
    pricing: "https://www.viking-hvac.com/pricing-and-coupons",
    repairOrReplace: "https://www.viking-hvac.com/repair-or-replace-hvac-guide",
    blog: "https://www.viking-hvac.com/blog",
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
