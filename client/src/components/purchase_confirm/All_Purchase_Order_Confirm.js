import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Portal, Modal  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { users_by_id } from '../../services/user_api';
import { purchase_order } from '../../services/order_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Purchase_Order_Confirm({ navigation }) {

    const [allPurchaseOrderConfirm, setAllPurchaseOrderConfirm] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [vendor, setVendor] = useState();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {

        purchase_order()
        .then(result=>{
            setAllPurchaseOrderConfirm(result);
        })

    }, [allPurchaseOrderConfirm]);

    function VendorDetails(id) {
        users_by_id(id)
        .then(result => {
            setVendor(result[0]);
            showModal();
        })
    }

    const onChangeSearch = query => setSearchQuery(query);

    const containerStyle = {backgroundColor: 'white', padding: 20, width: '50%'};

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <Portal align="center" justify="center">
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {vendor &&
                            <>
                                <Text>Vendor Email: {vendor.email}</Text>
                                <Text>Vendor Nick Name: {vendor.nick_name}</Text>
                                <Text>Vendor Name: {vendor.full_name}</Text>
                                <Text>Vendor Mobile: {vendor.mobile_no}</Text>
                            </>
                        }
                    </Modal>
                </Portal>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Confirm Purchase Order</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Order ID</DataTable.Title>
                        <DataTable.Title>Vendor ID</DataTable.Title>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {allPurchaseOrderConfirm ?
                        allPurchaseOrderConfirm.map((purchaseOrderConfirm)=>{
                            if(purchaseOrderConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{purchaseOrderConfirm.custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell onPress={() => VendorDetails(purchaseOrderConfirm.vendor_id)}>{purchaseOrderConfirm.custom_vendorId}</DataTable.Cell>
                                        <DataTable.Cell>{purchaseOrderConfirm.items.itemName+" ("+purchaseOrderConfirm.items.Grade+")"}</DataTable.Cell>
                                        <DataTable.Cell>{purchaseOrderConfirm.status}</DataTable.Cell>
                                        <DataTable.Cell numeric> 
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Purchase_Order_Confirm3', {purchaseId: purchaseOrderConfirm._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Purchase_Order_Confirm3/"+purchaseOrderConfirm._id}>Details</Link></Button>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
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
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 