import { Route } from '@angular/router';
import { ArchivosComponent } from '../archivos/archivos.component';
import { DocumentoComponent } from '../documento/documento.component';
import { SeccionComponent } from './seccion.component';

export const PlanearRoutes: Route[] = [
    {
        path     : '',
        component: SeccionComponent,
        children : [
            { path: '',   redirectTo: 'indice/E.1.1.1', pathMatch: 'full' }
            ,
            {
                path     : 'indice/:id/documento/:documento',
                component: DocumentoComponent
            },
            {
                path     : 'indice/:id/archivos',
                component: ArchivosComponent
            }
        ]
    }
];
