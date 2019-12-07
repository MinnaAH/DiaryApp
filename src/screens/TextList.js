import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View, AsyncStorage, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {GetData} from '../config/GetData'

export default class TextList extends Component{
    constructor(props){
        super(props);
        this.state ={
            content:[],
            add: false, 
            user: null
        }
        
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    //Mikäli käyttäjän firebase collection on tyhjä -> alert
    getPosts = async () =>{
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        try{
            const data = await new GetData().getText(this.state.user)
            console.log(data)
            switch (data) {
                case null:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuva tai teksti merkintä')
                    break;
                case undefined:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuvatai teksti merkintä')
                    break;
                default:
                    this.setState({content: data})
                    break;
            }
        }catch(error){
            console.log(error)
        }
    }

    getContent = (date) =>{
        const {navigate} = this.props.navigation;
        navigate('Content', {date: date, user: this.state.user});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.getPosts()}/>
                <ScrollView>
                {
                    this.state.content.map((item, index) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                key={item.id}
                                onPress={() => this.getContent(item.date)}
                            >
                                <Text style={styles.headline}>{item.headline}</Text>
                                <Text style={styles.date} numberOfLines={2}>{item.content}</Text>
                            </TouchableOpacity>

                    ))
                }
                </ScrollView>
                {this.state.add &&
                    <View>
                        <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => {navigate('AddText');this.setState({add: false})}}
                        >
                            <Text>Lisää Teskti</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={styles.btnAdd}
                        onPress={() => {navigate('AddImage');this.setState({add: false})}}
                        >
                            <Text>Lisää Kuva</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('Home')}
                    >
                        <Text>Teksti</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.setState(prevstate =>({add: !prevstate.add}))}
                    >
                    <Text>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigate('ImageList')}
                    >
                        <Text>Kuva</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'stretch',
        marginTop: 20,
    },
    listItem:{
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headline:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    date:{
    },
    btnContainer:{
        width: '100%',
        bottom: 0,
        flexDirection:'row',
    },
    btn:{
        alignItems: 'center',
        width:'33.33%',
        paddingVertical: 20,
    },
    btnAdd:{
        alignItems: 'center',
        width:'100%',
        paddingVertical: 20,
    }
})