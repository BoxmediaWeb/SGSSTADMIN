import { Route } from '@angular/router';
import { ArchivosComponent } from '../archivos/archivos.component';
import { DocumentoComponent } from './documento/documento.component';
import { Contenedor3Component } from '../estandar1/contenedor3/contenedor3.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { VerificarComponent } from './verificar.component';

export const VerificarRoutes: Route[] = [
    {
        path     : '',
        component: VerificarComponent,
        children : [
            { path: '',   redirectTo: 'indice/E.6.1.1', pathMatch: 'full' },
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
