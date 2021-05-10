import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  getCurrentUser(){
    return new Promise<any>((resolve) => {
      this.afAuth.currentUser.then(res =>{
        resolve({
          "email": res.email,
          "userID": res.uid,
          "verified": res.emailVerified
        })
    });
  })
  }

  doEmailLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res =>{
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
}
