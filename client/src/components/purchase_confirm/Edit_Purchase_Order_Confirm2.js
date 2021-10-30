import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, CheckBox } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes, faTrash, faUpload,faEdit,faStore, faReceipt } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order_Confirm2(props, {route}) {

    
    var id="";
    var purchaseconfirmid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseConfirmId;
    }
    else{
        purchaseconfirmid = props.match.params.purchaseconfirmid;
    }

    
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const [isSelected, setSelection] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const [purchaseConfirmId, setPurchaseConfirmId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
    const [finalPrice,setFinalPrice] = useState("");

    const [transportation_id,setTransportationId] = useState("");  
    const [transportationCharges, setTransportationCharges] = useState("");
    const [handlingCharges, setHandlingCharges] = useState("");
    const [flag1, setFlag1] = useState(true);
    const [transportation, setTransportation] = useState();
    const [vendor_email, setVendorEmail] = useState("Choose Buyer");
    const [user2, setUser2] = useState();
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);


    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    // function chooseVendor(vendorId) {
    //     setVendorId(vendorId);
    //     closeMenu2();
    // }
    
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseConfirmId(id);
        }
        else{
            setHost("localhost");
            setPurchaseConfirmId(purchaseconfirmid);
            // addValue(10);

        }
        if(purchaseConfirmId){
       
            fetch(`http://${host}:5000/retrive_purchase_order_confirm/${purchaseconfirmid}`, {
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
                setStatus(item[0].status);
                setFlag(true);
            });
            // fetch all vendors
            fetch("http://localhost:5000/retrive_all_vendor", {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(user2 => setUser2(user2));



            
       }
       

       
    }, [host,purchaseConfirmId,purchaseconfirmid,id]);

    const ItemChange = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };
    const ItemChange2 = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].itemPrice = fieldvalue;
        }
        setItems(values);
    };
   
    // function submitForm() {
    //     fetch(`http://${host}:5000/update_purchase_order_confirm/${purchaseconfirmid}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             indent_id:indent_id,
    //             order_id:order_id,
    //             items:items,   
    //             vendor_id:vendor_id, 
    //             status:status,          
    //         })
    //     })
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert(data.message);
    //         console.log(data);
    //     });   
    // }
    function submitForm3(){
        alert("Payment in progress!");
    };
     //chooseVendor() function for select the Vendor   
    function chooseVendor(id, email){
        setVendorId(id)
        setVendorEmail(email);
        fetch(`http://${host}:5000/retrive_vendor/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        closeMenu2();
    }
    
    
    

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Pickup Purchase(Assign Buyer to Pickup)"/>
                    <Card.Content>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                        {user2 ?
                            user2.map((item)=>{
                                return (
                                    <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                )
                            })
                            :
                            <Menu.Item title="No Vendor Available" />
                        }
                    </Menu>
                    {vendor_id &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{vendor_id}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>chooseVendor(vendor_id)} />
                    </Menu>
                    }

                    {indent_id &&
                    <Menu 
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{indent_id}</Button>}>
                        <Menu.Item title="${indentId}" onPress={()=>chooseIndent(indent_id)} />
                    </Menu>
                    }
                    {items && flag &&
                    <DataTable style={styles.datatable}>
                    {items.map((it, index) => (
                        <DataTable.Row>
                            <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={it.itemName} /></DataTable.Cell>
                            <DataTable.Cell><TextInput mode="outlined" label="Unit" value={it.itemUnit} /></DataTable.Cell>
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} /></DataTable.Cell>
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={it.itemPrice} onChangeText={(text)=>ItemChange2(index, "itemPrice", text, '')} /></DataTable.Cell>
                            <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                }
                            </View></DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable>
                    }
                    {/* <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Create Purchase</Button> */}
                    {/* <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm()} >Update Purchase Confirm</Button> */}
                          
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
                width: '70%',
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