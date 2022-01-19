import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_customer_vendor_pools } from '../../services/pool';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

//define all item components
export default function AllCustomerVendorPools(props,{ navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        //Retrieve all items
        all_customer_vendor_pools()
        .then(result => {
            setAllItems(result);
        })

    }, [allItems]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Vendor Customer Cross Pools</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Customer Pool</DataTable.Title>
                        <DataTable.Title>Vendor Pool</DataTable.Title>
                        {/* <DataTable.Title numeric>Action</DataTable.Title> */}
                    </DataTable.Header>
                {allItems ?
                    allItems.map((item)=>{
                        if(item.customer_pool_name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.vendor_pool_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item.customer_pool_name}</DataTable.Cell>
                                <DataTable.Cell>{item.vendor_pool_name}</DataTable.Cell>
                                {/* <DataTable.Cell numeric>
                                    {Platform.OS=='android' ?
                                        <Button color="red" icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Details</Button>
                                        :
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edit_vendor_pool/"+item._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell> */}
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
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 