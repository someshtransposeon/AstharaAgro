import React, {useState, useEffect} from 'react';
import { useBarcode } from '@createnextapp/react-barcode';
import { TextInput, DefaultTheme, Card, Button, Provider  } from 'react-native-paper';
import { View, StyleSheet, Platform, ScrollView} from 'react-native';
import {faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Barcode(){

    const [barcode,setBarcode] = useState("");
    
    const { inputRef } = useBarcode({
        value: 'Lucky kumari',
        format: "CODE128",
        
        options: {
          background: '#ccffff',
          width:2,
          displayValue: false,
        },
       

      });

      function DownlaodBarcode(){
          console.log("barcode");
      }
      

    return (
        <Provider theme={theme}>
            <ScrollView keyboardDismissMode="interactive" >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={styles.card}>
                        <Card.Title title="Barcode for your item"/>
                        <Card.Content>
                            <img style={{width: '40mm',height: '60mm'}} ref={inputRef} />
                            <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} style={styles.button} onPress={()=>{DownlaodBarcode()}}>Print  Barcode</Button> 
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </Provider>
    );
};
//define stylesheet for the component (IOS styles to be added)
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
    button: {
        marginTop: '2%',
    }
}); 
