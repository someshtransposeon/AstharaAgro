import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { all_users_by_role, users_by_id } from '../../services/user_api';
import { item_grade } from  '../../services/item_api';
import { Link } from "react-router-dom";
import { all_customer_items_by_id, customer_address_by_id } from '../../services/customer_api';
import { all_vendor_items } from '../../services/vendor_api';
import {host} from '../../utils/host';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function CreateOrder({ navigation }) {

    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');
    const [searchQuery5, setSearchQuery5] = useState('');
    const [visible, setVisible] = useState([]);
    const [visible4, setVisible4] = useState([]);
    const [visible2, setVisible2] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [item, setItem] = useState();
    const [host, setHost] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:'',itemPrice:'',finalPrice:'', Grade: 'Choose Grade',}]);
    const [nick_name, setNickName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState("Choose Address");
    const [flag, setFlag] = useState(true);
    const [customer, setCustomer] = useState();
    const [customerEmail, setCustomerEmail] = useState("Choose customer");
    const [category,setCategory] = useState("");
    const [role,setRole]=useState("");
    const [userId,setUserId]=useState("");
    const [customerId,setCustomerId]=useState("");
    const [flag2,setFlag2]=useState(true);
    const [itemGrade, setItemGrade]=useState();
    const [customerAddress, setCustomerAddress] = useState();

    useEffect(() => {

        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();
        all_vendor_items()
        .then(item => {
            if(item){
                const itemsnames=[...new Set(item.map(x=>x.item_name))];
                setItem(itemsnames);
            }
        })
        // fetch(`http://${host}:5000/vendors_retrive_all_item`, {
        //     method: 'GET'
        // })
        // .then(res => res.json())
        // .catch(error => console.log(error))
        // .then(item => {
        //     if(item){
        //         const itemsnames=[...new Set(item.map(x=>x.item_name))];
        //         setItem(itemsnames);
        //     }
        // });
        all_users_by_role("customer")
        .then(result => {
            setCustomer(result);
            setCategory(result._id);
            setRole(result.category_name);
        })                     
        item_grade()
        .then(result => {
            setItemGrade(result);
        })

    }, [item, host, userId, flag2, itemGrade, address, landmark, district, state, country, pincode, role, category, customerId]);

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };

    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const openMenu5 = () => setVisible5(true);
    const closeMenu5 = () => setVisible5(false);

    const openMenu4 = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible4(values);
    };

    const closeMenu4 = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible4(values);4
    };

    const ItemChange = (index, fieldname, fieldvalue, itemId, unit, price, grade) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemName = fieldvalue;
            fetch(`http://localhost:5000/retrive_vendor_item_by_name_grade/${fieldvalue}/${values[index].Grade}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data =>{
                var min = Math.max.apply(null, data.map(item => item.item_price));
                let obj = data.find(item => item.item_price === min);
                values[index].itemId = obj._id;
                values[index].itemUnit=obj.unit_name;
                values[index].itemPrice=obj.item_price;
                const itemsnames=[...new Set(data.map(x=>x.item_name))];
                setItem(itemsnames);
            });
            closeMenu(index);
        }
        else if (fieldname=="grade") {
            values[index].Grade=grade;
            closeMenu4(index);
        }
        else if (fieldname == "quantity"){
            values[index].quantity = fieldvalue;
        }
        else if (fieldname == "finalPrice"){
            values[index].finalPrice = fieldvalue;
        }
        else{
            values[index].itemNegotiatePrice = fieldvalue;
        }
        setItems(values);
    };

    const CustomerChange = (id, email) => {
        setCustomerEmail(email);
        
        users_by_id(id)
        .then(result => {
            setEmail(result[0].email);
            setNickName(result[0].nick_name);
            setName(result[0].full_name);
            setMobileNo(result[0].mobile_no);
            setCustomerId(result[0].userId);
        })

        all_customer_items_by_id(id)
        .then(result => {
            setCustomerAddress(result);
        })

        closeMenu2();
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push({ itemId: '', itemName: 'Choose Item', quantity: 0, Grade: "Choose Grade" });
        setItems(values);
    };
    
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        fetch(`http://${host}:5000/create_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                customerId: customerId,
                nick_name: nick_name,
                name: name,
                email: email,
                mobile_no: mobileNo,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
                items: items,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        }); 

        if(!flag) {
            fetch('http://localhost:5000/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category:category,
                    role:role,
                    nick_name:nick_name,
                    full_name:name,
                    email:email,
                    mobile_no:mobileNo,
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                Alert("Successfully user created");
            });
        }
    }

    function chooseAddress(addressId) {
        customer_address_by_id(addressId)
        .then(result => {
            setAddress(result[0].address);
            setLandmark(result[0].landmark);
            setPincode(result[0]. postal_code);
            setState(result[0].state);
            setDistrict(result[0].district);
            setCountry(result[0].country);
        });
        closeMenu5();
    }

    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    const onChangeSearch4 = query => setSearchQuery4(query);
    const onChangeSearch5 = query => setSearchQuery5(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Create Sales Order"/>
                    <Card.Content>
                        <View style={styles.customer}>
                            <Button mode="outlined" style={styles.button} onPress={()=>setFlag(false)} >New Customer Order</Button>
                            <Button mode="outlined" style={styles.button} onPress={()=>setFlag(true)} >Existing Customer Order</Button>  
                        </View>
                        {flag &&
                            <Menu
                                visible={visible2}
                                onDismiss={closeMenu2}
                                anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu2}>{customerEmail}</Button>}>
                                <Searchbar
                                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                    placeholder="Search"
                                    onChangeText={onChangeSearch2}
                                    value={searchQuery2}
                                />
                                {customer ?
                                    customer.map((item)=>{
                                        if(item.email.toUpperCase().search(searchQuery2.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                        return (
                                            <>
                                            <Menu.Item title={item.email+" ( "+item.full_name+" ) "} onPress={()=>CustomerChange(item._id, item.email)}/>
                                            </>
                                        )
                                        }
                                    })
                                    :
                                    <Menu.Item title="No Customers are available" />
                                }
                            </Menu>
                        }
                        <TextInput style={styles.input} mode="outlined" label="Nick Name" value={nick_name} onChangeText={nick_name => setNickName(name)} />
                        <TextInput style={styles.input} mode="outlined" label="Full Name" value={name} onChangeText={name => setName(name)} />
                        <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                        <TextInput style={styles.input} mode="outlined" label="Mobile no" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                        {flag &&
                            <Menu
                            visible={visible5}
                            onDismiss={closeMenu5}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu5}>{pincode}</Button>}>
                                <Searchbar
                                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                    placeholder="Search"
                                    onChangeText={onChangeSearch5}
                                    value={searchQuery5}
                                />
                                {Platform.OS=='android' ?
                                    <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                    :
                                    <Link to="/customer_add_address"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Customer Address</Button></Link>
                                }
                                {customerAddress ?
                                    customerAddress.map((item)=>{
                                        return (
                                            <Menu.Item title={item.postal_code} onPress={()=>chooseAddress(item._id, item.postal_code)} />
                                        )
                                    })
                                    :
                                    <Menu.Item title="No Address Available" />
                                }
                            </Menu>
                        }
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                        <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                        <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                        <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                        {items.map((it, index) => (
                            <View>
                                <Menu
                                visible={visible4[index]}
                                onDismiss={()=>closeMenu4(index)}
                                anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu4(index)}>{it.Grade}</Button>}>
                                    <Searchbar
                                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                        placeholder="Search"
                                        onChangeText={onChangeSearch4}
                                        value={searchQuery4}
                                    />
                                    {itemGrade ?
                                        itemGrade.map((grade)=>{
                                            if(grade.grade_name.toUpperCase().search(searchQuery4.toUpperCase())!=-1){
                                                return (
                                                    <>
                                                    <Menu.Item title={grade.grade_name} 
                                                    onPress={()=>ItemChange(index, "grade", "", "","","", grade.grade_name)}/>
                                                    </>
                                                )
                                            }
                                        })
                                        :
                                        <Menu.Item title="No items are available" />
                                    }
                                </Menu>
                                <Menu
                                visible={visible[index]}
                                onDismiss={()=>closeMenu(index)}
                                anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{it.itemName}</Button>}>
                                    <Searchbar
                                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                        placeholder="Search"
                                        onChangeText={onChangeSearch1}
                                        value={searchQuery1}
                                    />
                                    {typeof item!=='undefined' ?
                                        item.map((item)=>{
                                            if(item.toUpperCase().search(searchQuery1.toUpperCase())!=-1){
                                                return (
                                                    <>
                                                    <Menu.Item title={item} 
                                                    onPress={()=>ItemChange(index, "item", item, "","","","")}/>
                                                    </>
                                                )
                                            }
                                        })
                                        :
                                        <Menu.Item title="No items are available" />
                                    }
                                </Menu>
                                <TextInput mode="outlined" label="unit of each item" value={it.itemUnit} />
                                <TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '', "", "", "")} />
                                <TextInput  keyboardType='numeric' mode="outlined" label="FinalPrice" value={it.finalPrice=(it.itemPrice / 100) * 30 +(it.itemPrice)} onChangeText={(text)=>ItemChange(index, "finalPrice", text, '', "", "", "")}/>
                                <TextInput  keyboardType='numeric' mode="outlined" label="Negotiate Price"     value={it.itemNegotiatePrice} onChangeText={(text)=>ItemChange(index, "itemNegotiatePrice", text, '', "", "", "")} />
                                <View style={{flexDirection: 'row'}}>
                                    {Platform.OS=="android" ?
                                        <>
                                            <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                            <FontAwesomeIcon icon={ faPlusCircle } onPress={() => handleAddFields()} color={ 'green' } size={30} />
                                        </>
                                        :
                                        <>
                                            <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>
                                            <Button  onPress={() => handleAddFields()}  mode="outlined"><FontAwesomeIcon icon={ faPlusCircle } color={ 'green' } size={30} /></Button>
                                        </>
                                    }
                                </View>
                            </View>
                        ))}
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Create Order</Button>
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
    customer: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            }
        })
    }
}); 
