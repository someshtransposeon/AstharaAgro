import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform,Text} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define add Transportation and handling changes component
export default function AddTransportation({ navigation }) {
    const [transportationCategory, setTransportationCategory] = useState("");   
    const [transportationCharges, setTransportationCharges] = useState("");
    const [handlingCharges, setHandlingCharges] = useState("");
    const [flag1, setFlag1] = useState(true);
    const [transportation, setTransportation] = useState();


    const [host, setHost] = useState("");
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        if(flag1){
                fetch(`http://${host}:5000/retrive_transportation`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .catch(error => console.log(error))
                .then(user => {
                    setTransportation(transportation);
                    setFlag1(false);
                });
            }


    }, [host,flag1,transportation]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/add_transportation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transportation_category: transportationCategory,                                 
                transportation_charges: transportationCharges,                 
                handling_charges: handlingCharges,
                // requestedBy:req.body.userId,
                // user_id:req.body.user_id,
                // vendor_id:req.body.vendor_id,
                // purchase_order_id:req.body.purchase_order_id,
                // purchase_confirm_id:req.body.purchase_confirm_id,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
        setTransportationCategory("");
        setTransportationCharges("");
        setHandlingCharges("");
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="ADD TRANSPORATATION AND HANDLING CHARGES"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Transportation Category" value={transportationCategory} onChangeText={transportationCategory => setTransportationCategory(transportationCategory)} />
                    <TextInput style={styles.input} mode="outlined" label="Transportation Charges" value={transportationCharges} onChangeText={transportationCharges => setTransportationCharges(transportationCharges)} />
                    <View></View>
                  
                   
                    <TextInput style={styles.input} mode="outlined" label="Handling Charges" multiline value={handlingCharges} onChangeText={handlingCharges => setHandlingCharges(handlingCharges)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Charges</Button>
                    </Card.Content>
                </Card>
                 {/* <Card style={styles.card}>
                    <Card.Title title="Transportation"/>
                    <Card.Content>
                        {(transportation && transportation.length) ?
                            <>
                                <Text style={styles.text2}>Address: {transportation[0].transportation_charges}</Text>
                                <Text style={styles.text2}>Landmark: {transportation[0].handling_charges}</Text>
                                <Paragraph > */}
                                {/* {Platform.OS=='android' ?
                                    <FontAwesomeIcon icon={ faTrash }color="red" size={25} onPress={()=>deletetransportation(transportation[0]._id)} />
                                    :
                                    <Button onPress={()=>deletetransportation(transportation[0]._id)} >
                                        <FontAwesomeIcon icon={ faTrash }color="red" size={25} />
                                    </Button>
                                } */}
                                {/* {Platform.OS=='android' ?
                                    <FontAwesomeIcon  icon={ faEdit } color="blue" size={25} onPress={() => {navigation.navigate('EditTransportation', {transportationId: transportation[0]._id})}} />
                                    :
                                    <Button>
                                        <Link to={"/edittransportation/"+transportation[0]._id}>
                                            <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                        </Link>
                                    </Button>
                                } */}
                                {/* </Paragraph> */}
                            {/* </>
                            :
                            <> */}
                            {/* {Platform.OS=='android' ?
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('AddAddress')}}>Add Address</Button>
                                :
                                <Button mode="contained" style={{padding: '1%', marginTop: '2%'}}><Link to="/addaddress">Add Transportation</Link></Button>
                            }
                            </>
                        } */}
                    {/* </Card.Content> */}
                {/* </Card> */}
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
     text2: {
        fontSize: 20,
        marginTop: '5px',
        color: 'red',
    },
    button: {
        marginTop: '2%',
    }
}); 
