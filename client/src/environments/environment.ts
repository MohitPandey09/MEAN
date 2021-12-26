// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'http://localhost:3000/api/',
    ASSETS_URL: './assets',
    STRIPE_PUBLIC_KEY: 'pk_test_51K6eY1SHrrqQXcLUV34MnRSm3Tle5JPebsqYxENVm5k5rfJoN9U6HVOMdvmCP1KM1nLPqoHyXkwfpGMgx3Bje4Lg00YPp5xfq0',
    STRIPE_SECRET_KEY: 'sk_test_51K6eY1SHrrqQXcLUNqSOUVDj3qjt5tq2bELZA6uo2CEPPxSwS1dKpc7KM181SvaRTmO6BY4OlYmhyrp0X5hwYkam00TY8FMHXx'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
