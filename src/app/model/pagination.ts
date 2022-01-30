import { HttpHeaders } from '@angular/common/http';
export class Pagination {
  currentPage?: any;
  page?: any;
  totalItems?: any;
  itemsPerPage?: any =5;

  constructor() {
    this.currentPage = 0;
    this.page = 0;
    this.totalItems = 0;
  }

  resetPagination() {
    this.currentPage = 0;
    this.page = 0;
    this.totalItems = 0;
  }

  setPaginationFromHeaders(headers: HttpHeaders) {
    this.currentPage = headers.get('Page');
    this.totalItems = headers.get('Total-Elements');
    this.page = headers.get('Page');
  }
}
