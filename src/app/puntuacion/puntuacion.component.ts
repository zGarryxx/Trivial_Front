import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { TrivialService } from '../services/trivial.service';
import { PuntuacionDTO } from '../Modelos/PuntuacionDTO';
import {CommonModule} from "@angular/common";
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [DatePipe]
})
export class PuntuacionComponent implements OnInit {

  puntuaciones: PuntuacionDTO[] = [];

  constructor(private trivialService: TrivialService,
              private router: Router) { }

  ngOnInit() {
    this.trivialService.getAllPuntuaciones().subscribe((data: PuntuacionDTO[]) => {
      this.puntuaciones = data;
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
