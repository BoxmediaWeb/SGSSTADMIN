import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class GeneralService {

  private secccion$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private ubicacion$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private indice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private tipoDocumento$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
 
  constructor() { }

  getSeccion(){
    return this.secccion$.asObservable();
  }

  getUbicacion(){
    return this.ubicacion$.asObservable();
  }

  getIndice(){
    return this.indice$.asObservable();
  }

  getTipoDocumento(){
    return this.tipoDocumento$.asObservable();
  }

  setTipoDocumento(data: number){
    this.tipoDocumento$.next(data);
  }

  setIndice(data: number){
    this.indice$.next(data);
  }

  setSeccion(data: string){
    this.secccion$.next(data);
  }

  setUbicacion(data: string){
    this.ubicacion$.next(data);
  }
}
