import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
//import { ActuarComponent } from './actuar.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
//import { HacerRoutes } from './actuar.routing';
//import { ContenedorComponent } from './contenedor/contenedor.component';
//import { DocumentoComponent } from './documento/documento.component';
import { HacerComponent } from '../hacer/hacer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { PlanearComponent } from '../planear/planear.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
//import { EditMaestroComponent } from './editMaestro/edit-maestro.component';
//import { InputsComponent } from './inputs/inputs.component';
import { MatInputModule } from '@angular/material/input';
import { ElementoRoutes } from './elemento.routing';
import { GeneralComponent } from './general/general.component';
import { AuxiliarComponent } from './auxiliar/auxiliar.component';
import { ListaComponent } from './lista/lista.component';
import { GenerarMaestroComponent } from './generar-maestro/generar-maestro.component';
import { InputsModalComponent } from './inputs-modal/inputs-modal.component';
import { VerMaestroComponent } from './ver-maestro/ver-maestro.component';
import { VariableConfirmacionComponent } from './variable-confirmacion/variable-confirmacion.component';
import { VistaDocumentoComponent } from './vista-documento/vista-documento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PdfDocumentoComponent } from './pdf-documento/pdf-documento.component';

@NgModule({
    declarations: [
    
    //ContenedorComponent,
    //     DocumentoComponent,
    //     EditMaestroComponent,
    //     InputsComponent
  
    GeneralComponent,
          AuxiliarComponent,
          ListaComponent,
          GenerarMaestroComponent,
          InputsModalComponent,
          VerMaestroComponent,
          VariableConfirmacionComponent,
          VistaDocumentoComponent,
          PdfDocumentoComponent
  ],
    imports     : [
        RouterModule.forChild(ElementoRoutes),
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
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
        MatButtonModule,
        AngularEditorModule,
        MatInputModule,

        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
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
        MatButtonModule,
        AngularEditorModule,
        MatInputModule,
        MatDatepickerModule
    ],
    providers: [
        HacerComponent,
        PlanearComponent
    ],
})
export class ElementoModule
{
}
