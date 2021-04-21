import React, { Component } from 'react'
import axios from 'axios';

const PARTY_API_URL = 'http://localhost:8081/party-api'

class WaitRoomComponent extends Component {
    state = {
        pollingCount: 0,
        delay: 3000,
        clients: [],
        tag: localStorage.getItem('TAG'),
        token: localStorage.getItem('token'),
        host: {},
    };

    componentDidMount() {
        this.interval = setInterval(this.tick, this.state.delay)
        this.getPartyData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.delay !== this.state.delay) {
            clearInterval(this.interval)
            this.interval = setInterval(this.tick, this.state.delay)
        }
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    tick = () => {
        this.setState({
            pollingCount: this.state.pollingCount + 1
        })
        this.getPartyData()
    }

    getPartyData = () => {
        console.log("API CALL: /party-api/party/<tag>")
        axios.get(`${PARTY_API_URL}/party/${this.state.tag}`, {headers: {'token': this.state.token}})
        .then(res => {
            console.log(res.data)
            this.setState({
                clients: res.data.party.client_list,
                host: res.data.party.host
            })
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    setPartyToReadyState = () => {
        console.log(`API CALL: ${PARTY_API_URL}/party-status/${this.state.tag}`)
        axios.put(`${PARTY_API_URL}/party-status/${this.state.tag}`, {ready: true}, {headers: {'token': this.state.token}})
        .then(res => {
            console.log(res.data)
            this.partyReadyNextScreen()
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    isUserHost = () => {
        return this.state.token === this.state.host.Id
    }

    partyReadyNextScreen = () => {
        this.props.history.replace("/")
    }

    render() {
        return (
            <div>
            <h1>Wait room</h1>
            <h3>TAG: {this.state.tag}</h3>

            <ul>{this.state.clients.map((client, index) => <li key={index}>{client.Name}</li>)}</ul>
            <button onClick={this.setPartyToReadyState} disabled={!this.isUserHost}>Ready!</button>
        </div>
        )
    }
}

export default WaitRoomComponent;
