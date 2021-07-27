import React, {useState} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
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

export default function Create_Sales_Order({ navigation }) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="CREATE SALES ORDER"/>
                    <Card.Content>
                    
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>Select Customer</Button>}>
                        <Menu.Item title="101 Somesh" />
                        <Menu.Item title="102 Pankaj" />
                        <Menu.Item title="103 Lucky" />
                        <Menu.Item title="104 Customer" />
                    </Menu>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>Select Item</Button>}>
                        <Menu.Item title="101 Somesh_customer" />
                        <Menu.Item title="102 Pankaj_customer" />
                        <Menu.Item title="103 Lucky_customer" />
                        <Menu.Item title="Other" /> 
                    </Menu>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Choose Grade</Button>}>
                        <Menu.Item title="A Grade" />
                        <Menu.Item title="B Grade" />
                        <Menu.Item title="C Grade" />
                        <Menu.Item title="D Grade" />
                    </Menu>
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}}>Create Sales Order</Button>
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
}); 

