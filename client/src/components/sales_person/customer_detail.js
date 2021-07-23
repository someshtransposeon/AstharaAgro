import React,{useState,useEffect} from 'react';
import { DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {Text,View,StyleSheet,Platform} from 'react-native';
import {Link} from 'react-router-dom';

export default function  Customer_details(){
     const optionsPerPage = [2, 3, 4];
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
    const [data, setData] = useState(); 

    useEffect(() => {
      fetch('http://localhost:5000/retrive_all_vendor', {
          method: 'GET'
      })
      .then(res => res.json())
      .then(data => setData(data));
      setPage(0);

    }, []);
    return (
        <View style={styles.container} >
            <Text style={styles.textdesign}>Vendor List</Text>
            <View style={styles.card}>
            <DataTable>
            <DataTable.Header style={styles.tableheader} >
            <DataTable.Title >FULLNAME</DataTable.Title>
            <DataTable.Title >EMAIL </DataTable.Title>
            <DataTable.Title >MOBILE NUMBER</DataTable.Title>
            <DataTable.Title >GST NUMBER</DataTable.Title>
            <DataTable.Title >ACTIONS</DataTable.Title>
            </DataTable.Header>
            {data && data.map((item)=>{
              return (
                <DataTable.Row key={item._id}>
                <DataTable.Cell>{item.full_name }</DataTable.Cell>
                <DataTable.Cell  >{item.email}</DataTable.Cell>
                <DataTable.Cell >{item.mobile_no}</DataTable.Cell>
                <DataTable.Cell >{item.gst_no}</DataTable.Cell>
                <DataTable.Cell >
                  <Link to="/addvendor" >
                  <FontAwesomeIcon icon={ faInfoCircle } 
                    color="green" 
                    secondaryColor="red" 
                    secondaryOpacity={ 0.4 } 
                   />
                   </Link>
                   <Link to="/addvendor" >
                   <FontAwesomeIcon 
                    icon={ faTrash }  
                    color="red" 
                    secondaryColor="red" 
                    secondaryOpacity={ 0.4 } 
                    />
                  </Link>
                  <Link to="/addvendor" >
                   <FontAwesomeIcon 
                    icon={ faEdit }  
                    color="blue" 
                    secondaryColor="red" 
                    secondaryOpacity={ 0.4 }
                     />
                  </Link>
                  </DataTable.Cell>
                </DataTable.Row>
               )
              })
            }
            <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            optionsPerPage={optionsPerPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            showFastPagination
            optionsLabel={'Rows per page'}
            />
    </DataTable>
    </View>
    </View>
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
          backgroundColor:"#EBF8D6"
  
        },
  
      }),
      justifyContent:"center",
      padding:"10%",
    },
    textdesign:{
      marginLeft:"40%",
      fontStyle:"italic",
      fontWeight:"bold",
      fontSize:40,
      color:"green"
    },
    card:{
      backgroundColor:"white",
      borderRadius:5,
      borderColor:"black",
      justifyContent:"center",
      shadowRadius:10,
    },
    tableheader:{
      backgroundColor:"lightgreen"
    }
  });