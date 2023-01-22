import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
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
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EstandarComponent } from './estandar.component';
import { ListaDetalleDocumentosComponent } from './lista-detalle-documentos/lista-detalle-documentos.component';
import { DetalleDocumentoComponent } from './detalle-documento/detalle-documento.component';
import { FormatoMaestroComponent } from './formato-maestro/formato-maestro.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { AngularEditorModule } from '@kolkov/angular-editor';


const EstandarRoutes: Route[] = [
    {
        path     : '',
        component: EstandarComponent,
        children : [
            {
                path: '', redirectTo: 'planear/E.1.1.1/0'
            },
            {
                path     : ':seccion/detalle-documento/:funcionalidadDetalleDocumento/:idDinamico',
                component: DetalleDocumentoComponent,
            },
            {
                path     : ':seccion/formato-maestro/:funcionalidadMaestro/:idMaestro',
                component: FormatoMaestroComponent,
            },
            {
                path     : ':seccion/:codigoEstandar/:indice',
                component: ListaDetalleDocumentosComponent,
            }
        ]
    }
];

@NgModule({
    declarations: [
  
    ListaDetalleDocumentosComponent,
       DetalleDocumentoComponent,
       FormatoMaestroComponent,
       DocumentosComponent
  ],
    imports     : [
        RouterModule.forChild(EstandarRoutes),
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
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
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
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatStepperModule,
        MatDatepickerModule,
        MatPaginatorModule,
        ImageCropperModule,
        MatExpansionModule,
        MatSlideToggleModule,
        AngularEditorModule
    ]
})
export class EstandarModule
{
}