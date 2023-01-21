import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from './shared/shared.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MutacionDetalleDocumentoModalComponent } from './modals/mutacionDetalleDocumentoModal/mutacion-detalle-documento-modal.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DocumentoComponent } from './pages/documento/documento.component';
import { SafePipe } from './pipes/safe.pipe';
import { RutaFormateoPipe } from './pipes/ruta-formateo.pipe';
import { ArchivosComponent } from './pages/archivos/archivos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ImagenPerfilModalComponent } from './modals/imagen-perfil-modal/imagen-perfil-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
//import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventoModalComponent } from './modals/eventoModal/evento-modal.component';
import interactionPlugin from '@fullcalendar/interaction';
import { PesvComponent } from './pages/pesv/pesv.component';
import { SeccionComponent } from './pages/seccion/seccion.component';
import { CommonModule } from '@angular/common';
import { FormularioEstandarComponent } from './pages/formulario-estandar/formulario-estandar.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ElementoComponent } from './pages/elemento/elemento.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EstandarComponent } from './modules/estandar/estandar.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        InicioComponent,
        MutacionDetalleDocumentoModalComponent,
        DocumentoComponent,
        ArchivosComponent,
        SafePipe,
        RutaFormateoPipe,
        UsuariosComponent,
        ImagenPerfilModalComponent,
        CalendarioComponent,
        EventoModalComponent,
        PesvComponent,
        SeccionComponent,
        FormularioEstandarComponent,
        ElementoComponent,
        EstandarComponent,
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatPaginatorModule,
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
        MatMenuModule,
        MatTableModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatStepperModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ImageCropperModule,
        MatSliderModule,
        MatTooltipModule,
        FullCalendarModule,
        AngularEditorModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatSlideToggleModule,
        
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
    ],
    bootstrap   : [
        AppComponent
    ],
    providers:[
        MatDatepickerModule,
        RutaFormateoPipe
    ]
})
export class AppModule
{
}
