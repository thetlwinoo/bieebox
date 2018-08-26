export class Credential {
    id: string;
    name: string;
    email: string;    

    constructor(credential?) {
        credential = credential || {};
        this.id = credential.id || '';
        this.name = credential.name || '';
        this.email = credential.email || '';        
    }
}