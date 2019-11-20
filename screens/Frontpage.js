import React, { Component } from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default class Frontpage extends Component{
    constructor(props){
        super(props);
        this.state ={
            contents: [
                {
                    testHeadline: 'Headline1',
                    testDate: 'Date1',
                    id: 1
                },
                {
                    testHeadline: 'Headline2',
                    testDate: 'Date2',
                    id: 2
                },
                {
                    testHeadline: 'Headline3',
                    testDate: 'Date3',
                    id: 3
                },
                {
                    testHeadline: 'Headline4',
                    testDate: 'Date4',
                    id: 4
                }
            ]
            
        }
        
    }

    getContent(){
        const {navigate} = this.props.navigation;
        navigate('Content');
    };
    addText(){
        const {navigate} = this.props.navigation;
        navigate('AddText');
    };
    addImage(){
        const {navigate} = this.props.navigation;
        navigate('AddImage');
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                {
                    this.state.contents.map((item, index) => (
                            <TouchableOpacity
                                style={styles.listItem}
                                key={item.id}
                                onPress={() => this.getContent()}
                            >
                                <Text style={styles.headline}>{item.testHeadline}</Text>
                                <Text style={styles.date}>{item.testDate}</Text>
                            </TouchableOpacity>

                    ))
                }
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.addText()}
                    >
                        <Text>Lisää Teksti</Text>    
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.btn}
                        onPress={() => this.addImage()}
                    >
                        <Text>Lisää Kuva</Text>
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
        width:'50%',
        paddingVertical: 20,
    }
})