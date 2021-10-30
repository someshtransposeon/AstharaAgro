import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function DisabledEditItemGrade(props,{route}) {

    var itemGradeid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemGradeId;
    }
    else{
        itemGradeid = props.match.params.itemGradeid;
    }

    const [itemGradeId, setItemGradeId] = useState("");
    const [itemGradeName, setItemGradeName] = useState("");
    const [host, setHost] = useState("");
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemGradeId(id);
        }
        else{
            setHost("localhost");
            setItemGradeId(itemGradeid);
        }

        if(itemGradeId){
            fetch(`http://${host}:5000/retrive_item_grade/${itemGradeId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setItemGradeName(item[0].grade_name);
            });
        }
    }, [host,itemGradeId,id,itemGradeid]);

    function submitForm() {
        fetch(`http://${host}:5000/update_item_grade/${itemGradeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                grade_name: itemGradeName,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
       
      const StatusChange = (s) => {
        fetch(`http://${host}:5000/enabled_item_grade/${itemGradeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
        // closeMenu(index);
    }; 

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {itemGradeName ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM GRADE"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Item Grade Name" value={itemGradeName} onChangeText={itemGradeName => setItemGradeName(itemGradeName)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item Grade </Button>
                    <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("enabled")}
                    >Enable Item Grade</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
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
                //to be updated for IOS
                marginTop: '10%',
                width: '90%',
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '50%',
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
                
            }
        })
    },
    button: {
        marginTop: '2%',
    }
}); 
