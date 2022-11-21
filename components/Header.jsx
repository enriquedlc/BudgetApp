import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

// delete item function here
// edit item function here

const Header = () => {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../assets/appAssets/applogo.png')} />
            <Text style={styles.headerTittleApp}>MyBudgetApp</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: 100,
        padding: 10,
    },
    headerTittleApp: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    logo: {
        marginLeft: 10,
        marginTop: 30,
        width: 40,
        height: 40,
    },
});

export default Header
