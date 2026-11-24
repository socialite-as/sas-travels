export type MangaloreTripDay = {
  title: string;
  description: string;
  places: string[];
  overnight?: string;
};

export type MangaloreTripSection = {
  title: string;
  days: MangaloreTripDay[];
};

export type MangaloreTrip = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  duration: string;
  route: string;
  intro: string;
  highlights: string[];
  sections: MangaloreTripSection[];
  planningNote: string;
};

export const mangaloreTrips: MangaloreTrip[] = [
  {
    slug: "south-canara-temple-tour-from-mangalore",
    title: "South Canara Temple Tour from Mangalore",
    seoTitle: "South Canara Temple Tour from Mangalore | SAS Travels",
    description:
      "Plan a 2-day South Canara temple tour from Mangalore covering Kateel, Dharmasthala, Kukke Subramanya and Kollur. Request a custom quote from SAS Travels.",
    duration: "2 Days / 1 Night",
    route: "Mangaluru · Kateel · Dharmasthala · Kukke Subramanya · Kollur",
    intro:
      "A temple-focused South Canara circuit starting in Mangalore, with a private vehicle and a route planned around your preferred visits. This is a full two-day journey; ask us to adjust the pace or add a night.",
    highlights: ["Kateel Durga Parameshwari Temple", "Dharmasthala Manjunatha Temple", "Kukke Subramanya and Kollur Mookambika"],
    sections: [{
      title: "Suggested 2-day itinerary",
      days: [
        {
          title: "Mangalore to Kateel and Dharmasthala",
          description:
            "Meet your driver in Mangalore and travel to Kateel for a temple visit. Continue inland to Dharmasthala for the evening visit and an overnight stay nearby.",
          places: ["Mangaluru", "Kateel", "Dharmasthala"],
          overnight: "Dharmasthala or a nearby town",
        },
        {
          title: "Kukke Subramanya, Kollur and return",
          description:
            "Continue to Kukke Subramanya, then travel toward Kollur for Mookambika darshan before returning to Mangalore. This is a long driving day; the order can be revised to suit temple timings and your return plans.",
          places: ["Kukke Subramanya", "Kollur", "Mangaluru"],
        },
      ],
    }],
    planningNote:
      "Temple visits depend on local schedules, crowd conditions and road time. A third day can make this circuit more relaxed.",
  },
  {
    slug: "mangalore-to-wayanad-or-munnar",
    title: "Mangalore to Wayanad or Munnar Tour Package",
    seoTitle: "Mangalore to Wayanad or Munnar Tour | SAS Travels",
    description:
      "Compare suggested 3-day Wayanad and 4-day Munnar trips from Mangalore, with hill scenery, tea country and customizable private transport. Get a SAS Travels quote.",
    duration: "3–4 Days / 2–3 Nights",
    route: "Mangaluru · Wayanad or Munnar",
    intro:
      "Choose a shorter Wayanad break or a longer Munnar hill-station trip from Mangalore. Both options are planned around your dates, travel pace and preferred stops.",
    highlights: ["Choose Wayanad or Munnar", "Private departure from Mangalore", "Hill viewpoints, waterfalls and tea country"],
    sections: [
      {
        title: "Wayanad option · 3 days / 2 nights",
        days: [
          {
            title: "Mangalore to Wayanad",
            description:
              "Drive from Mangalore toward Wayanad through the Western Ghats. Check in around Kalpetta or Sultan Bathery and keep the first evening relaxed after the journey.",
            places: ["Mangaluru", "Western Ghats", "Wayanad"],
            overnight: "Wayanad",
          },
          {
            title: "Wayanad sightseeing",
            description:
              "Choose a comfortable mix of lake, cave, waterfall or viewpoint visits. Stops can be adjusted for weather, access conditions and how much time you want outdoors.",
            places: ["Pookode Lake", "Edakkal Caves or a local waterfall", "Wayanad viewpoints"],
            overnight: "Wayanad",
          },
          {
            title: "Return to Mangalore",
            description: "Have breakfast, check out and return to Mangalore, with a break along the way as needed.",
            places: ["Wayanad", "Mangaluru"],
          },
        ],
      },
      {
        title: "Munnar option · 4 days / 3 nights",
        days: [
          {
            title: "Travel from Mangalore to Munnar",
            description:
              "Start early for the road journey to Munnar. Check in on arrival and keep the rest of the day free to unwind.",
            places: ["Mangaluru", "Munnar"],
            overnight: "Munnar",
          },
          {
            title: "Tea country and Eravikulam area",
            description:
              "Explore Munnar's tea-growing landscape and local tea heritage. Eravikulam National Park can be included when open and subject to ticket availability.",
            places: ["Tea gardens", "Tea museum or local tea stop", "Eravikulam National Park, if available"],
            overnight: "Munnar",
          },
          {
            title: "Munnar viewpoints and dam country",
            description:
              "Visit selected viewpoints and lakes around Munnar, such as Mattupetty, Echo Point or Kundala, depending on road conditions and your preferred pace.",
            places: ["Mattupetty", "Echo Point", "Kundala"],
            overnight: "Munnar",
          },
          {
            title: "Return to Mangalore",
            description:
              "Check out and begin the return drive to Mangalore. Extra travel time or a transit night can be arranged for a more relaxed plan.",
            places: ["Munnar", "Mangaluru"],
          },
        ],
      },
    ],
    planningNote:
      "Hill-station access, park openings and sightseeing can change with weather and local rules. Your final route will be confirmed with your quote.",
  },
  {
    slug: "mysore-ooty-tour-from-mangalore",
    title: "Mysore and Ooty Tour from Mangalore",
    seoTitle: "Mysore & Ooty Tour from Mangalore | 4–5 Days",
    description:
      "Plan a 4–5 day Mysore and Ooty holiday from Mangalore with palace visits, Nilgiri hill scenery and a customizable private-car itinerary from SAS Travels.",
    duration: "4–5 Days / 3–4 Nights",
    route: "Mangaluru · Mysore · Bandipur · Ooty",
    intro:
      "Combine Mysore's heritage sights with Ooty's Nilgiri hills on a road trip from Mangalore. The suggested five-day plan allows time for sightseeing and can be shortened around your dates.",
    highlights: ["Mysore Palace and city sights", "Scenic drive through the Bandipur region", "Ooty gardens and Nilgiri Mountain Railway option"],
    sections: [{
      title: "Suggested 5-day itinerary",
      days: [
        {
          title: "Mangalore to Mysore",
          description: "Travel from Mangalore to Mysore by private vehicle. Check in on arrival and keep the evening open for rest or a nearby city visit.",
          places: ["Mangaluru", "Mysore"],
          overnight: "Mysore",
        },
        {
          title: "Mysore heritage and gardens",
          description:
            "Spend the day exploring Mysore Palace and selected city sights such as Chamundi Hill or Brindavan Gardens, subject to opening hours and your interests.",
          places: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens, optional"],
          overnight: "Mysore",
        },
        {
          title: "Mysore to Ooty",
          description:
            "Drive toward Ooty through the Nilgiri foothills. The route passes the Bandipur region; wildlife sightings are not guaranteed and forest-road rules apply.",
          places: ["Mysore", "Bandipur region", "Ooty"],
          overnight: "Ooty",
        },
        {
          title: "Ooty and the Nilgiri hills",
          description:
            "Choose from Ooty's gardens, lake and viewpoints. The Nilgiri Mountain Railway can be considered if seats are available and the schedule suits your dates.",
          places: ["Ooty Botanical Gardens", "Ooty Lake", "Nilgiri Mountain Railway, optional"],
          overnight: "Ooty",
        },
        {
          title: "Return journey",
          description:
            "Check out and begin the return journey to Mangalore. A shorter four-day version may require fewer sightseeing stops or a faster pace.",
          places: ["Ooty", "Mangaluru"],
        },
      ],
    }],
    planningNote:
      "Sightseeing and train tickets depend on opening schedules and availability. Ask for a revised route if you prefer a slower journey or an extra night.",
  },
  {
    slug: "hampi-badami-tour-from-mangalore",
    title: "Hampi and Badami Heritage Tour from Mangalore",
    seoTitle: "Hampi & Badami Heritage Tour from Mangalore | SAS Travels",
    description:
      "Explore Hampi, Badami, Aihole and Pattadakal on a suggested 4-day heritage tour from Mangalore. Request a private-car itinerary and quote from SAS Travels.",
    duration: "4 Days / 3 Nights",
    route: "Mangaluru · Hampi · Aihole · Pattadakal · Badami",
    intro:
      "Discover the Vijayanagara ruins of Hampi and the Chalukyan heritage sites around Badami. This four-day outline includes long road transfers, so the pace and overnight stops can be tailored to your group.",
    highlights: ["Hampi's Vijayanagara-era monuments", "Badami cave temples", "Aihole and Pattadakal heritage sites"],
    sections: [{
      title: "Suggested 4-day itinerary",
      days: [
        {
          title: "Mangalore to Hampi",
          description:
            "Depart Mangalore for Hampi. This is a substantial road journey, so the day is mainly for travel, arrival and check-in.",
          places: ["Mangaluru", "Hampi"],
          overnight: "Hampi or Hospet",
        },
        {
          title: "Explore Hampi",
          description:
            "Spend the day among Hampi's historic temple and palace remains. Select the sites you most want to see and allow time for walking in the heat.",
          places: ["Virupaksha Temple area", "Vittala Temple complex", "Hampi bazaar and riverside area"],
          overnight: "Hampi or Hospet",
        },
        {
          title: "Hampi to Badami via Aihole and Pattadakal",
          description:
            "Travel toward Badami, stopping at Aihole and Pattadakal where time and site opening hours allow. Continue to Badami for the night.",
          places: ["Hampi", "Aihole", "Pattadakal", "Badami"],
          overnight: "Badami",
        },
        {
          title: "Badami and return journey",
          description:
            "Visit the Badami cave temples if your departure timing allows, then begin the return journey to Mangalore. Consider adding a night if you prefer more time at the heritage sites.",
          places: ["Badami cave temples", "Mangaluru"],
        },
      ],
    }],
    planningNote:
      "This route includes long transfers and outdoor walking. Site access, opening hours and the exact sightseeing order should be checked for your travel dates.",
  },
];