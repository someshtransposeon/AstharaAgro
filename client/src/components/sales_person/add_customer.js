import React,{useState,useEffect} from 'react';
import { TextInput } from 'react-native-paper';
import {Text,View,StyleSheet,Platform,ScrollView,Button} from 'react-native';


export default function Add_customer(){

  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [mobile_no,SetMobile_no] = useState("");
  const [gst_no,setGst_no] = useState("");
  const [password,setPassword] = useState("");
  const [confirm_password,setConfirm_password] = useState("");
  const [category,setCategory] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/retrive_user_category_type/customer', {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data =>setCategory(data[0]._id));
    }, []);

  function Handlesubmit(){
    fetch('http://localhost:5000/create_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category:category,
                full_name:fullname,
                email:email,
                mobile_no:mobile_no,
                gst_no:gst_no,
                password:password,
                confirm_password:confirm_password,
                

            })
        })
        .then(res => res.json())
        .then(data => console.log(data)); 
        setFullname("");
        setEmail("");
        SetMobile_no("");
        setGst_no("");
        setPassword("");
        setConfirm_password("");
    }

  return (
    <ScrollView keyboardDismissMode="interactive">
      <View style={styles.container}>
        <View style={styles.card} >
           <View><Text style={styles.textdesign}>Add vendor</Text></View>
          <TextInput style={styles.textinput}
            mode="outlined"
            type="text"
            label="Enter your full name"
            value={fullname}
            onChangeText={fullname=>setFullname(fullname)}
          />
          <TextInput style={styles.textinput}
            mode="outlined"
            type="email"
            label="Enter email"
            value={email}
            onChangeText={email=>setEmail(email)}
          />
          <TextInput style={styles.textinput}
            mode="outlined"
            type="number"
            label="enter mobile number"
            value={mobile_no}
            onChangeText={mobile_no=>SetMobile_no(mobile_no)}
          />
          <TextInput style={styles.textinput}
            mode="outlined"
            label="enter GST number"
            type="text"
            value={gst_no}
            onChangeText={gst_no=>setGst_no(gst_no)}
          />
          <TextInput style={styles.textinput}
            mode="outlined"
            type="text"
            label="Password"
            value={password}
            onChangeText={password=>setPassword(password)}
            secureTextEntry={true} 
          />
          <TextInput style={styles.textinput}
            mode="outlined"
            type="text"
            label="confirm Password"
            value={confirm_password}
            onChangeText={confirm_password=>setConfirm_password(confirm_password)}
            secureTextEntry={true} 
          />
          <Button color="#0BCE83" style={styles.buttonstyle}
            title="submit"
            onPress={()=>Handlesubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#DDDFDD'
      },
      android: {
        backgroundColor: '#DDDFDD'
      },
      default: {
        // other platforms, web for example
        backgroundColor:'#EBF8D6'

      },
    }),
    justifyContent:'center', 
  },
  textinput:{
      marginTop:'2%',
      backgroundColor: 'white',
      textAlign:'center',
  },
  card:{
    marginTop:'10%',
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'black',
    margin:'auto',
    padding:"5%",
    justifyContent:'center',
    shadowRadius:30,
  },
  textdesign:{
    fontStyle:'italic',
    fontSize:40,
    fontWeight:'bold',
    justifyContent:'center',
    color:"green"
  },
  buttonstyle:{
  marginTop:"70%"
  }
});