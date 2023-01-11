import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';

@Component({
  selector: 'app-pdf-documento',
  templateUrl: './pdf-documento.component.html',
  styleUrls: ['./pdf-documento.component.scss']
})
export class PdfDocumentoComponent implements OnInit {
  idDetalleDocumento: any;
  htmlContent: any;

  imprimir(){
    (window as any).print();
  }

  constructor(private route: ActivatedRoute,private _apiService:ApiService) { }

  getDetalleDocumento()
  {
    const nombreQuery="detalledocumentos/getdetalledocumento"
    const queryParams=`id=${this.idDetalleDocumento}`
 
 
    this._apiService.getQuery(nombreQuery,queryParams).subscribe(
      async (response: any)  => {
 
        console.log("RRRRRRRRRR", response);

        this.htmlContent = await response.archivo;
 
          /*this._snackbar.open('Imágen guardada', null, {
            duration: 4000
          });*/
      },
      error => {
        console.log(error);
 
        /*this._snackbar.open('Error', null, {
          duration: 4000
        });*/
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe( (params) =>{
      this.idDetalleDocumento = params.idDetalleDocumento?params.idDetalleDocumento:null;
      this.getDetalleDocumento();
    });
  }

}
