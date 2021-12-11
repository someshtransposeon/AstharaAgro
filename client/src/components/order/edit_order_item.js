import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditOrderItem(props,{route}) {
    var orderid = "";
    var id = '';
    var itemid = '';
    if(Platform.OS == 'android'){
        id = route.params.orderId;
    }
    else{
        orderid = props.match.params.orderid;
        itemid = props.match.params.itemid;
    }
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [searchQuery1, setSearchQuery1] = useState('');
    const [visible, setVisible] = useState([]);
    const [visible2, setVisible2] = useState(false);

    const [item, setItem] = useState();
    const [host, setHost] = useState("");
    const [items, setItems] = useState();
    const [order_id, setOrderId] = useState("");
    const [item_id, setItem_id] = useState("");
    const [vendors,setVendors] = useState();
    const [vendor_id, setVendorId] = useState();
    const [vendor_email, setVendorEmail] = useState("Choose Vendor");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [user_id, setUserId] = useState();
    const [flag, setFlag] = useState(true);


    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setOrderId(id);
        }
        else{
            setHost("localhost");
            setOrderId(orderid);
            setItem_id(itemid);
        }

        fetch(`http://${host}:5000/vendors_retrive_all_item`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(item => setItem(item));

        // fetch all vendors
        fetch("http://localhost:5000/retrive_all_vendors", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(vendors => setVendors(vendors));

        if(flag && order_id){
            fetch(`http://${host}:5000/retrive_order/${order_id}`, {
                method: 'GET'// const [orderId, setOrderId] = useState("");
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(order => {
                var it=order[0].items.find(x => x.itemId === item_id);
                setItems(it);
                setFlag(false);
            });
        }
    }, [item,host,order_id,id,orderid,flag,item_id,itemid]);

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

    const ItemChange = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
            closeMenu(index);
        }
        else{
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };
    
    const QuantityChange = (quantity) => {
        const values = items;
        values.quantity = quantity;
        setItems(values);
    };

    //submitForm() for sending the data in corresponding database
    function submitForm(){
        fetch(`http://${host}:5000/create_purchase_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                order_id:order_id,
                items:items,
                user_id:user_id,
                indent_id:indent_id,
                vendor_id:vendor_id,

            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
             alert(data.message);
             console.log(data);
        }); 
    }
    //chooseVendor() function for select the Vendor   
    function chooseVendor(id, email){
        setVendorId(id)
        setVendorEmail(email);
        closeMenu2();
    }

    const onChangeSearch1 = query => setSearchQuery1(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Create Purchase Order"/>
                    <Card.Content>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                        {vendors ?
                            vendors.map((item)=>{
                                return (
                                    <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                )
                            })
                            :
                            <Menu.Item title="No Vendor Available" />
                        }
                    </Menu>
                    {items && 
                    <View>                         
                        <Menu
                        visible={visible[0]}
                        onDismiss={()=>closeMenu(0)}
                        anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(0)}>{items.itemName}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch1}
                                value={searchQuery1}
                            />
                            {item ?
                                item.map((item)=>{
                                    if(item.item_name.toUpperCase().search(searchQuery1.toUpperCase())!=-1){
                                    return (
                                        <>
                                        <Menu.Item title={item.item_name+" ("+item.grade+") "} onPress={()=>ItemChange(0, "item", item.item_name, item._id,item.unit)}/>
                                        </>
                                    )
                                    }
                                })
                                :
                                <Menu.Item title="No items are available" />
                            }
                        </Menu>
                        <TextInput mode="outlined" label="unit of each item" value={items.itemUnit} />
                        <TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>QuantityChange(text)} />

                    </View>
                    }
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Create Purchase</Button>
                    </Card.Content>
                </Card>
            </View>
            </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '10%',
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
                marginBottom: '4%',
                width: '50%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
            }
        })
    },
    button: {
        marginTop: '2%',
    },
}); 
