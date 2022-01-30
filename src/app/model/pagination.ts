import { HttpHeaders } from "@angular/common/http";
export class Pagination {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number = 5;
  nextPage?: number;

  constructor() {
    this.currentPage = 1;
    this.totalItems = 0;
    this.nextPage = 0;
  }

  resetPagination() {
    this.currentPage = 1;
    this.totalItems = 0;
    this.nextPage = 0;
  }

  setPaginationFromHeaders(headers: HttpHeaders) {
    console.log("current Page je"+parseInt(headers.get("Page")))
    console.log("Total elements je"+parseInt(headers.get("Total-Elements")))
    this.currentPage = Number(headers.get("Page"))
    this.totalItems =  Number(headers.get("Total-Elements"))
    this.nextPage = Number(headers.get("Page"))
  }
}
