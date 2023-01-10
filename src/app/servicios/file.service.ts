import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable({ providedIn: 'root' })
export class FileService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Headers':'authorization, content-type, xsrf-token',
      'Access-Control-Expose-Headers':'xsrf-token',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+localStorage.getItem('accessToken'),
      'Content-Type': 'application/json',
      responseType: 'blob'
    })
  };

  ruta = `${environment.serverUrl}/api/actions/getDocumento`;

  constructor(private http: HttpClient) { }

  downloadFile(): any {
		return this.http.get('http://127.0.0.1:8000/api/actions/getDocumento');
  }

  download(estandar, nombre_archivo): Observable<Blob> {
    const formData = new FormData();
    formData.append('estandar', estandar);
    formData.append('nombre_archivo', nombre_archivo);

    return this.http.post(`${environment.serverUrl}/api/actions/getDocumento`, formData, {
      responseType: 'blob'
    })
  }

  downloadDocumento(nombre_archivo): Observable<Blob> {
    const formData = new FormData();
    formData.append('nombre_archivo', nombre_archivo);

    return this.http.post(`${environment.serverUrl}/api/actions/descargarDocumento`, formData, {
      responseType: 'blob'
    })
  }

}
