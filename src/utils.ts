import { PRICE_FORMAT_VALUE } from './const';
import { Guitar } from './types/guitar';

const getSortedGuitars = (data: Guitar[], nameRef: string) => data.sort((a, b) => a.name.toLowerCase().indexOf(nameRef.toLowerCase()) - b.name.toLowerCase().indexOf(nameRef.toLowerCase()));

const guitarTypeToReadable = {
  'electric': 'Электрогитара',
  'acoustic': 'Акустическая Гитара',
  'ukulele': 'Укулеле',
};

const formatPrice = (price: number) => {
  const formatValue = 1000;
  const thousands = Math.floor(price / formatValue) ? Math.floor(price / formatValue) : '';
  const rest = price % PRICE_FORMAT_VALUE ? price % PRICE_FORMAT_VALUE : '000';
  return `${thousands} ${rest}`;
};

export {
  getSortedGuitars,
  guitarTypeToReadable,
  formatPrice
};
