import React from 'react'
import './TicketMaker.scss'

import Ticket from './Ticket';

export default function TicketMaker() {

    const ticket = {
        id: '',
        name: '',
        text: '',
        price: '',
        totalAvailable: '',
        startOfSales: '',
        endOfSales: '',
        image: ''
    }

    return (
        <div className='ticket-maker'>
            <Ticket ticket={ticket} isImage isAdd ticketMakeMode={true} />
        </div>
    )
}
