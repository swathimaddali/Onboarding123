import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Onboarding123</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
                    <LinkContainer to={'/fetchCustomer1'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Customer 
              </NavItem>
                    </LinkContainer>
         
                    
             
                    <LinkContainer to={'/fetchProduct1'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Product
              </NavItem>
                    </LinkContainer>

                    <LinkContainer to={'/fetchStore1'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Store
              </NavItem>
                    </LinkContainer>

                    <LinkContainer to={'/fetchSales1'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Sale
              </NavItem>
                    </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
