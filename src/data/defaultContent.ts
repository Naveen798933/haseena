import { SiteContent } from '../types';

export const DEFAULT_CONTENT: SiteContent = {
  general: {
    websiteTitle: "A Little World Called Haseena",
    targetName: "HASEENA",
    heroSubtitle: "Six moments. One beautiful soul."
  },
  intro: {
    quoteLine1: "Some people enter our lives unexpectedly...",
    quoteLine2: "Somehow, they make ordinary moments feel extraordinary.",
    buttonText: "ENTER MY LITTLE WORLD"
  },
  story: {
    badge: "CHAPTER I • OUR LITTLE STORY",
    heading: "A serendipitous chapter",
    sentences: [
      "Sometimes, you meet someone without planning to.",
      "And slowly, without even realizing it...",
      "Ordinary moments begin to feel extraordinary.",
      "A simple smile can make your entire day better.",
      "Some people have a beautiful way of making the world feel different.",
      "Maybe I don't have perfect words to explain it...",
      "But I wanted you to know that you've become someone special to me."
    ]
  },
  letter: {
    badge: "CONFIDENTIAL & TENDER",
    heading: "A little something from my heart...",
    recipient: "Dearest Haseena,",
    paragraphs: [
      "I don't know where life takes us, and I don't want to make promises about tomorrow.",
      "But I do know that some people deserve to be appreciated.",
      "And you, Haseena, are one of those people.",
      "I just wanted to make you smile today."
    ],
    signoff: "With quiet fondness & warmth,",
    sender: "Yours sincerely"
  },
  proposal: {
    prelude: "Haseena, there's something I've been meaning to tell you...",
    question: "Would you be open to making a few beautiful memories together?",
    yesButtonText: "I'd love to",
    noButtonText: "I'd like some time",
    yesResponse: "Maybe this is the beginning of something beautiful. ❤️",
    noResponse: "Of course. Take all the time you need. Your happiness matters."
  },
  photos: [
    {
      id: "photo-1",
      order: 1,
      caption: "01 — A beautiful smile.",
      subtitle: "A radiance that brightens any room",
      url: "/photos/haseena_1.jpeg"
    },
    {
      id: "photo-2",
      order: 2,
      caption: "02 — A moment worth remembering.",
      subtitle: "Frozen in time, treasured forever",
      url: "/photos/haseena_2.jpeg"
    },
    {
      id: "photo-3",
      order: 3,
      caption: "03 — A little piece of happiness.",
      subtitle: "Where warmth and peacefulness linger",
      url: "/photos/haseena_3.jpeg"
    },
    {
      id: "photo-4",
      order: 4,
      caption: "04 — An unforgettable feeling.",
      subtitle: "The kind that stays with you effortlessly",
      url: "/photos/haseena_4.jpeg"
    },
    {
      id: "photo-5",
      order: 5,
      caption: "05 — Something truly special.",
      subtitle: "Rare, gentle, and utterly unique",
      url: "/photos/haseena_5.jpeg"
    },
    {
      id: "photo-6",
      order: 6,
      caption: "06 — Simply, Haseena.",
      subtitle: "The one and only",
      url: "/photos/haseena_6.jpeg"
    }
  ],
  audio: {
    enabled: true,
    musicUrl: "", // Built-in Web Audio romantic piano nocturne plays automatically
    title: "Nocturne in Champagne & Rose",
    artist: "Romantic Piano Solo"
  },
  theme: {
    burgundy: "#3B0A1E",
    wine: "#64152D",
    champagne: "#D6B779",
    blush: "#F4DCE2",
    ivory: "#FFF8F0",
    petalCount: 28
  }
};
