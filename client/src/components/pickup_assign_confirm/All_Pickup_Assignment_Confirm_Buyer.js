import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
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


export default function All_Pickup_Assignment_Confirm_Buyer({ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_accepted_pickup_assignment_confirm_buyer`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allPickupAssignmentConfirm => setAllPickupAssignment(allPickupAssignmentConfirm));
    }, [allPickupAssignmentConfirm, host]);

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

    const StatusChange = (s, id, index) => {
        fetch(`http://${host}:5000/update_pickup_assign_confirm_vendor_status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
        closeMenu(index);
    };    
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
             <DataTable style={styles.datatable}>
               <Title>All Pickup Assignment Confirm Buyers</Title>
               <Searchbar
                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <DataTable.Header>
                    <DataTable.Title>Pickup ID</DataTable.Title>
                    <DataTable.Title >Order ID</DataTable.Title>
                    <DataTable.Title >Buyer ID</DataTable.Title>
                    <DataTable.Title >Vendor ID</DataTable.Title>
                    <DataTable.Title numeric>Status</DataTable.Title>
                    <DataTable.Title numeric>Action</DataTable.Title>
                </DataTable.Header>
                                                                                                                                                                                                                        
            {/* //comment code aug 31/08/2012 for testing....  */}
                {allPickupAssignmentConfirm ?
                    allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                         if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                         return (
                              <DataTable.Row>
                                <DataTable.Cell>{pickupAssignmentConfirm._id}</DataTable.Cell>
                                <DataTable.Cell >{pickupAssignmentConfirm.order_id}</DataTable.Cell>
                                <DataTable.Cell >{pickupAssignmentConfirm.buyer_id}</DataTable.Cell>
                                <DataTable.Cell >{pickupAssignmentConfirm.vendor_id}</DataTable.Cell>
                                <DataTable.Cell numeric>{pickupAssignmentConfirm.status}</DataTable.Cell>
                                {/* <DataTable.Cell numeric>
                                    <Menu  visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{pickupAssignmentConfirm.status}</Button>}>
                                    <Menu.Item title="Accept" onPress={()=>StatusChange("accepted",  pickupAssignmentConfirm._id, index)}/>
                                    <Menu.Item title="Decline" onPress={()=>StatusChange("decline",  pickupAssignmentConfirm._id, index)}/>
                                    </Menu>
                                </DataTable.Cell>    */}
                                <DataTable.Cell numeric> 
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Details</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/Edit_Pickup_Assignment_Confirm_Buyer/"+pickupAssignmentConfirm._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell>
                             </DataTable.Row>
                        )
                        }
                    })
                    :
                    <ActivityIndicator color="#794BC4" size={60}/>
                }
                {/* {allPurchaseOrders ?
                    allPurchaseOrders.map((purchaseOrder)=>{
                         if(purchaseOrder._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                         return (
                              <DataTable.Row>
                                <DataTable.Cell>{purchaseOrder._id}</DataTable.Cell>
                                <DataTable.Cell numeric>{purchaseOrder.status}</DataTable.Cell>
                                <DataTable.Cell numeric> 
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: purchaseOrder._id})}}>Details</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/Edit_Purchase_Order/"+purchaseOrder._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell>
                             </DataTable.Row>
                        )
                        }
                    })
                    :
                    <ActivityIndicator color="#794BC4" size={60}/>
                } */}
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
                width: '80%',
                border: '1px solid gray',
                borderRadius: '2%',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 