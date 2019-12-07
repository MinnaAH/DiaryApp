import React, { Component } from 'react';
import { ScrollView ,Text, TouchableOpacity, StyleSheet, View, Alert,Image } from 'react-native';
import {GetData} from '../config/GetData'

export default class ImageContent extends Component{
    constructor(props){
        super(props);
        this.state ={
            uri: null
        }     
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const image = await navigation.getParam('uri')

        switch (image) {
            case null:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            case undefined:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            default:
                this.setState({uri: image})
                break;
        }
        

    }
    share(){
        //siirrytään merkinnän lisäämiseen
        alert('Button pressed');
    };

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.state.uri}}/>
                <View style={styles.btnContainer}>
                    <TouchableOpacity     
                        onPress={() => this.share()}
                        style={styles.btn}
                    >
                        <Text>Jaa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 20,
        paddingHorizontal: 10,
        flex: 1,        
    },
    headline:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        fontSize: 18,
    },
    btnContainer:{
        width: '100%',
        bottom: 0,
    },
    btn:{
        alignItems: 'center',
        paddingVertical: 20,
    },
    image:{
        width: 300,
        height: 300
    },
})