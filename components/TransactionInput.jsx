import React from 'react'
import { Modal, View, TextInput, Text, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback, Button } from 'react-native'
import { useState } from 'react'

import DatePicker from 'react-native-modern-datepicker'

const TransactionInput = ({ setshowModalTransaction, showModalTransaction, onTransactionAdd, transactionObj, setTransactionObj, totalBalance, setTotalBalance }) => {

  // object handler
  const changeTransactionDescriptionHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, description: enteredText })
  }

  const changeTransactionAmountHandler = (enteredText) => {
    setTransactionObj({ ...transactionObj, amount: parseFloat(enteredText) })
  }

  const changeDateTransactionHandler = (enteredDate) => {
    setTransactionObj({ ...transactionObj, date: enteredDate })
  }

  const changeTransactionTypeHandlerIncome = () => {
    setTransactionObj({ ...transactionObj, type: 'Income' })
  }

  const changeTransactionTypeHandlerExpense = () => {
    setTransactionObj({ ...transactionObj, type: 'Expense' })
  }

  const addIncomeToBalance = () => {
    if (transactionObj.type === 'Income') {
      setTotalBalance(parseFloat(totalBalance + transactionObj.amount))
    } else {
      setTotalBalance(parseFloat(totalBalance - transactionObj.amount))
    }
  }

  // transaction handler
  const addTransactionHandler = () => {
    const sanitizedDescription = transactionObj.description.trim()
    const sanitizedAmount = transactionObj.amount
    const sanitizedDate = transactionObj.date.trim()
    if (sanitizedDescription.length === 0 || sanitizedAmount === 0 || sanitizedDate.length === 0 || transactionObj.type === '') {
      return
    }
    onTransactionAdd(transactionObj)
    addIncomeToBalance()
    setTransactionObj({ description: '', amount: '', date: '', type: '' })
    setshowModalTransaction(false)
  }

  const cancelModalTransaction = () => {
    setshowModalTransaction(!showModalTransaction)
    setTransactionObj({ description: '', amount: '', date: '', type: '' })
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
    <Modal animationType={'slide'} 
      visible={showModalTransaction}
      onRequestClose={() => setshowModalTransaction(!showModalTransaction)}>
      <TouchableWithoutFeedback sytle={styles.modal} onPress={Keyboard.dismiss} >
        <View style={styles.productInput}>

          <View style={styles.typeOfTransaction}>
            <Pressable style={styles.typeOfTransactionButtonIncome} onPress={changeTransactionTypeHandlerIncome}>
              <Text style={styles.typeOfTransactionText}>Income</Text>
            </Pressable>
            <Pressable style={styles.typeOfTransactionButtonExpense} onPress={changeTransactionTypeHandlerExpense}>
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
                // {onSelectedChange={selectedDate => setSelectedDate(selectedDate)}}
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
    borderRadius: 7,
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