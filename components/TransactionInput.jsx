import React from 'react'
import { Modal, View, TextInput, Text, StyleSheet, Pressable } from 'react-native'

const TransactionInput = ({ setshowModalTransaction, showModalTransaction }) => {

  return (
    <Modal animationType={'slide'} transparent={true}
      visible={showModalTransaction}
      onRequestClose={() => setshowModalTransaction(!showModalTransaction)}>
      <View style={styles.productInput}>
        <TextInput style={styles.transactionInputStyle}
          placeholder="Transaction"
          keyboardType='default' />
        <TextInput style={styles.transactionInputStyle}
          placeholder="Amount"
          keyboardType='numeric' />
        <View style={styles.addTransactionButton}>
          <Pressable title="Add transaction" onPress={() => { setshowModalTransaction(!showModalTransaction) }}>
            <Text>ADD</Text>
          </Pressable>
          <Pressable title="Cancel" onPress={() => { setshowModalTransaction(!showModalTransaction) }}>
            <Text>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
});

export default TransactionInput