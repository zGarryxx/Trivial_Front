import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {PreguntasDTO} from "../Modelos/PreguntasDTO";
import {Preguntas} from "../Modelos/Preguntas";
import {CategoriaDTO} from "../Modelos/CategoriaDTO";
import {PuntuacionDTO} from "../Modelos/PuntuacionDTO";

@Injectable({
  providedIn: 'root'
})
export class TrivialService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createPregunta(categoriaId: number, preguntaDTO: PreguntasDTO): Observable<Preguntas> {
    return this.http.post<Preguntas>(`${this.apiUrl}pregunta/crear/${categoriaId}`, preguntaDTO);
  }

  getAllPreguntas(): Observable<Preguntas[]> {
    return this.http.get<Preguntas[]>(`${this.apiUrl}preguntas`);
  }

  getPreguntaById(id: number): Observable<Preguntas> {
    return this.http.get<Preguntas>(`${this.apiUrl}pregunta/${id}`);
  }

  updatePregunta(id: number, preguntaDetails: PreguntasDTO): Observable<Preguntas> {
    return this.http.put<Preguntas>(`${this.apiUrl}pregunta/actualizar/${id}`, preguntaDetails);
  }

  deletePregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}pregunta/eliminar/${id}`);
  }

  getPreguntaAleatoria(categoria: string): Observable<PreguntasDTO> {
    return this.http.get<PreguntasDTO>(`${this.apiUrl}pregunta/aleatoria/${categoria}`);
  }

  getCategoriaAleatoria(): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${this.apiUrl}categoria/aleatoria`);
  }

  getAllPuntuaciones(): Observable<PuntuacionDTO[]> {
    return this.http.get<PuntuacionDTO[]>(`${this.apiUrl}puntuaciones`);
  }

  guardarNombreUsuario(nombreUsuario: string): Observable<PuntuacionDTO> {
    return this.http.post<PuntuacionDTO>(`${this.apiUrl}usuario/guardar`, { nombreUsuario });
  }

  contestarPregunta(preguntaDTO: PreguntasDTO, respuesta: string, nombreUsuario: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}pregunta/contestar`, { preguntaDTO, respuesta, nombreUsuario });
  }

  getPreguntaIdByEnunciado(enunciado: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}pregunta/id`, { params: { enunciado } });
  }
}
