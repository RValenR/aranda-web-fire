import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(Auth)
  firestore = inject(Firestore)
  router = inject(Router)
  showInfo = true;
  pageStyle= 'full-screen';

  constructor() { }

  getAuth(){
    return getAuth();
  }

  signIn(user: any){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user:any){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  logOut(){
    return signOut(getAuth())
  }
  
}
