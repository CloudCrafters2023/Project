import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  leagues:any;
  teams:any;
  players:any;

  formData!: FormGroup;

  constructor(private alertController: AlertController, private dataService:DataService) {

    this.dataService.getLeagues().subscribe(res =>{
      this.leagues = res;
    });

    this.dataService.getTeams().subscribe(res =>{
      this.teams = res;
    });

    this.dataService.getPlayers().subscribe(res =>{
      this.players = res;
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      league: new FormControl('', Validators.required),
      team1: new FormControl('', Validators.required),
      team2: new FormControl('', Validators.required),
      rounds: new FormControl('', Validators.required),
      score1: new FormControl('', Validators.required),
      score2: new FormControl('', Validators.required)
    }); 
  }

  async popupAlert(h:string, sh:string, m:string, b:string) {
    const alert = await this.alertController.create({
      header: h,
      subHeader: sh,
      message: m,
      buttons: [b],
    });
    
    await alert.present();

  }

  onSubmit(){

    let league = this.formData.value['league']
    let team1 = this.formData.value['team1']
    let team2 = this.formData.value['team2']
    let rounds = this.formData.value['rounds']
    let score1 = this.formData.value['score1']
    let score2 = this.formData.value['score2']

    let message = `Teams ${team1} and ${team2} from ${league} scored ${score1} - ${score2} in a ${rounds} end bonspiel`

    //teams 

    
    this.dataService.addGame({
      homeScore:score1,
      awayScore:score2,
      homeTeam:team1,
      awayTeam:team2,
      rounds:rounds,
      date:"10/10/02"})

    this.popupAlert("Score Submission", "success", message, "OK");
    }

}
