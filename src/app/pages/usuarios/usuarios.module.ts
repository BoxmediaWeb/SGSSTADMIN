import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UsuariosComponent } from './usuarios.component';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './rol/rol.component';
import { UsuariosRoutes } from './usuarios.routing';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RolesComponent } from './roles/roles.component';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CrearComponent } from './crear/crear.component';
import { RecortarImagenComponent } from './recortar-imagen/recortar-imagen.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditarPasswordComponent } from './editar-password/editar-password.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PermisosComponent } from './permisos/permisos.component';
import { CrearRoleComponent } from './crear-role/crear-role.component';


@NgModule({
    declarations: [
    
    PerfilComponent,
         RolComponent,
         ContenedorComponent,
         DetalleComponent,
         RolesComponent,
         CrearComponent,
         RecortarImagenComponent,
         EditarPasswordComponent,
         PermisosComponent,
         CrearRoleComponent
  ],
    imports     : [
        RouterModule.forChild(UsuariosRoutes),
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
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
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        MatTabsModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        MatTableModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        FuseAlertModule,
        FuseCardModule,
        FuseDrawerModule,
        FuseHighlightModule,
        FuseLoadingBarModule,
        FuseMasonryModule,
        FuseNavigationModule,
        FuseScrollResetModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatStepperModule,
        MatDatepickerModule,
        MatPaginatorModule,
        ImageCropperModule,
        MatExpansionModule,
        MatSlideToggleModule
    ]
})
export class UsuariosModule
{
}