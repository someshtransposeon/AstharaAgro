import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { user_category } from '../../services/user_api';
import { uploadImage } from '../../services/image';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Register(props,{ navigation }) {

    let history = useHistory();

    const [searchQuery, setSearchQuery] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [userCategory, setUserCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [fullName, setFullName] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [roleas, setRoleas] = useState("");
    const [host, setHost] = useState("");
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [idType, setIdType] = useState("Choose Govt. ID");
    const [idNumber, setIdNumber] = useState();

    useEffect(() => {
        setHost(props.host);
        setRoleas(props.roleas);
        //retrieve all user category
        user_category()
        .then(function(result) {
            setUserCategory(result);
        });

    }, [userCategory, host, props.host, props.roleas]);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

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
                role: category,
                full_name: fullName,
                nick_name: nickName,
                email: email,
                mobile_no: mobileNo,
                idType: idType,
                idNumber: idNumber,
                image: img,
                gst_no:gstNo,
                password: password,
                confirm_password: confirmPassword,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            if(data){
                history.push("/addaddress/"+data.data._id);
            }
        })
        .catch(err=>{
            alert(err.message);
        }); 
    }

    function getFiles(event){
        setFile(event.target.files[0]);
    }

    function ImageSubmitForm(){

        uploadImage(file)
        .then(result => {
            setImg(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function chooseIdType(idType){
        setIdType(idType);
        closeMenu2();
    }

    const onChangeSearch = query => setSearchQuery(query);

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
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddUserCategory')}}>Add Category</Button>
                            :
                            <Link to="/addusercategory"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Category</Button></Link>
                        }
                        {userCategory ?
                            userCategory.map((item)=>{
                                if(item.category_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                    if(roleas=='sales'){
                                        if(item.category_name == 'customer')
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                    else if(roleas=='buyer'){
                                        if( item.category_name == 'vendor')
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                    else {
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                }
                            })
                            :
                            <Menu.Item title="No User Category Available" />
                        }
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Full Name" value={fullName} onChangeText={fullName => setFullName(fullName)} />
                    <TextInput style={styles.input} mode="outlined" label="Nick Name" value={nickName} onChangeText={nickName => setNickName(nickName)} />
                    <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} mode="outlined" label="Mobile No" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{idType}</Button>}>
                        <Menu.Item title="Aadhar Card" onPress={()=>chooseIdType("Aadhar Card")} />
                        <Menu.Item title="Pan Card" onPress={()=>chooseIdType("Pan Card")} />
                        <Menu.Item title="Voter Id" onPress={()=>chooseIdType("Voter Id")} />
                        <Menu.Item title="Driving License" onPress={()=>chooseIdType("Driving License")} />
                        <Menu.Item title="Passport" onPress={()=>chooseIdType("Passport")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Govt ID Number" value={idNumber} onChangeText={idNumber => setIdNumber(idNumber)}/>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 3, border: '1px solid gray', marginLeft: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles}
                        />
                        <Button mode="contained" style={styles.button, { flex: 1,}} onPress={()=>ImageSubmitForm()}>Upload Image</Button>
                    </View>
                    {(category=="vendor" || category=="customer") &&
                        <TextInput style={styles.input} mode="outlined" label="GST No" value={gstNo} onChangeText={gstNo => setGstNo(gstNo)} />
                    }
                    <TextInput style={styles.input} mode="outlined" label="Password" value={password} onChangeText={password => setPassword(password)} secureTextEntry={true}/>
                    <TextInput style={styles.input} mode="outlined" label="Confirm Password" value={confirmPassword} onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} secureTextEntry={true}/>
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Save & Add Address</Button>
                    </Card.Content>
                </Card>
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
                width: '75%',
            }
        })
    },
    input: {
        margin: '2%',
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
