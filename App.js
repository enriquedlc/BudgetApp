import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useState } from 'react';

import Header from './components/Header';
import TransactionInput from './components/TransactionInput';
import TransactionItem from './components/TransactionItem';


export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [showModalTransaction, setshowModalTransaction] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <TransactionItem />
      </View>
      <View style={styles.footer}>
        <TransactionInput showModalTransaction={showModalTransaction} setshowModalTransaction={setshowModalTransaction} />
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
