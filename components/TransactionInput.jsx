import React from 'react'
import { Modal, View, TextInput, Text, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback, Button } from 'react-native'
import { useState } from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import uuid from 'react-native-uuid'
import DatePicker from 'react-native-modern-datepicker'

// <LinearGradient
//         colors={['#5851DB', '#C13584', '#E1306C', '#5851DB', 'dark-blue']}
//         style={styles.linearGradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text>Horizontal Gradient</Text>
//       </LinearGradient>

const TransactionInput = ({ setshowModalTransaction, showModalTransaction, onTransactionAdd, transactionObj, setTransactionObj }) => {

// object handler
  const changeTransactionDescriptionHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, description: enteredText })
  }

  const changeTransactionAmountHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, amount: enteredText })
  }

  const changeDateTransactionHandler = (enteredDate) => {
    setTransactionObj({ ...transactionObj, date: enteredDate })
  }

// transaction handler
  const addTransactionHandler = () => {
    const sanitizedDescription = transactionObj.description.trim()
    const sanitizedAmount = transactionObj.amount.trim()
    const sanitizedDate = transactionObj.date.trim()
    if (sanitizedDescription.length === 0 || sanitizedAmount.length === 0 || sanitizedDate.length === 0) {
      return
    }
    onTransactionAdd(sanitizedDescription, sanitizedAmount)
    setTransactionObj({ id: uuid.v4(), description: '', amount: '', date: '', type: '' })
    setshowModalTransaction(false)
  }

  const cancelModalTransaction = () => {
    setshowModalTransaction(!showModalTransaction)
    setTransactionObj({ id: uuid.v4(), description: '', amount: '', date: '', type: '' })
  }

  // date picker
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <Modal animationType={'slide'} transparent={true}
      visible={showModalTransaction}
      onRequestClose={() => setshowModalTransaction(!showModalTransaction)}>
      <TouchableWithoutFeedback sytle={styles.modal} onPress={Keyboard.dismiss} >
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

          {selectedDate && <Text style={styles.dateSelectedText}>Selected date: {selectedDate}</Text>}

          <Button title="Show Date Picker" onPress={showDatePicker} />

          <Modal animationType={'fade'} transparent={true}
            visible={isDatePickerVisible}
            onRequestClose={() => setDatePickerVisibility(!isDatePickerVisible)}>
            <View style={styles.datePicker} >

              <DatePicker
                mode="calendar"
                onSelectedChange={selectedDate => setSelectedDate(selectedDate)}
                onDateChange={changeDateTransactionHandler}
                value={transactionObj.date}
                style={{ width: 320, height: 300, borderRadius: 10 }}
              />
              {selectedDate && <Text style={styles.dateSelectedText}>Selected date: {selectedDate}</Text>}
              <Button title="Hide Date Picker" onPress={hideDatePicker} />
            </View>
          </Modal>

          <View style={styles.addTransactionButton}>

            <Pressable title="Add transaction" onPress={addTransactionHandler}>
              <Text>ADD</Text>
            </Pressable>

            <Pressable title="Cancel" onPress={cancelModalTransaction}>
              <Text>CANCEL</Text>
            </Pressable>

          </View>

        </View>
      </TouchableWithoutFeedback>
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
    padding: 20,
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
  datePicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  dateSelectedText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    padding: 10,
  },

});

export default TransactionInput