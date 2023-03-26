export default class Account {
    constructor(email,firstName, lastName, password,identification,phone) {
        this.email = email;
        this.password = password;
        this.identification = identification;
        this.accType = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.premium = true;
    }
}
