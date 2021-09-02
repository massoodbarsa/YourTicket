import React, { useContext ,useState} from 'react'
import Ticket from './Ticket'
import { TicketContext } from '../TicketContext'


export default function TicketContainer() {

    const context = useContext(TicketContext)

console.log(context.tickets);
    const [tickets, setTicket] = useState(context.tickets)

    const ticket = tickets.map((item, index) => {
        return (
            <div className='ticket-container'>
                <Ticket ticket={item} />
            </div>
        )
    })

    return (
        <div>
            TicketContainer
            {ticket}
        </div>
    )
}
