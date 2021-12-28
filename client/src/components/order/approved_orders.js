import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { Order_by_status } from '../../services/order_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ApprovedOrders(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [visible, setVisible] = useState([]);
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);
    const  [roleas, setRoleas] = useState("");

    useEffect(() => {

        setHost(props.host);
        setRoleas(props.roleas);

        Order_by_status(host, "approved")
        .then(function(result) {
            setAllOrders(result);
        })

        if(flag && allOrders.length > 0){
            for(let i = 0; i < allOrders.length; i++){
                const values = [...visible];
                values[i]=true;
                setVisible(values);
            }
            setFlag(true);
        }

    }, [allOrders, host, visible, flag, roleas, props.roleas, props.host]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>Approved Orders</Title>
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
                        <DataTable.Title>Sales ID</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Full Name</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>

                    {allOrders ?
                        allOrders.map((item, index)=>{
                            if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{item._id}</DataTable.Cell>
                                        <DataTable.Cell>{item.userId}</DataTable.Cell>
                                        <DataTable.Cell>{item.email}</DataTable.Cell>
                                        {Platform.OS !== "android" &&
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        }
                                        {roleas=="manager" ?
                                            <DataTable.Cell>
                                                {Platform.OS=='android' ?
                                                    <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                                    :
                                                    <Link to={"/editorder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                                }
                                            </DataTable.Cell>
                                            :
                                            <DataTable.Cell>
                                                {Platform.OS=='android' ?
                                                    <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                                    :
                                                    <Link to={"/vieworder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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