import React from 'react'
import {Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';

export default function Navigation(){
    

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Home</NavbarBrand>
                <Nav className="m-auto" navbar>
                    <NavItem className="p-2">
                        <NavLink href="/owner">Owner</NavLink>
                    </NavItem>
                    <NavItem className="p-2">
                        <NavLink href="/customer">Customer</NavLink>
                    </NavItem>
                </Nav>
            </Navbar> 
        </div>
    )
}