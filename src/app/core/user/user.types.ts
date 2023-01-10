import { FuseNavigationItem } from "@fuse/components/navigation";

export interface User
{
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    status?: string;
    Role?:{
        nombre?: string;
        descripcion?: string;
        Module?:FuseNavigationItem[]
    }
}
