export class Credential {
    email: string;

    constructor(credential?) {
        credential = credential || {};
        this.email = credential.email || '';
    }
}