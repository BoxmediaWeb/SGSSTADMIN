import { Route } from '@angular/router';
import { ArchivosComponent } from '../archivos/archivos.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { DocumentoComponent } from './documento/documento.component';
import { HacerComponent } from './hacer.component';

export const HacerRoutes: Route[] = [
    {
        path     : '',
        component: HacerComponent,
        children : [
            { path: '',   redirectTo: 'indice/E.3.1.1', pathMatch: 'full' },
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
