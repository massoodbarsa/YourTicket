import React, { Component } from 'react'
import { createContext } from 'react'

export const TicketContext = createContext()

export default class TicketContextProvider extends Component {

    state = {
        tickets: [],
        shoppingCart: []
    }

    componentWillMount() {
        const localData = localStorage.getItem('tickets')
        const localDataParse = localData !== null ? JSON.parse(localData) : []

        this.setState({
            tickets: localDataParse
        })
    }

    deleteItem = (id) => {

        const filterdArray = this.state.tickets.filter(item => item.id !== id)
        this.setState({
            tickets: filterdArray
        })
        localStorage.removeItem('tickets')
        localStorage.setItem('tickets', JSON.stringify(filterdArray))
    }

    addItem = (ticketObj) => {

        this.setState({
            tickets: [...this.state.tickets, ticketObj]
        })

        const localData = localStorage.getItem('tickets')
        const localDataParse = localData !== null ? JSON.parse(localData) : []
        localDataParse.push(ticketObj)
        localStorage.setItem('tickets', JSON.stringify(localDataParse))
    }

    updateItem = (ticket) => {

        const filterdArray = this.state.tickets.filter(item => item.id !== ticket.id)
        const newState = [...filterdArray, ticket]

        this.setState({
            tickets: newState
        })

        localStorage.removeItem('tickets')
        localStorage.setItem('tickets', JSON.stringify(newState))
    }

    changeOrder = (newArray) => {

        console.log(newArray);
        this.setState({
            tickets: newArray
        })
    }

    addToShoppingCart = (item) => {
        
        this.setState({
            shoppingCart: [...this.state.shoppingCart, item]
        })
    }

    deleteFromShoppingCart = (id) => {
        const shoppingCart = this.state.shoppingCart.filter(item => item.id !== id)

        this.setState({
            shoppingCart
        })
    }

    valueObj = {
        addItem: this.addItem,
        deleteItem: this.deleteItem,
        updateItem: this.updateItem,
        changeOrder: this.changeOrder,
        addToShoppingCart: this.addToShoppingCart,
        deleteFromShoppingCart: this.deleteFromShoppingCart
    }

    render() {
        return (
            <TicketContext.Provider value={{ ...this.state, ...this.valueObj }}>
                {this.props.children}
            </TicketContext.Provider>
        )
    }
}
