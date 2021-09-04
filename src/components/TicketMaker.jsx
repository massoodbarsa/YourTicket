import React, { useContext, useState } from 'react'
import { TicketContext } from '../TicketContext'
import Uuid from 'react-uuid';
import './TicketMaker.scss'

import { FormControl, Button, Input, Snackbar, InputLabel, TextField } from '@material-ui/core/';

export default function TicketMaker() {

    const context = useContext(TicketContext)

    const [ticketName, setTicketName] = useState('')
    const [ticketText, setTicketText] = useState('')
    const [ticketPrice, setTicketPrice] = useState('')
    const [ticketStartOfSales, setTicketStartOfSales] = useState('')
    const [ticketEndOfSales, setTicketEndOfSales] = useState('')
    const [ticketAvailable, setTicketAvailable] = useState('')
    const [ticketImage, setTicketImage] = useState('')

    const [snackbar, setSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const handleAddTicket = () => {
        if (ticketName.length === 0 || ticketText.length === 0 || ticketPrice.length === 0 || ticketStartOfSales.length === 0 || ticketEndOfSales.length === 0 || ticketAvailable.length === 0) {
            setSnackbar(true)
            setErrorMessage('No filed should be empty')

            return
        }

        if ((Date.parse(ticketEndOfSales) <= Date.parse(ticketStartOfSales))) {
            setSnackbar(true)
            setErrorMessage('Start date has to be earlier than End date')

            return
        }

        if (isNaN(Number(ticketAvailable))|| isNaN (Number(ticketPrice))) {
            setSnackbar(true)
            setErrorMessage('Available tickets or Price should be a number')
            return
        }

        const ticketObj = {
            id: Uuid(),
            name: ticketName,
            text: ticketText,
            price: ticketPrice,
            totalAvailable: ticketAvailable,
            startOfSales: ticketStartOfSales,
            endOfSales: ticketEndOfSales,
            image: ticketImage
        }

        context.addItem(ticketObj)
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };
    return (
        <div className='ticket-maker'>
            <FormControl fullWidth='true' margin='normal' >
                <InputLabel htmlFor="component-simple" required>Name</InputLabel>
                <Input
                    onChange={e => setTicketName(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple" >Desc</InputLabel>
                <Input
                    multiline
                    onChange={e => setTicketText(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">Price</InputLabel>
                <Input
                    onChange={e => setTicketPrice(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                {/* <InputLabel htmlFor="component-simple">Start of sales</InputLabel> */}
                <TextField
                    id="date"
                    label="Start of sales"
                    type="date"
                    onChange={e => setTicketStartOfSales(e.target.value)}

                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <TextField
                    id="date"
                    label="End of sales"
                    type="date"
                    onChange={e => setTicketEndOfSales(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">Available tickets</InputLabel>
                <Input
                    onChange={e => setTicketAvailable(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">URL</InputLabel>
                <Input
                    onChange={e => setTicketImage(e.target.value)}
                    required
                />
            </FormControl>

            <Button
                size="medium"
                color="primary"
                className='ticket-maker__add-btn'
                onClick={handleAddTicket}
            >
                Add ticket
            </Button>

            <section >
                <Snackbar
                    className='snackbarOnError'
                    message={errorMessage}
                    key={'top' + 'center'}
                    open={snackbar}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                </Snackbar>
            </section>
        </div>
    )
}
