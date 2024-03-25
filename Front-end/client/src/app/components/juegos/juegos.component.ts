import { Component, OnInit, ViewChild } from '@angular/core';
import { IJuego } from '../../interfaces/juego';
import { JuegosService } from '../../services/juegos.service';
import { MaterialModule } from '../../modules/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css',
})
export class JuegosComponent implements OnInit {
  public juegos: IJuego[] = [];
  public dataSource!: MatTableDataSource<IJuego>;
  public columns = [
    {
      columnDef: 'appid',
      header: '#',
      cell: (juego: IJuego) => `${juego.appid}`,
    },
    {
      columnDef: 'image',
      header: 'Portada',
      cell: (juego: IJuego) =>
        `https://cdn.akamai.steamstatic.com/steam/apps/${juego.appid}/capsule_184x69.jpg`,
      name: (juego: IJuego) => `${juego.name}`,
    },
    {
      columnDef: 'name',
      header: 'Juego',
      cell: (juego: IJuego) => `${juego.name}`,
    },
    {
      columnDef: 'price',
      header: 'Precio',
      cell: (juego: IJuego) => `${juego.price}`,
    },
  ];
  public displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private juegosService: JuegosService, private router: Router) {}

  ngOnInit(): void {
    this.getJuegos();
  }

  getJuegos(): void {
    this.juegosService.getJuegos().subscribe({
      next: (data) => {
        this.juegos = Object.values(data);
        this.dataSource = new MatTableDataSource(this.juegos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error(error),
    });
  }

  filtrar(event: Event): void {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalles(appid: number) {
    this.router.navigate(['/juegos', appid]);
  }
}
