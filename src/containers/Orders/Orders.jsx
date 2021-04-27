import React, { Component } from 'react'
import axios from 'axios';
import TopMenu from '../../components/TopMenu/TopMenu';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import OrderTable from '../../components/OrderList/OrderTable';
import ToggleButton from '../../components/ToggleButton/ToggleButton';

const RESTAURANT_ID = "db011a96-4310-414f-b30c-9d0c4eaaefed"
const PARTY_API_URL = 'http://localhost:8081/party-api'
const API_MENU_URL = "http://localhost:8080/api/"
const GET_MENU_LIST_URL = API_MENU_URL + `item/${RESTAURANT_ID}`
const GET_COMPLETE_MENU_LIST_URL = API_MENU_URL + `category/restaurant/${RESTAURANT_ID}`

class Orders extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        list: [],
        tempList: [],
        token: this.props.cookies.get("access_token") || "",
        tag: this.props.cookies.get("tag") || "",
    }

    componentDidMount() {
        this.getPartyOrder()
    }

    getPartyOrder = () => {
        // TODO poll server
        axios.get(`${PARTY_API_URL}/party-order/${this.state.tag}`, {headers: {'token': this.state.token}})
        .then(res => {
            let data = res.data;
            console.log(data)
            this.setState({
                list: data.Orders,
                tempList: data.Orders
            })
        })
        .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    filterNonHost = (item) => {
        return item.client.Id === this.state.token
    }

    toggleClientListView = (toggleValue) => {
        if (!toggleValue) {
            this.setState({
                tempList: this.state.list,
            })
        } else {
            this.setState({
                tempList: this.state.list.filter(this.filterNonHost),
            })
        }
    }

    render() {
        return (
            <div>
                <TopMenu tagId={this.state.tag} />
                <div className="container">
                    <div className="align-right"><ToggleButton callback={this.toggleClientListView} /></div>
                    <OrderTable list={this.state.tempList} />
                </div>
            </div>
        )
    }
}

export default withCookies(Orders);