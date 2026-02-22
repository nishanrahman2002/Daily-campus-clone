export interface NewsItem {
  id: string;
  title: string;
  image: string;
  category?: string;
  date?: string;
  excerpt?: string;
  isMain?: boolean;
  content?: string;
}

export interface SectionData {
  title: string;
  items: NewsItem[];
}
