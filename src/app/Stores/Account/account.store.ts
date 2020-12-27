import { Injectable } from '@angular/core';
import { EntityState, QueryEntity, EntityStore, StoreConfig } from '@datorama/akita';

export type Account =
{
    id: number,
    login: string,
    password: string,
    instagramid: string,
    enabled: boolean,
    currentfollowers: number,
    dayfollowers: number,
    monthfollowers: number
}

export interface AccountState extends EntityState<Account> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'accounts' })
export class AccountStore extends EntityStore<AccountState, Account> {
    constructor() {
        super();
    }
}

@Injectable({ providedIn: 'root' })
export class AccountQuery extends QueryEntity<AccountState, Account> {
    constructor(protected store: AccountStore) {
        super(store);
    }
}