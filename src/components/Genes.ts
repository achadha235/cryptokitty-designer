// tslint:disable:forin
import { BodyType, EyeType, MouthType, PatternType } from './Cryptokitty';
let map = null;
let initialized = false;
export const Genes = async () => {
	if (initialized === true) {
		return map;
	}
	map = {};
	for (const b in BodyType) {
		for (const p in PatternType) {
			const svg = await fetch(`src/cattributes/body/${b}-${p}.svg`);
			map[`${b}-${p}`] = await svg.text();
		}
	}

	for (const et in EyeType) {
		const svg = await fetch(`src/cattributes/eye/${et}.svg`);
		map[`${et}`] = await svg.text();
	}

	for (const mt in MouthType) {
		const svg = await fetch(`src/cattributes/mouth/${mt}.svg`);
		map[`${mt}`] = await svg.text();
	}
	initialized = true;
	return map;
};
