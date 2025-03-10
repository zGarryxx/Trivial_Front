import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { RouterLink} from "@angular/router";

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],

})
export class ReglasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
