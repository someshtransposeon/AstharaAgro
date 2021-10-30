import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar,Text, Menu } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function OrderItemsSummary({ navigation }) {
    const [visible2, setVisible2] = useState(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [ordersItem, setOrdersItem] = useState();
    const [items, setItems] = useState();
    const [visible, setVisible] = useState([]);
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);
    const [user2, setUser2] = useState();
    const [vendor_id, setVendorId] = useState("");
    const [vendor_email, setVendorEmail] = useState("Choose Vendor");

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_order_items`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(orders => {
            setAllOrders(orders);
        });

        // fetch all vendors
        fetch("http://localhost:5000/retrive_all_vendor", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user2 => setUser2(user2));
        // if(flag && OrderItemsSummary.length > 0){
        //     for(let i = 0; i < OrderItemsSummary.length; i++){
        //         const values = [...visible];
        //         values[i]=true;
        //         setVisible(values);
        //     }
        //     setFlag(true);
        // }
    }, [allOrders, items,host, visible, flag]);



    //chooseVendor() function for select the Vendor   
    function chooseVendor(id, email){
        setVendorId(id)
        setVendorEmail(email);
        fetch(`http://${host}:5000/retrive_vendor/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        closeMenu2();
    }
    function submitForm(){
        alert("Done");
    }
    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };
    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title>Order Items Summary</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Order ID</DataTable.Title>
                        {Platform.OS !== "android" &&
                        <DataTable.Title>Item Id</DataTable.Title>
                        }
                        <DataTable.Title>Item Name</DataTable.Title>
                        <DataTable.Title>Unit</DataTable.Title>
                        <DataTable.Title>Quantity</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                      {allOrders ?
                            allOrders.map((item,index) => {
                                   
                            return item.items.map(item2 => {
                                return(
                                    <DataTable.Row>
                                    <DataTable.Cell >{item._id}</DataTable.Cell>
                                        <DataTable.Cell >{item2.itemId}</DataTable.Cell>
                                        <DataTable.Cell >{item2.itemName}</DataTable.Cell>
                                        <DataTable.Cell >{item2.itemUnit}</DataTable.Cell>
                                        <DataTable.Cell >{item2.quantity}</DataTable.Cell>
                                        {/* <DataTable.Cell >{item.status}</DataTable.Cell> */}
                                        {/* <DataTable.Cell numeric> */}
                                            {/* <Menu numeric
                                                visible={visible2}
                                                onDismiss={closeMenu2}
                                                anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                                                    {user2 ?
                                                        user2.map((item)=>{
                                                            return (
                                                                <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                                            )
                                                        })
                                                        :
                                                        <Menu.Item title="No Vendor Available" />
                                                    }
                                                </Menu> */}
                                                {/* <Menu
                                                    visible={visible[index]}
                                                    onDismiss={()=>closeMenu(index)}
                                                    anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" 
                                                    onPress={()=>openMenu(index)}>Choose Vendor</Button>}
                                                    >
                                                        <>
                                                        <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />

                                                        </>
                                                </Menu> */}
                                    
                                        {/* </DataTable.Cell> */}
                                        {/* <DataTable.Cell numeric>
                                            <Menu
                                            visible={visible2}
                                            onDismiss={closeMenu2}
                                            anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                                               
                                                            <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                                      
                                               
                                            </Menu>
                                        </DataTable.Cell> */}
                                        {/* <DataTable.Cell numeric>
                                            <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Done</Button>        
                                        </DataTable.Cell> */}
                                        <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrderItem', {itemId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/editorderitem/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                    </DataTable.Row>)
                                
                            })
                            
                            })
                        :
                        <ActivityIndicator color="#794BC4" size={60}/>
                      }

                
                </DataTable>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    view: {
        ...Platform.select({
            ios: {
                
            },
            android: {
            },
            default: {

            }
        })
    },
    card: {
        margin: '2%',
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '20%',
            }
        })
    },
    datatable: {
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        padding: '2%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '75%',
                border: '1px solid gray',
                borderRadius: '2%',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 