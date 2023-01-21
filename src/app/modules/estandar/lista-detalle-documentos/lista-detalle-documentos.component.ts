import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-detalle-documentos',
  templateUrl: './lista-detalle-documentos.component.html',
  styleUrls: ['./lista-detalle-documentos.component.scss']
})
export class ListaDetalleDocumentosComponent implements OnInit {
  dataListaDocumentos=[];
  displayedColumns: string[];

  tabChanged($event){
  }

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['vigencia','usuario','comentario','fecha','version','estado','acciones'];
  }

}
