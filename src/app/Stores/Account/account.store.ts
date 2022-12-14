import { Injectable } from '@angular/core';
import { EntityState, QueryEntity, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Observable } from 'rxjs';

export type InstagramSchedule =
{
    id: number,
    photo: Object,
    date: Date,
    description: string
};

export type InstagramTopPhoto = 
{
    photo: string,
    comments: number,
    likes: number,
    time: Date
};

export type InstagramAccount =
{
    id: number,
    login: string,
    password: string,
    instagramid: string,
    enabled: boolean,
    currentfollowers: number,
    dayfollowers: number,
    monthfollowers: number,

    insights: Object,
    topphotos: Array<InstagramTopPhoto>,
    schedules: Array<InstagramSchedule>
};

export interface AccountState extends EntityState<InstagramAccount>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'accounts' })
export class AccountStore extends EntityStore<AccountState, InstagramAccount> {
    constructor() {
        super();
    }
}

@Injectable({ providedIn: 'root' })
export class AccountQuery extends QueryEntity<AccountState, InstagramAccount> {
    public accounts$: Observable<InstagramAccount[]> = this.selectAll();
    public account$: Observable<InstagramAccount> = this.selectActive();

    public isloading$: Observable<boolean> = this.selectLoading();

    constructor(protected store: AccountStore) {
        super(store);
    }
}