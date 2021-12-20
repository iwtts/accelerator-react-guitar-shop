import { commerce, datatype } from 'faker';
import { Guitar } from '../types/guitar';
import {
  getMockImage,
  getMockStringCount,
  getMockType } from './utils';

const getMockGuitar = (): Guitar => ({
  'id': datatype.number(),
  'name': commerce.productName(),
  'vendorCode': datatype.string(),
  'type': getMockType(),
  'description': commerce.productDescription(),
  'previewImg': getMockImage(),
  'stringCount': getMockStringCount(),
  'rating': datatype.number(5),
  'price': datatype.number(),
});

const getMockGuitars = (): Guitar[] => new Array(15).fill(null).map(() => getMockGuitar());

export { getMockGuitars };
