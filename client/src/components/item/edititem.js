import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import { useParams } from 'react-router-dom';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditItem({ route, navigation }) {

    const {itemId} = useParams();
    // const {itemId} = route.params;

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/retrive_all_item_category`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(itemCategory => setItemCategory(itemCategory));

        if(flag === 0 && itemId){
            fetch(`http://${host}:5000/retrive_item/${itemId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setCategory("Choose Category");
                setGrade(item[0].grade);
                setCategoryId("");
                setItemName(item[0].item_name);
                setDescription(item[0].description);
                setFlag(1);
            });
        }
    }, [itemCategory,host,itemId,flag]);

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function chooseGrade(name) {
        setGrade(name);
        closeMenu2();
    }

    function submitForm() {
        fetch(`http://${host}:5000/update_item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                item_name: itemName,
                grade: grade,
                description: itemDescription,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
        }); 
    }

    function deleteItem() {
        fetch(`http://${host}:5000/delete_item/${itemId}`, {
            method: 'GET',
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
                    <Card.Title title="EDIT ITEM"/>
                    <Card.Content>
                    <TextInput style={styles.input} label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{category}</Button>}>
                        {itemCategory ?
                            itemCategory.map((item)=>{
                                return (
                                    <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                )
                            })
                            :
                            <Menu.Item title="No item Category Available" />
                        }
                    </Menu>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{grade}</Button>}>
                        <Menu.Item title="A Grade" onPress={()=>chooseGrade("A")} />
                        <Menu.Item title="B Grade" onPress={()=>chooseGrade("B")} />
                        <Menu.Item title="C Grade" onPress={()=>chooseGrade("C")} />
                        <Menu.Item title="D Grade" onPress={()=>chooseGrade("D")} />
                    </Menu>
                    <TextInput style={styles.input} label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}} onPress={()=>submitForm()}>Update Item</Button>
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%', color: 'red'}} onPress={()=>deleteItem()}>Delete Item</Button>
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
                border: '1px solid gray',
            }
        })
    },
}); 
