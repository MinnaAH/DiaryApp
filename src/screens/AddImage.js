import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, TextInput,AsyncStorage, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {AddData} from '../config/AddData';

export default class AddImage extends Component{
    constructor(props){
        super(props);
        this.state ={
            name: null,
            image: null,
            date: null,
            user: null,
            loading: false
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

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
      
            xhr.onload = function() {
              // return the blob
              resolve(xhr.response);
            };
            
            xhr.onerror = function() {
              // something went wrong
              reject(new Error('uriToBlob failed'));
            };
      
            // this helps us get a blob
            xhr.responseType = 'blob';
      
            xhr.open('GET', uri, true);
            xhr.send(null);
      
          });     
    }

    save = async () =>{
        //Tallennetaan ja palataan etusivulle
        await AsyncStorage.getItem('Username', (err, result) =>{
            this.setState({user: result})
        })
        const {navigate} = this.props.navigation;

        if(this.state.image!=null && this.state.name != null){
            this.uriToBlob(this.state.image.uri)
            .then((blob) =>{
                try{
                    return new AddData().addImage(this.state.user, this.state.name, blob)
        
                }catch(error){
                    console.log("Error: " +error)
                }
            })
            .then(() => {
                alert('Kuva ladattu');
                navigate('ImageList');
            })
            .catch((error) => {
                console.log(error);
            })
        } 
        else{
            if(this.state.image === null && this.state.name === null){
                alert('Kuva ja nimi puuttuvat!\nValitse kuva ja nimeä se ennen tallentamista')
            }
            else{
                alert('Nimi puuttuu!\nNimeä kuva ennen tallentamista')
            }
        }
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
                {this.state.loading && 
                    <View style={styles.loading}>
                        <ActivityIndicator 
                        size='large'
                        animating={this.state.loading}/>
                    </View>
                }
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
                        onPress={() => {this.save(); this.setState({loading: true})}}
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