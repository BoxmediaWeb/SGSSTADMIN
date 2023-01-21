import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
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

  

  constructor(private _estandarService:EstandarService) { }

  ngOnInit(): void {
    this.drawerOpened=true;
    this.drawerMode = 'side';
    this.menuData = planearMenu;

    this._estandarService.getMaestroActual().subscribe((maestro)=>{
      this.maestroActual = maestro;
      console.log("Este es el valor del maestro");
    });

  }

}
