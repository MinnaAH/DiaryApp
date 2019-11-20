import React, { Component } from 'react';
import {Text, TouchableOpacity, TextInput, StyleSheet, View } from 'react-native';


export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state ={
            email:'',
            pwd: '',
            errorMsg: null,
        }
        
    }

    //Painikkeen onPress funktio
    signUp(pwdL){
        

        //PIN-koodin pituuden tarkistus
        if(pwdL < 4){ alert('PIN-koodi liian lyhyt')}
    }

    render(){
        var pwdL = this.state.pwd.length;
        return(
            <View style={styles.container}>
                <Text style={styles.headline}>Rekisteröi sähköposti ja 4 numeroinen PIN-koodi</Text>
                <TextInput
                    style={styles.pin} 
                    placeholder="Sähköposti"
                    onChangeText={(email) => this.setState({email})}
                    value ={this.state.email}
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
                        onPress={() => this.handleSignUp()}
                        
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