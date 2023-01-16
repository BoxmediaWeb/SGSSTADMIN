import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, tap, Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  prefix = 'graphql';
  rutaArchivos = `${environment.serverUrl}/v1/actions/detalleDocumento`;


  //response.setHeader("Access-Control-Max-Age", "3600");
  //response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");
  //response.addHeader("Access-Control-Expose-Headers", "xsrf-token");
  //if ("OPTIONS".equals(request.getMethod())) {
  //    response.setStatus(HttpServletResponse.SC_OK);
  //} else {
  //    filterChain.doFilter(request, response);
 // }




  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Max-Age':'3600',
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Headers':'authorization, content-type, xsrf-token',
      'Access-Control-Expose-Headers':'xsrf-token',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+localStorage.getItem('accessToken'),
      //'Content-Type': 'application/json'
    })
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+localStorage.getItem('accessToken'),
      //'Content-Type': 'multipart/form-data'
    })
  };

  savePatientProfileImage(file: any, ubicacion) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('ubicacion', ubicacion);

    return this._httpClient.post(this.rutaArchivos, formData,this.httpOptions).pipe(
      switchMap((response: any) => {
        const data = response;

        return of(data);
      }),
      catchError(error => {
        throw new Error('Error');
      })
    );
  }


  public setDataArchivo(file,prefijo_documento): Observable<any>{
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prefijo', prefijo_documento);

    return this._httpClient.post(`${environment.serverUrl}/api/actions/subirImagen`,formData, this.httpOptions2);
  }

  public setMaestroArchivo(file,ubicacion): Observable<any>{
    const formData = new FormData();
    formData.append('image', file);
    formData.append('ubicacion', ubicacion);

    return this._httpClient.post(`${environment.serverUrl}/api/actions/subirMaestro`,formData, this.httpOptions2);
  }

  public getMaestro(ubicacion): Observable<any>{
    const formData = new FormData();
    formData.append('ubicacion', ubicacion);

    return this._httpClient.post(`${environment.serverUrl}/api/actions/getMaestro`,formData, this.httpOptions2);
  }

  public setImagenPerfil(file,nickname,usuario_id): Observable<any>{
    const formData = new FormData();
    formData.append('image', file);
    formData.append('nickname', nickname);
    formData.append('usuario_id', usuario_id);

    return this._httpClient.post(`${environment.serverUrl}/api/actions/imagenPerfil`,formData, this.httpOptions2);
  }


  public setData(queryProps,queryParams,nombreQuery): Observable<any>{
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}?query=mutation{${nombreQuery}(${queryParams}){${queryProps}}}`, this.httpOptions);
  }

  public getData(queryProps,queryParams,nombreQuery): Observable<any>{
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}?query=query{${nombreQuery}(${queryParams}){${queryProps}}}`, this.httpOptions);
  }

  public getUserData( queryParams, nombreQuery): Observable<any> {
    return this._httpClient.get(`${environment.serverUrl}/${this.prefix}?query=query{${nombreQuery}(${queryParams})}`, this.httpOptions);
  }



  //Api de node

  public getQuery(nombreQuery,queryParams): Observable<any>{
    return this._httpClient.get(`${environment.NodeServerUrl}/${nombreQuery}?${queryParams}`);
  }

  public postQuery(nombreQuery,dataQuery,queryParams=null): Observable<any>{
    return this._httpClient.post(`${environment.NodeServerUrl}/${nombreQuery}?${queryParams?queryParams:''}`,dataQuery);
  }

  public deleteQuery(nombreQuery,queryParams): Observable<any>{
    return this._httpClient.delete(`${environment.NodeServerUrl}/${nombreQuery}?${queryParams}`);
  }

  public postQueryFile(nombreQuery,dataForm): Observable<any>{
    return this._httpClient.post(`${environment.NodeServerUrl}/${nombreQuery}`,dataForm);
  }
  
  constructor(private readonly _httpClient:HttpClient) {
  }

}
