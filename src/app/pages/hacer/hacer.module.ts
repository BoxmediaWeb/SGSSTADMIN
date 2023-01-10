import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { HacerRoutes } from './hacer.routing';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { PlanearComponent } from '../planear/planear.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { DocumentoComponent } from './documento/documento.component';

@NgModule({
    declarations: [
    ContenedorComponent,
    ArchivosComponent,
    DocumentoComponent
  ],
    imports     : [
        RouterModule.forChild(HacerRoutes),
        MatTableModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        FuseAlertModule,
        FuseCardModule,
        FuseDrawerModule,
        FuseHighlightModule,
        FuseLoadingBarModule,
        FuseMasonryModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        SharedModule,
        MatMenuModule,
        MatTabsModule,
        MatButtonModule
    ],
    providers: [
      PlanearComponent,
    ],
    

})
export class HacerModule
{
}