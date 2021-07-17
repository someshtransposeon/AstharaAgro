import React from 'react';
import { Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faUserPlus, faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, InputGroup } from 'react-bootstrap';
import Home from '../components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItem from '../components/addItem';
import AllItems from '../components/allitems';
import CreateOrder from '../components/createorder';
import EditItem from '../components/edititem';

export default function NavBar() {
    return(
        <Router>
                <Navbar collapseOnSelect expand="lg" style={{paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Brand to="/" as={Link} style={{color:'green'}}>
                        <img  alt="" src="/images/Asthara-Logo.png" width="35" height="35" className="d-inline-block align-top" />{' '}
                        Asthara Agro
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/" as={Link}>Home</Nav.Link>
                            <Nav.Link to="/allitems" as={Link}>Services</Nav.Link>
                            <Nav.Link to="/allitems" as={Link}>Our Vision</Nav.Link>
                            <NavDropdown title="Other" id="collasible-nav-dropdown">
                                <NavDropdown.Item to="/allitems" as={Link}>Contact Us</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>About Us</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>Terms and conditions </NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>Privacy policy</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex" style={{margin: 'auto'}}>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="btnGroupAddon"
                                />
                                <InputGroup.Text id="btnGroupAddon"><FontAwesomeIcon icon={ faSearch } color={'green'}/></InputGroup.Text>
                            </InputGroup>
                        </Form>
                        <Nav>
                            <Nav.Link to="/allitems" as={Link}><Button variant="outline-primary"><FontAwesomeIcon icon={ faUserPlus } color={'#04FAA1'}/> Register</Button>{' '}</Nav.Link>
                            <Nav.Link to="/allitems" as={Link}><Button variant="outline-danger"><FontAwesomeIcon icon={ faSignInAlt } color={'#04FAA1'}/> Login</Button>{' '}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{margin: 'auto'}}>
                            <NavDropdown title="Dashboard" id="collasible-nav-dropdown" style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/additem" as={Link}>Add Item</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Items</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/createorder" as={Link}>Create Order</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Orders</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="User Management" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allitems" as={Link}>Add User</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Users</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/allitems" as={Link}>Add Vendor</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Vendors</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Reports" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allitems" as={Link}>Items</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>Sales Order</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Inventory" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allitems" as={Link}>Show Inventory</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Inventories</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Assignment" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allitems" as={Link}>Delivery</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>Show All Deliveries</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                <Route path="/additem">
                    <AddItem/>
                </Route>
                <Route path="/allitems">
                    <AllItems/>
                </Route>
                <Route path="/edititem">
                    <EditItem/>
                </Route>
                <Route path="/createorder">
                    <CreateOrder/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
                </Switch>
        </Router>
    )
}
