import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { IJuego, IJuegoResults } from '../../../interfaces/juego';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-juegos',
  templateUrl: './tabla-juegos.component.html',
  styleUrl: './tabla-juegos.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class TablaJuegosComponent implements OnInit, AfterViewInit {
  public dataSource!: MatTableDataSource<IJuego>;
  public columns = [
    {
      columnDef: 'appid',
      header: '#',
      cell: (juego: IJuego) => `${juego.appid}`,
    },
    {
      columnDef: 'capsule',
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
      cell: (juego: IJuego) => `${Number(juego.price) / 100} €`,
    },
  ];
  public displayedColumns: string[] = this.columns.map((c) => c.columnDef);

  @Input() juegos!: IJuegoResults;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() juegosList!: IJuego[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.juegos) {
      this.dataSource = new MatTableDataSource(this.juegosList);
    } else {
      this.dataSource = new MatTableDataSource(Object.values(this.juegos));
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detallesJuego(appid: number) {
    this.router.navigate(['/lista-juegos/detalles-juego', appid]);
  }
}
