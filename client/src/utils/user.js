import AsyncStorage from '@react-native-async-storage/async-storage';
var r="";
async function fetchData() {
   await AsyncStorage.getItem('role')
    .then((role) => {
        r=role;
    })
    .catch((error) => {console.error(error);})
}
//export const role = fetchData();
console.log(r);
export const role = fetchData();
export const userId = AsyncStorage.getItem('loginuserid');