import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../model/documentResponse';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public fetchDocuments(studentId : Number ):  Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/documents/fetch/" + studentId, {
      reportProgress: true,
      observe: 'events'
    });
    
  }

  public uploadDocuments(formData: FormData): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/documents/upload", formData, {
      reportProgress: true,
      observe: 'events'
    });
}
}
