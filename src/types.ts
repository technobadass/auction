export interface User {
  username: string;
  password: string;
}

export interface AuctionDetails {
  auctionName: string;
  logo: string;
  teams: string[];
  points: number;
  startDate: string;
  endDate: string;
}

export interface Player {
  id: number;
  name: string;
  points: number;
  team: string;
  isSold: boolean;
}