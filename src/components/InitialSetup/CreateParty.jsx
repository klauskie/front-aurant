import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie'
import { createNewPartyPOST, guestLoginPOST } from '../../util/APIutils';
import { KEY_ACCESS_TOKEN, KEY_TAG, KEY_VENDOR_ID, SIX_HOURS } from '../../util/Constants';

const CreateParty = (props) => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies([KEY_ACCESS_TOKEN, KEY_TAG])

    let [name, setName] = useState("");
    let [token, setToken] = useState("");
    let [partyId, setPartyId] = useState("");

    let vendorId = props.match.params.vendorId

    const createNewParty = () => {
        if (vendorId === "") {
            return
        }
        // Login as guest
        handleGuestLogin()
    }

    const handleGuestLogin = () => {
        guestLoginPOST(name, vendorId).then(loginData => {
            setToken(loginData.token)
            handleNewParty(loginData.token)
        }).catch(() => {});
    }

    const handleNewParty = (mToken) => {
        createNewPartyPOST(mToken).then(partyData => {
            let partyTag = partyData.party.tag
            setPartyId(partyTag)
            saveCookies(mToken, partyTag)

            redirectHelper("/waitroom", { 
                token: mToken,
                tag: partyTag
            })
        }).catch(() => {})
    }

    const saveCookies = (mToken, partyTag) => {
        setNewCookie(KEY_ACCESS_TOKEN, mToken)
        setNewCookie(KEY_TAG, partyTag)
        setNewCookie(KEY_VENDOR_ID, vendorId)
        localStorage.setItem(KEY_VENDOR_ID, vendorId);
    }

    const redirectHelper = (path, data) => {    
        console.log("Go to: " + path)
        history.replace(path, data)
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
                    <a href={`/join-party/${vendorId}`} className="a-tag" >Join a Party</a>
                </div>

                <div className="">
                    <h2 className="left">Create a Party!</h2>
                </div>

                <div className="row justify-content-md-center h-100">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input autoComplete='off' onChange={(e) => setName(e.target.value)} id="name" type="text" className="form-control" name="name" required autoFocus/>
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