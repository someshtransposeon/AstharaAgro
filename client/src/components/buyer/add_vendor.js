import React,{useState,useEffect} from 'react';
import { TextInput,DefaultTheme  } from 'react-native-paper';
import {Text,View,StyleSheet,Platform,ScrollView,Button} from 'react-native';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
      ...DefaultTheme.colors,
      primary: '#0cc261',
      accent: '#f1c40f',
  },
};

export default function Buyer_add_vendor(){

  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [mobile_no,SetMobile_no] = useState("");
  const [gst_no,setGst_no] = useState("");
  const [password,setPassword] = useState("");
  const [confirm_password,setConfirm_password] = useState("");
  const [category,setCategory] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/retrive_user_category_type/vendor', {
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
    <ScrollView keyboardDismissMode="interactive" >
      <View theme={theme}>
        <View style={styles.card} >
           <View><Text >Add vendor</Text></View>
          <TextInput style={styles.textinput}
            type="text"
            label="Enter your full name"
            value={fullname}
            onChangeText={fullname=>setFullname(fullname)}
          />
          <TextInput style={styles.textinput}
            type="email"
            label="Enter email"
            value={email}
            onChangeText={email=>setEmail(email)}
          />
          <TextInput style={styles.textinput}
            type="number"
            label="enter mobile number"
            value={mobile_no}
            onChangeText={mobile_no=>SetMobile_no(mobile_no)}
          />
          <TextInput style={styles.textinput}
            label="enter GST number"
            type="text"
            value={gst_no}
            onChangeText={gst_no=>setGst_no(gst_no)}
          />
          <TextInput style={styles.textinput}
            type="text"
            label="Password"
            value={password}
            onChangeText={password=>setPassword(password)}
            secureTextEntry={true} 
          />
          <TextInput style={styles.textinput}
            type="text"
            label="confirm Password"
            value={confirm_password}
            onChangeText={confirm_password=>setConfirm_password(confirm_password)}
            secureTextEntry={true} 
          />
          <Button color="#0BCE83"
            title="submit"
            onPress={()=>Handlesubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
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
  textinput: {
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
