import * as _ from 'lodash';
export const isNull = (v: any) => v === undefined || v === null;
export const isNonNull = (v: any) => !isNull(v);
export const randomEnumValue = (v: any) => {
	const keys = Object.keys({...v});
	const randInt =	_.random(0, keys.length - 1);
	return v[keys[randInt]];
};

export const randomKey = (v: any) => {
	const keys = Object.keys({...v});
	const randInt =	_.random(0, keys.length - 1);
	return keys[randInt];
};
