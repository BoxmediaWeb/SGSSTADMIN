import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { AuthService } from '../auth/auth.service';
//import { user } from 'app/mock-api/common/user/data';
import { environment } from 'environments/environment';
import { Navigation } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _modulos: ReplaySubject<any> = new ReplaySubject<any>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }
    currentUser: User;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------


    private generateNavigation(value:any){
        var parents = value.Role.Modulos.filter((data)=>{
            return data.type == 'basic';
        });

        this._modulos.next(parents);
    }

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        if(value){
            localStorage.setItem('userId', `${value.id}`);
        }

        // Store the value
        this._user.next(value);
        this.generateNavigation(value);
    }

    get user$(): Observable<User>
    {

        /*
        this._httpClient.get<User>(`${environment.serverUrl}/api/auth/login`).pipe(
            tap((user) => {
                this.currentUser = user;
                this.cacheValue('current_user', user);
            })
        );*/
        
        //this.currentUser = user;

        //this.cacheValue('current_user', user);
        //return this._user.asObservable();

        /*this.currentUser = user;

        this.cacheValue('current_user', user);
        return this._user.asObservable();*/
        return this._user.asObservable();
    }

    get _modulos$(): Observable<Navigation>
    {
        return this._modulos.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    
    /*get(): Observable<User>
    {
        return this._httpClient.get<User>(`${environment.serverUrl}/api/auth/login`).pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }*/

    get(): Observable<User>
    {
        var currentUser:User;

        this.user$.subscribe((data:User)=>{
            currentUser = data;
        });

        return this._httpClient.get<User>(`${environment.NodeServerUrl}/login/authuser`).pipe(
                tap((user) => {
                    this._user.next(user);
                })
        );

        //return this._httpClient.get<User>('api/common/user').pipe(
        //    tap((user) => {
                //this._user.next(user);
        //    })
        //);

    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>///http://localhost:8000/graphql/secret?query=query{me{id,name,email}}
    {
        return this._httpClient.patch<User>(`${environment.serverUrl}/api/auth/me`, {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}