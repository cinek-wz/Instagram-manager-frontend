import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AccountStore, AccountState } from './account.store';
import { Account } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends QueryEntity<AccountState, Account> {
  constructor(protected store: AccountStore) {
    super(store);
  }
}