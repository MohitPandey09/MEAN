import { Component, OnInit } from '@angular/core';
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
    public loginForm: FormGroup;
    public assetUrl = environment.assetsUrl;
    public submitted = false;
    public errorMsg: string = null;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private api: ApiService,
        private token: TokenService
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onLoginSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
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
        console.log(response);
        if (response.status === 1) {
            this.token.setToken(response.responseData.token);
            localStorage.setItem('userData', JSON.stringify(response.responseData.userData));
            this.router.navigate(['home']);
        }
        if (response.status === 0) {
            this.errorMsg = response.message;
        }
    }

    clearErrorMessage() {
        this.errorMsg = null;
    }

}
