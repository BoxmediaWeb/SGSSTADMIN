import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstandarService {
  private seccion$: BehaviorSubject<string> = new BehaviorSubject<string>("derecha");
  private maestroActual$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private codigoEstandar$: BehaviorSubject<string> = new BehaviorSubject<string>("derecha");
  private indice$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getSeccion(){
    return this.seccion$.asObservable();
  }

  getMaestroActual(){
    return this.maestroActual$.asObservable();
  }

  getCodigoEstandar(){
    return this.codigoEstandar$.asObservable();
  }

  getIndice(){
    return this.indice$.asObservable();
  }

  setSeccion(valor){
    this.seccion$.next(valor);
  }

  setMaestroActual(valor){
    this.maestroActual$.next(valor);
  }

  setCodigoEstandar(valor){
    this.codigoEstandar$.next(valor);
  }

  setIndice(valor){
    this.indice$.next(valor);
  }

  constructor() { }
}