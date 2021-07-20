export class LoginDataRequest {

    public username: String;
    public password: String;
    
    public constructor(init?: Partial<LoginDataRequest>) {
        Object.assign(this, init);
    }
}
