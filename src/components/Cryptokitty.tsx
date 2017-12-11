import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import * as c from '../cattributes/colors';
import { isNonNull, randomEnumValue } from '../utils';
import { Genes } from './Genes';

interface ICryptokittyFeatures {
	colors?: string[];
	body?: BodyType;
	pattern?: PatternType;
	mouth?: MouthType;
	eye?: EyeType;
	isSpecial?: boolean;
}

export enum BodyType {
	mainecoon = 'mainecoon',
	cymric = 'cymric',
	laperm = 'laperm',
	munchkin = 'munchkin',
	sphynx = 'sphynx',
	ragamuffin = 'ragamuffin',
	himalayan = 'himalayan',
	chartreux = 'chartreux',
}

export enum PatternType {
	spock = 'spock',
	tigerpunk = 'tigerpunk',
	calicool = 'calicool',
	luckystripe = 'luckystripe',
	jaguar = 'jaguar',
	totesbasic = 'totesbasic',
}

export enum MouthType {
	whixtensions = 'whixtensions',
	dali = 'dali',
	saycheese = 'saycheese',
	beard = 'beard',
	tongue = 'tongue',
	happygokitty = 'happygokitty',
	pouty = 'pouty',
	soserious = 'soserious',
	gerbil = 'gerbil'
}

export enum EyeType {
	wingtips = 'wingtips',
	fabulous = 'fabulous',
	otaku = 'otaku',
	raisedbrow = 'raisedbrow',
	simple = 'simple',
	crazy = 'crazy',
	thicccbrowz = 'thicccbrowz',
	googly = 'googly',
}

interface ICryptokittyState {
	kittyImage?: string;
	kittyMouth?: string;
	kittyEye?: string;
	genes?: string;
}

export class Cryptokitty extends React.Component<ICryptokittyFeatures, ICryptokittyState> {
	private static cache = {};
	constructor(props) {
		super(props);
		this.state = {};
		const body = props.body;
		const pattern = props.pattern;
		const mouth = props.mouth;
		const eye = props.eye;

		const colors = props.colors;
		this.detectKittyColors = this.detectKittyColors.bind(this);
		this.render = this.render.bind(this);
	}

	public async componentWillMount() {
		const { body, pattern, mouth, eye } = this.props;
		const colors = this.props.colors || [
			c.Primary.shadowgrey, c.Secondary.kittencream, c.Tertiary.royalpurple, c.EyeColor.bubblegum
		];
		const genes = await Genes();
		this.setState({ genes });
	}

	public async componentDidReceiveProps() {
		const { body, pattern, mouth, eye } = this.props;
		const colors = this.props.colors || [
			c.Primary.shadowgrey, c.Secondary.kittencream, c.Tertiary.royalpurple, c.EyeColor.bubblegum
		];
	}

	public detectKittyColors(svgText) {
		const colors = [null, null, null, null];
		for (const color in c.Primary) {
			if (svgText.indexOf(c.Primary[color]) > -1) {
				colors[0] = color;
			}
		}
		for (const color in c.Secondary) {
			if (svgText.indexOf(c.Secondary[color]) > -1) {
				colors[1] = color;
			}
		}
		for (const color in c.Tertiary) {
			if (svgText.indexOf(c.Tertiary[color]) > -1) {
				colors[2] = color;
			}
		}

		for (const color in c.EyeColor) {
			if (svgText.indexOf(c.EyeColor[color]) > -1) {
				colors[3] = color;
			}
		}

		return colors;
	}

	public render() {
		const genes = this.state.genes;
		if (genes === undefined) {
			return <img style={styles.fixed} src={'src/cattributes/nullcat.svg'}/>;
		}
		const { body, pattern, mouth, eye, colors } = this.props;

		let kittyImage = genes[`${this.props.body}-${this.props.pattern}`];
		let kittyMouth = genes[this.props.mouth];
		let kittyEye = genes[this.props.eye];

		const bodyColors = this.detectKittyColors(kittyImage);
		const eyeColors = this.detectKittyColors(kittyEye);
		const mouthColors = this.detectKittyColors(kittyMouth);

		if (isNonNull(bodyColors[0])) {
			kittyImage = kittyImage.replace(new RegExp(c.Primary[bodyColors[0]], "g"), colors[0]);
		}

		if (isNonNull(bodyColors[1])) {
			kittyImage = kittyImage.replace(new RegExp(c.Secondary[bodyColors[1]], "g"), colors[1]);
		}

		if (isNonNull(eyeColors[3])) {
			kittyEye = kittyEye.replace(new RegExp(c.EyeColor[eyeColors[3]], "g"), colors[3]);
		}

		if (isNonNull(bodyColors[2])) {
			kittyImage = kittyImage.replace(new RegExp(c.Tertiary[bodyColors[2]], "g"), colors[2]);
		}

		if (isNonNull(mouthColors[0])) {
			kittyMouth = kittyMouth.replace(new RegExp(c.Primary[mouthColors[0]], "g"), colors[0]);
		}
		// tslint:disable:jsx-no-multiline-js

		return (
			<Container style={{ position: 'relative' }}>
				{
					(kittyImage === null || kittyMouth === null || kittyEye === null ?
						<div style={{ position: 'absolute'}}>
							<img style={styles.fixed} src={'src/cattributes/nullcat.svg'}/>
						</div> :
						<div style={{ position: 'absolute'}}>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyImage }}/>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyMouth }}/>
							<div style={styles.fixed} dangerouslySetInnerHTML={{ __html: kittyEye }}/>
						</div> )
				}
			</Container>
		);
	}
}

const styles: React.CSSProperties = {
	fixed: { position: 'absolute', top: 0, left: 0, height: "300px", width: "300px" }
};
