import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {CategoriaDTO} from "../Modelos/CategoriaDTO";
import {TrivialService} from "../services/trivial.service";
import {CommonModule} from "@angular/common";
import {Preguntas} from "../Modelos/Preguntas";
import {NuevaPregunta} from "../Modelos/nuevaPregunta";

@Component({
  selector: 'app-editar-preguntas',
  templateUrl: './editar-preguntas.component.html',
  styleUrls: ['./editar-preguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class EditarPreguntasComponent  implements OnInit {

  preguntas: Preguntas[] = [];
  categorias: CategoriaDTO[] = [];
  filteredPreguntas: Preguntas[] = [];
  nuevaPregunta: NuevaPregunta = {
    enunciado: '',
    categoriaId: 0,
    respuestaCorrecta: '',
  };

  constructor(private trivialService: TrivialService) { }

  ngOnInit() {
    this.cargarCategorias()
    this.cargarPreguntas()
  }

  crearPregunta(pregunta: NuevaPregunta) {
    this.trivialService.createPregunta(pregunta).subscribe({
      next: (nuevaPregunta: any) => {
        this.preguntas.push(nuevaPregunta);
        this.cargarPreguntas();
        console.log('Pregunta creada con éxito');
      },
      error: (err) => {
        console.error('Error al crear la pregunta:', err);
      }
    });
  }

  onSubmit(form: NgForm) {
    const pregunta: NuevaPregunta = {
      enunciado: form.value.pregunta,
      categoriaId: form.value.categoria,
      respuestaCorrecta: form.value.respuesta,
    };
    this.crearPregunta(pregunta);
  }

  cargarCategorias() {
    this.trivialService.getAllCategorias().subscribe((data: CategoriaDTO[]) => {
      this.categorias = data;
    });
  }

  cargarPreguntas() {
    this.trivialService.getAllPreguntas().subscribe((data: Preguntas[]) => {
      this.preguntas = data;
    });
  }

  eliminarPregunta(id: number) {
    this.trivialService.deletePregunta(id).subscribe(() => {
      this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
      this.cargarPreguntas()
    });
  }

  filtrarPorId(id: number) {
    if (id) {
      this.trivialService.getPreguntaById(id).subscribe((pregunta: Preguntas) => {
        this.filteredPreguntas = [pregunta];
      });
    } else {
      this.filteredPreguntas = this.preguntas;
    }
  }
}
