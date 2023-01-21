import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { verificarMenu, hacerMenu, actuarMenu, planearMenu } from 'app/modules/estandar/estandar';

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

  

  constructor() { }

  ngOnInit(): void {
    this.drawerOpened=true;
    this.drawerMode = 'side';
    this.menuData = planearMenu;
    console.log("Esto vale planear Menu", planearMenu);
  }

}
