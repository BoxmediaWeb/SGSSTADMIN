import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { verificarMenu, hacerMenu, actuarMenu, planearMenu } from 'app/modules/estandar/estandar';
import { EstandarService } from './estandar.service';

@Component({
  selector: 'app-estandar',
  templateUrl: './estandar.component.html',
  styleUrls: ['./estandar.component.scss']
})
export class EstandarComponent implements OnInit {
  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  menuData=[];
  secciones={planear:planearMenu,verificar:verificarMenu,hacer:hacerMenu,actuar:actuarMenu}
  maestroActual: any;
  seccion: string;
  documentosLength: number;

  constructor(private _estandarService:EstandarService,private _router:Router, private _activatedRoute: ActivatedRoute) { }

  irVistaDocumentos(){
    this._router.navigate([`/sgsst/${this.seccion}/documentos/${this.maestroActual.id}`]);
  }

  ngOnInit(): void {
    this.drawerOpened=true;
    this.drawerMode = 'side';
    this.menuData = planearMenu;

    this._estandarService.getMaestroActual().subscribe(async(maestro)=>{
      this.maestroActual = await maestro;
    });

    this._estandarService.getDocumentosLength().subscribe(async(documentosLength)=>{
      this.documentosLength = documentosLength;
    });

  }

}
