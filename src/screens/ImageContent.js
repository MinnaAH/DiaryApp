import React, { Component } from 'react';
import { ScrollView ,Text, TouchableOpacity, StyleSheet, View, Alert,Image, ActivityIndicator } from 'react-native';
import {DeleteData} from '../config/DeleteData';

export default class ImageContent extends Component{
    constructor(props){
        super(props);
        this.state ={
            uri: null,
            name: null,
            user: null,
            loading: true
        }     
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const image = await navigation.getParam('uri')
        const imageName = await navigation.getParam('name')
        const username = await navigation.getParam('user')

        switch (image) {
            case null:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            case undefined:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            default:
                this.setState({uri: image, name: imageName, user: username, loading: false})
                break;
        }
        
    }
    showAlert = () =>{
        Alert.alert('Haluatko varmasti poistaa kuvan?','',
            [
                {text: 'Poista', onPress: () => {this.deleteContent();this.setState({loading: true})}, style: 'destructive'},
                {text: 'Peruuta', style: 'cancel'}
            ])
    }
    deleteContent = async () =>{
        const {navigate} = this.props.navigation
        try{
            await new DeleteData().deleteImage(this.state.name,this.state.user)
            Alert.alert('Kuva poistettu onnistuneesti','')
            navigate('Home')
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }
    share(){
        //jaetaan merkintä
        alert('Button pressed');
    };

    render(){
        return(
            <View style={styles.container}>
                {this.state.loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator 
                        size='large'
                        animating={this.state.loading}/>
                    </View>
                }
                {this.state.uri && 
                    <View>
                        <TouchableOpacity onPress={() => this.showAlert()}><Text>Poista</Text></TouchableOpacity>
                        <Image style={styles.image} source={{uri: this.state.uri}}/>
                        <Text>{this.state.name}</Text>
                    </View>
                }
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
        width: 150,
        height: 150
    },
})