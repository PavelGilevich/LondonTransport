import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Buses from './components/Buses/Buses';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="content">
          <Switch>
            <Route exact path='/buses' component={Buses}/>
            <Route exact path='/car-parkings' component={Buses}/>
            <Redirect to="/buses" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
