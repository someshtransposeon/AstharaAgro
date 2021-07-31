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

export default function Edit_Purchase_Order(props, {route}) {

    
    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }


    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");

    
    const [items, setItems] = useState("");
    
    const [host, setHost] = useState("");

    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseId(id);
        }
        else{
            setHost("localhost");
            setPurchaseId(purchaseid);
        }
        if(purchaseId){
       
            fetch(`http://${host}:5000/retrive_purchase_order/${purchaseid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id)
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
            });
       }
    }, [host,purchaseId,purchaseid,id]);

    function submitForm() {
        fetch(`http://${host}:5000/update_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
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
                    <Card.Title title="Edit Purchase Order"/>
                    <Card.Content>
                    
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
                    {indent_id && 
                    <DataTable>
                        <DataTable.Header style={styles.tableheader} >
                        <DataTable.Title >Select Box</DataTable.Title>
                        <DataTable.Title >Item Name </DataTable.Title>
                        <DataTable.Title >Quantity</DataTable.Title>
                        </DataTable.Header>
                        {items && 
                            items.map((item)=>{
                                return (
                                    <DataTable.Row key={item.itemName}> 
                                        <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >check box </DataTable.Cell>
                                        <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >{item.itemName} </DataTable.Cell>
                                        <DataTable.Cell  onChangeText={items => setItems(item.quantity)} >{item.quantity} </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </DataTable>
                    }                   
                    
                    <Button mode="contained" onPress={()=>submitForm()} style={{padding: '2%', marginTop: '2%'}}>Update Purchase Order</Button>
                    <Button mode="contained" color="red" style={{padding: '2%', marginTop: '2%'}}>Delete Purchase Order</Button>
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
}); 