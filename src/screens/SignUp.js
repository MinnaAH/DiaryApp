import React, { Component } from 'react';
import {Text, TouchableOpacity, TextInput, StyleSheet, View, AsyncStorage } from 'react-native';


export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state ={
            username: null,
            pwd: '',
            errorMsg: null,
        }
        
    }

    //Painikkeen onPress funktio
    handleSignUp(pwdL){
        const {navigate} = this.props.navigation;
        //PIN-koodin pituuden tarkistus
        if(pwdL < 4 || this.state.username === null){ alert('Tarkista antamasi tunnukset! /n PIN-koodin tulee olla vähintään 4 merkkiä ja käyttäjätunnus ei voi olla tyhjä')}
        //Lisätään käyttäjätunnus paikallisesti
        //Firebase luodaan collection kyseiselle käyttäjälle käyttäjätunnuksen pohjalta
        else{
            try {
                AsyncStorage.setItem('Username', this.state.username);
                AsyncStorage.setItem('pwd', this.state.pwd);
                
                navigate('LogIn');
              } catch (error) {
                console.log(error);
              }
        }
    }

    render(){
        var pwdL = this.state.pwd.length;
        return(
            <View style={styles.container}>
                <Text style={styles.headline}>Rekisteröi käyttäjätunnus ja 4 numeroinen PIN-koodi</Text>
                <TextInput
                    style={styles.pin} 
                    placeholder="Käyttäjätunnus"
                    onChangeText={(username) => this.setState({username})}
                    value ={this.state.username}
                />
                <TextInput
                    style={styles.pin} 
                    placeholder="PIN-koodi"
                    onChangeText={(pwd) => this.setState({pwd})}
                    value ={this.state.pwd}
                    keyboardType={'numeric'}
                    maxLength={4}
                />
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                        style={styles.btn}
                        onPress={() => this.handleSignUp(pwdL)}
                        
                    ><Text>Rekisteröidy</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
        flex: 1,
    },
    headline:{
        fontSize: 20,
        textAlign: 'center',
    },
    pin:{
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
    btnContainer:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    btn:{
        alignItems: 'center',
        paddingVertical: 20,
    }
})