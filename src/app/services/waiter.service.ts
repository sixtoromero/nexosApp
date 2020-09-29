import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CamareroModel } from '../models/camarero.model';
import { ResponseModel } from '../models/response.model';


const httpOptions = {
  headers: new HttpHeaders({
      'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  endPoint = `${environment.apiURL}/Camarero`;

  constructor(private http: HttpClient) { }

  insert(model: CamareroModel): Observable<Observable<ResponseModel<string>>> {
    return this.http.post<Observable<ResponseModel<string>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
  }

  delete(Id: number): Observable<Observable<ResponseModel<string>>> {
    return this.http.delete<Observable<ResponseModel<string>>>(`${this.endPoint}/DeleteAsync/${Id}`, httpOptions);
  }
}
