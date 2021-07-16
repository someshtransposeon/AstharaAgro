import React from 'react'
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('AddItem')}
                title="Add Item"
            />
        </View>
    );
}