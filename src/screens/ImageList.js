import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import firebase from '../config/Firebase';	

export default class ImageList extends Component{
    constructor(props){
        super(props);
        this.state ={
            content: [],
            uri: [],
            add: false,   
        }
        
    }
    componentDidMount() {
        this.getPosts()
          
    }

    //Haetaan firebasesta etusivulle tallennetun merkinnän nimi/otsikko ja päivämäärä
    getPosts = () => {
        var storageRef = firebase.storage().ref();
        
        storageRef
        .child('images')
        .listAll()
        .then((result) => {
            result.items.forEach((imageRef) => {
                this.setState({
                    content: [...this.state.content, imageRef.name]
                })
            }) 
            this.getUri()
            
        })
        .catch((error) => {
            console.log(error);
        })
        
        
        if(this.state.content != null){this.getUri();}
           
    };

    getUri = () =>{
            var storageRef = firebase.storage().ref();

            for(var i=0; i<this.state.content.length; i++){
                storageRef
                .child('images/'+this.state.content[i])
                .getDownloadURL()
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    
                    console.log(url)
                    this.setState({
                        uri: [...this.state.uri, url]
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        
        }
    



    getContent(){
        const {navigate} = this.props.navigation;
        navigate('Content');
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
                                onPress={() => this.getContent(item.headline)}
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