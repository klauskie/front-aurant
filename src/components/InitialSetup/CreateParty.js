import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie'

const SESSION_API_URL = 'http://localhost:8083'
const PARTY_API_URL = 'http://localhost:8081'
const SIX_HOURS = 6*60*60*1000;

const CreateParty = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['access_token', 'tag'])

    let [name, setName] = useState("");
    let [token, setToken] = useState("");
    let [partyId, setPartyId] = useState("");

    let vendorId = "ABC123"

    const getHeaders = (tk) => {
        return {
            'Content-Type': 'application/json',
            'token': tk
        }
    }

    const createNewParty = () => {
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
            postNewParty(data.token)
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    const postNewParty = (tk) => {
        console.log("API CALL: /party-api/party")
        let requestData = {}
        axios.post(`${PARTY_API_URL}/party-api/party`, requestData, {headers: getHeaders(tk)})
        .then(res => {
            let data = res.data;
            let partyTag = data.party.tag
            setPartyId(partyTag)
            //localStorage.setItem('TAG', data.party.tag);
            setNewCookie('tag', partyTag)
            goToWaitRoom(partyTag)
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

    const setNewCookie = (key, value) => {
        let expires = new Date()
        expires.setTime(expires.getTime() + (SIX_HOURS))
        setCookie(key, value, { path: '/',  expires})
    }

    return (
        <div>
            <div className="container">

                <div className="margin-top"></div>

                <div className="right">
                    <a href="/join-party" className="a-tag" >Join a Party</a>
                </div>

                <div className="">
                    <h2 className="left">Create a Party!</h2>
                </div>

                <div className="row justify-content-md-center h-100">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input autoComplete='off' onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control" name="name" required autofocus/>
                        </div>

                        <div className="form-group">
                            <button onClick={(e) => createNewParty()} type="submit" className="btn btn-danger btn-block">Create Party</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateParty;