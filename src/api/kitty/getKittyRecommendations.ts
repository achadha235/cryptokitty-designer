import * as ck from 'cryptokitties-contrib';
import { JSDOM } from 'jsdom';
import * as _ from 'lodash';
import * as fetch from 'node-fetch';

export default async function(event, context, callback) {
	const matron = event.queryStringParameters.matron;
	const sire = event.queryStringParameters.sire;
	const result = await kittyRecommendation(matron, [sire]);
	const response = {
		body: JSON.stringify({
			input: { matron, sire },
			result,
		}),
		statusCode: 200,
	};
	callback(null, response);
}

async function kittyRecommendation(owned, kittys) {
	const kittenPrices = [];
	for (const kitty of kittys) {
		const result = await expectedPriceOfKittens(owned, kitty);
		kittenPrices.push({ ...result, id: kitty });
	}
	const sorted = _.sortBy(kittenPrices, 'averagePriceOfKitten');
	return sorted;
}

async function getKittyGenomePrediction(kitty1, kitty2) {
	if (typeof kitty1 !== 'string') { kitty1 = String(kitty1); }
	if (typeof kitty2 !== 'string') { kitty2 = String(kitty2); }
	const kittyGenomeServiceUrl = 'http://www.kitty.services/api';
	const res = await fetch(`${kittyGenomeServiceUrl}/gene`, {
		body: JSON.stringify( [kitty1, kitty2]),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
			'Origin': 'http://www.kitty.services',
		},
		method: 'POST',
	});
	return res.json();
}

async function kittiesOnAuction() {
	return _.map((await ck.listAuctions()), (k) => k.id)
}

async function getCattributes() {
	const kittyGenePriceIndex = `https://cryptokittydex.com/cattributes`;
	const res = await fetch(`${kittyGenePriceIndex}`);
	const html = await res.text();
	const dom = new JSDOM(html);
	const cattributeInfo = dom.window.document.querySelectorAll('.cattribute-info-layer');
	const result = {};
	_.map(cattributeInfo, (c) => {
		result[c.querySelector('strong').innerHTML] = {
			population: parseInt(c.innerHTML.split('\n')[2].replace('kitties', '').replace(/,/g, '').trim(), 10),
			price: parseFloat(c.querySelector('span[data-title="Average price paid for a kitty possessing this cattribute"]')
				.innerHTML.replace('~', '').replace('ETH', '').trim()),
		};
	});
	return result;
}

async function expectedPriceOfKittens(kitty1, kitty2) {
	const cattributeProbabilities = await getKittyGenomePrediction(kitty1, kitty2);
	const cattributes = await getCattributes();
	const fancyPrice = 2;
	const cattributeProbsSum = _.reduce(cattributeProbabilities.results, (a, c) => a + c[1], 0);
	const normalizedCattributeProbs = _.map(cattributeProbabilities.results, (c) => [ c[0], c[1] / cattributeProbsSum]);
	let avgPriceOfKitten = 0;
	// tslint:disable-next-line:prefer-for-of
	for (let i = 0; i < normalizedCattributeProbs.length; i++) {
		if (normalizedCattributeProbs[i][0] !== 'fancy') {
			avgPriceOfKitten =
				avgPriceOfKitten + cattributes[normalizedCattributeProbs[i][0]].price * normalizedCattributeProbs[i][1];
		}
	}
	return {
		averagePriceOfKitten: avgPriceOfKitten,
		results: cattributeProbabilities.results
	};
}
