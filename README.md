# IDE Used

The IDE used is WebStorm because it is focused on js development and is more suitable for angular dev

## How to Run

1) Clone app
2) Run 'npm install'
3) Run 'npm run start' to run the app

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Run on apache tom cat

To run on apache tom cat server. 

Build the app using command ng build --base-ref="<route-to-app>"

Add your own route to app for apache tomcat.

1) Open Tom cat directory
2) In this directory create a folder with name the was set to base-rf
3) Paste the files in dist folder of angular app to the new folder in tomcat/webapps
4) run tomcat and hit rout localhost:8080/route-to-app
5) Your app is served
