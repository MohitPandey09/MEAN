import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    public assetsUrl = environment.assetsUrl;
    public isLoggedIn: boolean;
    public userData: any;
    public categoryData: any;

    constructor(
        private api: ApiService,
        private router: Router,
        private authService: AuthService,
        private tokenService: TokenService
    ) {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    // 9759841200

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem('userData'));
        this.getCategories();
    }

    getCategories() {
        console.log('cat called');
        this.api.getCategoryList().subscribe(
            (response) => {
                this.handleCategoryList(response);
                console.log('what happen', response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    handleCategoryList(response: any) {
        if(response.status == 1) {
            this.categoryData = response.responseData;
        }
    }

    logout() {
        this.tokenService.destroyToken();
        this.router.navigate(['/login']);
    }
}
