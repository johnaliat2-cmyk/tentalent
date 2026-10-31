export type PageId =
  | 'home'
  | 'academy'
  | 'ventures'
  | 'services'
  | 'about'
  | 'community'
  | 'library'
  | 'contact'
  | 'legal'
  | 'free-lesson';

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Overview' },
  { id: 'academy', label: 'Academy' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'community', label: 'Community' },
  { id: 'library', label: 'Library' },
];

export const FORM_ENDPOINT = 'https://api.example.com/subscribe';
