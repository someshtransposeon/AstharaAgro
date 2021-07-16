import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Stacks from './stacks';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {
    return (
        <>   
            <Avatar.Text size={70} label="s" style={{alignSelf:'center',marginTop:'15%'}} />
            <Button style={{width:280}} color="green">salesemail@gmail.com</Button>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Home')}}>Home</Button>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddItem')}}>Add Item</Button>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllItems')}}>All Items</Button>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('CreateOrder')}}>Create Order</Button>
        </>
    );
}

export default function Drawers() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="stack" component={Stacks} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    drawerbutton: {
        width: '80%',
        alignSelf:'center',
        marginTop:'5%',
        borderColor: 'green',
    }
});