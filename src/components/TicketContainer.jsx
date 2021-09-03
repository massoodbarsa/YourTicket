import React, { useContext, useState } from 'react'
import Ticket from './Ticket'
import { TicketContext } from '../TicketContext'
import './TicketContainer.scss'


export default function TicketContainer() {

    const context = useContext(TicketContext)

    console.log(context.tickets);

    const ticket = context.tickets.map((item, index) => {
        return (
            <div className='ticket-container'>
                <Ticket ticket={item} />
            </div>
        )
    })

    return (
        <div className='ticket-container'>
            {ticket}
        </div>
    )
}
