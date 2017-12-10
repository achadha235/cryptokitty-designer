import * as React from 'react';
import { Route } from 'react-router-dom';
import { Grid, Input, Label, Menu } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { About } from './components/About';

// tslint:disable-next-line:no-var-requires
export class App extends React.Component<{}, {}> {

	public constructor(props) {
		super(props);
	}

	public render() {
		return (
			<Route path='/'>
				<Grid style={{paddingTop: 10}}>
					<Grid.Row>
						<Grid.Column width={16}>
							<Route path='/' component={About} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Route>
		);
	}
}

const style = {
};
