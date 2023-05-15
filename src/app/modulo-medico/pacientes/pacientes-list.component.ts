import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesService } from './pascientes-list.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css'],
})
export class PacienteListComponent implements OnInit {
  displayedColumns: string[] = ['dni', 'apellidoPaterno', 'apellidoMaterno','fechaNacimiento', 'sexo', 'telefono', 'correo', 'fechaIngreso' , 'editar'];
  data: any[] = [];
  isLoadingResults = true;
  dataSource = new MatTableDataSource<any>(this.data);
  mensaje: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  formFilter: FormGroup = new FormGroup({});
  formPaciente: FormGroup = new FormGroup({});
  showForm: boolean = false;

  constructor(
    private api: PacientesService,
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

    this.formPaciente = this.formBuilder.group({
      id: [''],
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      edad: ['', Validators.required],
    });

    this.listarCompras();
  }

  listarCompras() {
    /* this.dataSource.data = [
      {
        id: 1,
        documento: '123456789',
        nombres: 'Juan Perez',
        edad: 25,
      },
      {
        id: 2,
        documento: '987654321',
        nombres: 'Maria Perez',
        edad: 25,
      },
    ]; */
    /* AQUI VA EL LLAMADO AL SERVICIO */
    this.api.obtenerpacientes().subscribe({
      next: (res: any[]) => {
        debugger;
        this.data = res;
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        console.log(e);
        if (String(e).split(' ')[1] == '404') {
          this.isLoadingResults = false;
          this.data = [];
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  // buscar() {
  //   const { filtro } = this.formFilter.value;
  //   this.dataSource.filter = (filtro || '').trim().toLowerCase();
  // }

  limpiar() {
    this.formFilter.setValue({
      filtro: '',
    });
  }

  agregar() {
    this.formPaciente.reset();
    this.showForm = true;
  }

  editar(row: any) {
    this.formPaciente.setValue({
      id: row.id,
      documento: row.documento,
      nombres: row.nombres,
      edad: row.edad,
    });
    this.showForm = true;
  }

  cancelar() {
    this.showForm = false;
    this.formPaciente.reset();
  }

  guardar() {
    if(this.formPaciente.invalid) return
    const form = this.formPaciente.value;
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
    this.formPaciente.reset();
  }

  eliminar(row: any) {
    /* AQUI VA EL LLAMADO AL SERVICIO */
    this.dataSource.data = this.dataSource.data.filter(
      (item: any) => item.id != row.id
    );
    this.dataSource.data = [...this.dataSource.data];
  }
}
