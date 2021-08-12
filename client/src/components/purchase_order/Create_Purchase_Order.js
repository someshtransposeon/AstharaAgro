import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
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

export default function Create_Purchase_Order({ navigation }) {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [indent_id, setPurchaseOrderId] = useState("Choose Indent");
    const [order_id, setOrderId] = useState();
    const [user_id, setUserId] = useState();
    const [user, setUser] = useState();
    const [user2, setUser2] = useState();
    const [items, setItems] = useState();
    const [purchase, setPurchase] = useState();
    const [host, setHost] = useState("");
    
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/displayindent`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user => setUser(user));
    
    }, [user,host]);

    function choosePurchaseOrder(id) {
        setPurchaseOrderId(id)
        fetch(`http://${host}:5000/displayindent/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(order => setItems(order[0].items));
        console.log(items);  
        closeMenu1();
    }

    function checkBoxTest(){
        alert("Hello ...")
    }
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

            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            setPurchaseOrderId("Choose Order");
            setItems("");
            // setVendorId("Choose Vendor");
        }); 
    }
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="CREATE PURCHASE ORDER"/>
                    <Card.Content>
                    
            
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{indent_id} </Button>}>
                        {user ?
                            user.map((item)=>{
                                return (
                                  
                                    <Menu.Item title={ item._id } onPress={()=>choosePurchaseOrder(item._id)} />
                                )
                            })
                            :
                            <Menu.Item title="No Indent Available" />
                        }
                    </Menu>
                    {items && 
                <DataTable>
                    
            <DataTable.Header style={styles.tableheader} >
            <DataTable.Title >Select Box</DataTable.Title>
            <DataTable.Title >Item Name </DataTable.Title>
            <DataTable.Title >Quantity</DataTable.Title>
            </DataTable.Header>

                { items.map((item)=>{
              return (
                <DataTable.Row key={item.itemName}> 
                    <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >checkbox </DataTable.Cell>
                    <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >{item.itemName} </DataTable.Cell>
                    <DataTable.Cell  onChangeText={items => setItems(item.quantity)} >{item.quantity} </DataTable.Cell>
                </DataTable.Row>
              )}

                )}
                </DataTable>
                    }

                



                    <Button mode="contained" onPress ={()=> submitForm() } style={{padding: '2%', marginTop: '2%'}}>Create Purchase Order</Button>
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

