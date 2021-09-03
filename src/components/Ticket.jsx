import React, { useContext, useState } from 'react'
import { TicketContext } from '../TicketContext'


import { makeStyles } from '@material-ui/core/styles';
import { Card, FormControl, CardActions, CardContent, CardMedia, Button, Input, Snackbar, InputLabel } from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

})

export default function Ticket({ ticket }) {
    const context = useContext(TicketContext)

    const classes = useStyles();

    const { id, name, image, startOfSales, totalAvailable, price, endOfSales, text } = ticket

    const [ticketName, setTicketName] = useState(name)
    const [ticketText, setTicketText] = useState(text)
    const [ticketPrice, setTicketPrice] = useState(price)
    const [ticketStartOfSales, setTicketStartOfSales] = useState(startOfSales)
    const [ticketEndOfSales, setTicketEndOfSales] = useState(endOfSales)
    const [ticketAvailable, setTicketAvailable] = useState(totalAvailable)
    const [ticketImage, setTicketImage] = useState(image)

    const [edit, setEdit] = useState(true)
    const [snackbar, setSnackbar] = useState(false)

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };


    const handleSave = () => {
        if (ticketName.length === 0 || ticketText.length === 0) {
            setSnackbar(true)
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
            image:ticketImage,
        }
        // console.log(ticketObj);
        context.updateItem(ticketObj)
        setEdit(true)
    }


    const handleDelete = () => {
        context.deleteItem(id)
    }

    return (
        <div >
            <Card className={classes.root}>

                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={image}
                    title={ticketName}
                />
                <CardContent>
                    <FormControl fullWidth='true' margin='normal' >
                        <InputLabel htmlFor="component-simple" required>Name</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketName}
                            readOnly={edit}
                            onChange={e => setTicketName(e.target.value)}

                        />
                    </FormControl>

                    <FormControl fullWidth='true' margin='normal'>
                        <InputLabel htmlFor="component-simple">Desc</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketText}
                            readOnly={edit}
                            multiline
                            onChange={e => setTicketText(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth='true' margin='normal'>
                        <InputLabel htmlFor="component-simple">Price</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketPrice}
                            readOnly={edit}
                            onChange={e => setTicketPrice(e.target.value)}
                            required
                        />
                    </FormControl>

                    <FormControl fullWidth='true' margin='normal'>
                        <InputLabel htmlFor="component-simple">Start of sales</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketStartOfSales}
                            readOnly={edit}
                            onChange={e => setTicketStartOfSales(e.target.value)}
                            required
                            type="date"

                        />
                    </FormControl>

                    <FormControl fullWidth='true' margin='normal'>
                        <InputLabel htmlFor="component-simple">End of sales</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketEndOfSales}
                            readOnly={edit}
                            onChange={e => setTicketEndOfSales(e.target.value)}
                            required
                            type="date"

                        />
                    </FormControl>

                    <FormControl fullWidth='true' margin='normal'>
                        <InputLabel htmlFor="component-simple">Available tickets</InputLabel>
                        <Input
                            id="component-simple"
                            value={ticketAvailable}
                            readOnly={edit}
                            onChange={e => setTicketAvailable(e.target.value)}
                            required
                        />
                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button size="small" color="secondary" onClick={handleDelete}>
                        Delete
                    </Button>
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
                </CardActions>
            </Card>

            <section >
                <Snackbar
                    className='snackbarOnError'
                    message='This field is required '
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
