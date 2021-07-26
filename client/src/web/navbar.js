import React, { useState, useEffect } from 'react';
import { Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faUserPlus, faUser, faSignInAlt, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, InputGroup } from 'react-bootstrap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from '../components/home/home';
import AddItem from '../components/item/addItem';
import AllItems from '../components/item/allitems';
import CreateOrder from '../components/order/createorder';
import EditItem from '../components/item/edititem';
import Login from '../components/user/login';
import Register from '../components/user/register';
import Buyer_add_vendor from '../components/buyer/add_vendor';
import Vendor_details from '../components/buyer/vendor_details';
import Add_customer from '../components/sales_person/add_customer';
import Customer_details from '../components/sales_person/customer_detail';
import AddItemCategory from '../components/itemCategory/add_item_category';
import AddUserCategory from '../components/userCategory/add_user_category';
import AddAddress from '../components/address/add_address';
import AddBankDetails from '../components/bank/add_bank_details';

const NavBar =()  => {

    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginemail')
            .then((loginemail) => {
                setEmail(loginemail);
            })
            console.log(email);
        }
        fetchData();
    }, [email]);

    const Logout = async (value) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loginemail');
        await AsyncStorage.removeItem('loginuserid');
        setEmail("");
        console.log("Logout Success");
    }

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
                            {email!=null && email!="" ?
                                <>
                                    <Nav.Link to="/" as={Link}><Button variant="outline-primary">{email}</Button>{' '}</Nav.Link>
                                    <Nav.Link to="/profile" as={Link}><Button variant="outline-primary"><FontAwesomeIcon icon={ faUser } color={'#04FAA1'}/> Profile</Button>{' '}</Nav.Link>
                                    <Nav.Link><Button variant="outline-danger" onClick={()=>Logout()}><FontAwesomeIcon icon={ faSignOutAlt } color={'#04FAA1'}/> Logout</Button>{' '}</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link to="/register" as={Link}><Button variant="outline-primary"><FontAwesomeIcon icon={ faUserPlus } color={'#04FAA1'}/> Register</Button>{' '}</Nav.Link>
                                    <Nav.Link to="/login" as={Link}><Button variant="outline-danger"><FontAwesomeIcon icon={ faSignInAlt } color={'#04FAA1'}/> Login</Button>{' '}</Nav.Link>
                                </>
                            }
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
                                <NavDropdown.Item to="/additemcategory" as={Link}>Add Item Category</NavDropdown.Item>
                                <NavDropdown.Item to="/allitemcategories" as={Link}>All Item Categories</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/createorder" as={Link}>Create Order</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Orders</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="User Management" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/register" as={Link}>Add User</NavDropdown.Item>
                                <NavDropdown.Item to="/addaddress" as={Link}>Add Address</NavDropdown.Item>
                                <NavDropdown.Item to="/addbankdetails" as={Link}>Add Bank Details</NavDropdown.Item>
                                <NavDropdown.Item to="/allitems" as={Link}>All Users</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/addusercategory" as={Link}>Add User Category</NavDropdown.Item>
                                <NavDropdown.Item to="/allusercategories" as={Link}>All User Categories</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/addvendor" as={Link}>Add Vendor</NavDropdown.Item>
                                <NavDropdown.Item to="/vendordetails" as={Link}>All Vendors</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/addcustomer" as={Link}>Add Customer</NavDropdown.Item>
                                <NavDropdown.Item to="/customerdetails" as={Link}>All Customers</NavDropdown.Item>
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
                <Route path="/edititem/:itemId">
                    <EditItem/>
                </Route>
                <Route path="/createorder">
                    <CreateOrder/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/addvendor">
                    <Buyer_add_vendor/>
                </Route>
                <Route path="/vendordetails">
                    <Vendor_details/>
                </Route>
                <Route path="/addcustomer">
                    <Add_customer/>
                </Route>
                <Route path="/customerdetails">
                    <Customer_details/>
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="/additemcategory" exact>
                <AddItemCategory/>
                </Route>
                <Route path="/addusercategory" exact>
                    <AddUserCategory/>
                </Route>
                <Route path="/addaddress" exact>
                    <AddAddress/>
                </Route>
                <Route path="/addbankdetails" exact>
                    <AddBankDetails/>
                </Route>
                </Switch>
        </Router>
    )
}

export default NavBar;