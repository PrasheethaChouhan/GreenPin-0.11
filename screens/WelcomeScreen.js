import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
//import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import ForgotPass from './ForgotPass';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isVisible: false,
      name: '',
      displayName: '',
      confirmPassword: '',
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Password doesn't match.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            emailId: this.state.emailId,
            address: this.state.address,
          });
          return Alert.alert('User Added Successfully', '', [
            { text: 'OK', onPress: () => this.setState({ isVisible: false }) },
          ]);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  showModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={{ width: '100%' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
                color: 'white',
                margin: 40,
              }}>
              Registration
            </Text>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#036e09',
              marginRight: 30,
              marginLeft: 30,
              marginTop: -30,
              marginBottom: 10
            }}>
            <TextInput
              style={styles.formTextInput}
              placeholder={'Name'}
              placeholderTextColor={'#90A5A9'}
              onChangeText={(text) => {
                this.setState({
                  name: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Display Name'}
              placeholderTextColor={'#90A5A9'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  displayName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'EmailId'}
              placeholderTextColor={'#90A5A9'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              placeholderTextColor={'#90A5A9'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Confrim Password'}
              placeholderTextColor={'#90A5A9'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            </View>
            <View>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
            <View style={{ marginLeft:'-18%', marginTop:'7%'}}>
              <Image
                source={require('../assets/google2.png')}
                  fadeDuration={0}
                  style={{ width: 50, height: 50,marginRight:'-100%', marginTop:'1%'}}
              />
              </View>
              <View style={{ marginRight:'-28%', marginTop:'-18.1%', justifyContent:'center', alignItems:'center'}}> 
              <Image
                source={require('../assets/facebook.png')} 
                  fadeDuration={0}
                  style={{ width: 50, height: 50, marginRight:20, marginTop:10 }}
              />
              </View>
              </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isVisible: false })}>
                <Text style={{ color: 'white' }}>Existing User? Sign In</Text>
              </TouchableOpacity>
                </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>
        <ScrollView>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 200, height: 300, marginLeft: 10, marginTop: '12%' }}
          />
          </View>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '13.3%',
              marginTop: '5%'
            }}>
            USERNAME
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              keyboardType={'email-address'}
              color="white"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '13.3%',
            }}>
            PASSWORD
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              color="white"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <TouchableOpacity
                style={{
                  width: 580,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-10%',
                }}
                onPress={() =>{
                  this.props.navigation.navigate('ForgotPass');
                }}>
              <Text
                style={{ color: '#90A5A9', fontSize: 15}}>
                  Forgot Password?              
              </Text>
            </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: '7%' }]}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
              }}>
              <Text
                style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <View style={styles.modalBackButton}>
              <View style={{ marginLeft:'8%', marginTop:'0%'}}>
              <Image
                source={require('../assets/google2.png')}
                  fadeDuration={0}
                  style={{ width: 50, height: 50,marginRight:'-100%', marginTop:'1%'}}
              />
              </View>
              <View style={{ marginRight:'-25%', marginTop:'-15.2%', justifyContent:'center', alignItems:'center'}}> 
              <Image
                source={require('../assets/facebook.png')} 
                  fadeDuration={0}
                  style={{ width: 50, height: 50, marginRight:20, marginTop:10 }}
              />
              </View>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                this.setState({ isVisible: true });
              }}>
              <Text
                style={{ color: 'white'}}>
                  New Member? Sign Up
              </Text>
            </TouchableOpacity>
              
              </View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#092f1c',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    // fontFamily:'AvenirNext-Heavy',
    color: 'green',
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: 'green',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'green',
    elevation: 10,
    marginTop: '-3%'
  },
  buttonContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#036e09',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: 255,
    height: 35,
    alignSelf: 'center',
    borderColor: 'black',
    color: '#d1da3f',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 23,
    padding: 10,
    
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
