import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import MenuTable from '../../components/Menu/MenuTable';
import TopMenu from '../../components/TopMenu/TopMenu';
import ItemDetailView from '../../components/ItemDetailView/ItemDetailView';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { KEY_ACCESS_TOKEN, KEY_TAG, KEY_VENDOR_ID } from '../../util/Constants';
import { fetchMenuGET, sendClientOrderPOST } from '../../util/APIutils';
import './Menu.css'; 


class Menu extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        list: [],
        toggle: false,
        currentItem: {},
        token: this.props.cookies.get(KEY_ACCESS_TOKEN) || "",
        tag: this.props.cookies.get(KEY_TAG) || "",
        vendorId: this.props.cookies.get(KEY_VENDOR_ID) || "",
    }

    componentDidMount() {
        this.fetchMenu()
    }

    fetchMenu = () => {
        fetchMenuGET(this.state.vendorId).then(data => {
            this.setState({
                list: data
            })
        }).catch(() => {})
    }

    sendClientOrder = (order) => {
        sendClientOrderPOST(order, this.state.tag, this.state.token).then(data => {
            this.handleClose()
        })
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
        let mToken = this.props.cookies.get(KEY_ACCESS_TOKEN) || ""
        this.setState({
            token: mToken,
        });

        if (mToken.length === 0) {
            console.log("No token... Cannot toggle item detail view")
        }
        return mToken.length > 0
    }

    render() {
        return (
            <div>
                <TopMenu tagId={this.state.tag} />
                
                <Modal show={this.state.toggle} onHide={this.handleClose} dialogClassName="detail-modal">
                    <Modal.Body>
                        <ItemDetailView itemBundle={this.state.currentItem} orderCallback={this.sendClientOrder} />
                    </Modal.Body>
                </Modal>

                <MenuTable list={this.state.list} itemCallback={this.toggleDetailView} />
            </div>
        )
    }
}

export default withCookies(Menu);