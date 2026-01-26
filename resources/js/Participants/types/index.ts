export interface FetchParticipantsData {
  id: number;
  fullname: string;
  position: string;
  redeemed_item?: string;
  created_at: string;
  updated_at: string;
}

export interface SavingParticipantsData {
  fullname: string;
  position: string;
}