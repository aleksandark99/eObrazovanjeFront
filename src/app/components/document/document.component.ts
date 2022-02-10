import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/model/documentResponse';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  selectedFiles: File[] = []
  documents: Document[];

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.fetchDocuments(1);
  }

  onFilesSelected(event){

    for (const f of event.target.files) {
      this.selectedFiles.push(f)
    }
    console.log(this.selectedFiles.length)
  } 

  onClickUpload(){
    //TODO

    var fd = new FormData();
  
    for (const file of this.selectedFiles){
      fd.append('files', file, file.name);
    }


    
    if (this.selectedFiles.length > 0){
      this.documentService.uploadDocuments(fd).subscribe(
        response => {
          //console.log(response);
          if (!response['error']){
            // this.currentMessage = new Message(-1, '', '', '', [], [], [], true, '', '', []); //defaul new Message
            // this.selectedFiles = [];
            // this.messageNewForm.get('messageNewSubject').setValue('');
            // this.messageNewForm.get('messageNewContent').setValue('');
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
