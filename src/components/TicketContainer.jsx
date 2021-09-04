import React, { useContext, useCallback } from 'react'
import Ticket from './Ticket'
import { TicketContext } from '../TicketContext'
import './TicketContainer.scss'


export default function TicketContainer() {

    const context= useContext(TicketContext)

    const { tickets } = useContext(TicketContext)

    const moveTicket = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tickets[dragIndex];
        const hoverCard = tickets[hoverIndex];

        tickets[dragIndex]=hoverCard
        tickets[hoverIndex]=dragCard

        context.changeOrder(tickets)
        
    }, [tickets]);


    const ticket = tickets.map((item, index) => {
        return (
            <div className='ticket-container' key={index}>
                <Ticket ticket={item} ticketId={item.id} index={index} moveTicket={moveTicket} />
            </div>
        )
    })

    return (
        <div className='ticket-container' >
            {ticket}
        </div>
    )
}
