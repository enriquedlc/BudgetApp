import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable, FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import TransactionInput from './components/TransactionInput';
import TransactionItem from './components/TransactionItem';

import uuid from 'react-native-uuid';

// TODO: 

//✅ fix the colocation of trashcan and edit button

//✅ set the transaction expense or income
//✅ install uuid.v4 for id
//✅ set the date for the transaction in the format of dd/mm/yyyy with the date picker or component
//✅ COMMIT the code to github

//✅ show the economic status of the user. red if the user is in debt, green if the user is in profit
//✅ COMMIT the code to github

// alerts for the user to enter the amount and the description when empty show alert
// COMMIT the code to github

//✅ dissmiss the keyboard when the user click on the screen
// COMMIT the code to github

// ******* if its possible when the user slide the item to the left show the edit and delete button
//✅ add the delete button to the transaction item
// add the edit button to the transaction item
//✅ COMMIT the code to github

// make the item a pressble when pressed show the info of the transaction
// COMMIT the code to github

// ******* button animation income and expense when pressed

// ********* no changes until app is finished

export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [showModalTransaction, setshowModalTransaction] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);

  // update the total balance when the user delete a transaction using useEffect
  useEffect(() => {
    if (transactions.length > 0) {
      let total = 0;
      transactions.forEach(transaction => {
        if (transaction.type === 'Income') {
          total += transaction.amount;
        } else {
          total -= transaction.amount;
        }
      });
      setTotalBalance(total);
    } else {
      setTotalBalance(0);
    }
  }, [transactions]);


  const transactionObject = {
    description: '',
    amount: 0,
    date: '',
    type: '',
  }

  const addTransaction = (transaction) => {
    transactionObject.description = transaction.description;
    transactionObject.amount = transaction.amount;
    transactionObject.date = transaction.date;
    transactionObject.type = transaction.type;

    setTransactions(() => [...transactions, { id: uuid.v4(), ...transactionObj }]);
    setshowModalTransaction(false);
  }

  const deleteTransaction = (id) => {
    setTransactions(() => transactions.filter((transaction) => transaction.id !== id));
  }

  const [transactionObj, setTransactionObj] = useState(transactionObject);

  console.log(transactions)

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.economicBalanceBox} >
          <Image source={require('./assets/appAssets/balance.png')} style={styles.balance} />
          {totalBalance < 0 ? <Text style={styles.balanceTextRed}>{totalBalance} €</Text> : <Text style={styles.balanceTextGreen}>{totalBalance} €</Text>}
        </View>
        <FlatList
          data={transactions}
          renderItem={(transactionData) => {
            console.log(transactionData.item)
            return <TransactionItem
              transactionId={transactionData.item.id}
              description={transactionData.item.description}
              amount={transactionData.item.amount}
              date={transactionData.item.date}
              type={transactionData.item.type}
              onTransactionRemove={deleteTransaction}
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

          totalBalance={totalBalance}
          setTotalBalance={setTotalBalance}
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
  economicBalanceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 15,
    marginBottom: 10,
  },
  balance: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  balanceTextRed: {
    color: 'red',
    fontSize: 20,
  },
  balanceTextGreen: {
    color: 'green',
    fontSize: 20,
  },
  economicBalanceText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
    paddingLeft: 15,
  },
});
