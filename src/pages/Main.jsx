import React from 'react'
import TicketContainer from '../components/TicketContainer'
import TicketMaker from '../components/TicketMaker'
import './Main.scss'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function main() {
    return (
        <div className='main'>
            <section className='main__left'>
                <TicketMaker />
            </section>
            <section className='main__right'>
                <DndProvider backend={HTML5Backend}>
                    <TicketContainer />
                </DndProvider>
            </section>
        </div>
    )
}
