import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  private currentUser = new BehaviorSubject<any>(null);

  private auth = getAuth(this.afApp);
  
  constructor(private afApp: FirebaseApp) { 
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn.next(true);
        this.currentUser.next(user);
      } else {
        // not logged in
        this.loggedIn.next(false);
        this.currentUser.next(null);
      } 
    });
  }

  getCurrentUID(){
    return localStorage.getItem("currentUID"); 
  }

  getCurrentUIDFromService(){


    return new Promise<any>((resolve) => {
      localStorage.setItem("currentUID", this.auth.currentUser.uid);
      resolve(this.auth.currentUser.uid)
       
    });
    
  }
  getCurrentUserToken(){
    return localStorage.getItem("currentUserToken"); 
  }

  getCurrentUserInfo(){
    return this.currentUser.asObservable();
  }
  getCurrentUserTest(){
    return this.auth.currentUser;
  }
  isUserAuthenicated(){
    this.loggedIn$.subscribe(res => {
      return res;
    })
  }
  updateUserToken(){
    return new Promise<any>((resolve) => {
      if(this.auth.currentUser != null){
        this.auth.currentUser.getIdToken(true).then(res => {
          if(res){
            localStorage.setItem("currentUserToken", res);
            resolve({"updated": true, "token": res});
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
      if(this.auth.currentUser){
        resolve({
                  "email": this.auth.currentUser.email,
                  "userID": this.auth.currentUser.uid,
                  "verified": this.auth.currentUser.emailVerified,
                  "jwt": this.getCurrentUserToken()
                })
      }else{
        resolve(null);
      }
  })
  }

  

  doEmailLogin(value){
    return new Promise<any>((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, value.email, value.password)
        .then(res =>{
          res.user.getIdToken().then(tok => {
            localStorage.setItem("currentUserToken", tok);
          })
          resolve(res);
        }, error => reject(error))
    })
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      signInWithPopup(this.auth, provider)
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
      createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogOut(){
    return new Promise<any>((resolve, reject) => {
      signOut(this.auth)
      .then(res => {
        localStorage.removeItem("currentUserToken");
        resolve(res);
      }, err => reject(err))
    })
  }
}
