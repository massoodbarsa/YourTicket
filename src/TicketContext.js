import React, { Component } from 'react'
import { createContext } from 'react'

export const TicketContext = createContext()

export default class TicketContextProvider extends Component {

    state = {
        tickets: []
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
        localStorage.removeItem('tickets')
        localStorage.setItem('tickets', JSON.stringify(filterdArray))

        this.setState({
            tickets: filterdArray
        })
    }

    addItem = (ticketObj) => {
        const localData = localStorage.getItem('tickets')
        const localDataParse = localData !== null ? JSON.parse(localData) : []

        localDataParse.push(ticketObj)
        localStorage.setItem('tickets', JSON.stringify(localDataParse))

        this.setState({
            tickets: [...this.state.tickets, ticketObj]
        })
    }

    updateItem = (ticket) => {

        const filterdArray = this.state.tickets.filter(item => item.id !== ticket.id)
        const newState = [...filterdArray, ticket]

        localStorage.removeItem('tickets')
        localStorage.setItem('tickets', JSON.stringify(newState))

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
