import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, takeUntil, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from '../user/user.service';
import { User } from '../user/user.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private _userService: UserService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    private generarNavegacion(lv1,lv2){

        var navegacion = [];
        
        lv1.map((data)=>{
            data.icon = `heroicons_outline:${data.icon}`;
            data.children=[];
            navegacion.push(data);
        });

        lv2.map((data2)=>{
            data2.icon = `heroicons_outline:${data2.icon}`;

            var parent = lv1.filter((data)=>{return data.title == data2.parent})[0];

            if(parent){
                parent.children.push(data2);
            }

            //navegacion.push(data2);
        });

        const vr ={
            default:navegacion
        }

        return vr;
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */

    get(): Observable<any>
    {
        
        return this._httpClient.get<any>(`${environment.NodeServerUrl}/login/authuser`).pipe(
            tap((navigation:any) => {

                var lv1 = navigation.Role.Modulos.filter((data)=>{return !data.parent});
                var lv2 = navigation.Role.Modulos.filter((data)=>{return data.parent});
                
                const nav:any = this.generarNavegacion(lv1,lv2);

                this._navigation.next(nav);
            })
        );
    }
    
    /*get(): Observable<Navigation>
    {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }*7

    /*
    get(): Observable<any>
    {
        return this._userService._modulos$.pipe(tap((navigation) => {
            this._navigation.next(navigation);
        }));
    }*/



    /*
    getUsuarioNavegacion(){
        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: User) => {
            this._navigation.next(user.Role.Modulos);
        });
    }

    getUsuario(){
        this._userService.user$
        .pipe((takeUntil(this._unsubscribeAll)))
        .subscribe((user: User) => {
          this.user = user;
        });
    }*/
}
