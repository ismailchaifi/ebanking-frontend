import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../models/customer.model";
import {catchError, throwError} from "rxjs";
import {CustomersComponent} from "../customers/customers.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{

  newCustomerFormGroup: FormGroup | undefined;

  constructor(private customerService:CustomersService,
              private fb: FormBuilder,
              private router:Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  postCustomer() {
    let customer:Customer = this.newCustomerFormGroup?.value

    this.customerService.postCustomer(customer).subscribe({
      next: value => {
        alert("Customer has been successfully saved.");
        this.router.navigateByUrl("/customers");
      },
      error: err => {
        console.error(err)
      }
    })
  }

}
