import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private http: Http,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate() {
        if (this.authenticationService.token || sessionStorage.getItem('currentUser')) {
            this.authenticationService.validToken = true;
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}