import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'

export default class Loading extends React.Component {
  //Tarkistetaan onko laitteen käyttäjä jo rekisteröitynyt
  //Jos käyttäjä ei ole rekisteröitynyt, navigoidaan rekisteröitymiseen
  //Muutoin navigoidaan kirjautumiseen
    async componentDidMount() {
      const {navigate} = this.props.navigation;
      await AsyncStorage.getItem('Username', (err, result) =>{
        if(result === null){navigate('SignUp');}
        else{navigate('LogIn')}
      });
      
    }
    render() {
      return (
        <View style={styles.container}><Text>Loading</Text><ActivityIndicator color='#e93766' size="large" /></View>
      )
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })