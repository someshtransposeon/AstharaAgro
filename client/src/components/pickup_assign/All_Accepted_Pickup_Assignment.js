import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_accepted_pickup_assignment } from '../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Accepted_Pickup_Assignment(props,{ navigation }) {

    const [allPickupAssignment, setAllPickupAssignment] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [roleas, setRoleas] = useState("");

    useEffect(() => {

        setRoleas(props.roleas);
        all_accepted_pickup_assignment()
        .then(result => {
            setAllPickupAssignment(result);
        })

    }, [allPickupAssignment,roleas,props.roleas]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
               <Title style={{marginBottom: '20px'}}>All Accepted Pickup Assignment</Title>
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

                {allPickupAssignment ?
                    allPickupAssignment.map((pickupAssignment,index)=>{
                        if(pickupAssignment._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{pickupAssignment.custom_orderId}</DataTable.Cell>
                                <DataTable.Cell>{pickupAssignment.custom_vendorId}</DataTable.Cell>
                                <DataTable.Cell>{pickupAssignment.items.itemName+" ("+pickupAssignment.items.Grade+")"}</DataTable.Cell>
                                {roleas=="buyer" ?
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Details</Button>
                                            :
                                            <Link to={"/Edit_Pickup_Assignment2/"+pickupAssignment._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                    :
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Details</Button>
                                            :
                                            <Link to={"/View_Pickup_Assignment2/"+pickupAssignment._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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