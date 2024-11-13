export interface NavItem {
  title: string;
  url: string;
  items?: NavItem[];
  isActive?: boolean;
}

export interface NavData {
  versions: string[];
  navMain: NavItem[];
}