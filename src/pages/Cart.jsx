import React, { useContext } from 'react'
import { TicketContext } from '../TicketContext'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Cart.scss'

export default function Cart() {

    const context = useContext(TicketContext)
    const { shoppingCart } = context

    const handleDelete = (id) => {
        context.deleteFromShoppingCart(id)
    }

    return (
        <div className='shop-container'>
            <h3>Cart</h3>

            {
                shoppingCart.map((item, index) => {
                    const {
                        id,
                        name,
                        image,
                        startOfSales,
                        totalAvailable,
                        price,
                        endOfSales,
                        text
                    } = item

                    return (
                        <div className='shop-container__items' key={index}>

                            <section className='shop-container__items__desc'>
                                <img src={image} alt="" />
                            </section>
                            <section className='shop-container__items__name'>
                                <p>{name}</p>
                            </section>

                            <section className='shop-container__items__price'>
                                <p>${price}</p>
                            </section>

                            <section className='shop-container__items__trash' >

                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    // size='2x'
                                    onClick={() => handleDelete(id)}
                                />
                            </section>
                        </div>
                    )
                })
            }
        </div>
    )
}
