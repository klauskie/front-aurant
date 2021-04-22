import React, { useRef, useState } from 'react'
import './ItemDetailView.css';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';


const ItemDetailView = ({ itemBundle }) => {

    const quantityInput = useRef(null)
    let [quantity, setQuantity] = useState(1)
    let [instructions, setInstructions] = useState("")

    const onMinusClicked = () => {
        let currentValue = parseInt(quantityInput.current.value)
        if (currentValue > 1) {
            let newVal = currentValue - 1
            quantityInput.current.value = newVal
            setQuantity(newVal)
        }
    }

    const onPlusClicked = () => {
        let currentValue = parseInt(quantityInput.current.value)
        let newVal = currentValue + 1
        quantityInput.current.value = newVal
        setQuantity(newVal)
    }

    const handleInstructionsInputChange = (event) => {
        let text = event.target.value
        setInstructions(text)
    }

    const prepareDataOrder = () => {
        // TODO prepare data object and notify parent to call api
    }

    return (
        <div className="card-container">
            <div className="container">

                <div className="row name-block row-item ">{itemBundle.name}</div>
                <div className="rowrow-item ">{itemBundle.description}</div>

                <div className="row row-item ">
                    <input className="col-sm input-box-lr" onChange={(e) => {handleInstructionsInputChange(e)}} type="text" placeholder="Add instructions" />
                </div>

                <div className="row">
                    <div className="col-lg-2 inc-dec-group">
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <button onClick={onMinusClicked} type="button" class="quantity-left-minus btn btn-light btn-number"  datatype="minus" data-field="">
                                        <span>
                                            <AiOutlineMinus />
                                        </span>
                                    </button>
                                </span>


                                <input id="quantity-input" ref={quantityInput} value={quantity} onChange={(e) => {this.handleChange(e)}} type="number" className="form-control input-number" min={1} max={100}/>
                                
                                
                                <span className="input-group-btn">
                                    <button onClick={onPlusClicked} type="button" className="quantity-right-plus btn btn-light btn-number" datatype="plus" data-field="">
                                        <span>
                                            <AiOutlinePlus />
                                        </span>
                                    </button>
                                </span>
                            </div>
                    </div>
                </div>
                
                <div className="justify-content-center">
                    <div className="bottom-block btn btn-dark">
                        Add to cart: ${itemBundle.price * parseFloat(quantity)}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ItemDetailView