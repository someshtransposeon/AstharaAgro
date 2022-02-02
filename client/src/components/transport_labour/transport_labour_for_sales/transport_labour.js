import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { userId } from '../../../utils/user';
import { all_completed_purchase_orders } from '../../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddTransportLabour(props,{ navigation }) {

    const [visible2, setVisible2] = useState(false);
    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");
    const [items, setItems] = useState(['']);
    const [pincodeError, setPincodeError] = useState(['']);
    const [flag, setFlag] = useState(true);
    const [acpo, setACPO] = useState();

    let history = useHistory();

    useEffect(() => {

        if(flag){
            all_completed_purchase_orders()  
            .then(result => {
                setACPO(result);
                setFlag(false);
            })
        }

    })

    const ItemChange = (index, fieldvalue) => {
        const error = [...pincodeError];
        const values = [...items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{6,}/;
        if(!numberRegex.test(fieldvalue)){
            error[index] = "Pin Code Only Should be Numeric";
            setPincodeError(error);
        }
        else if(!minLengthRegex.test(fieldvalue)){
            error[index] = "Pin Code Length should be 6";
            setPincodeError(error);
        }
        else{
            error[index] = '';
            setPincodeError(error);
        }
        values[index] = fieldvalue.replace(/[^0-9]/g, '');
        setItems(values);
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push('');
        setItems(values);
        const error = [...pincodeError];
        error.push('');
        setPincodeError(error);
    };
    
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        fetch(`http://localhost:5000/create_transport_labour_for_sales`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerId: userId, 
                vehicle_number: vNumber,
                vehicle_type: vType,
                driver_name: driverName,
                labour_name: labourName,
                driver_mobile_no: driverMobileNumber,
                labour_mobile_no: labourMobileNumber,
                charge: charge,
                orders_items: items,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            if(data.message!="something wrong!"){
                swal("Yeah!", data.message, "success");
                history.push('/allcustomerpools');
            }
            else{
                if(data.error.errors){
                    swal("Oops!", "All Fields are required!", "error");
                }
                else{
                    swal(data.message);
                }
            }
        });
    }

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    function choose_v_type(type){
        setVType(type);
        closeMenu2();
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="Create Transport Labour for Sales"/>
                    <Card.Content>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vType} </Button>}>
                        <Menu.Item title="Truck" onPress={()=>choose_v_type("Truck")} />
                        <Menu.Item title="Mini Truck" onPress={()=>choose_v_type("Mini Truck")} />
                        <Menu.Item title="Auto Tempo" onPress={()=>choose_v_type("Auto Tempo")} />
                        <Menu.Item title="Car" onPress={()=>choose_v_type("Car")} />
                        <Menu.Item title="Rickshaw" onPress={()=>choose_v_type("Rickshaw")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Vehicle Number" value={vNumber} onChangeText={vNumber => setVNumber(vNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Name" value={driverName} onChangeText={driverName => setDriverName(driverName)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Mobile Number" value={driverMobileNumber} onChangeText={driverMobileNumber => setDriverMobileNumber(driverMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Name" value={labourName} onChangeText={labourName => setLabourName(labourName)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Mobile Number" value={labourMobileNumber} onChangeText={labourMobileNumber => setLabourMobileNumber(labourMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Charge" value={charge} onChangeText={charge => setCharge(charge)} />
                    
                    {items.map((it, index) => (
                        <View>
                            <Menu
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vType} </Button>}>
                                {acpo && acpo.map((item) => (
                                    <Menu.Item title="Truck" onPress={()=>choose_v_type("Truck")} />
                                ))}
                            </Menu>
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
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
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
    }
}); 