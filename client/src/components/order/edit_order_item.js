import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrderSummary_by_id } from '../../services/order_api';

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
    if(Platform.OS == 'android'){
        orderid = route.params.orderId;
    }
    else{
        orderid = props.match.params.orderid;
    }

    const [visible2, setVisible2] = useState(false);

    const [host, setHost] = useState("");
    const [items, setItems] = useState();
    const [order_id, setOrder_Id] = useState("");
    const [vendors,setVendors] = useState();
    const [vendor_id, setVendorId] = useState();
    const [user_id, setUserId] = useState();
    const [flag, setFlag] = useState(true);
    const [quantity, setQuantity] = useState();
    const [vendorsid, setVendorsid] = useState([]);
    const [custom_orderId, setCustomId] = useState();
    const [orderId, setOrderId] = useState("");
    const [custom_vendorId, setCustomVendorId] = useState('Choose Vendor');

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
            setOrder_Id(orderid);
        }
        else{
            setHost("localhost");
            setOrder_Id(orderid);
        }

        if(order_id){
            fetch(`http://${host}:5000/retrive_order_item_summary_quantity/${order_id}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setVendorsid(item.vendor_rejected);
            });
        }

        if(flag && order_id){
            OrderSummary_by_id(host, order_id)
            .then(function(result) {
                setItems(result[0].item);
                setQuantity(result[0].item.quantity);
                setCustomId(result[0].custom_orderId);
                setOrderId(result[0].orderId);
                setFlag(false);
            });
        }

        if(items){
        // fetch all vendors
            fetch(`http://localhost:5000/retrive_vendor_item_by_name_grade_lower_price/${items.itemName}/${items.Grade}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(vendors => {
                setVendors(vendors);
            });
        }

    }, [vendors, host, order_id, items, orderid, flag, custom_orderId, vendorsid]);

    //submitForm() for sending the data in corresponding database
    function submitForm(){

        const values = items;
        values.quantity = 0;
        setItems(values);

        fetch(`http://${host}:5000/update_quantity_order_item_summary/${order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item:items,
                status:"Full Order",
                vendor_rejected:vendorsid,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        }); 

        const values2 = items;
        values2.quantity = quantity;
        setItems(values2);

        fetch(`http://${host}:5000/create_purchase_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id:order_id,
                custom_orderId: custom_orderId,
                orderId: orderId,
                items:items,
                user_id:user_id,
                vendor_id:vendor_id,
                custom_vendorId: custom_vendorId,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        }); 
    }

    //chooseVendor() function for select the Vendor   
    function chooseVendor(id, email, dates, pincode){
        setVendorId(id)
        setCustomVendorId(email+"_"+pincode+"_"+dates.substring(0,10)+"_"+dates.substring(11,13));
        closeMenu2();
    }

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
                <View>
                    <Card style={styles.card}>
                        <Card.Title title="Create Purchase Order"/>
                        <Card.Content>
                            <Menu
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{custom_vendorId} </Button>}>
                                {vendors && vendorsid ?
                                    vendors.map((item)=>{
                                        var f=0;
                                        vendorsid.map((id)=>{
                                            if(id==item.userId){
                                                f=1;
                                            }
                                        })
                                        if(f==0){
                                            return (
                                                <Menu.Item title={item.nick_name} onPress={()=>chooseVendor(item.userId, item.nick_name, String(item.date), item.postal_code)} />
                                            )
                                        }
                                    })
                                    :
                                    <Menu.Item title="No Vendor Available" />
                                }
                            </Menu>
                            {items && 
                                <View>                         
                                    <TextInput mode="outlined" style={styles.input} label="Item Name" value={items.itemName} />
                                    <TextInput mode="outlined" style={styles.input} label="unit of each item" value={items.itemUnit} />
                                    <TextInput keyboardType='numeric' mode="outlined" style={styles.input} label="Quantity" value={quantity} onChangeText={(text)=>setQuantity(text)} />
                                    <TextInput mode="outlined" style={styles.input} label="Grade" value={items.Grade} />
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
                width: '75%',
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