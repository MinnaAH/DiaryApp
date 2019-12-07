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

    getTextContent = async(date, user) =>{
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

    getPicture = async(user)=>{
        var image= [];
        var storageRef = firebase.storage().ref();
                
        return storageRef
        .child('images-'+user)
        .listAll()
        .then((result) => {
            if(result.empty){
                return null;
            }
            result.items.forEach((imageRef) => {
                image.push(imageRef.name)   
            })  
            console.log('image: '+image)
            return this.getPictureUri(user, image)         
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getPictureUri = async(user, image) => {
        console.log('content: '+image)
        console.log('image length: '+image.length)
        var uri = []
        var i=0
        var storageRef = firebase.storage().ref();

        for(i; i<image.length; i++){
            await storageRef
                .child('images-'+user+'/'+image[i])
                .getDownloadURL()
                .then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = function(event) {
                        var blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();
                    console.log('url: '+ url)
                    uri.push(url)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        if(i>=image.length){return uri}
            
    }
}
