import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {AccountDetails} from "../models/account.model";
import {Credit, Debit, Transfer} from "../models/transaction.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccountOperations(accountID: string, page: number, size: number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost + "/bankAccounts/" + accountID + "/operations?page=" + page + "&size=" + size)
  }

  public debit(debitDTO: Debit): Observable<Debit> {
    return this.http.post<Debit>(environment.backendHost + "/bankAccounts/" + debitDTO.accountId + "/debit?amount=" + debitDTO.amount + "&description=" + debitDTO.description, debitDTO)
  }

  public credit(creditDTO: Credit):Observable<Credit> {
    return this.http.post<Credit>(environment.backendHost + "/bankAccounts/" + creditDTO.accountId + "/credit?amount=" + creditDTO.amount + "&description=" + creditDTO.description, creditDTO)
  }

  public transfer(transferDTO: Transfer):Observable<Transfer> {
    return this.http.post<Transfer>(environment.backendHost + "/bankAccounts/transfer?sourceAccount=" + transferDTO.accountSource + "&destAccount=" + transferDTO.accountDestination + "&amount=" + transferDTO.amount, transferDTO)
  }

}
