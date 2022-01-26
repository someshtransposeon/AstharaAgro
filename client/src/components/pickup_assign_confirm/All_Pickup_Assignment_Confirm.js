import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_pickup_orders_conformed } from '../../services/pickup_api';
import { role, userId } from '../../utils/user';
import { users_by_id } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};


export default function All_Pickup_Assignment_Confirm({ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [managerPoolId, setManagerPoolId] = useState('');

    useEffect(() => {

        if(role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_pickup_orders_conformed()
        .then(result=>{
            setAllPickupAssignment(result);
        })

    }, []);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Pickup Assignment Confirm</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Order Id</DataTable.Title>
                        <DataTable.Title>Vendor Id</DataTable.Title>
                        <DataTable.Title >Item</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                    
                    {(role=="manager" && allPickupAssignmentConfirm) &&
                        allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                            if(pickupAssignmentConfirm.managerPoolId==managerPoolId)
                            if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{pickupAssignmentConfirm.custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.custom_vendorId}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.items.itemName+" ("+pickupAssignmentConfirm.items.Grade+")"}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.status}</DataTable.Cell>
                                        <DataTable.Cell numeric> 
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Pickup_Assignment_Confirm/"+pickupAssignmentConfirm._id}>Details</Link></Button>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                    }
                    {(role=="vendor" && allPickupAssignmentConfirm) &&
                        allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                            if(pickupAssignmentConfirm.vendor_id==userId)
                            if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{pickupAssignmentConfirm.custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.custom_vendorId}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.items.itemName+" ("+pickupAssignmentConfirm.items.Grade+")"}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.status}</DataTable.Cell>
                                        <DataTable.Cell numeric> 
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Pickup_Assignment_Confirm/"+pickupAssignmentConfirm._id}>Details</Link></Button>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
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