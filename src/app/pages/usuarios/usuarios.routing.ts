import { Route } from '@angular/router';
import { ArchivosComponent } from '../archivos/archivos.component';
import { DocumentoComponent } from '../documento/documento.component';
import { ContenedorComponent } from '../estandar1/contenedor/contenedor.component';
import { CrearComponent } from './crear/crear.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PermisosComponent } from './permisos/permisos.component';
import { RolComponent } from './rol/rol.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios.component';

export const UsuariosRoutes: Route[] = [
    {
        path     : '',
        component: UsuariosComponent,
        children : [
            {
                path: '',   redirectTo: 'detalle', pathMatch: 'full'
            }
            ,
            {
                path     : 'detalle',
                component: DetalleComponent,
            },
            {
                path     : 'roles',
                component: RolesComponent
            },
            {
                path     : 'nuevo',
                component: PerfilComponent,
            },
            {
                path     : 'editar/:id_usuario',
                component: PerfilComponent,
            },
            {
                path     : 'rol/:id',
                component: RolComponent
            },
            {
                path     : 'nuevo/rol',
                component: RolComponent
            },
            {
                path     : 'permiso/role/:id',
                component: PermisosComponent
            },
            {path: 'crear/:tipo', component:CrearComponent},
            {path: 'editar/:tipo/:id', component:CrearComponent}
        ]
    }
];
