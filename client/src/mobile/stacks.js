import * as React from 'react';
import { Image, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faBars } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../components/home';
import AddItem from '../components/addItem';
import AllItems from '../components/allitems';
import EditItem from '../components/edititem';
import CreateOrder from '../components/createorder';

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
            <Stack.Screen name="Home" component={HomeScreen} options={{
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
