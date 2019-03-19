export interface User {
    UserId? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    UserName? : string;
    PhoneNumber? : string;
    Password? : string;
    ConfirmPassword? : string;
    Status? : boolean;
    AspNetUserId? : string;
}

export interface ValidateUserModel{
    UserName? : string;
    IPAddress? : string;
}
export class SubscriptionId {
    SubscriptionId:number=0;    
}