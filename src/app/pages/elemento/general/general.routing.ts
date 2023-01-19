import { Route } from '@angular/router';
import { GenerarMaestroComponent } from '../generar-maestro/generar-maestro.component';
import { ListaComponent } from '../lista/lista.component';
import { PdfDocumentoComponent } from '../pdf-documento/pdf-documento.component';
import { VerMaestroComponent } from '../ver-maestro/ver-maestro.component';
import { VistaDocumentoComponent } from '../vista-documento/vista-documento.component';
import { GeneralComponent } from './general.component';

export const GeneralRoutes: Route[] = [
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
                path     : 'pdf-documento/:idDetalleDocumento',
                component: PdfDocumentoComponent,
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
