import React, { Component } from 'react';
import { ScrollView ,Text, TouchableOpacity, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import {GetData} from '../config/GetData'
import {DeleteData} from '../config/DeleteData';

export default class TextContent extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[],
            user: null,
            loading: true
        }     
    }

    //Saadaan aloitussivulta halutun merkinnän päivämäärä sekä käyttääteiedot
    //Haetaan sisältö 
    //Jos sisältö null/undefined -> Alert
    componentDidMount = async() =>{
        const {navigation} = this.props;
        const date = await navigation.getParam('date')
        const username = await navigation.getParam('user')
        this.setState({user: username})

        const contentData = await new GetData().getTextContent(date,username)
        switch (contentData) {
            case null:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            case undefined:
                Alert.alert('Sisällön haussa tapahtui virhe!')
                break;
            default:
                this.setState({content: contentData, loading: false})
                break;
        }
        
    }
    deleteContent = async (date) =>{
        const {navigate} = this.props.navigation
        try{
            await new DeleteData().deleteText(date,this.state.user)
            Alert.alert('Merkintä poistettu onnistuneesti')
            navigate('Home')
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }
    share(){
        //siirrytään merkinnän lisäämiseen
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
                {
                    
                    this.state.content.map((item, index) => (
                        <ScrollView key={index}>
                            <TouchableOpacity onPress={() => {this.deleteContent(item.date), this.setState({loading: true})}}><Text>Poista</Text></TouchableOpacity>
                            <Text style={styles.headline}>{item.headline}</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </ScrollView>
                    ))
                    
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
    }
})