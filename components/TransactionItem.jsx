import React from 'react'
import { Image, View, Pressable, Text, StyleSheet } from 'react-native'

const TransactionItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TransactionItem 1</Text>
      <View style={styles.buttonContainerEdit}>
        <Pressable>
          <Image style={styles.editButton} source={require('../assets/appAssets/escritura.png')} />
        </Pressable>
      </View>
      <View style={styles.buttonContainerDelete}>
        <Pressable>
          <Image style={styles.deleteButton} source={require('../assets/appAssets/trashcan.png')} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 70,
    padding: 10,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '65%',
  },
  buttonContainerEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '10%',
    paddingBottom: 30,
  },
  buttonContainerDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '10%',
    paddingBottom: 30,
  },
  editButton: {
    marginLeft: 10,
    marginTop: 30,
    width: 35,
    height: 35,
  },
  deleteButton: {
    marginLeft: 10,
    marginTop: 30,
    width: 40,
    height: 40,
  },

});

export default TransactionItem
