import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;
    public validToken: boolean;

    constructor(private http: Http) {
        var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('../../assets/auth.php', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    this.validToken = true;
                    sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        this.validToken = false;
        sessionStorage.removeItem('currentUser')
    }

}