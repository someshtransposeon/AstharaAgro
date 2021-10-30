import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
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
export default function EditTransportation(props,{route}) {

    var transportationid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.transportationId;
    }
    else{
        transportationid = props.match.params.transportationid;
    }
    //define state variables
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    const [transportationId, setTransportationId] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [transportation_charges, setTransportationCharges] = useState();
    const [handling_charges, setHandlingCharges] = useState();
    const [transportation_category, setTransportationCategory] = useState();
   
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [enabled, setEnabled] = useState(true);
    const [status, setStatus] = useState(true);
    const [disable, setDisable] = React.useState(false);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setTransportationId(id);
        }
        else{
            setHost("localhost");
            setTransportationId(transportationid);
        }
        if(transportationId && flag){
            fetch(`http://${host}:5000/retrive_transportation/${transportationId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setTransportationCharges(item[0].transportation_charges);
                setHandlingCharges(item[0].handling_charges);
                setTransportationCategory(item[0].transportation_category);
                
            
            });
            
            setFlag(false);
        }


    }, [host,transportationId,id,transportationid,flag]);

    
    //define submit function for sending the data into database
    function submitForm() {
        fetch(`http://${host}:5000/update_transportation/${transportationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                transportation_category: transportation_category,
                transportation_charges: transportation_charges,
                handling_charges: handling_charges,
                })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }


    //   const StatusChange = (s) => {
    //     fetch(`http://${host}:5000/disabled_item/${itemId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             status: s,
    //         })
    //     })
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert(data.message);
    //         console.log(data);
    //     });
    //     // closeMenu(index);
    // };  
    // const StatusChange2 = (s) => {
    //     fetch(`http://${host}:5000/enabled_item/${itemId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             status: s,
    //         })
    //     })
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert(data.message);
    //         console.log(data);
    //     });
    //     // closeMenu(index);
    // };  


    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="EDIT TRASNPORTATION"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Transportation Charges" value={transportation_charges} onChangeText={transportation_charges => setTransportationCharges(transportation_charges)} />
                    <TextInput style={styles.input} mode="outlined" label="Handling Charges" value={handling_charges} onChangeText={handling_charges => setHandlingCharges(handling_charges)} />
                  
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Transportation</Button>
                    
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
