import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from '../config/Firebase';
import { Blob } from '@firebase/firestore-types';

export default class AddImage extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: null,
            image: null,
            date: null,
        }     
    }

    componentDidMount(){
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const hour = new Date().getHours();
        const minute = new Date().getMinutes();
        this.setState({
            date: day + '.' + month + '.' + year + ' ' + hour + ':' + minute,
        });
    }

    save(){
        //Tallennetaan ja palataan etusivulle
        const {navigate} = this.props.navigation;
        navigate('Home');
        
    };

    //Valitaan kuva
    pickImage = () => {
        const options = {noData: true};
        ImagePicker.launchImageLibrary(options, response => {
            if(response.uri){
                this.setState({image: response})
            }
        })
        
    };

    render(){
        let { image } = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.headline}>Valitse kuva</Text>
                <View style={styles.imageView}>
                    {image && <Image source={{ uri: image.uri }} style={styles.picture} />}
                </View>
                
                {image &&<TextInput
                        style={styles.name}
                        placeholder="Nimi"
                        onChangeText={(name) => this.setState({name})}
                        value ={this.state.name}
                    />}
               
                <View style={styles.btnContainer}>
                <TouchableOpacity
                        onPress={() => this.pickImage()}
                        style={styles.btn}
                    >
                        <Text>Valitse Kuva</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.save()}
                        style={styles.btn}
                    ><Text>Tallenna</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    headline:{
        fontSize: 20,
        textAlign: 'center',
    },
    btnContainer:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection:'row',
    },
    btn:{
        alignItems: 'center',
        width:'50%',
        paddingVertical: 20,
    },
    imageView:{
        width: '100%',
        height: '50%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture:{
        aspectRatio: 1,
        width: '90%',
        height: undefined,
    },
    name:{
        fontSize: 18,
        width: '100%',
    }
})