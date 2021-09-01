import React, { Component } from 'react'
import { createContext } from 'react'

export const TicketContext = createContext()


export default class TicketContextProvider extends Component {

    state = {
        tickets: [{
            id: 1,
            name: 'Beatles',
            price: '32',
            totalAvailable: '3',
            startOfSales: '24-09-2021',
            endOfSales: '20-12-2021',

        },
        {
            id: 2,
            name: 'Pinkfloyd ',
            price: '45',
            totalAvailable: '76',
            startOfSales: '22-04-2021',
            endOfSales: '24-02-2022',

        }
    ],

    }

    // deleteItem = (item) => {

    // }

    // addItem = (item, id) => {


    //     this.setState({
    //         tickets: [...this.state.tickets, item]
    //     })
    // }

    // updateItem = () => {


    // }



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
