import React, { useContext, useState, useRef } from 'react'
import { TicketContext } from '../TicketContext'
import { makeStyles } from '@material-ui/core/styles';
import { Card, FormControl, CardActions, CardContent, CardMedia, Button, Input, Snackbar, InputLabel } from '@material-ui/core/';
import { useDrag, useDrop } from 'react-dnd';


const useStyles = makeStyles({
    root: {
        width: 300,
        backgroundColor: '#f4f4f4',
        maxHeight: 600,
        overflow: 'scroll',
        marginBottom: 50,
    },

})

export default function Ticket({ ticket, ticketId, moveTicket, index }) {
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

    ///drag
    const [{ isDragging }, drag] = useDrag({
        type: 'ticket',
        item: () => {
            return { ticketId, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });


    ///drop
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ticket',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveTicket(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

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
            image: ticketImage,
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
            <Card className={classes.root} ref={ref} style={{ boxShadow: isDragging ? '1px 5px 5px steelblue' : '0 0' }}>

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
