import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, StripeCardComponent } from "ngx-stripe";
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { ApiService } from "src/app/shared/services/api.service";
// Stripe.js will not be loaded until `loadStripe` is called
// const stripe = loadStripe('pk_test_51K6eY1SHrrqQXcLUV34MnRSm3Tle5JPebsqYxENVm5k5rfJoN9U6HVOMdvmCP1KM1nLPqoHyXkwfpGMgx3Bje4Lg00YPp5xfq0');

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
    public isLoaded: boolean = false;
    client_secret: any;
    userData: any = { };
    @ViewChild(StripeCardComponent) card!: StripeCardComponent;

    cardOptions: StripeCardElementOptions = {
        style: {
            base: {
                iconColor: "#666EE8",
                color: "#31325F",
                fontWeight: "300",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: "18px",
                "::placeholder": {
                    color: "#CFD7E0",
                }
            },
            complete: {
              iconColor: '#4eb422',
              color: '#4eb422',
            },
            invalid: {
              iconColor: '#ea2b1d',
              color: '#ea2b1d',
            },
        }
    };

    elementsOptions: StripeElementsOptions = {
        locale: "en",
    };
    stripeTest!: FormGroup;

    constructor(
            private fb: FormBuilder,
            private stripeService: StripeService,
            private apiService: ApiService
        ) { }

    ngOnInit(): void {
        // call payment intent to fetch client secret
        this.getPaymentIntent();
    }

    getPaymentIntent() {
        this.apiService.getPaymentIntentKey().subscribe(
            (response) => {
                this.isLoaded = true;
                console.log(response.clientKey);
                this.client_secret = response.clientKey;
            },
            (error) => {
                this.isLoaded = true;
                console.log(error);
            }
        )
        
        this.stripeTest = this.fb.group({
            name: ["", [Validators.required]],
            email: [""]
        });    
    }

    createToken(): void {
        this.isLoaded = false;
        this.stripeService.confirmCardPayment(this.client_secret, {
            payment_method: {
                card: this.card.element,
                billing_details: {
                    name: this.stripeTest.get('name')!.value
                }
            }
        }).subscribe((result) => {
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                this.isLoaded = true;
                console.log(result.error.message);
            } else {
                // The payment has been processed!
                console.log(result.paymentIntent);
                if (result.paymentIntent!.status === 'succeeded') {
                    this.isLoaded = true;
                    console.log('success');
                    // Show a success message to your customer
                }
            }
        });
    }
}
