import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../models/account.model";
import {Credit, Debit, Transfer} from "../models/transaction.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{

  accountFormGroup: FormGroup | undefined;
  operationFormGroup: FormGroup | undefined;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;

  constructor(private accountsService: AccountsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountID: ['']
    })
    this.operationFormGroup = this.fb.group({
      operationType: [null],
      amount: [0],
      description: [null],
      accountDestination: [null]
    })
  }

  handleAccountDetails() {
    let accountID: string = this.accountFormGroup?.value.accountID;
    this.accountObservable = this.accountsService.getAccountOperations(accountID, this.currentPage, this.pageSize);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleAccountDetails();
  }

  handleAccountOperations() {
    let operationType: string = this.operationFormGroup?.value.operationType;
    let accountID: string = this.accountFormGroup?.value.accountID;
    let amount: number = this.operationFormGroup?.value.amount;
    let description: string = this.operationFormGroup?.value.description;
    let destinationAccountID: string = this.operationFormGroup?.value.accountDestination;
    switch (operationType) {
      case "DEBIT": {
        let debitData: Debit = {
          accountId: accountID,
          amount: amount,
          description: description
        };
        this.accountsService.debit(debitData).subscribe({
          next: (resp) => {
            alert("Transaction successful.")
            this.operationFormGroup?.reset();
          },
          error: err => {
            console.error(err)
          }
        });
        break;
      }
      case "CREDIT": {
        let creditData: Credit = {
          accountId: accountID,
          amount: amount,
          description: description
        };
        this.accountsService.credit(creditData).subscribe({
          next: (resp) => {
            alert("Transaction successful.")
            this.operationFormGroup?.reset();
          },
          error: err => {
            console.error(err)
          }
        });
        break;
      }

      case "TRANSFER": {
        let transferData: Transfer = {
          accountSource: accountID,
          accountDestination: destinationAccountID,
          amount: amount,
          description: description
        };
        this.accountsService.transfer(transferData).subscribe({
          next: (resp) => {
            alert("Transaction successful.")
            this.operationFormGroup?.reset();
          },
          error: err => {
            console.error(err)
          }
        });
        break;
      }
    }
  }
}
