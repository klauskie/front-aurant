import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import MenuTable from '../../components/Menu/MenuTable';
import TopMenu from '../../components/TopMenu/TopMenu';
import ItemDetailView from '../../components/ItemDetailView/ItemDetailView';
import './Menu.css'; 

const RESTAURANT_ID = "db011a96-4310-414f-b30c-9d0c4eaaefed"
const API_MENU_URL = "http://localhost:8080/api/"
const GET_MENU_LIST_URL = API_MENU_URL + `item/${RESTAURANT_ID}`
const GET_COMPLETE_MENU_LIST_URL = API_MENU_URL + `category/restaurant/${RESTAURANT_ID}`

class Menu extends Component {
    state = {
        list: [],
        toggle: false,
        currentItem: {},
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

    render() {
        return (
            <div>
                <TopMenu />
                
                <Modal show={this.state.toggle} onHide={this.handleClose} dialogClassName="detail-modal">
                    <Modal.Body>
                        <ItemDetailView itemBundle={this.state.currentItem} />
                    </Modal.Body>
                </Modal>

                <MenuTable list={this.state.list} itemCallback={this.toggleDetailView} />
            </div>
        )
    }

    toggleDetailView = (itemBundle) => {
        console.log(itemBundle)

        this.setState({
            toggle: !this.state.toggle,
            currentItem: itemBundle
        });
        
    }

    handleClose = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }
}

export default Menu;