import React, { Component } from 'react'
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './InitialSetup.css';

const PARTY_API_URL = 'http://localhost:8081/party-api'

class WaitRoomComponent extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        pollingCount: 0,
        delay: 5000,
        clients: [],
        tag: this.props.cookies.get("tag") || "",
        token: this.props.cookies.get("access_token") || "",
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
        this.checkForCookie()
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
            if (res.data.party.is_ok) {
                this.partyReadyNextScreen()
            }
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    setPartyToReadyState = () => {
        if (!this.isUserHost()) {
            console.log("User not host")
            return
        }
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
        clearInterval(this.interval)
        this.props.history.replace("/menu")
    }

    checkForCookie = () => {
        if (this.state.token === "") {
            clearInterval(this.interval)
            this.props.history.replace("/join-party")
            return
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="margin-top"></div>
                    <div className="">
                        <h2 className="left">Waitroom</h2>
                    </div>
                    <div className="">
                        <h3 className="left">Share this tag: <span className="color-red">{this.state.tag}</span></h3>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="card-body">

                            <div className="left">
                                <ul>
                                    {this.state.clients.map((client, index) => {
                                        if (client.Id === this.state.token) {
                                            return <li key={index}><span className="bold color-red">{client.Name}</span></li>
                                        }
                                        return <li key={index}><span className="bold">{client.Name}</span></li>
                                    })}
                                </ul>
                            </div>

                            <div className="form-group">
                                <button onClick={(e) => this.setPartyToReadyState()} disabled={!this.isUserHost()} type="submit" className="btn btn-danger btn-block">Ready!</button>
                            </div>
                        </div>
                    </div>

                </div>
        </div>
        )
    }
}

export default withCookies(WaitRoomComponent);
