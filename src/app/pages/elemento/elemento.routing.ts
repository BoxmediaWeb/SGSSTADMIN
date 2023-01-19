import { Route } from '@angular/router';
import { ElementoComponent } from './elemento.component';

export const ElementoRoutes: Route[] = [
    {
        path     : '',
        component: ElementoComponent,
        children : [
            {path: ':seccion', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)},
        ]
    }
];
