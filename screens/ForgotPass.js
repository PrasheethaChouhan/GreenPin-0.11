import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
        emailId: '',
    };
  }
  render() {
    return (
      <View style={{ marginTop: 0, flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#1B2E0F' }}>
      
      <TouchableOpacity
                style={{
                  width: 580,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-80%',
                  marginBottom: '60%',
                  marginRight: 350
                }}
                onPress={() =>{
                  this.props.navigation.navigate('WelcomeScreen');
                }}>
              <Text
                style={{ color: '#90A5A9', fontSize: 15}}>
                    Back
              </Text>
            </TouchableOpacity>
      <TextInput style={{alignSelf: 'center',borderColor: 'black',color: '#d1da3f',borderRadius: 10,borderWidth: 2,marginTop: 25,padding: 10, width:"85%", height:'6%'}} 
      placeholder="Enter Email" 
      placeholderTextColor='#90A5A9'
      onChangeText={(text)=>{
        this.setState({emailId:text})
      }}/>
        <TouchableOpacity style={{backgroundColor:'green', width:"50%", height:'4%', padding:5, borderRadius:5, marginTop: '3%'}}
          onPress={() => {
            firebase.auth().sendPasswordResetEmail(this.state.emailId);
            Alert.alert('Password enter email!!');
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>
            Send Reset Mail
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2E0F',
    marginTop: 30,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
