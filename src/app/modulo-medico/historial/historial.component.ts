import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
// import { historialService } from './pascientes-list.service';

const nn = (n: number) => (n < 10 ? '0' + n : n);
export interface Historial {
  id: number | string;
  fecha: string;
  area: string;
  medico: string;
  descripcion: string;
  hospital: string;
}

@Component({
  selector: 'historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  displayedColumns: string[] = [
    'fecha',
    'area',
    'medico',
    'descripcion',
    'hospital',
    'editar',
  ];
  data: Historial[] = [];
  isLoadingResults = true;
  dataSource = new MatTableDataSource<Historial>(this.data);
  mensaje: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  formFilter: FormGroup = new FormGroup({});
  formHistorial: FormGroup = new FormGroup({});
  showForm: boolean = false;

  pacienteData = {
    id: '',
    documento: '',
    nombre: '',
  };

  constructor(
    // private api: historialService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogo: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.formFilter = this.formBuilder.group({
      filtro: [''],
    });

    this.formFilter.valueChanges.subscribe((value) => {
      this.dataSource.filter = (value.filtro || '').trim().toLowerCase();
    });

    this.formHistorial = this.formBuilder.group({
      id: [''],
      fecha: ['', Validators.required],
      area: ['', Validators.required],
      medico: ['', Validators.required],
      descripcion: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.pacienteData = params as any;
      this.listar();
    });
  }

  listar() {
    this.dataSource.data = [
      {
        id: 1,
        fecha: '04/05/2023',
        area: 'Medicina General',
        medico: 'Dr. Juan Perez',
        descripcion: 'Dolor de cabeza',
        hospital: 'Hospital San Juan de Dios',
      },
    ];
    /* AQUI VA EL LLAMADO AL SERVICIO */
    // this.api.obtenerhistorial().subscribe({
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

  limpiar() {
    this.formFilter.setValue({
      filtro: '',
    });
  }

  agregar() {
    this.formHistorial.reset();
    this.formHistorial.controls['fecha'].setValue(new Date());
    this.showForm = true;
  }

  editar(row: any) {
    const v = { ...row };
    v.fecha = this.parseString2Date(v.fecha);
    this.formHistorial.setValue({
      ...v,
    });
    this.showForm = true;
  }

  cancelar() {
    this.showForm = false;
    this.formHistorial.reset();
  }

  guardar() {
    if (this.formHistorial.invalid) return;
    const form = this.formHistorial.value;
    form.fecha = this.parseDate(form.fecha);
    /* AQUI VA EL LLAMADO AL SERVICIO */
    if (form.id) {
      this.dataSource.data = this.dataSource.data.map((item: any) => {
        if (item.id == form.id) {
          item = form;
        }
        return item;
      });
    } else {
      form.id = uuid();
      this.dataSource.data.push(form);
    }
    this.dataSource.data = [...this.dataSource.data];
    this.showForm = false;
    this.formHistorial.reset();
  }

  eliminar(row: any) {
    /* AQUI VA EL LLAMADO AL SERVICIO */
    this.dataSource.data = this.dataSource.data.filter(
      (item: any) => item.id != row.id
    );
    this.dataSource.data = [...this.dataSource.data];
  }

  parseDate(date: Date) {
    return `${nn(date.getDate())}/${nn(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  parseString2Date(date: string) {
    const [d, m, y] = date.split('/').map((n) => parseInt(n));
    return new Date(y, m - 1, d);
  }
}
