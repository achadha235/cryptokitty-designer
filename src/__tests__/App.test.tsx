/**
 * Basic render test
 */

import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { App } from '../App';

let renderer: ShallowRenderer.ShallowRenderer;

beforeAll(() => {
	renderer = ShallowRenderer.createRenderer();
});

describe('Client basics', () => {
	it('App should render', () => {
		renderer.render(<App/>, null);
		const result: {} = renderer.getRenderOutput();
		expect(result).toBeTruthy();
		expect.assertions(1);
	});
});
