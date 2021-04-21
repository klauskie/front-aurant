import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import CreateParty from '../InitialSetup/CreateParty';
import InitialSelection from '../InitialSetup/InitialSelection';
import Waitroom from '../InitialSetup/Waitroom';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={InitialSelection} />
                <Route exact path="/create-party" component={CreateParty} />
                <Route exact path="/waitroom" render={(props) => <Waitroom {...props}/>}/>
            </Switch>
        );
    }
}

export default Routes