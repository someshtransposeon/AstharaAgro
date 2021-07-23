import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
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

export default function Register({ navigation }) {

    const [message, setMessage] = useState();
    const [visible1, setVisible1] = useState(false);
    const [userCategory, setUserCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/retrive_all_user_category', {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(userCategory => setUserCategory(userCategory));
    }, [userCategory]);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function submitForm() {
        fetch('http://localhost:5000/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                full_name: fullName,
                email:email,
                mobile_no:mobileNo,
                password:password,
                confirm_password:confirmPassword,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            setCategory("Choose Category");
            setCategoryId("");
            setFullName("");
            setEmail("");
            setMobileNo("");
            setPassword("");
            setConfirmPassword("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Register User"/>
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
                    <TextInput style={styles.input} label="Full Name" value={fullName} onChangeText={fullName => setFullName(fullName)} />
                    <TextInput style={styles.input} label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} label="Mobile No" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                    <TextInput style={styles.input} label="Password" value={password} onChangeText={password => setPassword(password)} />
                    <TextInput style={styles.input} label="Confirm Password" value={confirmPassword} onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} />
                    <Button mode="contained" style={{padding: '2%', marginTop: '2%'}} onPress={()=>submitForm()}>Register</Button>
                    </Card.Content>
                </Card>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
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
        margin: '2%',
        width: '100%',
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                border: '1px solid gray',
            }
        })
    },
}); 
