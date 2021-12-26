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
    public submitted = false;
    public errorMsg!: any;

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
        console.log(environment.API_URL)
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
        if (response.statusCode === 1) {
            this.token.setToken(response.responseData.token);
            localStorage.setItem('userData', JSON.stringify(response.responseData.userData));
            this.router.navigate(['home']);
        }
        if (response.statusCode === 0) {
            this.errorMsg = response.message;
        }
    }

    clearErrorMessage() {
        this.errorMsg = null;
    }

}

// Number
// Boolean
// String
// Void
// Null It is used when an object does not have any value
// Undefined Denotes value given to uninitialized variable

// ----------------------- SENDING DATA TO CHILD FROM PARENT ----------------------- 
// @Input () abc : string; // in child ts.file

// <[abc] = "xyz"> // in child html.file

// xyz = 'Mohit'; // in parent ts.file

// ----------------------- SENDING DATA TO PARENT FROM CHILD ----------------------- 

// @Output() abc = new EventEmitter<string>(); // in parent ts.file

// 123(value) {
//     this.abc.emit(value); // in parent html.file
// }

// <button (click)="123(value)">Add</button> // in child html.file