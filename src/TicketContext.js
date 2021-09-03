import React, { Component } from 'react'
import { createContext } from 'react'

export const TicketContext = createContext()


export default class TicketContextProvider extends Component {

    state = {
        tickets: [
        //     {
        //     id: 1,
        //     name: 'Beatles',
        //     price: '32',
        //     totalAvailable: '3',
        //     startOfSales: '24-09-2021',
        //     endOfSales: '20-12-2021',
        //     image: "https://www.rollingstone.com/wp-content/uploads/2010/12/BeatlesMainW.jpg",
        //     text: 'Bittles Bar is bar located near Victoria Square in central Belfast, Northern Ireland. It one of Belfasts more curious pubs being "/flat-iron" in shape. It was built in 1868 and was originally called the Spare Cell, reflecting its police clientele'
        // },
        // {
        //     id: 2,
        //     name: 'Pinkfloyd ',
        //     price: '45',
        //     totalAvailable: '76',
        //     startOfSales: '22-04-2021',
        //     endOfSales: '24-02-2022',
        //     image: "https://i.guim.co.uk/img/static/sys-images/Books/Pix/pictures/2013/4/9/1365506317084/Pink-Floyd-publicity-shot-007.jpg?width=300&quality=45&auto=format&fit=max&dpr=2&s=9bd2ca647fbf450dfa8dc9ecf2dee559",
        //     text: 'Pink Floyd were an English rock band formed in London in 1964. Gaining an early following as one of the first British psychedelic groups, they were distinguished for their extended compositions, sonic experimentation, philosophical lyrics and elaborate live shows'

        // }
        ],

    }

    deleteItem = (id) => {
        const filterdArray = this.state.tickets.filter(item => item.id !== id)
        this.setState({
            tickets: filterdArray
        })
    }

    addItem = (item) => {
        console.log(item);
        this.setState({
            tickets: [...this.state.tickets, item]
        })
    }

    updateItem = (ticket) => {

        const filterdArray = this.state.tickets.filter(item => item.id !== ticket.id)
        const newState = [...filterdArray, ticket]

        this.setState({
            tickets: newState
        })
    }

    valueObj = {
        addItem: this.addItem,
        deleteItem: this.deleteItem,
        updateItem: this.updateItem,
    }

    render() {
        return (
            <TicketContext.Provider value={{ ...this.state, ...this.valueObj }}>
                {this.props.children}
            </TicketContext.Provider>
        )
    }
}
