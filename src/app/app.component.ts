import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDQQQ00oi8VjDL8gr_q2Nq0OnmQ98Intkk",
      authDomain: "worldfarmers-1504545112527.firebaseapp.com",
      databaseURL: "https://worldfarmers-1504545112527.firebaseio.com",
      projectId: "worldfarmers-1504545112527",
      storageBucket: "worldfarmers-1504545112527.appspot.com",
      messagingSenderId: "72820962622"
    });
  }
}
