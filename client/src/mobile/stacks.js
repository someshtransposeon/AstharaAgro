import * as React from 'react';
import { Image, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faBars } from '@fortawesome/free-solid-svg-icons';
import Home from '../components/home/home';
import AddItem from '../components/item/addItem';
import AllItems from '../components/item/allitems';
import CreateOrder from '../components/order/createorder';
import EditItem from '../components/item/edititem';

const Stack = createStackNavigator();

export default function Stacks({navigation}){
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#0cc261",
            },
            headerTintColor: "white",
            headerBackTitle: "Back",
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }}>
            <Stack.Screen name="Home" component={Home} options={{
            headerTitle: () => (
                <>
                    {/* <Image
                        style={{width: 30, height: 30}}
                        source={'/images/Asthara-Logo.png'}
                    /> */}
                    <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>Asthara-Agro</Text>
                </>
            ),
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddItem" component={AddItem} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AllItems" component={AllItems} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="EditItem" component={EditItem} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="CreateOrder" component={CreateOrder} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
        </Stack.Navigator>
    );
}
