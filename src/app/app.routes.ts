import { Routes } from '@angular/router';
import { PreguntasComponent} from "./preguntas/preguntas.component";
import { PuntuacionComponent} from "./puntuacion/puntuacion.component";
import { ReglasComponent} from "./reglas/reglas.component";
import { EditarPreguntasComponent} from "./editar-preguntas/editar-preguntas.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'preguntas',
    component: PreguntasComponent,
  },
  {
    path: 'puntuacion',
    component: PuntuacionComponent,
  },
  {
    path: 'reglas',
    component: ReglasComponent,
  },
  {
    path: 'editar-preguntas',
    component: EditarPreguntasComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
