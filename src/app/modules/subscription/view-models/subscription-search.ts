import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface SubscriptionSearch {
    DomainId? : number;
    Id?: string;
    customerID?: string;
    customerName?: string;
    domainName?: string;
    tld?: string;
    articleID ?: string;
    price?: string;
    nextBillDate?: any;
    lastBillGenerateDate?: string;
    checkItem?: boolean;
    dublicatecheck?:string;
    recordStatus?: boolean;
}

export interface SubscriptionFilter {
    Id?: string;
    customerID?: string;
    customerName?: string;
    domainName?: string;
    tld?: string;
    articleID ?: string;
    price?: string;
    nextBillDate?: string;
    fromDate?: string;
    toDate?: string;
}

export interface MultipleDomain {
    DomainId: number;
    CustomerId?: string;
    CustomerName?: string;
    ArticleId?: string;
    Domain?: string;
    TLD?: string;
    Price?: string;
    BillingDate?: any;
    recordStatus?: any;
}
