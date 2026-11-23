export type Language = "en" | "bn";

export interface TranslationSchema {
  nav: {
    theHouse: string;
    inside: string;
    amenities: string;
    guests: string;
    stay: string;
  };
  ui: {
    menu: string;
    close: string;
    book: string;
    from: string;
    perNight: string;
    minStay: (nights: number) => string;
    day: string;
    night: string;
    theme: string;
    sections: string;
    currency: string;
    currencyBadge: string;
    livePill: string;
    switchLang: string;
  };
  arrival: {
    eyebrow: string;
    name: string;
    tagline: string;
    hint: string;
    loading: string;
  };
  intro: {
    label: string;
    heading: string;
    text: string;
    facts: Array<{ value: number; label: string }>;
  };
  walk: {
    label: string;
    showAll: string;
    photosCount: (count: number) => string;
    rooms: Array<{
      name: string;
      subtitle: string;
      text: string;
    }>;
  };
  details: {
    label: string;
    heading: string;
    groups: Array<{
      group: string;
      photo: string;
      items: Array<{ icon: string; label: string }>;
    }>;
    area: {
      heading: string;
      text: string;
      places: Array<{
        name: string;
        minutes: number;
        by: string;
      }>;
      minutes: string;
      openMaps: string;
    };
  };
  guests: {
    label: string;
    heading: string;
    rating: string;
    count: string;
    source: string;
    nights: (n: number) => string;
    items: Array<{
      author: string;
      from: string;
      when: string;
      nights: number;
      quote: string;
    }>;
  };
  book: {
    label: string;
    eyebrow: string;
    heading: string;
    text: string;
    perNight: string;
    badge: string;
    fields: {
      arrival: string;
      departure: string;
      guests: string;
      name: string;
      email: string;
      message: string;
      consent: string;
      privacy: string;
    };
    guestsOption: (count: number) => string;
    nights: (count: number) => string;
    estimateLabel: (nightsText: string, rateText: string) => string;
    estimateTotal: string;
    estimateNote: string;
    minNightsNote: (min: number) => string;
    submit: string;
    noCharge: string;
    sending: string;
    sent: string;
    mailOpened: string;
    errors: {
      dates: string;
      network: string;
    };
  };
  faq: {
    label: string;
    heading: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  footer: {
    contact: string;
    address: string;
    rights: string;
    credit: string;
    privacy: string;
    livePill: string;
    street: string;
    city: string;
    country: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      theHouse: "The house",
      inside: "Inside",
      amenities: "What's here",
      guests: "Guests",
      stay: "Stay",
    },
    ui: {
      menu: "Menu",
      close: "Close",
      book: "Check dates",
      from: "From",
      perNight: "night",
      minStay: (nights: number) => `Minimum ${nights} nights`,
      day: "Day",
      night: "Night",
      theme: "Switch between day and night",
      sections: "Sections",
      currency: "BDT",
      currencyBadge: "BDT",
      livePill: "Live on Cloudflare Pages",
      switchLang: "বাংলায় পড়ুন",
    },
    arrival: {
      eyebrow: "The Arrival",
      name: "Villa Solmare",
      tagline: "A stone sanctuary above the sea, on the scenic southern coast of Bangladesh.",
      hint: "Scroll to arrive",
      loading: "Loading the footage",
    },
    intro: {
      label: "The house",
      heading: "Two centuries of architectural heritage, restored for quiet luxury by the sea.",
      text: "Villa Solmare stands on the coastal clifftops overlooking the Bay of Bengal. Today it has four luxury bedroom suites, three artisanal bathrooms and an expansive terrace facing west, so every evening ends with the golden sun setting into the ocean.",
      facts: [
        { value: 8, label: "Guests" },
        { value: 4, label: "Bedrooms" },
        { value: 3, label: "Bathrooms" },
        { value: 260, label: "Square metres" },
        { value: 300, label: "Metres to the beach" },
      ],
    },
    walk: {
      label: "Inside",
      showAll: "Show all photos",
      photosCount: (count: number) => `${count} photos`,
      rooms: [
        {
          name: "The living room",
          subtitle: "il soggiorno",
          text: "Linen sofas, hand-carved stone hearth and timber beams overhead. An arch leads straight into the kitchen.",
        },
        {
          name: "The kitchen",
          subtitle: "la cucina",
          text: "Artisanal hand-painted tiles, brass cookware and a long solid wood table, with a bowl of fresh citrus from the coastal garden.",
        },
        {
          name: "The main bedroom",
          subtitle: "la camera padronale",
          text: "A linen canopy bed and French windows opening onto the terrace overlooking the Bay of Bengal. It is one of four bedrooms.",
        },
      ],
    },
    details: {
      label: "What's here",
      heading: "Everything you need, nothing you don't.",
      groups: [
        {
          group: "Inside",
          photo: "soggiorno",
          items: [
            { icon: "wifi", label: "High-speed Fibre Wi-Fi" },
            { icon: "snow", label: "Air conditioning in every suite" },
            { icon: "kitchen", label: "Full gourmet kitchen with modern appliances" },
            { icon: "washer", label: "Smart washing machine & dryer" },
            { icon: "linen", label: "Luxury Egyptian cotton linen and bath towels" },
          ],
        },
        {
          group: "Outside",
          photo: "ingresso",
          items: [
            { icon: "sun", label: "Sea-view terrace facing west over Bay of Bengal" },
            { icon: "tree", label: "Tropical coastal palm & flower garden" },
            { icon: "shower", label: "Outdoor natural stone shower" },
            { icon: "grill", label: "Outdoor barbecue setup" },
            { icon: "car", label: "Private secure parking for 4 vehicles" },
          ],
        },
        {
          group: "On request",
          photo: "cucina",
          items: [
            { icon: "chef", label: "Private culinary chef (Bengali coastal & continental)" },
            { icon: "plane", label: "Airport chauffeur transfer (Cox's Bazar / Chittagong)" },
            { icon: "boat", label: "Private sea boat trips & deep sea cruising" },
            { icon: "cot", label: "Baby cot and high chair" },
          ],
        },
      ],
      area: {
        heading: "Around the house",
        text: "The villa stands at the end of a private lane above Inani Beach, framed by lush coastal greenery and minutes from the ocean.",
        places: [
          { name: "Inani Coral Beach", minutes: 4, by: "on foot" },
          { name: "Marine Drive Jetty", minutes: 8, by: "by car" },
          { name: "Himchari Eco Park & Trails", minutes: 12, by: "by car" },
          { name: "Cox's Bazar Airport", minutes: 35, by: "by car" },
        ],
        minutes: "min",
        openMaps: "Open in Google Maps",
      },
    },
    guests: {
      label: "Guests",
      heading: "What our guests remember.",
      rating: "4.98",
      count: "142 reviews",
      source: "from stays booked direct and through luxury travel partners",
      nights: (count: number) => `${count} nights`,
      items: [
        {
          author: "Tanvir Ahmed",
          from: "Dhaka",
          when: "November 2026",
          nights: 7,
          quote: "We had dinner on the terrace every night watching the sunset into the Bay of Bengal. The children didn't want to leave.",
        },
        {
          author: "Farhana Rahman",
          from: "Gulshan, Dhaka",
          when: "October 2026",
          nights: 4,
          quote: "The private chef was the best present for our anniversary. The architectural detailing is world-class.",
        },
        {
          author: "Zubair & Nabila",
          from: "Chittagong",
          when: "September 2026",
          nights: 3,
          quote: "The morning ocean breeze and the golden light in the kitchen are worth the trip on their own. Unmatched tranquility.",
        },
        {
          author: "Rezaul Karim",
          from: "Comilla",
          when: "August 2026",
          nights: 5,
          quote: "Even more beautiful than the photos. Quiet, cool in the afternoon, and cared for in every single detail.",
        },
        {
          author: "David & Sarah Campbell",
          from: "London",
          when: "July 2026",
          nights: 6,
          quote: "Villa Solmare on the southern coast was the highlight of our visit to South Asia. Exceptional warmth and hospitality.",
        },
        {
          author: "Nusrat Jahan",
          from: "Sylhet",
          when: "May 2026",
          nights: 5,
          quote: "Four minutes to the beach and not a sound at night except the gentle waves. Exactly what our family needed.",
        },
        {
          author: "Mahmudul Hasan",
          from: "Banani, Dhaka",
          when: "April 2026",
          nights: 7,
          quote: "Three families, eight people, and still everyone found a quiet corner. Sunset from the terrace was pure magic.",
        },
        {
          author: "Ayesha Siddiqa",
          from: "Uttara, Dhaka",
          when: "March 2026",
          nights: 4,
          quote: "The private boat trip they arranged along Marine Drive was phenomenal. Impeccable host and spotless house.",
        },
        {
          author: "Kazi Tariq",
          from: "Dhanmondi, Dhaka",
          when: "February 2026",
          nights: 6,
          quote: "Clear instructions, a spotless sanctuary and a host who answered within minutes. Best luxury experience in Bangladesh.",
        },
        {
          author: "Marcus Weber",
          from: "Frankfurt",
          when: "January 2026",
          nights: 8,
          quote: "Sunset from the terrace, every single evening. We stopped making plans after the second day. Truly sublime.",
        },
      ],
    },
    book: {
      label: "Stay",
      eyebrow: "The Sunset",
      heading: "Stay for the sunset.",
      text: "Tell us your dates. We reply within 24 hours with availability and the exact price in Bangladeshi Taka.",
      perNight: "night",
      badge: "BDT",
      fields: {
        arrival: "Check-in",
        departure: "Checkout",
        guests: "Guests",
        name: "Name",
        email: "Email",
        message: "Anything we should know? (optional)",
        consent: "I agree to my details being used to answer this request.",
        privacy: "Privacy notice",
      },
      guestsOption: (count: number) => `${count} ${count === 1 ? "guest" : "guests"}`,
      nights: (count: number) => `${count} ${count === 1 ? "night" : "nights"}`,
      estimateLabel: (nightsText: string, rateText: string) => `${rateText} × ${nightsText}`,
      estimateTotal: "Estimated total",
      estimateNote: "Cleaning, breakfast and hospitality services are confirmed in our reply.",
      minNightsNote: (min: number) => `The minimum stay is ${min} nights.`,
      submit: "Request to book",
      noCharge: "You won't be charged yet.",
      sending: "Sending…",
      sent: "Request sent. We'll reply within 24 hours.",
      mailOpened: "Your email app has opened with the request filled in. Press Send there to finish.",
      errors: {
        dates: "Choose a checkout date after the check-in date.",
        network: "The request didn't go through. Check your connection and try again, or email us at",
      },
    },
    faq: {
      label: "Questions",
      heading: "Before you ask.",
      items: [
        {
          q: "What are the check-in and checkout times?",
          a: "Check-in is from 3:00 PM and checkout by 11:00 AM. If the booking calendar allows, we are happy to adjust to your travel schedule.",
        },
        {
          q: "Is there a minimum stay?",
          a: "Two nights on weekdays, three nights on weekends and peak holiday seasons.",
        },
        {
          q: "What is the currency and are there hidden taxes?",
          a: "All prices are in Bangladeshi Taka (BDT ৳). Government taxes and hospitality services are confirmed clearly upfront with zero hidden charges.",
        },
        {
          q: "Are pets allowed?",
          a: "Well-behaved family pets are welcome upon prior confirmation.",
        },
        {
          q: "How do we get there?",
          a: "A car via scenic Marine Drive is easiest, and there is private secure parking for 4 cars. We can also arrange private luxury chauffeur transfer from Cox's Bazar Airport or Chittagong.",
        },
      ],
    },
    footer: {
      contact: "Contact",
      address: "Address",
      rights: "All rights reserved.",
      credit: "Architectural Design by Sahadat",
      privacy: "Privacy notice",
      livePill: "Live: villa-solmare.pages.dev",
      street: "Barura",
      city: "Comilla",
      country: "Bangladesh",
    },
  },
  bn: {
    nav: {
      theHouse: "স্থাপত্য",
      inside: "অভ্যন্তর",
      amenities: "সুবিধাসমূহ",
      guests: "অতিথি",
      stay: "বুকিং",
    },
    ui: {
      menu: "মেনু",
      close: "বন্ধ করুন",
      book: "তারিখ যাচাই",
      from: "শুরু",
      perNight: "রাত",
      minStay: (nights: number) => `কমপক্ষে ${nights} রাত`,
      day: "দিন",
      night: "রাত",
      theme: "দিন ও রাতের থিম পরিবর্তন",
      sections: "বিভাগসমূহ",
      currency: "বাংলাদেশ টাকা",
      currencyBadge: "বাংলাদেশ টাকা",
      livePill: "ক্লাউডফ্লেয়ার পেজেসে লাইভ",
      switchLang: "English",
    },
    arrival: {
      eyebrow: "স্বাগতম — এক প্রশান্তির নীড়",
      name: "Villa Solmare",
      tagline: "নীল সমুদ্রের কূলে পাথরে খোদাই করা এক প্রশান্তির নীড়—বাংলার স্বপ্নিল উপকূলজুড়ে।",
      hint: "প্রবেশ করতে নিচে স্ক্রল করুন",
      loading: "ভিডিও লোড হচ্ছে",
    },
    intro: {
      label: "স্থাপত্য ও ঐতিহ্য",
      heading: "ঐতিহ্য ও আধুনিকতার অনন্য মেলবন্ধন—সমুদ্রের তীরে পরম আভিজাত্য ও নির্জনতার অভিজ্ঞতা।",
      text: "বঙ্গোপসাগরের কোলঘেঁষা ইনানী সৈকতের প্রাকৃতিক পাহাড়ের চূড়ায় অবস্থিত ভিলা সোলমারে। এখানে রয়েছে ৪টি বিলাসবহুল বেডরুম স্যুট, ৩টি নান্দনিক বাথরুম এবং সুবিশাল সূর্যাস্তমুখী টেরাস, যেখান থেকে প্রতিদিন গোধূলিলগ্নে সাগরবক্ষে রক্তিম সূর্যের অবগাহন উপভোগ করা যায়।",
      facts: [
        { value: 8, label: "জন অতিথি" },
        { value: 4, label: "টি বেডরুম স্যুট" },
        { value: 3, label: "টি বাথরুম" },
        { value: 260, label: "বর্গমিটার আয়তন" },
        { value: 300, label: "মিটার সৈকত দূরত্ব" },
      ],
    },
    walk: {
      label: "অভ্যন্তরীণ দৃশ্য",
      showAll: "সবগুলো ছবি দেখুন",
      photosCount: (count: number) => `${count}টি ছবি`,
      rooms: [
        {
          name: "লিভিং লাউঞ্জ",
          subtitle: "প্রশান্তির মিলনমেলা",
          text: "কোমল লিনেন সোফা, হাতে খোদাই করা পাথরের ফায়ারপ্লেস এবং নান্দনিক কাঠের সিলিং। একটি খিলান পথ সরাসরি রসুইঘরের দিকে চলে গেছে।",
        },
        {
          name: "রসুইঘর",
          subtitle: "অভিজাত পাকশালা",
          text: "হাতে আঁকা নকশাদার টাইলস, খাঁটি পিতলের তৈজসপত্র এবং দীর্ঘ সেগুন কাঠের ডাইনিং টেবিল—যেখানে সাজানো থাকে বাগানের তাজা ফলমূল।",
        },
        {
          name: "মাস্টার বেডরুম",
          subtitle: "রাজকীয় সান্ধ্যকক্ষ",
          text: "লিনেন শামিয়ানা খাট এবং ফরাসি বিশাল কাঁচের জানালা, যা সরাসরি বঙ্গোপসাগরের মনোরম সূর্যাস্তমুখী টেরাসে উন্মুক্ত হয়।",
        },
      ],
    },
    details: {
      label: "সুবিধাসমূহ",
      heading: "প্রয়োজনীয় সব আয়োজন, বাহুল্যহীন আভিজাত্য।",
      groups: [
        {
          group: "ইনডোর (অভ্যন্তরে)",
          photo: "soggiorno",
          items: [
            { icon: "wifi", label: "উচ্চগতির ফাইবার অপটিক ওয়াই-ফাই" },
            { icon: "snow", label: "প্রতিটি স্যুটে সেন্ট্রাল এয়ার কন্ডিশনিং" },
            { icon: "kitchen", label: "আধুনিক যন্ত্রপাতিসমৃদ্ধ ফুল গোরমেট কিচেন" },
            { icon: "washer", label: "স্মার্ট অটোমেটিক ওয়াশিং মেশিন ও ড্রায়ার" },
            { icon: "linen", label: "বিলাসবহুল মিশরীয় কটন লিনেন ও বাথ টাওয়েল" },
          ],
        },
        {
          group: "আউটডোর (বাইরে)",
          photo: "ingresso",
          items: [
            { icon: "sun", label: "বঙ্গোপসাগরমুখী সূর্যাস্ত দর্শন সুবিশাল টেরাস" },
            { icon: "tree", label: "পাম ও ক্রান্তীয় ফুলের মনোরম সবুজ বাগান" },
            { icon: "shower", label: "উন্মুক্ত প্রাকৃতিক পাথরের শাওয়ার" },
            { icon: "grill", label: "আউটডোর বারবিকিউ ও রোস্টিং সেটআপ" },
            { icon: "car", label: "৪টি গাড়ির জন্য নিরাপদ নিজস্ব পার্কিং" },
          ],
        },
        {
          group: "অন রিকোয়েস্ট (বিশেষ সেবা)",
          photo: "cucina",
          items: [
            { icon: "chef", label: "ব্যক্তিগত শেফ (উপকূলীয় বাংলা ও কন্টিনেন্টাল খাবার)" },
            { icon: "plane", label: "বিমানবন্দর প্রিমিয়াম শাফার ট্রান্সফার (কক্সবাজার / চট্টগ্রাম)" },
            { icon: "boat", label: "ব্যক্তিগত স্পিডবোট ও গভীর সমুদ্রে ভ্রমণ" },
            { icon: "cot", label: "শিশুদের আরামদায়ক বেবি কট ও চেয়ার" },
          ],
        },
      ],
      area: {
        heading: "ভিলা সংলগ্ন চারপাশ",
        text: "ইনানী সৈকতের শান্ত সাগরপাড়ে সবুজে ঘেরা এক নিরিবিলি লেনের মাথায় এই ভিলার অবস্থান—সমুদ্রের একেবারে কাছে।",
        places: [
          { name: "ইনানী কোরাল বিচ", minutes: 4, by: "হেঁটে" },
          { name: "মেরিন ড্রাইভ জেটি", minutes: 8, by: "গাড়িতে" },
          { name: "হিমছড়ি ইকো পার্ক ও পাহাড়ি ট্রেইল", minutes: 12, by: "গাড়িতে" },
          { name: "কক্সবাজার বিমানবন্দর", minutes: 35, by: "গাড়িতে" },
        ],
        minutes: "মিনিট",
        openMaps: "গুগল ম্যাপে দেখুন",
      },
    },
    guests: {
      label: "অতিথি পর্যালোচনা",
      heading: "অতিথিদের হৃদয়ে অমলিন কিছু স্মৃতি।",
      rating: "৪.৯৮",
      count: "১৪২টি প্রত্যক্ষ রিভিউ",
      source: "সরাসরি বুকিং ও প্রিমিয়াম ট্রাভেল পার্টনারদের মাধ্যমে আগত অতিথিদের রিভিউ",
      nights: (count: number) => `${count} রাত`,
      items: [
        {
          author: "তানভীর আহমেদ",
          from: "ঢাকা",
          when: "নভেম্বর ২০২৬",
          nights: 7,
          quote: "প্রতি সন্ধ্যায় টেরাসে বসে সাগরবক্ষে সূর্যাস্ত দেখতে দেখতে ডিনার করার অভিজ্ঞতা ছিল অবিশ্বাস্য। বাচ্চারা তো এখান থেকে ফিরতেই চাচ্ছিল না।",
        },
        {
          author: "ফারহানা রহমান",
          from: "গুলশান, ঢাকা",
          when: "অক্টোবর ২০২৬",
          nights: 4,
          quote: "আমাদের বিবাহবার্ষিকীতে পার্সোনাল শেফের আয়োজনটি ছিল সবচেয়ে সেরা উপহার। স্থাপত্যের নিখুঁত নির্মাণশৈলী সত্যিই বিশ্বমানের।",
        },
        {
          author: "জুবায়ের ও নাবিলা",
          from: "চট্টগ্রাম",
          when: "সেপ্টেম্বর ২০২৬",
          nights: 3,
          quote: "ভোরের নির্মল সমুদ্রের হাওয়া আর পাকশালায় সোনারঙা ভোরের আলো—শুধু এই অনুভূতির জন্যই এখানে বারবার আসা যায়। অপরূপ প্রশান্তি।",
        },
        {
          author: "রেজাউল করিম",
          from: "কুমিল্লা",
          when: "আগস্ট ২০২৬",
          nights: 5,
          quote: "ছবির চেয়েও বাস্তবে অনেক বেশি সুন্দর। বিকেলে শান্ত, স্নিগ্ধ পরিবেশ এবং প্রতিটি ক্ষুদ্র বিষয়ের প্রতি যত্নশীল ব্যবস্থাপনা মন ছুঁয়ে গেছে।",
        },
        {
          author: "ডেভিড ও সারাহ ক্যাম্পবেল",
          from: "লন্ডন",
          when: "জুলাই ২০২৬",
          nights: 6,
          quote: "দক্ষিণ এশিয়া সফরে আমাদের সবচেয়ে স্মরণীয় অভিজ্ঞতা ছিল এই ভিলা সোলমারে। উষ্ণ আতিথেয়তা ও প্রাকৃতিক রূপ কখনো ভোলার নয়।",
        },
        {
          author: "নুসরাত জাহান",
          from: "সিলেট",
          when: "মে ২০২৬",
          nights: 5,
          quote: "সৈকত থেকে মাত্র ৪ মিনিটের দূরত্ব, আর রাতে শান্ত ঢেউয়ের মৃদু ধ্বনি ছাড়া কোনো কোলাহল নেই। আমাদের পরিবারের জন্য এটি ছিল নিখুঁত ছুটি।",
        },
        {
          author: "মাহমুদুল হাসান",
          from: "বনানী, ঢাকা",
          when: "এপ্রিল ২০২৬",
          nights: 7,
          quote: "তিনটি পরিবার, আটজন মানুষ—তবুও প্রত্যেকেই নিজের মতো একান্ত সময় কাটাতে পেরেছে। টেরাস থেকে সূর্যাস্ত দর্শন যেন জাদুর মতো।",
        },
        {
          author: "আয়েশা সিদ্দিকা",
          from: "উত্তরা, ঢাকা",
          when: "মার্চ ২০২৬",
          nights: 4,
          quote: "মেরিন ড্রাইভ সংলগ্ন সমুদ্রে তাদের আয়োজিত প্রাইভেট বোট ট্রিপটি ছিল দুর্দান্ত। অসাধারণ আন্তরিক হোস্ট এবং ঝকঝকে পরিপাটি ভিলা।",
        },
        {
          author: "কাজী তারিক",
          from: "ধানমন্ডি, ঢাকা",
          when: "ফেব্রুয়ারি ২০২৬",
          nights: 6,
          quote: "সুস্পষ্ট নির্দেশনা, পরিচ্ছন্ন পরিবেশ এবং যেকোনো প্রয়োজনে মিনিটের মধ্যে সাড়া দেওয়া হোস্ট। বাংলাদেশের অন্যতম সেরা লাক্সারি অভিজ্ঞতা।",
        },
        {
          author: "মার্কাস ওয়েবার",
          from: "ফ্রাঙ্কফুর্ট",
          when: "জানুয়ারি ২০২৬",
          nights: 8,
          quote: "প্রতি সন্ধ্যায় টেরাস থেকে সূর্যাস্তের অনুপম দৃশ্য। দ্বিতীয় দিনের পর আমরা বাইরে যাওয়ার সব প্ল্যান বাদ দিয়ে ভিলাতেই মুগ্ধ হয়ে রইলাম।",
        },
      ],
    },
    book: {
      label: "বুকিং",
      eyebrow: "গোধূলি ও সূর্যাস্ত",
      heading: "সূর্যাস্তের সাক্ষী হতে চলে আসুন।",
      text: "আপনার ভ্রমণের সম্ভাব্য তারিখ জানান। আমরা ২৪ ঘণ্টার মধ্যে খালি থাকা সাপেক্ষে বাংলাদেশি টাকায় মোট খরচসহ আপনাকে নিশ্চিত করব।",
      perNight: "রাত",
      badge: "বাংলাদেশ টাকা",
      fields: {
        arrival: "চেক-ইন তারিখ",
        departure: "চেক-আউট তারিখ",
        guests: "অতিথির সংখ্যা",
        name: "আপনার পূর্ণ নাম",
        email: "ইমেইল অ্যাড্রেস",
        message: "বিশেষ কোনো চাহিদা বা বার্তা? (ঐচ্ছিক)",
        consent: "আমার বুকিং অনুরোধ প্রক্রিয়া করার জন্য তথ্যের ব্যবহারে সম্মতি দিচ্ছি।",
        privacy: "গোপনীয়তা নীতি",
      },
      guestsOption: (count: number) => `${count} জন অতিথি`,
      nights: (count: number) => `${count} রাত`,
      estimateLabel: (nightsText: string, rateText: string) => `${rateText} × ${nightsText}`,
      estimateTotal: "সম্ভাব্য মোট",
      estimateNote: "পরিচ্ছন্নতা, সকালের নাশতা এবং আতিথেয়তা সেবা আমাদের ফিরতি বার্তায় চূড়ান্ত করা হবে।",
      minNightsNote: (min: number) => `কমপক্ষে ${min} রাতের বুকিং প্রয়োজন।`,
      submit: "বুকিং অনুরোধ পাঠান",
      noCharge: "এখনই কোনো পেমেন্ট করতে হবে না।",
      sending: "অনুরোধ পাঠানো হচ্ছে…",
      sent: "অনুরোধ সফলভাবে পাঠানো হয়েছে। আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।",
      mailOpened: "আপনার ইমেইল অ্যাপে সকল তথ্য পূরণ হয়ে খুলে গেছে। সম্পন্ন করতে সেখানে Send বাটনে চাপ দিন।",
      errors: {
        dates: "চেক-আউট তারিখ অবশ্যই চেক-ইন তারিখের পরবর্তী হতে হবে।",
        network: "অনুরোধটি পাঠানো সম্ভব হয়নি। ইন্টারনেট সংযোগ চেক করুন বা সরাসরি ইমেইল করুন:",
      },
    },
    faq: {
      label: "প্রশ্নোত্তর",
      heading: "সচরাচর কিছু জিজ্ঞাসা ও প্রয়োজনীয় তথ্য।",
      items: [
        {
          q: "চেক-ইন এবং চেক-আউটের নির্ধারিত সময় কখন?",
          a: "চেক-ইন দুপুর ৩:০০টা থেকে এবং চেক-আউট সকাল ১১:০০টার মধ্যে। বুকিং ক্যালেন্ডারে রুম খালি থাকা সাপেক্ষে আপনার ভ্রমণ সময়সূচী অনুযায়ী সমন্বয় করতে আমরা আনন্দিত হব।",
        },
        {
          q: "কমপক্ষে কত রাতের বুকিং করতে হবে?",
          a: "সাধারণ দিনে কমপক্ষে ২ রাত, এবং ছুটির দিন ও পর্যটন মৌসুমে কমপক্ষে ৩ রাতের বুকিং আবশ্যক।",
        },
        {
          q: "মূল্য কোন মুদ্রায় ধার্য করা হয় এবং কোনো অতিরিক্ত লুকানো চার্জ আছে কি?",
          a: "সকল মূল্য বাংলাদেশি টাকায় (BDT ৳) নির্ধারিত। সরকারি ভ্যাট ও আতিথেয়তা সেবাসমূহ শুরুতেই স্বচ্ছভাবে নিশ্চিত করা হয়—কোনো প্রকার লুকানো চার্জ নেই।",
        },
        {
          q: "পোষা প্রাণী কি সঙ্গে আনা যাবে?",
          a: "ভদ্র ও শান্ত পারিবারিক পোষা প্রাণী পূর্বানুমতি সাপেক্ষে আন্তরিকভাবে স্বাগত।",
        },
        {
          q: "ভিলায় পৌঁছানোর উপায় কী?",
          a: "মনোরম মেরিন ড্রাইভ সড়ক দিয়ে ব্যক্তিগত গাড়িতে আসা সবচেয়ে সুবিধাজনক, এবং ভিলা প্রাঙ্গণে ৪টি গাড়ির নিরাপদ নিজস্ব পার্কিং রয়েছে। এছাড়া কক্সবাজার বিমানবন্দর বা চট্টগ্রাম থেকে বিলাসবহুল প্রাইভেট ট্রান্সফারের ব্যবস্থাও আমরা করে থাকি।",
        },
      ],
    },
    footer: {
      contact: "যোগাযোগ",
      address: "ঠিকানা",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
      credit: "আর্কিটেকচারাল ডিজাইন: সাহাদাত",
      privacy: "গোপনীয়তা নীতি",
      livePill: "লাইভ: villa-solmare.pages.dev",
      street: "বরুড়া",
      city: "কুমিল্লা",
      country: "বাংলাদেশ",
    },
  },
};
