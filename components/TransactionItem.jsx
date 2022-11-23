import React, { useEffect } from 'react'
import { Image, View, Pressable, Text, StyleSheet } from 'react-native'

const TransactionItem = ({ transactionId, description, amount, date, onTransactionRemove }) => {

  return (
    <View style={styles.container}>
      <View style={styles.transactionDesc}>
        <Text style={styles.descriptionText}>Description: {description}</Text>
        <Text style={styles.descriptionText}>Amount: {amount}</Text>
      </View>
      <View style={styles.buttonContainerEdit}>
        <Pressable>
          <Image style={styles.editButton} source={require('../assets/appAssets/escritura.png')} />
        </Pressable>
      </View>
      <View style={styles.buttonContainerDelete}>
        <Pressable onPress={() => onTransactionRemove(transactionId)} >
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
    marginBottom: 10,
  },
  descriptionText: {
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 'bold',
    width: '100%',
  },
  buttonContainerEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '12%',
    paddingBottom: 30,
  },
  buttonContainerDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '15%',
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
  transactionDesc: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    marginLeft: 10,
  },

});

export default TransactionItem
