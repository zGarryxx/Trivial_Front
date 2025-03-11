import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {PreguntasDTO} from "../Modelos/PreguntasDTO";
import {Preguntas} from "../Modelos/Preguntas";
import {CategoriaDTO} from "../Modelos/CategoriaDTO";
import {PuntuacionDTO} from "../Modelos/PuntuacionDTO";
import { NuevaPregunta} from "../Modelos/nuevaPregunta";

@Injectable({
  providedIn: 'root'
})
export class TrivialService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createPregunta(preguntaDTO: NuevaPregunta): Observable<Preguntas> {
    return this.http.post<Preguntas>(`${this.apiUrl}trivial/pregunta/crear`, preguntaDTO);
  }

  getAllPreguntas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.apiUrl}trivial/preguntas`);
  }

  getPreguntaById(id: number): Observable<Preguntas> {
    return this.http.get<Preguntas>(`${this.apiUrl}trivial/pregunta/${id}`);
  }

  updatePregunta(id: number, preguntaDTO: NuevaPregunta): Observable<Preguntas> {
    return this.http.put<Preguntas>(`${this.apiUrl}trivial/pregunta/actualizar/${id}`, preguntaDTO);
  }

  deletePregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}trivial/pregunta/eliminar/${id}`);
  }

  getPreguntaAleatoria(categoria: string): Observable<PreguntasDTO> {
    return this.http.get<PreguntasDTO>(`${this.apiUrl}trivial/pregunta/aleatoria/${categoria}`);
  }

  getCategoriaAleatoria(): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${this.apiUrl}trivial/categoria/aleatoria`);
  }

  getAllPuntuaciones(): Observable<PuntuacionDTO[]> {
    return this.http.get<PuntuacionDTO[]>(`${this.apiUrl}trivial/puntuaciones`);
  }

  guardarNombreUsuario(nombreUsuario: string): Observable<PuntuacionDTO> {
    return this.http.post<PuntuacionDTO>(`${this.apiUrl}trivial/usuario/guardar`, { nombreUsuario });
  }

  contestarPregunta(preguntaDTO: PreguntasDTO, respuesta: string, nombreUsuario: string): Observable<string> {
    const params = new HttpParams()
      .set('respuesta', respuesta)
      .set('nombreUsuario', nombreUsuario);
    return this.http.post(`${this.apiUrl}trivial/pregunta/contestar`, preguntaDTO, { params, responseType: 'text' });
  }

  getPreguntaIdByEnunciado(enunciado: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}trivial/pregunta/id`, { params: { enunciado } });
  }

  getAllCategorias(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${this.apiUrl}trivial/categorias`);
  }
}
