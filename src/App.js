import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddSchedule from './components/AddSchedule';
import EditSchedule from './components/EditSchedule';
import DetailSchedule from './components/DetailSchedule';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Switch>
						<Route path='/' exact component={Dashboard} />
						<Route path='/edit/:id' component={EditSchedule} />
						<Route path='/show/:id' component={DetailSchedule} />
						<Route path='/create' component={AddSchedule} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
