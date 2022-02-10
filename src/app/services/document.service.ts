import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../model/documentResponse';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private httpClient: HttpClient) { }

  public fetchDocuments(studentId : Number ):  Document[] {
    var d1 = new Document("a", 1, "a", "a");
    var d2 = new Document("a", 1, "a", "a");
    return [d1, d2];
  }

  public uploadDocuments(formData: FormData): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/documents/upload", formData, {
      reportProgress: true,
      observe: 'events'
    });
}
}
