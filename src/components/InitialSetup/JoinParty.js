import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie'
import './InitialSetup.css';

const SESSION_API_URL = 'http://localhost:8083'
const PARTY_API_URL = 'http://localhost:8081/party-api'
const SIX_HOURS = 6*60*60*1000;

const JoinParty = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['access_token', 'tag'])

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
            //localStorage.setItem('token', data.token)
            setNewCookie('access_token', data.token)
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
            let partyTag = data.party.tag
            setPartyId(partyTag)
            //localStorage.setItem('TAG', data.party.tag);
            setNewCookie('tag', partyTag)
            goToWaitRoom(data.party.TAG)
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))

    }

    const setNewCookie = (key, value) => {
        let expires = new Date()
        expires.setTime(expires.getTime() + (SIX_HOURS))
        setCookie(key, value, { path: '/',  expires})
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
            <div className="container">

                <div className="margin-top"></div>

                <div className="right">
                    <a href="/create-party" className="a-tag" >Create Party</a>
                </div>

                <div className="">
                    <h2 className="left">Join in!</h2>
                </div>

                <div className="row justify-content-md-center h-100">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input autoComplete='off' onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control" name="name" required autofocus/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="party-tag">Party TAG</label>
                            <input autoComplete='off' onInput={(e) => e.target.value = e.target.value.toUpperCase()} onChange={(e) => setTag(e.target.value.toUpperCase())} id="party-tag" type="text" className="form-control" name="party-tag" required data-eye/>
                        </div>

                        <div className="form-group">
                            <button onClick={(e) => joinParty()} type="submit" className="btn btn-danger btn-block">Join Party</button>
                        </div>

                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default JoinParty;