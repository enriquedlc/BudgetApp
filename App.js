import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable, FlatList } from 'react-native';
import { useState } from 'react';

import Header from './components/Header';
import TransactionInput from './components/TransactionInput';
import TransactionItem from './components/TransactionItem';

import uuid from 'react-native-uuid';

// TODO: 

//✅ fix the colocation of trashcan and edit button

// ********** set the transaction expense or income
// install uuid.v4 for id
// set the date for the transaction in the format of dd/mm/yyyy with the date picker or component
// COMMIT the code to github

// show the economic status of the user. red if the user is in debt, green if the user is in profit
// COMMIT the code to github

// alerts for the user to enter the amount and the description when empty show alert
// COMMIT the code to github

// dissmiss the keyboard when the user click on the screen
// COMMIT the code to github

// ******* if its possible when the user slide the item to the left show the edit and delete button
// add the delete button to the transaction item
// add the edit button to the transaction item
// COMMIT the code to github

// make the item a pressble when pressed show the info of the transaction
// COMMIT the code to github

// ********* no changes until app is finished



export default function App() {

  const [transactions, setTransactions] = useState([]);

  const [showModalTransaction, setshowModalTransaction] = useState(false);

  const transactionObject = {
    id: uuid.v4(),
    description: '',
    amount: 0,
    date: new Date(),
    type: '',
  }

  const addTransaction = (transaction) => {
    transactionObject.id = uuid.v4();
    transactionObject.description = transaction.description;
    transactionObject.amount = transaction.amount;
    transactionObject.date = transaction.date;
    transactionObject.type = transaction.type;

    setTransactions([...transactions, transactionObj]);
    setshowModalTransaction(false);
  }

  const [transactionObj, setTransactionObj] = useState(transactionObject);

  console.log(transactions);
  console.log(transactionObj.description);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <FlatList
          data={transactions}
          renderItem={(transactionData) => {
            return <TransactionItem
              transactionObj={transactionObj}
              description={transactionData.item.description}
              amount={transactionData.item.amount}
              date={transactionData.item.date}
            />
          }}
        >
        </FlatList>
      </View>
      <View style={styles.footer}>
        <TransactionInput
          showModalTransaction={showModalTransaction}
          setshowModalTransaction={setshowModalTransaction}

          onTransactionAdd={addTransaction}
          transactionObject={transactionObject}
          transactionObj={transactionObj}
          setTransactionObj={setTransactionObj}

        />
        <Pressable style={styles.buttonStyle} onPress={() => setshowModalTransaction(true)} >
          <Image style={styles.buttonImage} source={require('./assets/appAssets/addButton.png')} />
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'between',
  },
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 7,
    width: '100%',
    padding: 10,
    borderWidth: 1,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});
