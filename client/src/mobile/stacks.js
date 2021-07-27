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
import AddItemCategory from '../components/itemCategory/add_item_category';
import AddUserCategory from '../components/userCategory/add_user_category';
import AddAddress from '../components/address/add_address';
import AddBankDetails from '../components/bank/add_bank_details';

import All_Indents from '../components/indent/All_Indents';
import Create_Indent from '../components/indent/Create_Indent';
import Edit_Indent from '../components/indent/Edit_Indent';

import Create_Purchase_Order from '../components/purchase_order/Create_Purchase_Order';
import All_Purchase_Orders from '../components/purchase_order/All_Purchase_Orders';
import Edit_Purchase_Order from '../components/purchase_order/Edit_Purchase_Order';

import Create_Sales_Order from '../components/sales_order/Create_Sales_Order';
import All_Sales_Orders from '../components/sales_order/All_Sales_Orders';
import Edit_Sales_Order from '../components/sales_order/Edit_Sales_Order';



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
            <Stack.Screen name="AddItemCategory" component={AddItemCategory} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddUserCategory" component={AddUserCategory} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddAddress" component={AddAddress} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="AddBankDetails" component={AddBankDetails} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>



            <Stack.Screen name="Create_Indent" component={Create_Indent} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Indents" component={All_Indents} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Edit_Indent" component={Edit_Indent} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Create_Purchase_Order" component={Create_Purchase_Order} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Purchase_Orders" component={All_Purchase_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Edit_Purchase_Order" component={Edit_Purchase_Order} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Create_Sales_Order" component={Create_Sales_Order} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="All_Sales_Orders" component={All_Sales_Orders} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
            <Stack.Screen name="Edit_Sales_Order" component={Edit_Sales_Order} options={{
            headerLeft:()=>(
                <FontAwesomeIcon icon={ faBars } color={ 'white' } size={25} onPress={()=>navigation.toggleDrawer()} />
            ),
            }}/>
        </Stack.Navigator>
    );
}
