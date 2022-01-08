import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { users_by_id, user_category} from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewUser(props, {route}) {

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
    const [gstNo, setGstNo] = useState("");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

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
            //Retrieve all user category
            user_category(host)
            .then(function(result) {
                setUserCategory(userCategory);
                setFlag(false);
            })
        }

        if(userId){
            //Retrieve user by userId
            users_by_id(userId)
            .then(function(result) {
                setFullName(result[0].full_name);
                setEmail(result[0].email);
                setMobileNo(result[0].mobile_no);
                setGstNo(result[0].gst_no);
                setCategory(result[0].role);
                setCategoryId(result[0].category);
            })
        }
    }, [host,userId,id,userid,userCategory,flag]);

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }


    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {fullName ?
                <Card style={styles.card}>
                    <Card.Title title="VIEW USER"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="User Category" value={category} />
                    <TextInput style={styles.input} mode="outlined" label="Full Name" value={fullName} />
                    <TextInput style={styles.input} mode="outlined" label="Email" value={email} />
                    <TextInput style={styles.input} mode="outlined" label="Mobile No" value={mobileNo} />
                    <TextInput style={styles.input} mode="outlined" label="Gst No" value={gstNo} />
                    
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
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
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