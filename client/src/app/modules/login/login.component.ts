import { Component, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;
    public assetUrl = environment.ASSETS_URL;
    public isLoaded: boolean = false;
    public submitted = false;
    public errorMsg!: any;

    constructor(
            private fb: FormBuilder,
            private router: Router,
            private api: ApiService,
            private token: TokenService
        ) { }

    ngOnInit() {
        // COMMENT: if user logged in redirect to homepage
        let isLoggedIn = this.token.getToken();
        if (isLoggedIn) {
            this.router.navigate(['home']);
        }
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.isLoaded = true;
    }

    get f() {
        return this.loginForm.controls;
    }

    onLoginSubmit() {
        this.isLoaded = false;
        this.submitted = true;
        if (this.loginForm.invalid) {
            this.isLoaded = true;
            return;
        }

        this.api.loginApi(this.loginForm.value).subscribe(
            (response) => {
                this.handleLoginResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleLoginResponse(response: any) {
        if (response.statusCode === 1) {
            this.isLoaded = true;
            this.token.setToken(response.responseData.token);
            localStorage.setItem('userData', JSON.stringify(response.responseData.userData));
            this.router.navigate(['home']);
        }
        if (response.statusCode === 0) {
            this.isLoaded = true;
            this.errorMsg = response.message;
        }
    }

    clearErrorMessage() {
        this.errorMsg = null;
    }
}