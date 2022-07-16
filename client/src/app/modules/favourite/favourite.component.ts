import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-favourite',
	templateUrl: './favourite.component.html',
	styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
	public ASSETS_URL = environment.ASSETS_URL;
	public favourites: Array<any> = [];
	public isLoaded: boolean = false;
	public errorMsg!: any;

	constructor(
				private api: ApiService
		) { }

	ngOnInit() {
		this.getFavourites();
	}

	getFavourites() {
		this.api.getFavourites().subscribe(
			(response) => {
				this.handleGetFavouriteResponse(response);
			},
			(error) => {
				console.log('Error: ', error);
			}
		);
	}

	handleGetFavouriteResponse(response: any) {
		console.log('Favourites List', response);
		if (response.statusCode === 1) {
			this.isLoaded = true;
			this.favourites = response.responseData.product;
		}
		if (response.statusCode === 0) {
			// show modal with error here
			this.isLoaded = true;
			this.errorMsg = response.message;
		}
	}

	markFavourite(productID: any) {
		console.log(productID)
		this.isLoaded = false;
		this.api.favourite(productID).subscribe(
			response => {
				this.handleFavouriteResponse(response);
			},
			error => {
				this.isLoaded = true;
				console.log('Error: ', error);
			}
		)
	}

	handleFavouriteResponse(response: any) {
		if (response.statusCode === 1) {
			this.isLoaded = true;
			window.location.reload();
		}
		if (response.statusCode === 0) {
			// show modal with error here
			this.isLoaded = true;
			this.errorMsg = response.message;
		}
	}
}
