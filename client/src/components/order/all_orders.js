import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu } from 'react-native-paper';
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

export default function AllOrders({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [visible, setVisible] = useState([]);
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/retrive_all_order`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(orders => {
            setAllOrders(orders);
        });

        if(flag && AllOrders.length > 0){
            for(let i = 0; i < AllOrders.length; i++){
                const values = [...visible];
                values[i]=true;
                setVisible(values);
            }
            setFlag(true);
        }

    }, [allOrders, host, visible, flag]);

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
        fetch(`http://${host}:5000/update_status/${id}`, {
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
                    <Title style={{marginBottom: '20px'}}>All Orders</Title>
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
                        {Platform.OS !== "android" &&
                        <DataTable.Title>Full Name</DataTable.Title>
                        }
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
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
                                    <DataTable.Cell>
                                    <Menu
                                        visible={visible[index]}
                                        onDismiss={()=>closeMenu(index)}
                                        anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{item.status}</Button>}>
                                            <Menu.Item title="Approve" onPress={()=>StatusChange("approved", item._id, index)}/>
                                            <Menu.Item title="Reject" onPress={()=>StatusChange("rejected", item._id, index)}/>
                                    </Menu>
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/editorder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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