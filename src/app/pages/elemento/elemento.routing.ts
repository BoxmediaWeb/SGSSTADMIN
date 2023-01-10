import { Route } from '@angular/router';
import { ElementoComponent } from './elemento.component';
import { GeneralComponent } from './general/general.component';
import { VistaDocumentoComponent } from './vista-documento/vista-documento.component';
//import { DocumentoComponent } from './documento/documento.component';
//import { ActuarComponent } from './actuar.component';
//import { ContenedorComponent } from './contenedor/contenedor.component';
//import { FormularioEstandarComponent } from '../formulario-estandar/formulario-estandar.component';
//import { EditMaestroComponent } from './editMaestro/edit-maestro.component';

export const ElementoRoutes: Route[] = [
    //{ path: '',   redirectTo: 'estandar/hacer/E.3.1.1', pathMatch: 'full' },
    {
        path     : '',
        component: ElementoComponent,
        children : [
            {path: ':seccion', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)},
            /*{
                path     : 'vista-documento',
                component: VistaDocumentoComponent,
            },*/
        ]
        /*children : [
            { path: '',   redirectTo: 'indice/E.7.1.1', pathMatch: 'full' },
            {
                path     : 'indice/:id',
                component: ContenedorComponent,
            },
            {
                path     : 'indice/:id/documento/:documento',
                component: DocumentoComponent
            },
            {
                path     : 'indice/:id/formulario/formularioestandar',
                component: FormularioEstandarComponent
            },
            {
                path     : 'indice/:id/editmaestro/:idMaestro',
                component: EditMaestroComponent
            },

            /
                path     : 'indice/:id/archivos',
                component: ArchivosComponent
            }
        ]*/
    }
];
