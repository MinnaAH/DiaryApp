import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import {AddData} from '../config/AddData';

export default class AddText extends Component{
    constructor(props){
        super(props);
        this.state ={
            headline: null,
            content: null,
            user: null,
            loading: false,
        }     
    }

    //Tallennetaan merkintä Firebaseen, luodaan uusi dokumentti jossa päivämäärä ja sisällön tyyppi
    //Mikäli tallennus onnistuu, navigoidaan etusivulle
    save = async () =>{
        const {headline, content} = this.state;
        const {navigate} = this.props.navigation
        if(headline != null || content !=null){
            
            await AsyncStorage.getItem('Username', (err, result) =>{
               this.setState({user: result})
            })
            
            try{
                await new AddData().addText(this.state.user, headline, content)
                Alert.alert('Merkintä tallennettu onnistuneesti!','')
                navigate('Home')

            }catch(error){
                console.log("Error: " +error)
            }
        }
        else{
            Alert.alert('Tyhjää merkintää ei voida tallentaa!', 'Lisää merkinnälle otsikko ja sisältö');
        }
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
                <ScrollView>
                    <Text style={styles.headline}>Lisää merkintä</Text>
                    <TextInput
                        style={styles.addHeadline}
                        placeholder="Otsikko"
                        onChangeText={(headline) => this.setState({headline})}
                        value ={this.state.headline}
                    />
                    <TextInput
                        style={styles.content}
                        placeholder="..."
                        multiline={true} 
                        onChangeText={(content) => this.setState({content})}
                        value ={this.state.content}
                    />
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={() => {this.save(); this.setState({loading: true})}}
                        style={styles.btn}
                    >
                        <Text>Tallenna</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 30,
        paddingHorizontal: 10,
        flex: 1, 
    },
    headline:{
        fontSize: 20,
        textAlign: 'center',
    },
    addHeadline:{
        fontSize: 20,
    },
    content:{
        fontSize: 18,
        width: '100%',
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