import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Game{
  id?:string;
  homeScore:number;
  awayScore:number;
  homeTeam:number;
  awayTeam:number;
  rounds:Number;
  date:string;
}

export interface League{
  id?:string;
  leagueName:string;
}

export interface Team{
  id?:string;
  teamName:string;
}

export interface Player{
  id?: string;
  first_name: string;
  last_name: string;
  team:string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  //Get leagues
  getLeagues(): Observable<League[]>{
    const notesRef = collection(this.firestore, 'leagues');
    return collectionData(notesRef,{idField: 'id'}) as Observable<League[]>;
  }

  //Get teams
  getTeams(): Observable<Team[]>{
    const notesRef = collection(this.firestore, 'teams');
    return collectionData(notesRef,{idField: 'id'}) as Observable<Team[]>;
  }

  //Get players
  getPlayers(): Observable<Player[]>{
    const notesRef = collection(this.firestore, 'player');
    return collectionData(notesRef,{idField: 'id'}) as Observable<Player[]>;
  }


  //Add a game
  addGame(game:Game){
    const notesRef = collection(this.firestore, 'games');
    return addDoc(notesRef, game);
  }
}
