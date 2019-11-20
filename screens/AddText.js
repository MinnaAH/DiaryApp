import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';

export default class AddText extends Component{
    constructor(props){
        super(props);
        this.state ={
            headline: null,
            content: null,
            date: ""
        }     
    }
    save(){
        const {navigate} = this.props.navigation;
        //siirrytään merkinnän lisäämiseen

        if(this.state.headline != null || this.state.content !=null){
            navigate('Home');
            alert('Merkintä tallennettu');
        }
        else{
            alert('Tyhjää merkintää ei voida tallentaa');
        }
    };

    render(){
        return(
            <View style={styles.container}>
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
                        onPress={() => this.save()}
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