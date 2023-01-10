import { Route } from '@angular/router';
import { GenerarMaestroComponent } from '../generar-maestro/generar-maestro.component';
import { ListaComponent } from '../lista/lista.component';
import { VerMaestroComponent } from '../ver-maestro/ver-maestro.component';
import { VistaDocumentoComponent } from '../vista-documento/vista-documento.component';
import { GeneralComponent } from './general.component';
//import { ElementoComponent } from './elemento.component';
//import { GeneralComponent } from './general/general.component';
//import { DocumentoComponent } from './documento/documento.component';
//import { ActuarComponent } from './actuar.component';
//import { ContenedorComponent } from './contenedor/contenedor.component';
//import { FormularioEstandarComponent } from '../formulario-estandar/formulario-estandar.component';
//import { EditMaestroComponent } from './editMaestro/edit-maestro.component';

export const GeneralRoutes: Route[] = [
    //{ path: '',   redirectTo: 'estandar/hacer/E.3.1.1', pathMatch: 'full' },
    {
        path     : ':id',
        component: GeneralComponent,
        children : [
            {
                path     : 'vista-documento',
                component: VistaDocumentoComponent,
            },
            {
                path     : '',
                component: ListaComponent,
            },
            {
                path     : 'detalle-documento/:idDetalleDocumento',
                component: VerMaestroComponent,
            },
            {
                path     : 'editar-detalle-documento/:idDetalleDocumento',
                component: VerMaestroComponent,
            },
            {
                path     : 'generar-maestro',
                component: GenerarMaestroComponent,
            },
            {
                path     : 'ver-maestro',
                component: VerMaestroComponent,
            },
            {
                path     : 'ver-maestro/:index',
                component: VerMaestroComponent,
            },
            {
                path     : 'vista-documento',
                component: VistaDocumentoComponent,
            }
        ]
    }
];
