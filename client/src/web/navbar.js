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
import All_Indents from '../components/indent/All_Indents';
import Create_Indent from '../components/indent/Create_Indent';
import Edit_Indent from '../components/indent/Edit_Indent';
import Create_Purchase_Order from '../components/purchase_order/Create_Purchase_Order';
import All_Purchase_Orders from '../components/purchase_order/All_Purchase_Orders';
import Edit_Purchase_Order from '../components/purchase_order/Edit_Purchase_Order';
import AllItemCategories from '../components/itemCategory/all_item_categories';
import AllOrders from '../components/order/all_orders';
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

const NavBar =()  => {

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roleas, setRoleas] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
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
    }, [email, role, flag]);

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
                <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#04FAA1', border: '1px solid gray', paddingLeft: '2%', paddingRight: '2%'}}>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{margin: 'auto'}}>
                            <NavDropdown title="Dashboard" id="collasible-nav-dropdown" style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additem" as={Link}>Add Item</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitems" as={Link}>All Items</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemcategory" as={Link}>Add Item Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemcategories" as={Link}>All Item Categories</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemunits" as={Link}>Add Item Unit</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemunits" as={Link}>All Item Units</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/additemgrades" as={Link}>Add Item Grade</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                <NavDropdown.Item to="/allitemgrades" as={Link}>All Item Grades</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {(roleas=="sales" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/createorder" as={Link}>Create Order</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager" || roleas=="accountant") &&
                                    <>
                                        <NavDropdown.Item to="/allorders" as={Link}>All Orders</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="buyer" || roleas=="manager") &&
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
                                }
                            </NavDropdown>
                            <NavDropdown title="User Management" id="collasible-nav-dropdown"  style={{border: '1px solid gray', borderRadius: '10px',backgroundColor: 'white', marginLeft: '2%', marginRight: '2%'}}>
                                {roleas=="manager" &&
                                    <>
                                        <NavDropdown.Item to="/register" as={Link}>Add User</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusers" as={Link}>All Users</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/addusercategory" as={Link}>Add User Category</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/allusercategories" as={Link}>All User Categories</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/addvendor" as={Link}>Add Vendor</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/vendordetails" as={Link}>All Vendors</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
                                {(roleas=="sales" || roleas=="manager") &&
                                    <>
                                        <NavDropdown.Item to="/addcustomer" as={Link}>Add Customer</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item to="/customerdetails" as={Link}>All Customers</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>
                                }
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
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/allorders">
                    <AllOrders/>
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
                <Route path="/editorder/:orderid" render={(props) => <EditOrder {...props} />} exact />
                <Route path="/edititem/:itemid" render={(props) => <EditItem {...props} />} exact />
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
                <Route path="/Edit_Purchase_Order/:purchaseid" render={(props) => <Edit_Purchase_Order {...props} />} exact />
                
                </Switch>
        </Router>
    )
}

export default NavBar;
