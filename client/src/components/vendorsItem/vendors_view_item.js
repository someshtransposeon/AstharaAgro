import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import { TextInput, Card, Provider, DefaultTheme } from 'react-native-paper';
import { all_vendor_items_by_itemid } from '../../services/vendor_api';

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

        if(itemId){
            all_vendor_items_by_itemid(itemId)
            .then(result => {
                setGrade(result[0].grade_name);
                setUnit(result[0].unit_name);
                setCategory(result[0].category_name);
                setItemName(result[0].item_name);
                setDescription(result[0].description);
                setItemPrice(result[0].item_price);
                setAddress(result[0].address);
                setLandmark(result[0].landmark);
                setDistrict(result[0].district);
                setState(result[0].state);
                setCountry(result[0].country);
                setPincode(result[0].postal_code);
            });
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
