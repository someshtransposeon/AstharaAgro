import React, { useState, useEffect } from 'react';
import { Platform, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faUserPlus, faUser, faSignInAlt, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, FormControl, Form, InputGroup, } from 'react-bootstrap';
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
import All_Indents from '../components/indent/All_Indents';
import Create_Indent from '../components/indent/Create_Indent';
import Edit_Indent from '../components/indent/Edit_Indent';
import Create_Purchase_Order from '../components/purchase_order/Create_Purchase_Order';
import All_Purchase_Orders from '../components/purchase_order/All_Purchase_Orders';
import Edit_Purchase_Order from '../components/purchase_order/Edit_Purchase_Order';
import AllItemCategories from '../components/itemCategory/all_item_categories';
import Profile from '../components/profile/profile';
import AllUserCategories from '../components/userCategory/all_user_categories';
import EditItemCategory from '../components/itemCategory/edit_item_category';
import EditUserCategory from '../components/userCategory/edit_user_category';
import AllUsers from '../components/manager/all_users';
import EditUser from '../components/user/edit_user.js';
import EditAddress from '../components/address/edit_address';
import EditBankDetails from '../components/bank/edit_bank_details';
import Forgotpassword from '../components/profile/forgotpassword';
import EditVendor from '../components/buyer/edit_vendor';
import EditCustomer from '../components/sales_person/edit_customer';
import EditOrder from '../components/order/edit_order';
import EditItemUnit from '../components/itemUnit/edit_item_unit';
import AddItemUnit from '../components/itemUnit/add_item_unit';
import AllItemUnit from '../components/itemUnit/all_item_unit';
import EditItemGrade from '../components/itemGrade/edit_item_grade';
import AddItemGrade from '../components/itemGrade/add_item_grade';
import AllItemGrade from '../components/itemGrade/all_item_grade';
import All_Purchase_Order_Confirm from '../components/purchase_confirm/All_Purchase_Order_Confirm';
import Edit_Purchase_Order_Confirm from '../components/purchase_confirm/Edit_Purchase_Order_Confirm';
import Edit_Purchase_Order_Confirm2 from '../components/purchase_confirm/Edit_Purchase_Order_Confirm2';
import Edit_Purchase_Order_Confirm3 from '../components/purchase_confirm/Edit_Purchase_Order_Confirm3';

import AllTransportation from '../components/confidential/transportation/allTransportation';
import AddTransportation from '../components/confidential/transportation/addTransportation';
import ShowTransportation from '../components/confidential/transportation/showTransportation';
import EditTransportation from '../components/confidential/transportation/editTransportation';


import DisabledAllItems from '../components/item/disabled_all_items';
import DisabledAllItemCategories from '../components/itemCategory/disabled_all_item_categories';
import DisabledAllItemGrade from '../components/itemGrade/disabled_all_item_grade';
import DisabledAllItemUnit from '../components/itemUnit/disabled_all_item_unit';
import DisabledAllUsers from '../components/manager/disabled_all_users';
import DisabledAllUserCategories from '../components/userCategory/disabled_all_user_categories';
import Disabled_Customer_details from '../components/sales_person/disabled_customer_detail';

import DisabledEditItem from '../components/item/disablededititem';
import DisabledEditItemCategory from '../components/itemCategory/disabled_edit_item_category';
import DisabledEditItemGrade from '../components/itemGrade/disabled_edit_item_grade';
import DisabledEditItemUnit from '../components/itemUnit/disabled_edit_item_unit';
import DisabledEditUser from '../components/user/disabled_edit_user.js';
import DisabledEditUserCategory from '../components/userCategory/disabled_edit_user_category.js';

import CustomerAccountDeleteRequests from '../components/sales_person/customer_account_delete_requests';
import All_Pending_Purchase_Orders from '../components/purchase_order/All_Pending_Purchase_Orders';
import All_Accepted_Purchase_Orders from '../components/purchase_order/All_Accepted_Purchase_Orders';
import Edit_Purchase_Order_Price from '../components/purchase_order/Edit_Purchase_Order_Price';
import Accepted_Purchase_Orders from '../components/purchase_order/Accepted_Purchase_Orders';

import AllInventory from '../components/inventory/allinventory';

import All_Pending_Purchase_Order_Confirm from '../components/purchase_confirm/All_Pending_Purchase_Order_Confirm';

import CreateInvoice from '../components/invoice/create_invoice';
import AllInvoice from '../components/invoice/all_invoice';

import VenodrsAddItem from '../components/vendorsItem/vendors_addItem';
import VendorsAllItems from '../components/vendorsItem/vendors_allitems';
import VendorsEditItem from '../components/vendorsItem/vendors_edititem';

import Edit_Vendor_Purchase_Order from '../components/purchase_order/Edit_Vendor_Purchase_Order';
import All_Declined_Purchase_Orders from '../components/purchase_order/All_Declined_Purchase_Orders';

import CreateGrn from '../components/grn/create_grn';
import AllGrn from '../components/grn/all_grn';

import OrderItemsSummary from '../components/order/order_items_summary';

import EditOrderItem from '../components/order/edit_order_item';
import Pickup_Purchase from '../components/purchase_order/Pickup_Purchase';

import All_Pickup_Assignment from '../components/pickup_assign/All_Pickup_Assignment';
import Edit_Pickup_Assignment from '../components/pickup_assign/Edit_Pickup_Assignment';
import Edit_Pickup_Assignment2 from '../components/pickup_assign/Edit_Pickup_Assignment2';
import All_Pending_Pickup_Assignment from '../components/pickup_assign/All_Pending_Pickup_Assignment';
import All_Accepted_Pickup_Assignment from '../components/pickup_assign/All_Accepted_Pickup_Assignment';

import All_Delivery_Beats from '../components/delivery_beat/All_Delivery_Beats';
import All_Pending_Delivery_Beats from '../components/delivery_beat/All_Pending_Delivery_Beats';
import All_Accepted_Delivery_Beats from '../components/delivery_beat/All_Accepted_Delivery_Beats';

import All_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm';
import Edit_Pickup_Assignment_Confirm from '../components/pickup_assign_confirm/Edit_Pickup_Assignment_Confirm';

import All_Pickup_Assignment_Confirm_Vendor from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm_Vendor';
import All_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/All_Pickup_Assignment_Confirm_Buyer';

import Edit_Pickup_Assignment_Confirm_Buyer from '../components/pickup_assign_confirm/Edit_Pickup_Assignment_Confirm_Buyer';

import AllCompletedOrders from '../components/order/all_completed_orders';
import EditCompletedOrder from '../components/order/edit_completed_order';
import EditCompletedOrder2 from '../components/order/edit_completed_order2';
import All_Delivery_Assignment from '../components/delivery_assign/All_Delivery_Assignment';
import All_Pending_Delivery_Assignment from '../components/delivery_assign/All_Pending_Delivery_Assignment';
import All_Accepted_Delivery_Assignment from '../components/delivery_assign/All_Accepted_Delivery_Assignment';

import Edit_Accepted_Delivery_Assignment from '../components/delivery_assign/Edit_Accepted_Delivery_Assignment';
import Edit_Delivery_Assignment from '../components/delivery_assign/Edit_Delivery_Assignment';
import All_Delivery from '../components/update_delivery/All_Delivery';
import All_Confirm_Delivery from '../components/update_delivery/All_Confirm_Delivery';
import Edit_Accepted_Delivery from '../components/update_delivery/Edit_Accepted_Delivery';
import Edit_Confirm_Delivery from '../components/update_delivery/Edit_Confirm_Delivery';

import AllOrders from '../components/order/all_orders';
import ApprovedOrders from '../components/order/approved_orders';
import PendingOrders from '../components/order/pending_orders';
import ViewOrder from '../components/order/view_order';
import View_Purchase_Order from '../components/purchase_order/View_Purchase_Order';

const NavBar =()  => {

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roleas, setRoleas] = useState("");
    const [flag, setFlag] = useState(false);
    const [host, setHost] = useState("");

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        async function fetchData() {
            await AsyncStorage.getItem('loginemail')
            .then((loginemail) => {
                setEmail(loginemail);
            })
            if(flag==false) {
                await AsyncStorage.getItem('role')
                .then((role) => {
                    setRole(role);
                    setRoleas(role);
                    setFlag(true);
                })
            }
        }
        fetchData();
        
    }, [email, role, flag, host]);

    function changeRole(r){
        setRoleas(r);
    }

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
                            <Nav.Link to="/" as={Link}>Services</Nav.Link>
                            <Nav.Link to="/" as={Link}>Our Vision</Nav.Link>
                            <NavDropdown title="Other" id="collasible-nav-dropdown" drop="start">
                                <NavDropdown.Item to="/" as={Link}>Contact Us</NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>About Us</NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>Terms and conditions </NavDropdown.Item>
                                <NavDropdown.Item to="/" as={Link}>Privacy policy</NavDropdown.Item>
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
                                    {role!=null && role=="manager" ?
                                        <NavDropdown title={roleas}>
                                            <NavDropdown.Item onClick={()=>changeRole("manager")}>manager</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("sales")}>sales</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("buyer")}>buyer</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("accountant")}>accountant</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("customer")}>customer</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={()=>changeRole("vendor")}>vendor</NavDropdown.Item>
                                        </NavDropdown>
                                        :
                                        <Nav.Link><Button variant="outline-secondary">{role}</Button>{' '}</Nav.Link>
                                    }
                                    <Nav.Link to="/profile" as={Link}><Button variant="outline-primary"><FontAwesomeIcon icon={ faUser } color={'#04FAA1'}/> {email}</Button>{' '}</Nav.Link>
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
                <div style={{justifyContent: 'center', display: 'flex', width: '100%', backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '20%', paddingRight: '20%', paddingTop: '5px', paddingBottom: '5px'}}>
                {/* <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{margin: 'auto'}}> */}
                            <NavDropdown title="Dashboard" id="collasible-nav-dropdown" style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown title="Item" drop="right" id="collasible-nav-dropdown" style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additem" as={Link}>Add Item</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitems" as={Link}>All Items</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                {( roleas=="vendor" ||roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                    <NavDropdown title="Vendor Item" drop="right" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/vendors_additem" as={Link}>Vendors Add Item</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/vendors_allitems" as={Link}>Vendors All Items</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown title="Item Category" drop="right" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemcategory" as={Link}>Add Item Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemcategories" as={Link}>All Item Categories</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="Item Unit" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}>                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemunits" as={Link}>Add Item Unit</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemunits" as={Link}>All Item Units</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="Item Grade" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}> 
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemgrades" as={Link}>Add Item Grade</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemgrades" as={Link}>All Item Grades</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown title="Order" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="sales" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/createorder" as={Link}>Create Order</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/allorders" as={Link}>All Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/approvedorders" as={Link}>Approved Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/pendingorders" as={Link}>Pending Orders</NavDropdown.Item>
                                    </>
                                }
                                </NavDropdown>
                                <NavDropdown.Divider />
                                {/* {(roleas=="buyer" || roleas=="manager" ) &&
                                    <>
                                        <NavDropdown.Item to="/Create_Indent" as={Link}>Create Indent</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Indents" as={Link}>All Indents</NavDropdown.Item> 
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/Create_Purchase_Order" as={Link}>Create Purchase Order</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Purchase_Orders" as={Link}>All Purchase Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                } */}
                                <NavDropdown title="Purchase Order" id="collasible-nav-dropdown" drop="right"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="vendor" || roleas=="buyer" || roleas=="manager" || roleas=="accountant") &&
                                    <>
                                        <NavDropdown.Item to="/All_Purchase_Orders" as={Link}>All Purchase Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Purchase_Order_Confirm" as={Link}>All Purchase Order Confirm</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Pending_Purchase_Order_Confirm" as={Link}>All Pending Purchase Confirm</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="vendor" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/All_Pending_Purchase_Orders" as={Link}>All Pending for Vendor</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Accepted_Purchase_Orders" as={Link}>All Accepted By Vendor </NavDropdown.Item>
                                    </>
                                }
                                </NavDropdown>
                                {/* <NavDropdown.Divider />
                                <NavDropdown  drop="right" title="Delivery Beats" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="manager" || roleas=="field_executive") &&
                                    <>
                                        <NavDropdown.Item to="/All_Delivery_Beats" as={Link}>All Delivery Beats</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Pending_Delivery_Beats" as={Link}>Pending Delivery Beats</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Accepted_Delivery_Beats" as={Link}>Accepted Delivery Beats</NavDropdown.Item>
                                    </>
                                }        
                                </NavDropdown> */}
                            </NavDropdown>
                            <NavDropdown title="User Management" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {roleas=="manager" &&
                                    <>
                                    <NavDropdown title="User" drop="right" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/register" as={Link}>Add User</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusers" as={Link}>All Users</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="User Category" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/addusercategory" as={Link}>Add User Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusercategories" as={Link}>All User Categories</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                    <NavDropdown drop="right" title="Vendor" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/addvendor" as={Link}>Add Vendor</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/vendordetails" as={Link}>All Vendors</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="manager") &&
                                    <>
                                    <NavDropdown drop="right" title="Customer" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/addcustomer" as={Link}>Add Customer</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/customerdetails" as={Link}>All Customers</NavDropdown.Item>
                                    </NavDropdown>
                                    </>
                                }
                            </NavDropdown>
                            <NavDropdown title="Reports" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {/* <NavDropdown.Item to="/allitems" as={Link}>Items</NavDropdown.Item><NavDropdown.Divider /> */}
                                <NavDropdown.Item to="/allitems" as={Link}>Sales Order</NavDropdown.Item><NavDropdown.Divider />
                                 {( roleas=="manager") &&
                                    <>
                                    <NavDropdown drop="right" title="Disabled" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/disabled_all_items" as={Link}>Disabled Items</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_categories" as={Link}>Disabled ItemCategory</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_unit" as={Link}>Disabled Item Unit</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_item_grade" as={Link}>Disabled Item Grade</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_users" as={Link}>Disabled Users</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabled_all_user_categories" as={Link}>Disabled User Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/disabledcustomerdetails" as={Link}>Disabled Customers</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="Invoice" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/create_invoice" as={Link}>Create Invoice</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_invoice" as={Link}>All Invoices</NavDropdown.Item>
                                    </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown  drop="right" title="Purchase Order" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/Accepted_Purchase_Orders" as={Link}>Accepted Purchase Order</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Declined_Purchase_Orders" as={Link}>All Declined PurchaseOrders</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown.Divider />
                                    <NavDropdown drop="right" title="GRN" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                        <NavDropdown.Item to="/create_grn" as={Link}>Create GRN</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_grn" as={Link}>All GRNs</NavDropdown.Item>
                                    </NavDropdown>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/Pickup_Purchase" as={Link}>Pickup Purchase</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/order_items_summary" as={Link}>Order Items Summary</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager" || roleas=="accountant") &&
                                    <>
                                        <NavDropdown.Item to="/allcompletedorders" as={Link}>All Completed Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {( roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/customer_account_delete_requests" as={Link}>Delete Account Requests</NavDropdown.Item>
                                    </>
                                }
                            </NavDropdown>
                            <NavDropdown title="Inventory" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                <NavDropdown.Item to="/allinventory" as={Link}>Show Inventory</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/allinventory" as={Link}>All Inventories</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Assignment" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {/* <NavDropdown.Item to="/allitems" as={Link}>Delivery</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item to="/allitems" as={Link}>Show All Deliveries</NavDropdown.Item>
                                <NavDropdown.Divider /> */}
                                <NavDropdown drop="right" title="Pickup Assignment" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%'}}>
                                 {(roleas=="buyer" || roleas=="manager") &&
                                    <> 
                                        <NavDropdown.Item to="/all_pickup_assignment" as={Link}>All Pickup Assignment</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_pending_pickup_assignment" as={Link}>All Pending Pickup Assignment</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_accepted_pickup_assignment" as={Link}>All Accepted Pickup Assignment</NavDropdown.Item>        
                                        <NavDropdown.Divider />

                                        <NavDropdown.Item to="/all_pickup_assignment_confirm" as={Link}>All Pickup Assignment Confirm</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/all_pickup_assignment_confirm_buyer" as={Link}>All Pickup Assignment Confirm Buyer</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="vendor" || roleas=="manager" ) &&
                                    <> 
                                        <NavDropdown.Item to="/all_pickup_assignment_confirm_vendor" as={Link}>All Pickup Assignment Confirm Vendor</NavDropdown.Item>        
                                    </>
                                }
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown  drop="right" title="Delivery Assignment" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="accountant" || roleas=="manager"|| roleas=="sales" ) &&
                                    <> 
                                        <NavDropdown.Item to="/All_Delivery_Assignment" as={Link}>All Delivery Assignment</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Pending_Delivery_Assignment" as={Link}>All Pending Delivery Assignment</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/All_Accepted_Delivery_Assignment" as={Link}>All Accepted Delivery Assignment</NavDropdown.Item>        
                                    </>
                                }
                                </NavDropdown>
                                <NavDropdown.Divider />
                                <NavDropdown drop="right" title="Delivery" id="collasible-nav-dropdown"  style={{backgroundColor: 'white', marginLeft: '2%',}}>
                                {(roleas=="accountant" || roleas=="manager"|| roleas=="sales" || roleas=="customer"  ) &&
                                    <> 
                                        <NavDropdown.Item to="/All_Delivery" as={Link}>All Delivery</NavDropdown.Item>        
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="accountant" || roleas=="manager"|| roleas=="sales"  ) &&
                                    <> 
                                        <NavDropdown.Item to="/All_Confirm_Delivery" as={Link}>All Confirm Delivery</NavDropdown.Item>        
                                    </>
                                }
                                </NavDropdown>
                            </NavDropdown>
                        {/* </Nav>
                    </Navbar.Collapse>
                </Navbar> */}
                </div>
                <Switch>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/allorders">
                    <AllOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/approvedorders">
                    <ApprovedOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/pendingorders">
                    <PendingOrders roleas={roleas} host={host}/>
                </Route>
                <Route path="/allusercategories">
                    <AllUserCategories/>
                </Route>
                <Route path="/allitemcategories">
                    <AllItemCategories/>
                </Route>
                <Route path="/allitemunits">
                    <AllItemUnit/>
                </Route>
                <Route path="/additemunits">
                    <AddItemUnit/>
                </Route>
                <Route path="/allitemgrades">
                    <AllItemGrade/>
                </Route>
                <Route path="/additemgrades">
                    <AddItemGrade/>
                </Route>
                <Route path="/additem">
                    <AddItem/>
                </Route>
                <Route path="/allitems">
                    <AllItems/>
                </Route>
                <Route path="/allusers">
                    <AllUsers/>
                </Route>
                <Route path="/vieworder/:orderid" render={(props) => <ViewOrder roleas={roleas} host={host} {...props} />} exact />
                <Route path="/editorder/:orderid" render={(props) => <EditOrder roleas={roleas} host={host} {...props} />} exact />
                <Route path="/edititem/:itemid" render={(props) => <EditItem {...props} />} exact />
                <Route path="/disabled_item/:itemid" render={(props) => <EditItem {...props} />} exact />
                <Route path="/edituser/:userid" render={(props) => <EditUser {...props} />} exact />
                <Route path="/editvendordetails/:vendorid" render={(props) => <EditVendor {...props} />} exact />
                <Route path="/editcustomerdetails/:customerid" render={(props) => <EditCustomer {...props} />} exact />
                <Route path="/editaddress/:addressid" render={(props) => <EditAddress {...props} />} exact />
                <Route path="/editbankdetails/:bankid" render={(props) => <EditBankDetails {...props} />} exact />
                <Route path="/edititemcategory/:itemCategoryid" render={(props) => <EditItemCategory {...props} />} exact />
                <Route path="/edititemunit/:itemUnitid" render={(props) => <EditItemUnit {...props} />} exact />
                <Route path="/edititemgrade/:itemGradeid" render={(props) => <EditItemGrade {...props} />} exact />
                <Route path="/editusercategory/:userCategoryid" render={(props) => <EditUserCategory {...props} />} exact />
                <Route path="/forgotpassword" render={(props) => <Forgotpassword {...props} />} exact />
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
                <Route path="/Create_Indent">
                    <Create_Indent/>
                </Route>
                <Route path="/All_Indents">
                    <All_Indents/>
                </Route>
                <Route path="/Create_Purchase_Order">
                    <Create_Purchase_Order/>
                </Route>
                <Route path="/Edit_Indent/:indentid"  render={(props) => <Edit_Indent {...props} />} exact />
                           
                <Route path="/All_Purchase_Orders">
                    <All_Purchase_Orders/>
                </Route>
                <Route path="/All_Purchase_Order_Confirm">
                    <All_Purchase_Order_Confirm/>
                </Route>
                <Route path="/AllTransportation">
                    <AllTransportation/>
                </Route>
                <Route path="/AddTransportation">
                    <AddTransportation/>
                </Route>
                <Route path="/ShowTransportation">
                    <ShowTransportation/>
                </Route>
                <Route path="/EditTransportation/:transportationid" render={(props) => <EditTransportation {...props} />} exact />
                <Route path="/Edit_Purchase_Order/:purchaseid" render={(props) => <Edit_Purchase_Order {...props} />} exact />
                <Route path="/Edit_Vendor_Purchase_Order/:purchaseid" render={(props) => <Edit_Vendor_Purchase_Order {...props} />} exact />
                <Route path="/View_Purchase_Order/:purchaseid" render={(props) => <View_Purchase_Order roleas={roleas} {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm2/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm2 {...props} />} exact />
                <Route path="/Edit_Purchase_Order_confirm3/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm3 {...props} />} exact />

                
                <Route path="/disabled_all_items">
                    <DisabledAllItems/>
                </Route>
                <Route path="/disabled_all_item_categories">
                    <DisabledAllItemCategories/>
                </Route>
                <Route path="/disabled_all_item_grade">
                    <DisabledAllItemGrade/>
                </Route>
                <Route path="/disabled_all_item_unit">
                    <DisabledAllItemUnit/>
                </Route>
                <Route path="/disabled_all_users">
                    <DisabledAllUsers/>
                </Route>
                <Route path="/disabled_all_user_categories">
                    <DisabledAllUserCategories/>
                </Route>
                <Route path="/disabledcustomerdetails">
                    <Disabled_Customer_details/>
                </Route>
                
                <Route path="/disablededititem/:itemid" render={(props) => <DisabledEditItem {...props} />} exact />
                <Route path="/disablededititemcategory/:itemCategoryid" render={(props) => <DisabledEditItemCategory {...props} />} exact />
                <Route path="/disablededititemgrade/:itemGradeid" render={(props) => <DisabledEditItemGrade {...props} />} exact />
                <Route path="/disablededititemunit/:itemUnitid" render={(props) => <DisabledEditItemUnit {...props} />} exact />
                <Route path="/disablededituser/:userid" render={(props) => <DisabledEditUser {...props} />} exact />
                <Route path="/disablededitusercategory/:userCategoryid" render={(props) => <DisabledEditUserCategory {...props} />} exact />
                
                {/* <Route path="/delete_account_requests">
                    <DeleteAccountRequests/>
                </Route> */}

                <Route path="/customer_account_delete_requests">
                    <CustomerAccountDeleteRequests/>
                </Route>
                <Route path="/All_Pending_Purchase_Orders">
                    <All_Pending_Purchase_Orders/>
                </Route>
                <Route path="/All_Accepted_Purchase_Orders">
                    <All_Accepted_Purchase_Orders/>
                </Route>
                <Route path="/Edit_Purchase_Order_Price/:purchaseid" render={(props) => <Edit_Purchase_Order_Price {...props} />} exact />
                <Route path="/Accepted_Purchase_Orders">
                    <Accepted_Purchase_Orders/>
                </Route>
                
                <Route path="/allinventory">
                    <AllInventory/>
                </Route>
                <Route path="/All_Pending_Purchase_Order_Confirm">
                    <All_Pending_Purchase_Order_Confirm/>
                </Route>
                <Route path="/all_invoice">
                    <AllInvoice/>
                </Route>
                <Route path="/create_invoice">
                    <CreateInvoice/>
                </Route>
                <Route path="/vendors_additem">
                    <VenodrsAddItem/>
                </Route>
                <Route path="/vendors_allitems">
                    <VendorsAllItems/>
                </Route>    
                <Route path="/vendors_edititem/:itemid" render={(props) => <VendorsEditItem {...props} />} exact />        
                
                <Route path="/All_Declined_Purchase_Orders">
                    <All_Declined_Purchase_Orders/>
                </Route>    
                <Route path="/all_grn">
                    <AllGrn/>
                </Route>
                <Route path="/create_grn">
                    <CreateGrn/>
                </Route>
                <Route path="/order_items_summary">
                    <OrderItemsSummary host={host}/>
                </Route>
                <Route path="/editorderitem/:orderid" render={(props) => <EditOrderItem {...props} />} exact />
                <Route path="/Pickup_Purchase">
                    <Pickup_Purchase/>
                </Route>    

                <Route path="/all_pickup_assignment">
                    <All_Pickup_Assignment/>
                </Route>
                <Route path="/Edit_Pickup_Assignment/:pickupId" render={(props) => <Edit_Pickup_Assignment {...props} />} exact />
                <Route path="/Edit_Pickup_Assignment2/:pickupId" render={(props) => <Edit_Pickup_Assignment2 {...props} />} exact />
                {/* <Route path="/Edit_Purchase_Order_confirm3/:purchaseconfirmid" render={(props) => <Edit_Purchase_Order_Confirm3 {...props} />} exact /> */}

                <Route path="/all_pending_pickup_assignment">
                    <All_Pending_Pickup_Assignment/>
                </Route>
                <Route path="/all_accepted_pickup_assignment">
                    <All_Accepted_Pickup_Assignment/>
                </Route>
                <Route path="/All_Delivery_Beats">
                    <All_Delivery_Beats/>
                </Route> 
                <Route path="/All_Pending_Delivery_Beats">
                    <All_Pending_Delivery_Beats/>
                </Route> 
                <Route path="/All_Accepted_Delivery_Beats">
                    <All_Accepted_Delivery_Beats/>
                </Route>    
                <Route path="/all_pickup_assignment_confirm">
                    <All_Pickup_Assignment_Confirm/>
                </Route>
                    
                <Route path="/all_pickup_assignment_confirm_vendor">
                    <All_Pickup_Assignment_Confirm_Vendor/>
                </Route>
                <Route path="/all_pickup_assignment_confirm_buyer">
                    <All_Pickup_Assignment_Confirm_Buyer/>
                </Route>
                <Route path="/Edit_Pickup_Assignment_Confirm/:pickupConfirmId" render={(props) => <Edit_Pickup_Assignment_Confirm {...props} />} exact />
                <Route path="/Edit_Pickup_Assignment_Confirm_Buyer/:pickupConfirmId" render={(props) => <Edit_Pickup_Assignment_Confirm_Buyer {...props} />} exact />
                
                <Route path="/allcompletedorders">
                    <AllCompletedOrders/>
                </Route>        
                <Route path="/editCompletedorder/:orderid" render={(props) => <EditCompletedOrder {...props} />} exact />    
                    
                <Route path="/All_Delivery_Assignment">
                    <All_Delivery_Assignment/>
                </Route>    
                <Route path="/editCompletedorder2/:orderid" render={(props) => <EditCompletedOrder2 {...props} />} exact />    
                <Route path="/All_Pending_Delivery_Assignment">
                    <All_Pending_Delivery_Assignment/>
                </Route> 
                <Route path="/All_Accepted_Delivery_Assignment">
                    <All_Accepted_Delivery_Assignment/>
                </Route>   
                <Route path="/Edit_Accepted_Delivery_Assignment/:deliveryid" render={(props) => <Edit_Accepted_Delivery_Assignment {...props} />} exact />
                <Route path="/Edit_Delivery_Assignment/:deliveryid" render={(props) => <Edit_Delivery_Assignment {...props} />} exact />
                    
                <Route path="/All_Delivery">
                    <All_Delivery/>
                </Route>
                <Route path="/All_Confirm_Delivery">
                    <All_Confirm_Delivery/>
                </Route>    
                <Route path="/Edit_Accepted_Delivery/:deliveryid" render={(props) => <Edit_Accepted_Delivery {...props} />} exact />
                <Route path="/Edit_Confirm_Delivery/:deliveryid" render={(props) => <Edit_Confirm_Delivery {...props} />} exact />

                </Switch>
        </Router>
    )
}

export default NavBar;
