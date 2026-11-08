export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  subtitle?: string;
  order: number;
}

export interface ProposalResponseRecord {
  choice: 'yes' | 'need_time';
  timestamp: string;
  formattedDate?: string;
  note?: string;
}

export interface SiteContent {
  general: {
    websiteTitle: string;
    targetName: string;
    heroSubtitle: string;
  };
  intro: {
    quoteLine1: string;
    quoteLine2: string;
    buttonText: string;
  };
  story: {
    badge: string;
    heading: string;
    sentences: string[];
  };
  letter: {
    badge: string;
    heading: string;
    recipient: string;
    paragraphs: string[];
    signoff: string;
    sender: string;
  };
  proposal: {
    prelude: string;
    question: string;
    yesButtonText: string;
    noButtonText: string;
    yesResponse: string;
    noResponse: string;
  };
  photos: PhotoItem[];
  audio: {
    enabled: boolean;
    musicUrl: string;
    title: string;
    artist: string;
  };
  theme: {
    burgundy: string;
    wine: string;
    champagne: string;
    blush: string;
    ivory: string;
    petalCount: number;
  };
  proposalResponses?: ProposalResponseRecord[];
}

export interface AdminUser {
  email: string;
  uid: string;
}

