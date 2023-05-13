import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesService } from './pascientes-list.service';

@Component({
  selector: 'pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css'],
})
export class PacienteListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'documento', 'nombres', 'edad', 'editar'];
  data: any[] = [];
  isLoadingResults = true;
  dataSource = new MatTableDataSource<any>(this.data);
  mensaje: string = '';
  form: FormGroup = new FormGroup({});
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private api: PacientesService,
    public dialogo: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listarCompras();
    this.form = this.formBuilder.group({
      documento: [''],
      nombre: [''],
    });
  }

  listarCompras() {
    // this.api.obtenerpacientes().subscribe({
    //   next: (res: any[]) => {
    //     this.data = res;
    //     this.isLoadingResults = false;
    //     this.dataSource = new MatTableDataSource<any>(this.data);
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error: (e) => {
    //     console.log(e);
    //     if (String(e).split(' ')[1] == '404') {
    //       this.isLoadingResults = false;
    //       this.data = [];
    //       this.dataSource = new MatTableDataSource<any>(this.data);
    //       this.dataSource.paginator = this.paginator;
    //     }
    //   },
    // });
  }

  buscar() {
    const { documento, nombre } = this.form.value;
    console.log(documento, nombre);
    this.dataSource.filter = `${documento} ${nombre}`.trim().toLowerCase();
  }

  limpiar() {
    this.form.setValue({
      numeroDocumento: '',
      razonSocial: '',
    });
  }
}
