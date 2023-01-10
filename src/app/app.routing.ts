import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { SeccionComponent } from './pages/seccion/seccion.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'inicio'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'inicio'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            { path: 'login', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'formularioestandar', loadChildren: () => import('app/pages/formulario-estandar/formulario-estandar.module').then(m => m.FormularioEstandarModule)},
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'sgsst/planear', loadChildren: () => import('app/pages/planear/planear.module').then(m => m.PlanearModule)},
            {path: 'sgsst/hacer', loadChildren: () => import('app/pages/hacer/hacer.module').then(m => m.HacerModule)},
            {path: 'sgsst/actuar', loadChildren: () => import('app/pages/actuar/actuar.module').then(m => m.ActuarModule)},
            {path: 'sgsst/verificar', loadChildren: () => import('app/pages/verificar/verificar.module').then(m => m.VerificarModule)},
            {path: 'inicio', loadChildren: () => import('app/pages/inicio/inicio.module').then(m => m.InicioModule)},
            {path: 'usuarios', loadChildren: () => import('app/pages/usuarios/usuarios.module').then(m => m.UsuariosModule)},
            {path: 'calendario', loadChildren: () => import('app/pages/calendario/calendario.module').then(m => m.CalendarioModule)},
            {path: 'pesv', loadChildren: () => import('app/pages/pesv/pesv.module').then(m => m.PesvModule)},
            {path: 'seccion/:grupo', loadChildren: () => import('app/pages/seccion/seccion.module').then(m => m.SeccionModule)},
            


            
            {path: 'estandar', loadChildren: () => import('app/pages/elemento/elemento.module').then(m => m.ElementoModule)},
        ]
    }
    
];