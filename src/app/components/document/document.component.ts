import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/model/documentResponse';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  selectedFiles: File[] = []
  documents: Document[] = [];
  userStudentId : number;

  constructor(private documentService : DocumentService,  private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams
    .subscribe(params => {
      var isInt = /^\+?\d+$/.test(params.studentId) //regex check to isInt
      if (!isInt){
        this.userStudentId = -1;
      } else {
        this.userStudentId =  Number.parseInt(params.studentId)
      }
    });

    this.documentService.fetchDocuments(this.userStudentId).subscribe(
      response => {
        //console.log(response);
        if (!response['error']){
          if (response.body != undefined){
            response.body.forEach(document => {
                 this.documents.push(new Document(document.url, document.documentId, document.documentTitle, document.createdAt))
            });
              
          }
        }else {
          alert("Error while sending message!")
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public remove(i: number){
    this.selectedFiles.splice(i,1)
    
  }

  onFilesSelected(event){

    for (const f of event.target.files) {
      this.selectedFiles.push(f)
    }
  } 

  upload(){

    var fd = new FormData();
  
    for (const file of this.selectedFiles){
      fd.append('files', file, file.name);
    }

    if (this.selectedFiles.length > 0){
      this.documentService.uploadDocuments(fd).subscribe(
        response => {
          //console.log(response);
          if (!response['error']){
            if (response.body != undefined){
              response.body.forEach(document => {
                   this.documents.push(new Document(document.url, document.documentId, document.documentTitle, document.createdAt))
                 });
                 this.selectedFiles = [];
            }
          }else {
            alert("Error while sending message!")
          }
  
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } 

    
  }

}
