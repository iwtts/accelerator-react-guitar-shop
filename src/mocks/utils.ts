import { datatype } from 'faker';

const getMockImage = (): string => {
  const images = [
    './img/guitar-1.jpg',
    './img/guitar-2.jpg',
    './img/guitar-3.jpg',
    './img/guitar-4.jpg',
    './img/guitar-5.jpg',
    './img/guitar-6.jpg',
    './img/guitar-7.jpg',
    './img/guitar-8.jpg',
  ];

  return images[datatype.number(images.length - 1)];
};

const getMockStringCount = (): number => {
  const stringCounts = [
    4,
    6,
    7,
    12,
  ];

  return stringCounts[datatype.number(stringCounts.length - 1)];
};

const getMockType = (): string => {
  const types = [
    'electric',
    'acoustic',
    'ukulele',
  ];

  return types[datatype.number(types.length - 1)];
};

export {
  getMockImage,
  getMockStringCount,
  getMockType
};
