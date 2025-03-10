import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class PreguntasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
