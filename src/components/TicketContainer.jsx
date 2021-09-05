import React, { useContext, useCallback } from 'react'
import TicketCard from './TicketCard'
import { TicketContext } from '../TicketContext'
import './TicketContainer.scss'


export default function TicketContainer() {

    const context = useContext(TicketContext)

    const { tickets } = useContext(TicketContext)

    console.log('container');
    console.log(tickets);

    const moveTicket = useCallback((dragIndex, hoverIndex) => {
        const dragCard = tickets[dragIndex];
        const hoverCard = tickets[hoverIndex];

        tickets[dragIndex] = hoverCard
        tickets[hoverIndex] = dragCard

        context.changeOrder(tickets)

    }, [tickets]);

    const ticket = tickets.map((item, index) => {
        return (
            <div className='ticket-container' key={index}>
                <TicketCard ticket={item} ticketId={item.id} index={index} moveTicket={moveTicket} />
            </div>
        )
    })

    return (
        <div className='ticket-container' >
            {ticket}
        </div>
    )
}
