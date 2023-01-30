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

    this._estandarService.getSeccion().subscribe(async(seccion)=>{
      this.seccion = await seccion;

      switch(seccion){
        case 'planear':
          this.menuData = planearMenu;
          break;
        
        case 'hacer':
          this.menuData = hacerMenu;
          break;

        case 'verificar':
          this.menuData = verificarMenu;
          break;
        
        case 'actuar':
          this.menuData = actuarMenu;
          break;
      }

    });

    this._estandarService.getMaestroActual().subscribe(async(maestro)=>{
      this.maestroActual = await maestro;
    });

    this._estandarService.getDocumentosLength().subscribe(async(documentosLength)=>{
      this.documentosLength = await documentosLength;
    });

    this._activatedRoute.firstChild.paramMap.subscribe((params) => {
      this._estandarService.setSeccion(params.get('seccion'));
    });
    
  }

}
