import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class AddImage extends Component{
    constructor(props){
        super(props);
        this.state ={
            image: null,
            name: null,
        }     
    }
    componentDidMount() {
        this.getPermissionAsync();
    }

    //iOS käyttöjärjestelmän laitteelta lupa
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Käyttöoikeus puuttuu! \nKäyttöoikeuden voit lisätä puhelimen asetuksista');
          }
        }
    }

    save(){
        //Tallennetaan ja palataan etusivulle
        const {navigate} = this.props.navigation;
        if(this.state.image != null){
            alert('Kuva tallennettu');
            navigate('Home');
        }
        else{
            alert('Valitse kuva ennen tallentamista')
        }
        
    };

    //Valitaan kuva
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          
        });
       
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    render(){
        let { image } = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.headline}>Valitse kuva</Text>
                <View style={styles.imageView}>
                    {image && <Image source={{ uri: image }} style={styles.picture} />}
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