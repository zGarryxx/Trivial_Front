import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import { PuntuacionDTO } from '../Modelos/PuntuacionDTO';
import {ToastService} from "../services/toast.service";
import {Router} from "@angular/router";
import {TrivialService} from "../services/trivial.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class PreguntasComponent  implements OnInit {

  puntuacion: PuntuacionDTO = new PuntuacionDTO();
  mostrarPreguntas: boolean = false;

  constructor(private toastService: ToastService,
              private router: Router,
              private trivialService: TrivialService) { }

  ngOnInit() {}

  // Méthod para guardar el nombre de usuario
  guardarNombreUsuario() {
    if (this.puntuacion.nombreUsuario) {
      this.trivialService.guardarNombreUsuario(this.puntuacion.nombreUsuario).subscribe(
        (response) => {
          this.toastService.presentToast('Nombre de usuario guardado exitosamente', 'success');
          this.mostrarPreguntas = true;
        },
        (error) => {
          this.toastService.presentToast('Error al guardar el nombre de usuario', 'error');
        }
      );
    } else {
      this.toastService.presentToast('El nombre de usuario no puede estar vacío', 'warning');
    }
  }
}
