import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditItem(props, {route}) {

    const { itemid } = props.match.params;
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemId;
    }

    const [visible2, setVisible2] = useState(false);
    const [visible1, setVisible1] = useState(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const [itemId, setItemId] = useState("");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [unit, setUnit] = useState("Choose Unit");
    const [itemDescription, setDescription,] = useState("");
    const [host, setHost] = useState("");
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemId(id);
        }
        else{
            setHost("localhost");
            setItemId(itemid);
        }
        if(itemId){
            fetch(`http://${host}:5000/retrive_item/${itemId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setGrade(item[0].grade);
                setUnit(item[0].unit);
                setItemName(item[0].item_name);
                setDescription(item[0].description);
            });
        }
    }, [host,itemId,id,itemid]);

    function chooseGrade(name) {
        setGrade(name);
        closeMenu2();
    }

    function chooseUnit(name) {
        setUnit(name);
        closeMenu1();
    }

    function submitForm() {
        fetch(`http://${host}:5000/update_item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_name: itemName,
                grade: grade,
                unit: unit,
                description: itemDescription,
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
                {grade ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{grade}</Button>}>
                        <Menu.Item title="A Grade" onPress={()=>chooseGrade("A")} />
                        <Menu.Item title="B Grade" onPress={()=>chooseGrade("B")} />
                        <Menu.Item title="C Grade" onPress={()=>chooseGrade("C")} />
                        <Menu.Item title="D Grade" onPress={()=>chooseGrade("D")} />
                    </Menu>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{unit}</Button>}>
                        <Menu.Item title="100g" onPress={()=>chooseUnit("100g")} />
                        <Menu.Item title="200g" onPress={()=>chooseUnit("200g")} />
                        <Menu.Item title="500g" onPress={()=>chooseUnit("500g")} />
                        <Menu.Item title="1kg" onPress={()=>chooseUnit("1kg")} />
                        <Menu.Item title="5kg" onPress={()=>chooseUnit("5kg")} />
                        <Menu.Item title="10kg" onPress={()=>chooseUnit("10kg")} />
                        <Menu.Item title="1packet = 20kg" onPress={()=>chooseUnit("1packet = 20kg")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item</Button>
                    <Button mode="contained" style={styles.button} color='red'>Disable Item</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
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
                //to be updated for IOS
                marginTop: '10%',
                width: '90%',
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '50%',
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
