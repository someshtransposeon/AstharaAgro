import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define edit item component
export default function VendorsViewItem(props,{route}) {

    var itemid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }

    const [itemId, setItemId] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [item_price,setItemPrice]=useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemId(id);
        }
        else{
            setHost("localhost");
            setItemId(itemid);
        }

        if(itemId && flag){
            fetch(`http://${host}:5000/retrive_vendor_item/${itemId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setGrade(item[0].grade_name);
                setUnit(item[0].unit_name);
                setCategory(item[0].category_name);
                setItemName(item[0].item_name);
                setDescription(item[0].description);
                setItemPrice(item[0].item_price);
                setAddress(item[0].address);
                setLandmark(item[0].landmark);
                setDistrict(item[0].district);
                setState(item[0].state);
                setCountry(item[0].country);
                setPincode(item[0].postal_code);
            });
            setFlag(false);
        }

    }, [host,itemId,id,itemid,flag]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {grade ?
                <Card style={styles.card}>
                    <Card.Title title="VENDORS VIEW ITEM"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                        <TextInput style={styles.input} mode="outlined" label="Item Category" value={category}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Grade" value={grade}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Unit" value={unit}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Price" value={item_price}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Price" value={item_price}/>
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address}/>
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark}/>
                        <TextInput style={styles.input} mode="outlined" label="District" value={district}/>
                        <TextInput style={styles.input} mode="outlined" label="State" value={state}/>
                        <TextInput style={styles.input} mode="outlined" label="country" value={country}/>
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode}/>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
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
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
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
