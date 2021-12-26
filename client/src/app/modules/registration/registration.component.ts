import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/interfaces/user';
import { MustMatch } from '../../shared/helpers/must-match.validator';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    public registerForm!: FormGroup;
    public submitted = false;
    public errorMsg = null;
    public user: User = {
        name: '',
        email: '',
        password: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        mobile: '',
        address: ''
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private api: ApiService
    ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [ Validators.required, Validators.email ]],
            password: ['', [ Validators.required, Validators.minLength(6) ]],
            confirm_password: ['', Validators.required],
            mobile: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            country: ['', Validators.required],
            address: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirm_password')
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onRegisterSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.api.registerApi(this.registerForm.value).subscribe(
            (response) => {
                this.handleRegistrationResponse(response);
            },
            (error) => {
                console.log('Error: ', error);
            }
        );
    }

    handleRegistrationResponse(response: any) {
        console.log(response);
        if (response.statusCode === 1) {
            this.router.navigate(['login']);
        }
        if (response.statusCode === 0) {
            this.errorMsg = response.message;
        }
    }

    clearErrorMessage() {
        this.errorMsg = null;
    }

}
