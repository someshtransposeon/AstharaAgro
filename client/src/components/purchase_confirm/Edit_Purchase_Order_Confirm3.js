import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order_Confirm3(props, {route}) {
    
    var id="";
    var purchaseconfirmid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseConfirmId;
    }
    else{
        purchaseconfirmid = props.match.params.purchaseconfirmid;
    }

    const [visible3, setVisible3] = useState(false)
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const [purchaseConfirmId, setPurchaseConfirmId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrder_Id] = useState("");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [buyer, setBuyer] = useState();
    const [host, setHost] = useState("");
    const [buyer_id, setBuyerId] = useState("");
    const [buyer_email, setBuyerEmail] = useState("Choose Buyer");
    const [orderId, setOrderId] = useState("");
    const [custom_orderId, setCustomId] = useState("");
    
    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseConfirmId(id);
        }
        else{
            setHost("localhost");
            setPurchaseConfirmId(purchaseconfirmid);
        }

        // fetch all Buyer
        fetch("http://localhost:5000/retrive_all_buyers", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(buyer => setBuyer(buyer));
      
        if(purchaseConfirmId){
            fetch(`http://${host}:5000/retrive_purchase_order_confirm/${purchaseconfirmid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrder_Id(item[0].order_id);
                setPurchaseId(item[0].purchaseId);
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
                setOrderId(item[0].orderId);
                setCustomId(item[0].custom_orderId);
            });
        }

    }, [host, purchaseConfirmId, purchaseconfirmid, id]);
  
    //chooseBuyer() function for select the Buyer   
    function chooseBuyer(id, email){
        setBuyerId(id)
        setBuyerEmail(email);
        fetch(`http://${host}:5000/retrive_buyer/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        closeMenu3();
    }
    
    // for asign buyer 
    function submitForm() {
        fetch(`http://${host}:5000/create_pickup_assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchaseId:purchaseId,
                order_id:order_id,
                orderId:orderId,
                custom_orderId:custom_orderId,
                items:items,   
                vendor_id:vendor_id,
                buyer_id:buyer_id, 
                status:status,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });     
    }

    const PriceChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:values.quantity, itemPrice:value});
    };

    const QuantityChange = (value) => {
        const values = items;
        setItems({Grade:values.grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:value, itemPrice:values.finalPrice});
    };

    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="Edit Confirm Purchase Order(Assign Buyer to pickup)"/>
                    <Card.Content>
                        <Menu
                        visible={visible3}
                        onDismiss={closeMenu3}
                        anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu3}>{buyer_email} </Button>}>
                            {buyer ?
                                buyer.map((item)=>{
                                    return (
                                        <Menu.Item title={item.nick_name} onPress={()=>chooseBuyer(item._id, item.email)} />
                                    )
                                })
                                :
                                <Menu.Item title="No Buyer Available" />
                            }
                        </Menu>

                        {items &&
                            <DataTable style={{marginTop: '20px'}}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>QuantityChange(text)} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>PriceChange(text)} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        }
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Assign Buyer</Button>
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
    },
}); 