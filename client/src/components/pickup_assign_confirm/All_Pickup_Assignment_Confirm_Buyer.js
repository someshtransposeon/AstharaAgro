import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar  } from 'react-native-paper';
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

export default function All_Pickup_Assignment_Confirm_Buyer(props,{ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [roleas, setRoleas] = useState("");
    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        setRoleas(props.roleas);    
        fetch(`http://${host}:5000/retrive_all_accepted_pickup_assignment_confirm_buyer`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allPickupAssignmentConfirm => setAllPickupAssignment(allPickupAssignmentConfirm));

    }, [allPickupAssignmentConfirm, host,roleas,props.roleas]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                        <Title style={{marginBottom: '20px'}}>All Pickup Assignment Confirm Buyers</Title>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            style={{marginBottom: '20px'}}
                        />

                        <DataTable.Header>
                            <DataTable.Title>Pickup ID</DataTable.Title>
                            <DataTable.Title >Order ID</DataTable.Title>
                            <DataTable.Title >Buyer ID</DataTable.Title>
                            <DataTable.Title >Vendor ID</DataTable.Title>
                            <DataTable.Title>Status</DataTable.Title>
                            <DataTable.Title>Action</DataTable.Title>
                        </DataTable.Header>
                                                                              
                        {allPickupAssignmentConfirm ?
                            allPickupAssignmentConfirm.map((pickupAssignmentConfirm)=>{
                                if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{pickupAssignmentConfirm._id}</DataTable.Cell>
                                        <DataTable.Cell >{pickupAssignmentConfirm.order_id}</DataTable.Cell>
                                        <DataTable.Cell >{pickupAssignmentConfirm.buyer_id}</DataTable.Cell>
                                        <DataTable.Cell >{pickupAssignmentConfirm.vendor_id}</DataTable.Cell>
                                        <DataTable.Cell>{pickupAssignmentConfirm.status}</DataTable.Cell>
                                        {roleas=="buyer" ?
                                            <DataTable.Cell>
                                                {Platform.OS=='android' ?
                                                    <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Details</Button>
                                                    :
                                                    <Link to={"/Edit_Pickup_Assignment_Confirm_Buyer/"+pickupAssignmentConfirm._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                                }
                                            </DataTable.Cell>
                                            :
                                            <DataTable.Cell>
                                                {Platform.OS=='android' ?
                                                    <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Details</Button>
                                                    :
                                                    <Link to={"/View_Pickup_Assignment_Confirm_Buyer/"+pickupAssignmentConfirm._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                                }
                                            </DataTable.Cell>
                                        }
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