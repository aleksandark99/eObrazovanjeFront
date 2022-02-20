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
    this.currentPage = Number(headers.get("Page"))
    this.totalItems =  Number(headers.get("Total-Elements"))
    this.nextPage = Number(headers.get("Page"))
  }
}
