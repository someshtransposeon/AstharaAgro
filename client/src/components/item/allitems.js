import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Card, Paragraph } from 'react-native-paper';
import { Link } from "react-router-dom";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllItems({ navigation }) {

    const [allItems, setAllItems] = useState();
    const [host, setHost] = useState("");

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_item`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allItems => setAllItems(allItems));
    }, [allItems, host]);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                {allItems ?
                    allItems.map((item)=>{
                        return (
                            <Card style={styles.card}>
                                <Card.Title title={item.item_name} subtitle={item.category_name}/>
                                <Card.Content>
                                    <Paragraph>Grade: {item.grade}</Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>View</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}}><Link to={"/edititem/"+item._id}>View</Link></Button>
                                    }
                                </Card.Actions>
                            </Card>
                        )
                    })
                    :
                    <ActivityIndicator color="#794BC4" size={60}/>
                }
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    view: {
        ...Platform.select({
            ios: {
                
            },
            android: {
            },
            default: {
                
            }
        })
    },
    card: {
        margin: '2%',
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '20%',
            }
        })
    },
}); 