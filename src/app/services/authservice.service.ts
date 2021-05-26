import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) { 
  }

  getCurrentUID(){
    return localStorage.getItem("currentUID"); 
  }
  getCurrentUserToken(){
    return localStorage.getItem("currentUserToken"); 
  }
  isUserAuthenicated(){
    return new Promise<any>((resolve) => {
      this.afAuth.authState.subscribe(res =>{
        if(res && res.isAnonymous == false){
          resolve({
            "isUserLoggedIn": true,
          })
        }else{
          resolve({
            "isUserLoggedIn": false,
          })
        }
        
    });
  })
  }
  updateUserToken(){
    return new Promise<any>((resolve) => {
      if(firebase.default.auth().currentUser != null){
        firebase.default.auth().currentUser.getIdToken(true).then(res => {
          if(res){
            localStorage.setItem("currentUserToken", res);
            resolve({"updated": true});
          }else{
            resolve({"updated": false});
          }
        })
      }else{
        resolve({"updated": false});
      }
  })
    
  }
  getCurrentUser(){
    return new Promise<any>((resolve) => {
      this.afAuth.currentUser.then(res =>{
        if(res){
          resolve({
            "email": res.email,
            "userID": res.uid,
            "verified": res.emailVerified,
            "jwt": res.getIdToken()
          })
        }else{
          resolve(null);
        }
        
    });
  })
  }

  doEmailLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res =>{
          localStorage.setItem("currentUserToken", res.user.uid);
          resolve(res);
        }, error => reject(error))
    })
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        res.user.getIdToken().then(tok => {
          localStorage.setItem("currentUserToken", tok);
        })
        
        resolve(res);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogOut(){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signOut()
      .then(res => {
        localStorage.removeItem("currentUserToken");
        resolve(res);
      }, err => reject(err))
    })
  }
}
