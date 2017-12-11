// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Button, Container, Divider, Grid, Header, Input, Segment } from 'semantic-ui-react';
import { BodyType, Cryptokitty, EyeType, MouthType, PatternType } from './Cryptokitty';

import * as c from '../cattributes/colors';
import { randomEnumValue, randomKey } from '../utils';

import * as _ from 'lodash';
export class About extends React.Component {

	constructor(props) {
		super(props);
		this.fieldChanged = this.fieldChanged.bind(this);
		this.randomKitty = this.randomKitty.bind(this);
	}

	// tslint:disable-next-line:member-ordering
	public state = {
		body: randomEnumValue(BodyType),
		eye: randomEnumValue(EyeType),
		eyeColor: randomKey(c.EyeColor),
		mouth: randomEnumValue(MouthType),
		pattern: randomEnumValue(PatternType),
		primary: randomKey(c.Primary),
		secondary: randomKey(c.Secondary),
		tertiary: randomKey(c.Tertiary),
	};

	public fieldChanged(e) {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}

	public randomKitty() {
		this.setState({
			body: randomEnumValue(BodyType),
			eye: randomEnumValue(EyeType),
			eyeColor: randomKey(c.EyeColor),
			mouth: randomEnumValue(MouthType),
			pattern: randomEnumValue(PatternType),
			primary: randomKey(c.Primary),
			secondary: randomKey(c.Secondary),
			tertiary: randomKey(c.Tertiary),
		});
	}

	public render() {
		const onFieldChange = this.fieldChanged;
		const randomKitty = this.randomKitty;
		const { body, pattern, eye, mouth, primary, secondary, tertiary, eyeColor } = this.state;
		const searchUrlStr = [body, pattern, eye, mouth, primary, secondary].join('%20');
		const kittyFindUrl = `https://www.cryptokitties.co/marketplace/sale?search=${searchUrlStr}`;
		const openKittyUrl = () => {
			window.open(kittyFindUrl, '_blank');
		};
		return (
			<Container>
			<Grid>
				<Grid.Row style={{height: 300}}>
					<Grid.Column width={4}>
						<Cryptokitty
							key={2}
							body={body}
							mouth={mouth}
							eye={eye}
							pattern={pattern}
							colors={[ c.Primary[primary], c.Secondary[secondary], c.Tertiary[tertiary], c.EyeColor[eyeColor]]}
						/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
						<Button onClick={randomKitty}> Random kitty </Button>
						<Button onClick={openKittyUrl}> Find this kitty </Button>
				</Grid.Row>
				<Grid.Row>
					<div className='ui form'>
						<div className='fields'>
							<label>Body</label>
							{
								_.map(Object.keys(BodyType), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='body' checked={this.state.body === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>

						<div className='fields'>
							<label>Pattern</label>
							{
								_.map(Object.keys(PatternType), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='pattern' checked={this.state.pattern === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>

						<div className='fields'>
							<label>Eyes</label>
							{
								_.map(Object.keys(EyeType), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='eye' checked={this.state.eye === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
						<div className='fields'>
							<label>Mouth</label>
							{
								_.map(Object.keys(MouthType), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='mouth' checked={this.state.mouth === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
						<div className='fields'>
							<label>Primary Color</label>
							{
								_.map(Object.keys(c.Primary), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input onClick={onFieldChange} value={k} type='radio' name='primary' checked={this.state.primary === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
						<div className='fields'>
							<label>Secondary</label>
							{
								_.map(Object.keys(c.Secondary), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='secondary' checked={this.state.secondary === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
						<div className='fields'>
							<label>Tertiary</label>
							{
								_.map(Object.keys(c.Tertiary), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='tertiary' checked={this.state.tertiary === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
						<div className='fields'>
							<label>Eye</label>
							{
								_.map(Object.keys(c.EyeColor), (k) => (
									<div className='field' key={k}>
									<div className='ui radio checkbox'>
										<input value={k} onClick={onFieldChange} type='radio' name='eyeColor' checked={this.state.eyeColor === k}/>
										<label>{k}</label>
									</div>
									</div>
								))
							}
						</div>
					</div>
				</Grid.Row>
			</Grid>
			</Container>
		);
	}
}

const style = {
};
