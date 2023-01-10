/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/inicio'
    },
    {
        id      : 'sgsst',
        title   : 'sgsst',
        type    : 'collapsable',
        icon    : 'heroicons_outline:archive',
        link    : '/apps/help-center',
        children: [
            {
                id   : 'planear',
                title: 'Planear',
                type : 'basic',
                icon : 'heroicons_outline:chart-bar',
                link : '/estandar/planear'
            },
            {
                id   : 'hacer',
                title: 'Hacer',
                type : 'basic',
                icon : 'heroicons_outline:pencil-alt',
                link : '/estandar/hacer'
            },
            {
                id   : 'verificar',
                title: 'Verificar',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-list',
                link : '/estandar/verificar'
            },
            {
                id   : 'actuar',
                title: 'Actuar',
                type : 'basic',
                icon : 'heroicons_outline:presentation-chart-bar',
                link : '/estandar/actuar'
            },
        ]
    },
    {
        id   : 'pesv',
        title: 'PESV',
        type : 'basic',
        icon : 'heroicons_outline:view-grid-add',
        link : '/pesv'
    },
    {
        id   : 'calendario',
        title: 'Calendario',
        type : 'basic',
        icon : 'heroicons_outline:calendar',
        link : '/calendario'
    },
    {
        id      : 'configuracion',
        title   : 'Configuracion',
        type    : 'collapsable',
        icon    : 'heroicons_outline:support',
        link    : '/apps/help-center',
        children: [
            {
                id   : 'usuarios',
                title: 'Usuarios',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/usuarios'
            },
            {
                id   : 'maestros',
                title: 'Maestros',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-list',
                link : '/maestros'
            }
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
