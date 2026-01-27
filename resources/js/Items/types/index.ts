import { create } from 'zustand';

export interface FetchItemData {
  id: number;
  item: string;
  remaining: number;
  reedem: number;
  status: string;
  image?: string;
  icon?: string;
}

export interface SavingItemsData {
 item: string,
 remaining: number,
 image?: File | null,
 icon?: string
}

export interface UpdateItemData extends SavingItemsData {
 id:number
}


interface savingItems {
    item: string,
    remaining: number,
    image: File | null,
    icon: string,

    setitem: (item: string) => void;
    setremaining: (remaining: number) => void;
    setimage: (image: File | null) => void;
    seticon: (icon: string) => void;
    resetForm: () => void;
}

export const useItemsStore = create<savingItems>((set) => ({
  // state properties
  item: '',
  remaining: 0,
  image: null,
  icon: '',

  setitem: (item: string) => set({item}),
  setremaining: (remaining: number) => set({remaining}),
  setimage: (image: File | null) => set({image}),
  seticon: (icon: string) => set({icon}),

  // reset method 
  resetForm: () => set({
    item: '',
    remaining: 0,
    image: null,
    icon: '',
  }),
}));
