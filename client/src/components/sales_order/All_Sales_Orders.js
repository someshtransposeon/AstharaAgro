import React, {useState} from 'react';
import { View, StyleSheet,Platform } from 'react-native';
import { Provider, DefaultTheme, DataTable, Button } from 'react-native-paper';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

const optionsPerPage = [2, 3, 4];

export default function All_Sales_Orders({ navigation }) {

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <DataTable style={styles.datatable}>
                <DataTable.Header>
                    <DataTable.Title>Sr.</DataTable.Title>
                    <DataTable.Title>Sales Order ID</DataTable.Title>
                    <DataTable.Title>Sales ID</DataTable.Title>
                    <DataTable.Title>Customer ID</DataTable.Title>
                    <DataTable.Title>Item Count</DataTable.Title>
                    <DataTable.Title>Sales Order Date</DataTable.Title>             
                    <DataTable.Title>Remark</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell>10002</DataTable.Cell>
                    <DataTable.Cell>1110</DataTable.Cell>
                    <DataTable.Cell>110</DataTable.Cell>
                    <DataTable.Cell>5</DataTable.Cell>
                    <DataTable.Cell>15/07/2021</DataTable.Cell>
                    <DataTable.Cell>NA</DataTable.Cell>
                    <DataTable.Cell>
                        {Platform.OS=='android' ?
                        <Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button>
                        :
                        <Button mode="outlined" color="blue"><Link to="/Edit_Sales_Order">Edit</Link></Button>
                        }
                    </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>2</DataTable.Cell>
                    <DataTable.Cell>11002</DataTable.Cell>
                    <DataTable.Cell>1130</DataTable.Cell>
                    <DataTable.Cell>120</DataTable.Cell>
                    <DataTable.Cell>8</DataTable.Cell>
                    <DataTable.Cell>19/07/2021</DataTable.Cell>
                    <DataTable.Cell>NA</DataTable.Cell>
                    <DataTable.Cell>
                        {Platform.OS=='android' ?
                        <Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button>
                        :
                        <Button mode="outlined" color="blue"><Link to="/Edit_Sales_Order">Edit</Link></Button>
                        }
                    </DataTable.Cell>
                </DataTable.Row>

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
        </Provider>
    );
}

const styles = StyleSheet.create({
    datatable: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '90%',
                marginTop: '4%',
            }
        })
    }
}); 