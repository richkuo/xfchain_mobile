/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props)

    this.state = {
      upcId: '',
      productId: '775357',
      walletAddress: '0xB3430e176fF66ED96E6b291A1d655b1910f14aF6',
      privateKey: '',
      productName: '',
    }

    // Toggle the state every second
    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { isShowingText: !previousState.isShowingText };
    //   });
    // }, 1000);
  }

  async submitAddress() {
    try {
      let response = await fetch(`http://localhost:3000/register?upcId=${this.state.upcId}&productId=${this.state.productId}&walletAddress=${this.state.walletAddress}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let responseJson = await response.json()

      console.log(responseJson)

      this.setState({
        privateKey: responseJson.private_key,
      })

    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textInputLabel}>UPC</Text>

          <TextInput
            autoCorrect={false}
            value={this.state.upcId}
            style={styles.textInputField}
            selectTextOnFocus={true}
            onChangeText={(upcId) => this.setState({upcId})}
          />

          <Text style={styles.textInputLabel}>Product Id</Text>

          <TextInput
            autoCorrect={false}
            value={this.state.productId}
            style={styles.textInputField}
            selectTextOnFocus={true}
            onChangeText={(productId) => this.setState({productId})}
          />

          <Text style={styles.textInputLabel}>Your Wallet Address</Text>

          <TextInput
            autoCorrect={false}
            value={this.state.walletAddress}
            style={styles.textInputField}
            selectTextOnFocus={true}
            onChangeText={(walletAddress) => this.setState({walletAddress})}
          />

          <Text style={styles.textInputLabel}>Private Key</Text>
          <TextInput
            disabled={true}
            autoCorrect={false}
            value={this.state.privateKey}
            style={styles.textInputFieldPrivateKey}
            selectTextOnFocus={false}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.submitAddress()}
          >
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    padding: 25,
  },
  textInputFieldPrivateKey: {
    backgroundColor: 'grey',
    color: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textInputLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    padding: 10,
  },
  textInputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  checkBox: {
    padding: 10,
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 5,
    margin: 10,
    borderRadius: 3,
  },
  submit: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
