import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faStore } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Pickup_Assignment(props, {route}) {
    
    var id="";
    var pickupId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupId = props.match.params.pickupId;
    }
    
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);

    function chooseBuyer(buyerId) {
        setBuyerId(buyerId);
        closeMenu2();
    }

    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }
    
    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPickupAssignId(id);
        }
        else{
            setHost("localhost");
            setPickupAssignId(pickupId);
        }

        if(pickupAssignId){
       
            fetch(`http://${host}:5000/retrive_pickup_assignment/${pickupId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id);
                setPurchaseId(item[0].purchaseId);
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setBuyerId(item[0].buyer_id);
                setStatus(item[0].status);
                setFlag(true);
            });
        }

    }, [host,pickupAssignId,pickupId,id]);

    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const PriceChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:values.quantity, itemPrice:value});
    };

    const QuantityChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:value, itemPrice:values.finalPrice});
    };

    function submitForm() {
        fetch(`http://${host}:5000/create_pickup_assign_confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
                purchaseId:purchaseId,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id,
                buyer_id:buyer_id,
                pickupAssignId:pickupAssignId, 
                status:status,   
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
            
        });   
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Pickup Assignment2"/>
                    <Card.Content>
                        {buyer_id &&
                            <Menu 
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Buyer ID: {buyer_id}</Button>}>
                                <Menu.Item title="${pId}" onPress={()=>chooseBuyer(buyer_id)} />
                            </Menu>
                        }

                        {vendor_id &&
                            <Menu 
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Vendor ID: {vendor_id}</Button>}>
                                <Menu.Item title="${pId}" onPress={()=>chooseVendor(vendor_id)} />
                            </Menu>
                        }

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={items.itemName} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>QuantityChange(text)} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>PriceChange(text)} /></DataTable.Cell>
                                    <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                        {Platform.OS=="android" ?
                                            <>
                                                <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(0)}/>
                                            </>
                                            :
                                            <>
                                                <Button onPress={() => handleRemoveFields(0)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                        }
                                    </View></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        }
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} style={styles.button} onPress={()=>submitForm()} >Confirm Pickup Assignment</Button>
                    </Card.Content>
                </Card>
            </View>
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
        backgroundColor: 'white',
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
    }
}); 