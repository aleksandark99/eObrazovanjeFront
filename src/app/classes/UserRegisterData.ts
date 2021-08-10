export class UserRegisterData{
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public email: string;
    public accountNo: number;
    public model: number;
    public personalNumber: string;
    public userType: string
    
    constructor(userRegisterData:UserRegisterData)
    {
        this.firstName = userRegisterData.firstName;
        this.lastName = userRegisterData.lastName;
        this.username = userRegisterData.username;
        this.password = userRegisterData.password;
        this.email = userRegisterData.email;
        this.accountNo = userRegisterData.accountNo;
        this.model = userRegisterData.model;
        this.personalNumber = userRegisterData.personalNumber;
        this.userType = userRegisterData.userType;
        this.model=1;
    }
}