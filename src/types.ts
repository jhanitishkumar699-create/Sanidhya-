export interface Memory {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  imageUrl: string;
}

export interface MeaningCard {
  id: string;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  quote: string;
}

export interface PromiseItem {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  iconName: string;
}

export type ForgivenessStatus = 'pending' | 'forgiven' | 'needs_time';
