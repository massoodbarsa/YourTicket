import React from 'react'
import TicketContainer from './TicketContainer'
import TicketMaker from './TicketMaker'
import './Main.scss'


export default function main() {
    return (
        <div className='main'>
            <section className='main__left'>
                <TicketMaker />
            </section>
            <section className='main__right'>
                <TicketContainer />
            </section>
        </div>
    )
}
