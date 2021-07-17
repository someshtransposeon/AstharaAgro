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

export default function CreateOrder({ navigation }) {

    const [visible1, setVisible1] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Create Order"/>
                    <Card.Content>
                    <TextInput style={styles.input} label="Full Name" />
                    <TextInput style={styles.input} label="Email" />
                    <TextInput style={styles.input} label="Mobile no" />
                    <TextInput style={styles.input} label="Address" multiline />
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>Choose Item</Button>}>
                        <Menu.Item title="Apple" />
                        <Menu.Item title="Potato" />
                        <Menu.Item title="Tomato" />
                        <Menu.Item title="Mango" />
                        <Menu.Item title="Apple" />
                        <Menu.Item title="Potato" />
                        <Menu.Item title="Tomato" />
                        <Menu.Item title="Mango" />
                    </Menu>
                    <TextInput style={styles.input} label="Quantity" />
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}}>Create Order</Button>
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '4%',
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
