import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Compra } from '../core/models/compra';
import { CompraService } from './compra.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.css'],
})
export class CompraListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'numeroDocumento',
    'razonSocial',
    'total',
    'editar',
  ];
  data: Compra[] = [];
  isLoadingResults = true;
  dataSource: any;
  mensaje: string = '';
  casesForm: FormGroup = new FormGroup({});
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private api: CompraService,
    public dialogo: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listarCompras('', '');
    this.casesForm = this.formBuilder.group({
      numeroDocumento: [''],
      razonSocial: [''],
    });
  }

  listarCompras(numeroDocumento: string, razonSocial: string) {
    this.api.ListCompras(numeroDocumento, razonSocial).subscribe({
      next: (res: Compra[]) => {
        this.data = res;
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource<Compra>(this.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {
        console.log(e);
        if (String(e).split(' ')[1] == '404') {
          this.isLoadingResults = false;
          this.data = [];
          this.dataSource = new MatTableDataSource<Compra>(this.data);
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  buscar() {
    this.listarCompras(
      this.casesForm.value.numeroDocumento,
      this.casesForm.value.razonSocial
    );
  }

  limpiar() {
    this.casesForm.setValue({
      numeroDocumento: '',
      razonSocial: '',
    });
  }
}
