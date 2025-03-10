import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-editar-preguntas',
  templateUrl: './editar-preguntas.component.html',
  styleUrls: ['./editar-preguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule]
})
export class EditarPreguntasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
