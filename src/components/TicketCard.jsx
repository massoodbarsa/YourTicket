import React, {  useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, } from '@material-ui/core/';
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

    return (
        <div className='ticket'>
            <Card className={classes.root} ref={ref} style={{ boxShadow: isDragging ? '1px 5px 5px steelblue' : '0 0' }}>
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
        </div>
    )
}
