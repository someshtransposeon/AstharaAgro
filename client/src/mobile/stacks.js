import * as React from 'react';
import { Button } from 'react-native-paper';
import { createStackNavigator } from "@react-navigation/stack";
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
            headerLeft:()=>(
            <Button mode="outlined" style={{borderColor: 'white'}} onPress={()=>navigation.toggleDrawer()}>d</Button>
            ),
            }}/>
            <Stack.Screen name="AddItem" component={AddItem} options={{
            headerLeft:()=>(
            <Button mode="outlined" style={{borderColor: 'white'}} onPress={()=>navigation.toggleDrawer()}>d</Button>
            ),
            }}/>
            <Stack.Screen name="AllItems" component={AllItems} options={{
            headerLeft:()=>(
            <Button mode="outlined" style={{borderColor: 'white'}} onPress={()=>navigation.toggleDrawer()}>d</Button>
            ),
            }}/>
            <Stack.Screen name="EditItem" component={EditItem} options={{
            headerLeft:()=>(
            <Button mode="outlined" style={{borderColor: 'white'}} onPress={()=>navigation.toggleDrawer()}>d</Button>
            ),
            }}/>
            <Stack.Screen name="CreateOrder" component={CreateOrder} options={{
            headerLeft:()=>(
            <Button mode="outlined" style={{borderColor: 'white'}} onPress={()=>navigation.toggleDrawer()}>d</Button>
            ),
            }}/>
        </Stack.Navigator>
    );
}
