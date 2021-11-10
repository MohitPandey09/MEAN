import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    public assetsUrl = environment.assetsUrl;
    public carouselOptions = { items: 3, dots: true, navigation: false };
    public slidesStore = [
        {
            id: 0,
            src: this.assetsUrl + '/img/hero-1.jpg',
            title: 'I am'
        },
        {
            id: 1,
            src: this.assetsUrl + '/img/hero-2.jpg',
            title: 'Iron Man'
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
