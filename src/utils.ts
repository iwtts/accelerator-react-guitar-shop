// import { PRICE_FORMAT_VALUE } from './const';
import { Guitar } from './types/guitar';

const getSortedGuitars = (data: Guitar[], nameRef: string) => data.sort((a, b) => a.name.toLowerCase().indexOf(nameRef.toLowerCase()) - b.name.toLowerCase().indexOf(nameRef.toLowerCase()));

const guitarTypeToReadable = {
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая Гитара',
  'ukulele': 'Укулеле',
};

const ratingPanelTypeToStarSize = {
  'card' : 12,
  'product page': 14,
  'review': 16,
};

const formatPrice = (price: number) => {
  const n = price.toString();
  const separator = ' ';
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${  separator}`);
};

export {
  getSortedGuitars,
  guitarTypeToReadable,
  ratingPanelTypeToStarSize,
  formatPrice
};
