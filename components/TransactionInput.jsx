import React from 'react'
import { Modal, View, TextInput, Text, StyleSheet, Pressable, Button } from 'react-native'
import { useState } from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import uuid from 'react-native-uuid'

// <LinearGradient
//         colors={['#5851DB', '#C13584', '#E1306C', '#5851DB', 'dark-blue']}
//         style={styles.linearGradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text>Horizontal Gradient</Text>
//       </LinearGradient>

const TransactionInput = ({ setshowModalTransaction, showModalTransaction, onTransactionAdd, transactionObj, setTransactionObj }) => {


  const changeTransactionDescriptionHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, description: enteredText })
  }

  const changeTransactionAmountHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, amount: enteredText })
  }

  const addTransactionHandler = () => {
    const sanitizedDescription = transactionObj.description.trim()
    const sanitizedAmount = transactionObj.amount.trim()
    if (sanitizedDescription.length === 0 || sanitizedAmount.length === 0) {
      return
    }
    onTransactionAdd(sanitizedDescription, sanitizedAmount)
    setTransactionObj({ id: uuid.v4(), description: '', amount: '', date: new Date(), type: '' })
    setshowModalTransaction(false)
  }

  const cancelModalTransaction = () => {
    setshowModalTransaction(!showModalTransaction)
    setTransactionObj({ id: '', description: '', amount: '', date: '', type: '' })
  }

  return (
    <Modal animationType={'slide'} transparent={true}
      visible={showModalTransaction}
      onRequestClose={() => setshowModalTransaction(!showModalTransaction)}>
      <View style={styles.productInput}>

        <View style={styles.typeOfTransaction}>
          <Pressable style={styles.typeOfTransactionButtonIncome}>
            <Text style={styles.typeOfTransactionText}>Income</Text>
          </Pressable>
          <Pressable style={styles.typeOfTransactionButtonExpense}>
            <Text style={styles.typeOfTransactionText}>Expense</Text>
          </Pressable>
        </View>

        <TextInput style={styles.transactionInputStyle}
          placeholder="Transaction"
          keyboardType='default'

          onChangeText={changeTransactionDescriptionHandler}
          value={transactionObj.description}
        />

        <TextInput style={styles.transactionInputStyle}
          placeholder="Amount"
          keyboardType='numbers-and-punctuation'

          onChangeText={changeTransactionAmountHandler}
          value={transactionObj.amount}
        />

        <View style={styles.addTransactionButton}>

          <Pressable title="Add transaction" onPress={addTransactionHandler}>
            <Text>ADD</Text>
          </Pressable>

          <Pressable title="Cancel" onPress={cancelModalTransaction}>
            <Text>CANCEL</Text>
          </Pressable>

        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  productInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  transactionInputStyle: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  addTransactionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  typeOfTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 15,
  },
  typeOfTransactionText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  typeOfTransactionButtonIncome: {
    backgroundColor: '#00FF00',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  typeOfTransactionButtonExpense: {
    backgroundColor: '#FF0000',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default TransactionInput