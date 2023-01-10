import { Route } from '@angular/router';
import { ArchivosComponent } from './archivos/archivos.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { DocumentoComponent } from './documento/documento.component';
import { PlanearComponent } from './planear.component';


export const PlanearRoutes: Route[] = [
    {
        path     : '',
        component: PlanearComponent,
        children : [
            { path: '',   redirectTo: 'indice/E.1.1.1', pathMatch: 'full' }
            ,
            {
                path     : 'indice/:id',
                component: ContenedorComponent,
            },
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