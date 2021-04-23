import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import MenuTable from '../../components/Menu/MenuTable';
import TopMenu from '../../components/TopMenu/TopMenu';
import ItemDetailView from '../../components/ItemDetailView/ItemDetailView';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './Menu.css'; 

const RESTAURANT_ID = "db011a96-4310-414f-b30c-9d0c4eaaefed"
const PARTY_API_URL = 'http://localhost:8081/party-api'
const API_MENU_URL = "http://localhost:8080/api/"
const GET_MENU_LIST_URL = API_MENU_URL + `item/${RESTAURANT_ID}`
const GET_COMPLETE_MENU_LIST_URL = API_MENU_URL + `category/restaurant/${RESTAURANT_ID}`

class Menu extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        list: [],
        toggle: false,
        currentItem: {},
        token: this.props.cookies.get("access_token") || "",
        tag: this.props.cookies.get("tag") || "",
    }

    componentDidMount() {
        axios.get(GET_COMPLETE_MENU_LIST_URL)
            .then(res => {
                let data = res.data;
                this.setState({
                    list: data
                })
                // console.log(data)
            })
            .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    postClientOrder = (order) => {
        console.log("API CALL: /party-api/order/<clientID>")
        axios.post(`${PARTY_API_URL}/order/${this.state.tag}`, order, {headers: {'token': this.state.token}})
        .then(res => {
            let data = res.data;
            console.log(data)
            this.handleClose()
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    toggleDetailView = (itemBundle) => {
        console.log(itemBundle)
    

        this.setState({
            toggle: !this.state.toggle && this.isTokenAvailable(),
            currentItem: itemBundle
        });
        
    }

    handleClose = () => {
        this.setState({
            toggle: !this.state.toggle && this.isTokenAvailable()
        });
    }

    isTokenAvailable = () => {
        this.setState({
            token: this.props.cookies.get("access_token") || "",
        });

        let token = this.props.cookies.get("access_token") || ""

        if (token.length === 0) {
            console.log("No token... Cannot toggle item detail view")
        }
        return token.length > 0
    }

    render() {
        return (
            <div>
                <TopMenu />
                
                <Modal show={this.state.toggle} onHide={this.handleClose} dialogClassName="detail-modal">
                    <Modal.Body>
                        <ItemDetailView itemBundle={this.state.currentItem} orderCallback={this.postClientOrder} />
                    </Modal.Body>
                </Modal>

                <MenuTable list={this.state.list} itemCallback={this.toggleDetailView} />
            </div>
        )
    }
}

export default withCookies(Menu);