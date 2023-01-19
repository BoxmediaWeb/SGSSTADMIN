import { Route } from '@angular/router';
import { GeneralComponent } from '../general/general.component';
import { AuxiliarComponent } from './auxiliar.component';

export const AuxiliarRoutes: Route[] = [
    {
        path     : '',
        component: AuxiliarComponent,
        children : [
            {
                path     : ':id',
                component: GeneralComponent,
            },
        ]
    }
];
