import { Component, OnInit } from "@angular/core";
import { AccountResponse, AccountService, PaymentResponse } from "src/app/api";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  account: AccountResponse = {};
  payments: PaymentResponse[] = [];
  ngOnInit(): void {
    this.loadAccount();
    this.loadPayments();
  }

  loadAccount() {
    this.accountService.getMyAccount("body").subscribe((res) => (this.account = res));
  }

  loadPayments() {
    this.accountService.getMyPayments("body").subscribe((res) => {
      this.payments = res;
      this.payments.forEach((payment) => {
        var dateParts = payment.date.split("T");
        payment.date = dateParts[0] + " " + dateParts[1];
      });
    });
  }

  addMoney(amount) {
    this.accountService.makePayment(amount).subscribe(res=>this.loadPayments());
  }
}
