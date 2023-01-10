import { Component, OnInit, ViewChild } from '@angular/core';
import { verificarMenu, planearMenu, hacerMenu, actuarMenu } from './menu-data';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ApiService } from 'app/core/api/api.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})
export class ElementoComponent implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over';
  drawerOpened: boolean;
  menuData: any[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  selectedPanel;
  seccionActual:any;
  variables_encontradas = 0;
  nombres_variables = [];
  cargar_variables = false;

  constructor(private _fuseMediaWatcherService: FuseMediaWatcherService, private _apiService: ApiService,private _route: ActivatedRoute,private route: ActivatedRoute, private _generalService:GeneralService, private router: Router) { }

  ngOnInit(): void {

    this._generalService.getSeccion().subscribe((data)=>{
      this.seccionActual = data;
    });


    this._route.firstChild.paramMap.subscribe((params) => {

      this._generalService.setSeccion(params.get('seccion'));

      switch(params.get('seccion')){

        case 'planear': {
          this.menuData = planearMenu;
          this.router.navigate([`/estandar/planear/E.1.1.1`]);
          break; 
        }

        case 'hacer': {
          this.menuData = hacerMenu;
          this.router.navigate([`/estandar/hacer/E.3.1.1`]);
          break; 
        }

        case 'verificar': {
          this.menuData = verificarMenu;
          this.router.navigate([`/estandar/verificar/E.7.1.1`]);
          break; 
        }

        case 'actuar': {
          this.menuData = actuarMenu;
          this.router.navigate([`/estandar/actuar/E.7.1.1`]);
          break; 
        }

        default: {  
           break; 
        }
      }
  });


        this._fuseMediaWatcherService.onMediaChange$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(({matchingAliases}) => {
    
        if ( matchingAliases.includes('md') )
        {
          this.drawerMode = 'side';
          this.drawerOpened = true;
        }
        else
        {
          this.drawerMode = 'over';
          this.drawerOpened = false;
        }
        });
    
  }
}
