import { Route } from '@angular/router';
import { DocumentoComponent } from './documento/documento.component';
import { ActuarComponent } from './actuar.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { FormularioEstandarComponent } from '../formulario-estandar/formulario-estandar.component';
import { EditMaestroComponent } from './editMaestro/edit-maestro.component';

export const HacerRoutes: Route[] = [
    {
        path     : '',
        component: ActuarComponent,
        children : [
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

            /*{
                path     : 'indice/:id/archivos',
                component: ArchivosComponent
            }*/
        ]
    }
];
