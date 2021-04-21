import React, { Component } from 'react'
import axios from 'axios';
import MenuTable from '../../components/Menu/MenuTable';

const RESTAURANT_ID = "db011a96-4310-414f-b30c-9d0c4eaaefed"
const API_MENU_URL = "http://localhost:8080/api/"
const GET_MENU_LIST_URL = API_MENU_URL + `item/${RESTAURANT_ID}`
const GET_COMPLETE_MENU_LIST_URL = API_MENU_URL + `category/restaurant/${RESTAURANT_ID}`

class Menu extends Component {
    state = {
        list: [],
    }

    componentDidMount() {
        axios.get(GET_COMPLETE_MENU_LIST_URL)
            .then(res => {
                let data = res.data;
                this.setState({
                    list: data
                })
                console.log(data)
            })
            .catch(err => console.log("Couldn't fetch data. Error: " + err))
    }

    render() {
        return (
            <div>
                <MenuTable list={this.state.list} />
            </div>
        )
    }
}

export default Menu;