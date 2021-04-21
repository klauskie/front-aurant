import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from '../../containers/Menu/Menu';
import CreateParty from '../InitialSetup/CreateParty';
import InitialSelection from '../InitialSetup/InitialSelection';
import JoinParty from '../InitialSetup/JoinParty';
import Waitroom from '../InitialSetup/Waitroom';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={InitialSelection} />
                <Route exact path="/create-party" component={CreateParty} />
                <Route exact path="/join-party" component={JoinParty} />
                <Route exact path="/waitroom" render={(props) => <Waitroom {...props}/>}/>
                <Route exact path="/menu" component={Menu} />
            </Switch>
        );
    }
}

export default Routes