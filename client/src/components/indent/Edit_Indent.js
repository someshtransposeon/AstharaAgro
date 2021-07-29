import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DataTable, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Indent(props, {route}) {

      const { indentid } = props.match.params;
    // var id="";
    // if(Platform.OS=="android"){
    //     id = route.params.itemId;
    // }


    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [indentId, setIndentId] = useState("");
    const [itemId, setItemId] = useState("");
    const [orderId, setOrderId] = useState("Choose Orderr");
    
    const [items, setItems] = useState("");
    const [margin, setMargin] = useState("");
    const [unit, setUnit] = useState("Choose Unit");
    const [itemDescription, setDescription,] = useState("");
    const [host, setHost] = useState("");


    function chooseOrder(orderId) {
        setOrderId(orderId);
        closeMenu1();
    }

    useEffect(() => {

            fetch(`http://localhost:5000/displayindent/${indentid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrderId(item[0].orderId);
                setItems(item[0].items)
                setMargin(item[0].margin);

            });
    }   , [host,indentid]);

        function submitForm() {
        fetch(`http://localhost:5000/updateindent/${indentid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items:items,
                margin:margin
                // item_name: itemName,
                // grade: grade,
                // unit: unit,
                
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
        }); 
    }
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Indent"/>
                    <Card.Content>
                    
                    {orderId &&
                    <Menu 
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{orderId}</Button>}>
                        <Menu.Item title="101" onPress={()=>chooseOrder(orderId)} />
                    </Menu>
                    }
                    {orderId && 
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
                    <TextInput style={styles.input} value={margin} onChangeText={margin => setMargin(margin)}  label="Margin" />
                    <Button mode="contained" onPress={()=>submitForm()} style={{padding: '2%', marginTop: '2%'}}>Update Indent</Button>
                    <Button mode="contained" color="red" style={{padding: '2%', marginTop: '2%'}}>Delete Indent</Button>
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '2%',
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
                border: '1px solid gray',
            }
        })
    },
}); 