import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000/form/";

  getFormData(): Observable<any>{
    return this.http.get(this.url);
  }

  postFormData(data: any) {
    return this.http.post(this.url, data);
  }

  updateformdata(id:any , data:any) {
    return this.http.put(this.url+id, data)
  }

  deleteFormData(id:any): Observable<any>{
    return this.http.delete(this.url+id);
  }

}
