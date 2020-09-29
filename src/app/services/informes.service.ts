import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteModel } from '../models/cliente.model';
import { ResponseModel } from '../models/response.model';
import { TotalesByCamareroModel } from '../models/totalesbycamarero.model';
import { ViewFacturaModel } from '../models/viewfactura.model';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  endPoint = `${environment.apiURL}/Factura`;
  endPointRpt = `${environment.apiURL}/ViewFactura`;
  endPointRptCustomer = `${environment.apiURL}/Cliente`;

  constructor(private http: HttpClient) { }

  getViewFactura(): Observable<Observable<ResponseModel<ViewFacturaModel[]>>> {        
    return this.http.get<Observable<ResponseModel<ViewFacturaModel[]>>>(`${this.endPointRpt}/GetViewFactura` );
  }

  getTotalesByCamarero(): Observable<Observable<ResponseModel<TotalesByCamareroModel[]>>> {        
    return this.http.get<Observable<ResponseModel<TotalesByCamareroModel[]>>>(`${this.endPointRpt}/GetTotalesporCamarero` );
  }

  getClientesMayorCompra(): Observable<Observable<ResponseModel<ClienteModel[]>>> {        
    return this.http.get<Observable<ResponseModel<ClienteModel[]>>>(`${this.endPointRptCustomer}/GetClientesMayorCompra` );
  }


}
