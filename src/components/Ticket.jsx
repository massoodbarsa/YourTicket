import React, { useContext, useState, useEffect } from 'react'
import { FormControl, Button, Input, Snackbar, InputLabel, TextField } from '@material-ui/core/';
import { TicketContext } from '../TicketContext'
import './Ticket.scss'
import Uuid from 'react-uuid';


export default function Ticket(props) {

    const context = useContext(TicketContext)

    const {
        id,
        name,
        image,
        startOfSales,
        totalAvailable,
        price,
        endOfSales,
        text,
    } = props.ticket

    const [ticketName, setTicketName] = useState('')
    const [ticketText, setTicketText] = useState('')
    const [ticketPrice, setTicketPrice] = useState('')
    const [ticketStartOfSales, setTicketStartOfSales] = useState('')
    const [ticketEndOfSales, setTicketEndOfSales] = useState('')
    const [ticketAvailable, setTicketAvailable] = useState('')
    const [ticketImage, setTicketImage] = useState(image)

    const [snackbar, setSnackbar] = useState(false)
    const [edit, setEdit] = useState(props.ticketMakeMode ? false : true)
    const [errorMessage, setErrorMessage] = useState()


    useEffect(() => {

        setTicketName(name)
        setTicketText(text)
        setTicketPrice(price)
        setTicketStartOfSales(startOfSales)
        setTicketEndOfSales(endOfSales)
        setTicketAvailable(totalAvailable)

    }, [props.ticket])

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

        if (ticketAvailable < 0 || ticketPrice < 0) {
            setSnackbar(true)
            setErrorMessage('Available tickets or Price should be a positivie number')
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
    const handleSave = () => {

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

        if (ticketAvailable < 0 || ticketPrice < 0) {
            setSnackbar(true)
            setErrorMessage('Available tickets or Price should be a positivie number')
            return
        }


        const ticketObj = {
            id: id,
            name: ticketName,
            text: ticketText,
            price: ticketPrice,
            totalAvailable: ticketAvailable,
            startOfSales: ticketStartOfSales,
            endOfSales: ticketEndOfSales,
            image: image,
        }
        // console.log(ticketObj);
        context.updateItem(ticketObj)
        setEdit(true)
    }

    const handleDelete = () => {
        context.deleteItem(id)
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    return (
        <>
            <FormControl fullWidth='true' margin='normal' >
                <InputLabel htmlFor="component-simple" required>Name</InputLabel>
                <Input
                    id="component-simple"
                    value={ticketName}
                    disabled={edit}
                    onChange={e => setTicketName(e.target.value)}

                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple" required>Desc</InputLabel>
                <Input
                    id="component-simple"
                    value={ticketText}
                    disabled={edit}
                    multiline
                    onChange={e => setTicketText(e.target.value)}
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple" required>Price</InputLabel>
                <Input
                    id="component-simple"
                    value={ticketPrice}
                    disabled={edit}
                    onChange={e => setTicketPrice(e.target.value)}
                    type="number"
                />
            </FormControl>
            <FormControl fullWidth='true' margin='normal'>
                <TextField
                    id="date"
                    label="Start of sales"
                    type="date"
                    onChange={e => setTicketStartOfSales(e.target.value)}
                    disabled={edit}
                    value={ticketStartOfSales}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <TextField
                    id="date"
                    label="End of sales"
                    type="date"
                    onChange={e => setTicketEndOfSales(e.target.value)}
                    disabled={edit}
                    value={ticketEndOfSales}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </FormControl>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel htmlFor="component-simple" required>Available tickets</InputLabel>
                <Input
                    id="component-simple"
                    value={ticketAvailable}
                    disabled={edit}
                    onChange={e => setTicketAvailable(e.target.value)}
                    type="number"

                />
            </FormControl>

            {
                props.isImage && <FormControl fullWidth='true' margin='normal'>
                    <InputLabel htmlFor="component-simple">Image URL</InputLabel>
                    <Input
                        onChange={e => setTicketImage(e.target.value)}
                        required
                    />
                </FormControl>
            }

            <div className='ticket-btn'>

                {props.isDelete &&
                    <section>
                        <Button size="small" color="secondary" onClick={handleDelete}>
                            Delete
                        </Button>
                    </section>}

                {props.isSave &&
                    <section>
                        {
                            edit ?
                                <Button size="small" color="primary" onClick={() => setEdit(false)}>
                                    Edit
                                </Button>
                                :
                                <Button size="small" color="primary" onClick={handleSave}>
                                    Save
                                </Button>
                        }
                    </section>
                }

                {props.isAdd &&
                    <section>
                        <Button size="small" color="primary" onClick={handleAddTicket}>
                            Add Ticket
                        </Button>
                    </section>
                }

            </div>
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
        </>
    )
}
