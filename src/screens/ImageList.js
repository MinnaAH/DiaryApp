import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View, Image,AsyncStorage, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {GetData} from '../config/GetData'	

export default class ImageList extends Component{
    constructor(props){
        super(props);
        this.state ={
            uri: [],
            add: false,  
            user: null 
        }
        
    }

    componentDidMount = () =>{
        this.getPosts()
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    getPosts = async () => {
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        try{
            const image = await new GetData().getPicture(this.state.user)
            console.log('const image: '+image)
            switch (image) {
                case null:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuva tai teksti merkintä')
                    break;
                case undefined:
                    Alert.alert('Tietokanta on tyhjä!', 'Aloita päiväkirjan käyttäminen lisäämällä kuvatai teksti merkintä')
                    break;
                default:
                    this.setState({uri: image})
                    break;
            }
        }catch(error){
            console.log(error)
        }           
    };

    getContent(imageUri){
        const {navigate} = this.props.navigation;
        navigate('ImageContent', {uri: imageUri});
    };

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <ScrollView>
                {
                    
                    this.state.uri.map((item, index) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => this.getContent(item)}
                            >
                                <Image style={styles.image} source={{uri: item}}/>
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
    image:{
        width: 150,
        height: 150
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