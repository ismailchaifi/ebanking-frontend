import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomersService} from "../services/customers.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../models/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Customer[]>;
  errorMessage! : object;
  searchFormGroup: FormGroup | undefined;
  constructor(private customerService: CustomersService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
        keyword: ['']
      });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err)
      })
    )
  }


  handleDeleteCustomer(id: number) {
    let confirmation = confirm("Are you sure?")
    if (confirmation) {
      this.customerService.deleteCustomer(id).subscribe({
        next: (resp) => {
          this.handleSearchCustomers()
        },
        error: err => {
          console.error(err)
        }
      })
    }
  }
}
