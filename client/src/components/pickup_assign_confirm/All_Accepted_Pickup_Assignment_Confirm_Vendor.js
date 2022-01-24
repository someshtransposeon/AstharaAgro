import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_accepted_pickup_assignment_confirmed } from '../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Accepted_Pickup_Assignment_Confirm_Vendor(props,{ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [roleas, setRoleas] = useState("");
    useEffect(() => {

        setRoleas(props.roleas);
        all_accepted_pickup_assignment_confirmed()
        .then(result=>{
            setAllPickupAssignment(result);
        })

    }, [allPickupAssignmentConfirm,roleas, props.roleas]);

    
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Accepted Pickup Assignment Confirm Vendor</Title>
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
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                                                                        
                    {allPickupAssignmentConfirm ?
                        allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                            if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{pickupAssignmentConfirm.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell>{pickupAssignmentConfirm.custom_vendorId}</DataTable.Cell>
                                    <DataTable.Cell>{pickupAssignmentConfirm.items.itemName+" ("+pickupAssignmentConfirm.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell> 
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