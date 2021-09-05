import React, { useContext } from 'react'
import { TicketContext } from '../TicketContext'

import './Navbar.scss'
import { NavLink } from 'react-router-dom'
import { Button, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -5,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 3px',
    },
}))(Badge);

export default function Navbar() {

    const context = useContext(TicketContext)

    const { shoppingCart } = context

    const YTPUrl = 'data:image/png;base64,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'

    return (
        <div className='navigation'>
            <div className='navigation__logo'>
                <NavLink to='/'>
                    <img src={YTPUrl} alt="React Logo" />
                </NavLink>
            </div>
            <div className='navigation__items'>
                <ul>
                    <li><NavLink to='/'><Button variant="outlined" color="primary">Home</Button></NavLink></li>
                    <li>
                        {shoppingCart.length > 0 && <IconButton aria-label="cart" color='primary'>
                            <StyledBadge badgeContent={shoppingCart.length} color="secondary" >

                                <NavLink to='/cart'>  <ShoppingCartIcon color='primary' /></NavLink>

                            </StyledBadge>
                        </IconButton>}
                    </li>
                </ul>
            </div>
        </div>
    )
}
