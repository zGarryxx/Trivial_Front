import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { PuntuacionDTO } from '../Modelos/PuntuacionDTO';
import { ToastService } from "../services/toast.service";
import { Router } from "@angular/router";
import { TrivialService } from "../services/trivial.service";
import { CommonModule } from "@angular/common";
import { PreguntasDTO } from '../Modelos/PreguntasDTO';
import { CategoriaDTO } from '../Modelos/CategoriaDTO';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class PreguntasComponent implements OnInit, OnDestroy {
  puntuacion: PuntuacionDTO = new PuntuacionDTO();
  mostrarPreguntas: boolean = false;
  preguntaAleatoria: PreguntasDTO | null = null;
  categoriaAleatoria: CategoriaDTO | null = null;
  selectedSquareIndex: number | null = null;
  respuesta: string = '';
  cuentaatras: number = 45;
  countdownInterval: any;
  respuestaEnSquare12: boolean = false;

  constructor(private toastService: ToastService,
              private router: Router,
              private trivialService: TrivialService) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.cuentaatras = 45;
    this.countdownInterval = setInterval(() => {
      this.cuentaatras--;
      if (this.cuentaatras <= 0) {
        clearInterval(this.countdownInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    this.toastService.presentToast('Tiempo agotado. Pasando a la siguiente pregunta.', 'warning');
    if (this.selectedSquareIndex !== null && this.selectedSquareIndex < 11) {
      this.selectedSquareIndex += 1;
      this.obtenerPreguntaYCategoriaAleatoria(this.selectedSquareIndex);
    } else {
      this.selectedSquareIndex = 11;
    }
  }

  guardarNombreUsuario() {
    if (this.puntuacion.nombreUsuario) {
      this.trivialService.guardarNombreUsuario(this.puntuacion.nombreUsuario).subscribe(
        (response) => {
          this.toastService.presentToast('Nombre de usuario guardado exitosamente', 'success');
          this.mostrarPreguntas = true;
          this.obtenerPreguntaYCategoriaAleatoria(0);
        },
        (error) => {
          this.toastService.presentToast('Este nombre de usuario ya esta en uso', 'warning');
        }
      );
    } else {
      this.toastService.presentToast('El nombre de usuario no puede estar vacío', 'warning');
    }
  }

  obtenerPreguntaYCategoriaAleatoria(index: number) {
    this.selectedSquareIndex = index;
    this.startCountdown();
    this.trivialService.getCategoriaAleatoria().subscribe(
      (categoria) => {
        this.categoriaAleatoria = categoria;
        if (categoria.nombre) {
          this.trivialService.getPreguntaAleatoria(categoria.nombre).subscribe(
            (pregunta) => {
              this.preguntaAleatoria = pregunta;
            },
            (error) => {
              this.toastService.presentToast('Error al obtener la pregunta aleatoria', 'error');
            }
          );
        } else {
          this.toastService.presentToast('La categoría no tiene nombre', 'error');
        }
      },
      (error) => {
        this.toastService.presentToast('Error al obtener la categoría aleatoria', 'error');
      }
    );
  }

  contestarPregunta() {
    if (this.preguntaAleatoria && this.respuesta && this.puntuacion.nombreUsuario) {
      console.log('Enviando respuesta:', this.respuesta);
      this.trivialService.contestarPregunta(this.preguntaAleatoria, this.respuesta, this.puntuacion.nombreUsuario).subscribe(
        (response) => {
          console.log('', response);
          if (response === 'correcta') {
            console.log('¡Respuesta correcta! Has ganado 10 puntos.');
          } else if (response === 'incorrecta') {
            console.log('Respuesta incorrecta. Inténtalo de nuevo.');
          } else {
            console.log('Respuesta enviada correctamente.');
          }
          // Pasar al siguiente cuadrado solo si no es el último cuadrado
          if (this.selectedSquareIndex !== null && this.selectedSquareIndex < 11) {
            this.selectedSquareIndex += 1;
            this.obtenerPreguntaYCategoriaAleatoria(this.selectedSquareIndex);
          } else {
            this.selectedSquareIndex = 11;
          }
          this.respuesta = '';
          clearInterval(this.countdownInterval);
        },
        (error) => {
          console.error('Error sending answer:', error);
          if (error.status === 200) {
            console.log('Received 200 OK but there was an error in the response.');
          } else {
            console.error('Error al enviar la respuesta');
          }
        }
      );
    } else {
      this.toastService.presentToast('El campo de respuesta no puede estar vacío', 'warning');
      console.warn('Debes ingresar una respuesta');
    }
  }

  verPuntuacion() {
    this.router.navigate(['/puntuacion']);
  }
}
