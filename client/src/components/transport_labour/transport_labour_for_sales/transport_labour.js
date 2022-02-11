import { faCamera, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text, Alert} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu, Modal } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { userId } from '../../../utils/user';
import { all_completed_purchase_orders } from '../../../services/pickup_api';
import Scanner from '../../barcode/scanner';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

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
    const [visible, setVisible] = useState([]);
    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");
    const [items, setItems] = useState([]);
    const [acpo, setACPO] = useState();
    const [visible3, setVisible3] = useState(false);
    const [ data, setData ] = useState('Not Found');
    const [msg, setMsg] = useState(2);

    let history = useHistory();

    useEffect(() => {

        all_completed_purchase_orders()  
        .then(result => {
            setACPO(result);
        })

    })

    const ItemChange = (index, item) => {

        var val=acpo.find(o => o.barcode === data);
        if(val==undefined){
            setMsg(1);
        }
        else{
            setMsg(3);
            const values = [...items];
            values.push({orderId: val.purchase_order.orderId, itemName: val.purchase_order.items.itemName, Grade: val.purchase_order.items.Grade, quantity: val.purchase_order.items.quantity});
            setItems(values);
            fetch(`http://localhost:5000/update_flag_completed_purchase_order/${val._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    flag:1,
                    vehicle_number: vNumber,
                    driver_name: driverName,
                    driver_mobile_no: driverMobileNumber,
                    labour_name: labourName,
                    labour_mobile_no: labourMobileNumber,
                })
            }).then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                // alert(data.message);
                // console.log(data);
            });
        }
        setData('Not Found');
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
            if(data.message!="something wrong!"){
                swal("Yeah!", data.message, "success");
                history.push('/alltransportlabourforsales');
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

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    }
    
    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };

    function choose_v_type(type){
        setVType(type);
        closeMenu2();
    }

    const showModal = () => setVisible3(true);
    const hideModal = () => setVisible3(false);

    function scan() {
        showModal();
    }

    const containerStyle = {backgroundColor: 'white',width: '35%', alignSelf: 'center'};

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
                    <Button mode="contained" style={styles.button} onPress={() => scan()} icon={() => <FontAwesomeIcon icon={ faCamera } />}>Start Scan</Button>
                    {/* <Modal visible={visible3} onDismiss={hideModal} contentContainerStyle={containerStyle}> */}
                    { visible3 &&
                    <>
                        <BarcodeScannerComponent
                            width="100%"
                            height="100%"
                            onUpdate={(err, result) => {
                                if (result) setData(result.text)
                            }}
                        />
                        <View style={{padding: '5px'}}>
                            <TextInput style={styles.input} mode="outlined" label="Data" value={data} onChangeText={data => setData(data)} />
                            {msg && msg==3 &&
                                <Text style={{color:"green"}}>Successfully Added!!</Text>
                            }
                            {msg && msg==1 &&
                                <Text style={{color:"red"}}>Order Not Found</Text>
                            }
                            {data && data!="Not Found" &&
                                <>
                                    <Button onPress={()=>ItemChange()}>Add</Button>
                                </>
                            }
                        </View>
                    </>
                    }
                {/* </Modal> */}
                    {items.map((it, index) => (
                        <View>
                            <Menu
                            visible={visible[index]}
                            onDismiss={()=>closeMenu(index)}
                            anchor={<Button style={styles.input} mode="outlined"  onPress={()=>openMenu(index)}>{it.orderId} </Button>}>
                            </Menu>
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