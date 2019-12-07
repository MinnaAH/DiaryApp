import React, {Component} from 'react';
import firebase from './Firebase';

export class GetData extends Component{

    //Haetaan käyttäjän merkinnät Firebase tietokannasta
    //Collection: User-KÄYTTÄJÄTUNNUS
    //Jos collection on tyhjä, palautetaan null
    //muutoin palautetaan collectionin sisältö
    getText = async (user) => {
        
       return firebase
        .firestore()
        .collection('User-'+user)
        .orderBy('date', 'desc')
        .get()
        .then(snapshot => {
            console.log('snapshot: ' + snapshot)
            if (snapshot.empty) {
              return null;
            }  
            return snapshot.docs.map(doc => doc.data());
            
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }

    getContent = async(date, user) =>{
        return firebase
        .firestore()
        .collection('User-'+user)
        .where('date', "==", date)
        .get()
        .then(snapshot => {
            console.log('snapshot: ' + snapshot)
            if (snapshot.empty) {
              return null;
            }  
            return snapshot.docs.map(doc => doc.data());
            
          })
        .catch(error => {
            console.log('Error getting documents: ', error)
        })
    }
}
