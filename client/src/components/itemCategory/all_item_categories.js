import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button,Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { item_category } from '../../services/item_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllItemCategories(props,{ navigation }) {

    const [allItemCategories, setAllItemCategories] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        setHost(props.host);
        //Retrieve all item category
        item_category(host)
        .then(function(result) {
            setAllItemCategories(result);
        })
      
    }, [allItemCategories, host, props.host]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Item Categories</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Item Category</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {allItemCategories ?
                        allItemCategories.map((item)=>{
                            if(item.category_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category_name}</DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItemCategory', {itemCategoryId: item._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}}><Link to={"/edititemcategory/"+item._id}>Details</Link></Button>
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