import React, { useRef, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Snackbar } from '@material-ui/core/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { TicketContext } from '../TicketContext'

import { useDrag, useDrop } from 'react-dnd';
import Ticket from './Ticket';

const useStyles = makeStyles({
    root: {
        width: 250,
        backgroundColor: '#f4f4f4',
        maxHeight: 600,
        overflow: 'scroll',
        marginBottom: 50,
        cursor: 'grab'
    },
})

export default function TicketCard({ ticket, ticketId, moveTicket, index }) {

    const context = useContext(TicketContext)

    const [snackbar, setSnackbar] = useState(false)

    const classes = useStyles();

    const { name, image } = ticket

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

    const handleShopping = () => {

        const existingItem = context.shoppingCart.filter(item => item.name === ticket.name)

        if (existingItem.length > 0) {
            setSnackbar(true)
            return
        }

        context.addToShoppingCart(ticket);
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    return (
        <>
            <Card className={classes.root} ref={ref} style={{ boxShadow: isDragging ? '1px 5px 5px steelblue' : '0 0' }}>
                < section className='ticket-container__shopping'>
                    <FontAwesomeIcon icon={faShoppingBag} size='2x' onClick={handleShopping} className='ticket-container__shopping__icon' />
                </section>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={image}
                    title={name}
                />
                <CardContent>
                    <Ticket ticket={ticket} isDelete isSave />
                </CardContent>
            </Card>

            <section >
                <Snackbar
                    className='snackbarOnError'
                    message='This ticket is already added to the cart'
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
