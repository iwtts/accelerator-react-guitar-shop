import { Guitar } from './types/guitar';

const getSortedGuitars = (data: Guitar[], nameRef: string) => data.sort((a, b) => a.name.toLowerCase().indexOf(nameRef.toLowerCase()) - b.name.toLowerCase().indexOf(nameRef.toLowerCase()));

export { getSortedGuitars };
