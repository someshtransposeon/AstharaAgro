import React, {useState, UseEffect} from 'react';
import { View, StyleSheet} from 'react-native';
import { Provider, DefaultTheme, DataTable, Button } from 'react-native-paper';

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

export default function AllItems({ navigation }) {

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
                    <DataTable.Title>Item Name</DataTable.Title>
                    <DataTable.Title>Category</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell>Tomato</DataTable.Cell>
                    <DataTable.Cell>Vegitable</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Apple</DataTable.Cell>
                    <DataTable.Cell>Fruits</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Chili</DataTable.Cell>
                    <DataTable.Cell>Vegitable</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Mango</DataTable.Cell>
                    <DataTable.Cell>Fruits</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Potato</DataTable.Cell>
                    <DataTable.Cell>Vegitable</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Orange</DataTable.Cell>
                    <DataTable.Cell>Fruits</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Tomato</DataTable.Cell>
                    <DataTable.Cell>Vegitable</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Apple</DataTable.Cell>
                    <DataTable.Cell>Fruits</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell>Chili</DataTable.Cell>
                    <DataTable.Cell>Vegitable</DataTable.Cell>
                    <DataTable.Cell><Button mode="outlined" color="blue" onPress={() => {navigation.navigate('EditItem')}}>Edit</Button></DataTable.Cell>
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
        width: '90%',
    }
}); 