import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
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

export default function EditUser(props, {route}) {

    var userid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.userId;
    }
    else{
        userid = props.match.params.userid;
    }

    const [visible1, setVisible1] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const [userId, setUserId] = useState("");
    const [userCategory, setUserCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setUserId(id);
        }
        else{
            setHost("localhost");
            setUserId(userid);
        }

        if(flag){
            fetch('http://localhost:5000/retrive_all_user_category', {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(userCategory => {
                setUserCategory(userCategory);
                setFlag(false);
            });
        }

        if(userId){
            fetch(`http://${host}:5000/retrive_user/${userId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(user => {
                setFullName(user[0].full_name);
                setEmail(user[0].email);
                setMobileNo(user[0].mobile_no);
                setCategory(user[0].role);
                setCategoryId(user[0].category);
            });
        }
    }, [host,userId,id,userid,userCategory,flag]);

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function submitForm() {
        fetch(`http://${host}:5000/update_user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                role: category,
                full_name: fullName,
                email: email,
                mobile_no: mobileNo,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {fullName ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM"/>
                    <Card.Content>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{category}</Button>}>
                        {userCategory ?
                            userCategory.map((item)=>{
                                return (
                                    <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                )
                            })
                            :
                            <Menu.Item title="No User Category Available" />
                        }
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Full Name" value={fullName} onChangeText={fullName => setFullName(fullName)} />
                    <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} mode="outlined" label="Mobile No" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update User</Button>
                    <Button mode="contained" style={styles.button} color='red'>Disable User</Button>
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
