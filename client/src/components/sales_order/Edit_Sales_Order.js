import React, {useState} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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

export default function Edit_Sales_Order({ navigation }) {

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
                    <Card.Title title="Edit Sales Order"/>
                    <Card.Content>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>101 Somesh </Button>}>
                        <Menu.Item title="101 Somesh" />
                        <Menu.Item title="102 Pankaj" />
                        <Menu.Item title="103 Lucky" />
                        <Menu.Item title="104 Customer" />
                    </Menu>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>101 Somesh_customer</Button>}>
                        <Menu.Item title="101 Somesh_customer" />
                        <Menu.Item title="102 Pankaj_customer" />
                        <Menu.Item title="103 Lucky_customer" />
                        <Menu.Item title="Other" /> 
                    </Menu>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>A Grade</Button>}>
                        <Menu.Item title="A Grade" />
                        <Menu.Item title="B Grade" />
                        <Menu.Item title="C Grade" />
                        <Menu.Item title="D Grade" />
                    </Menu>
                    
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}}>Update Sales Order</Button>
                    <Button mode="contained" color="red" style={{padding: '2%', marginTop: '2%'}}>Delete Sales Order</Button>
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '2%',
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