import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

const SESSION_API_URL = 'http://localhost:8083'
const PARTY_API_URL = 'http://localhost:8081/party-api'

const JoinParty = () => {
    const history = useHistory();

    let [name, setName] = useState("");
    let [tag, setTag] = useState("");
    let [token, setToken] = useState("");
    let [partyId, setPartyId] = useState("");

    let vendorId = "ABC123"

    const getHeaders = (tk) => {
        return {
            'Content-Type': 'application/json',
            'token': tk
        }
    }

    const joinParty = () => {
        // Login as guest
        guestLogin()
    }

    const guestLogin = () => {
        console.log("API CALL: /session-api/guest-login")
        axios.post(`${SESSION_API_URL}/session-api/guest-login`, {
            name: name,
            vendor_id: vendorId
        }).then(res => {
            let data = res.data;
            console.log(data)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            putJoinParty(data.token)
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    const putJoinParty = (tk) => {
        console.log("API CALL: /party-api/party")
        let requestData = {}
        axios.put(`${PARTY_API_URL}/party/${tag}`, requestData, {headers: getHeaders(tk)})
        .then(res => {
            let data = res.data;
            console.log(data)
            setPartyId(data.party.tag)
            localStorage.setItem('TAG', data.party.tag);
            goToWaitRoom(data.party.TAG)
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))

    }

    const goToWaitRoom = (tag) => {
        console.log("Go to wait room")
        history.replace("/waitroom", { 
            token: token,
            tag: tag
        })
    }

    return (
        <div>
            <h1>Join Party</h1>
            <div className="container">
                
                <div className='form-group'>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="name-addon1">Name</span>
                        </div>
                        <input id='name' type='text' autoComplete='off' onChange={(e) => setName(e.target.value)} />

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="tag-addon1">Party TAG</span>
                        </div>
                        <input id='tag' type='text' autoComplete='off' onChange={(e) => setTag(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <div className='btn btn-primary' onClick={(e) => joinParty()}>Join Party</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinParty;