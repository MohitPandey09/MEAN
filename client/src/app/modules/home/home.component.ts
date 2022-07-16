import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public ASSETS_URL = environment.ASSETS_URL;
    public isLoaded: boolean = false;
    public carouselOptions = {
        items: 3, dots: false, navigation: false
    };
    public carouselClasses = ['owl-theme', 'row', 'sliding'];
    public slidesStore = [
        {
            id: '0',
            src: this.ASSETS_URL + '/img/hero-1.jpg',
            title: 'I am'
        },
        {
            id: '1',
            src: this.ASSETS_URL + '/img/hero-2.jpg',
            title: 'Iron Man'
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
