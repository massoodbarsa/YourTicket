import React, { useContext, useState } from 'react'
import { TicketContext } from '../TicketContext'
import Uuid from 'react-uuid';

import { Card, FormControl, CardActions, CardContent, CardMedia, Button, Input, Snackbar, InputLabel } from '@material-ui/core/';

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

    const handleAddTicket = () => {
        if (ticketName.length === 0 || ticketText.length === 0 || ticketText.length === 0 || ticketStartOfSales.length === 0 || ticketEndOfSales.length === 0 || setTicketAvailable.length === 0) {
            setSnackbar(true)
            return
        }
        console.log(ticketName.length);

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
        // console.log(ticketObj);
        context.addItem(ticketObj)
        // setEdit(true)
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
                    id="component-simple"

                    onChange={e => setTicketName(e.target.value)}

                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple" >Desc</InputLabel>
                <Input
                    id="component-simple"

                    multiline
                    onChange={e => setTicketText(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">Price</InputLabel>
                <Input
                    id="component-simple"

                    onChange={e => setTicketPrice(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">Start of sales</InputLabel>
                <Input
                    id="component-simple"

                    onChange={e => setTicketStartOfSales(e.target.value)}
                    required
                    type="date"

                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">End of sales</InputLabel>
                <Input
                    id="component-simple"

                    onChange={e => setTicketEndOfSales(e.target.value)}
                    required
                    type="date"

                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">Available tickets</InputLabel>
                <Input
                    id="component-simple"

                    onChange={e => setTicketAvailable(e.target.value)}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple">URL</InputLabel>
                <Input
                    id="component-simple"

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
                    message='All fields has to be filled'
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
