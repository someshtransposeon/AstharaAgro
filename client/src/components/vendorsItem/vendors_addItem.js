import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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
//define add items component
export default function AddItem({ navigation }) {
    //initialize all required state variables
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const openMenu4 = () => setVisible4(true);
    const closeMenu4 = () => setVisible4(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');

    const [userId, setUserId] = useState('');
    const [item, setItem] = useState();
    const [itemId, setItemId] = useState();
    const [itemUnit, setItemUnit] = useState();
    const [itemGrade, setItemGrade] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [itemName, setItemName] = useState("");
    const [fullName, setFullName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [itemPrice,setItemPrice]=useState("");
    const [itemQuantity,setItemQuantity]=useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");
    //fetch all required item categories, units, grades
    useEffect(() => {
         async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid,username) => {
                setUserId(userid);
                setFullName(username)
            })
        }
        fetchData();    


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
        //console.log(itemCategory);
        fetch(`http://${host}:5000/retrive_all_item_unit`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(itemUnit => setItemUnit(itemUnit));

        fetch(`http://${host}:5000/retrive_all_item_grade`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(itemGrade => setItemGrade(itemGrade));
    }, [userId,fullName,itemCategory,host,itemUnit,itemGrade,item]);

    function chooseItem(id, name) {
        setItemId(id);
        setItem(name);
        closeMenu4();
    }
    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function chooseGrade(id, name) {
        setGradeId(id);
        setGrade(name);
        closeMenu2();
    }
    function chooseUnit(id, name) {
        setUnitId(id);
        setUnit(name);
        closeMenu3();
    }
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/vendors_create_item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                category: categoryId,
                unit: unitId,
                grade: gradeId,
                item_name: itemName,
                full_name:fullName,
                category_name: category,
                unit_name: unit,
                grade_name: grade,
                item_price:itemPrice,
                item_quantity:itemQuantity,
                description: itemDescription,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
        setItemName("");
        setCategory("Choose Category");
        setGrade("Choose Grade");
        setUnit("Select Unit of Each item");
        setDescription("");
        setItemPrice("");
        setItemQuantity("");

    }

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    const onChangeSearch3 = query => setSearchQuery3(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="VENDORS ADD ITEM"/>
                    <Card.Content>
                    <Menu key={1}
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{category}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemCategory')}}>Add Category</Button>
                            :
                            <Link to="/additemcategory"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Category</Button></Link>
                        }
                        {itemCategory ?
                            itemCategory.map((item)=>{
                                if(item.category_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                return (
                                    <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                )
                                }
                            })
                            :
                            <Menu.Item title="No item Category Available" />
                        }
                    </Menu>
                    <Menu key={2}
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{grade}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch1}
                            value={searchQuery1}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                            :
                            <Link to="/additemgrades"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Grade</Button></Link>
                        }
                        {itemGrade ?
                            itemGrade.map((item)=>{
                                if(item.grade_name.toUpperCase().search(searchQuery1.toUpperCase())!=-1){
                                return (
                                    <Menu.Item title={item.grade_name} onPress={()=>chooseGrade(item._id, item.grade_name)} />
                                )
                                }
                            })
                            :
                            <Menu.Item title="No item Grade Available" />
                        }
                    </Menu>
                    <Menu key={3}
                    visible={visible3}
                    onDismiss={closeMenu3}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{unit}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch2}
                            value={searchQuery2}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemUnit')}}>Add Unit</Button>
                            :
                            <Link to="/additemunits"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Unit</Button></Link>
                        }
                        {itemUnit ?
                            itemUnit.map((item)=>{
                                if(item.unit_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                return (
                                    <Menu.Item title={item.unit_name} onPress={()=>chooseUnit(item._id, item.unit_name)} />
                                )
                                }
                            })
                            :
                            <Menu.Item title="No item Unit Available" />
                        }
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Item name"  value={itemName} onChangeText={itemName => setItemName(itemName)} />
                    <TextInput style={styles.input} mode="outlined" label="Item Quantity" numeric value={itemQuantity} onChangeText={itemQuantity => setItemQuantity(itemQuantity)} />
                    <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                    <TextInput style={styles.input} mode="outlined" label="Item Price" numeric value={itemPrice} onChangeText={itemPrice => setItemPrice(itemPrice)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Item</Button>
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
}
//define stylesheet for the component (IOS styles to be added)
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
    }
}); 
