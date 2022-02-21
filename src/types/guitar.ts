import { Comment } from './comment';

enum GuitarType {
  Electric = 'electric',
  Acoustic = 'acoustic',
  Ukulele = 'ukulele',
}

type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: GuitarType,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
  comments?: Comment[],
  amount?: number,
};

export { GuitarType };
export type { Guitar };
