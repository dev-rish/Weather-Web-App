# Weather Web App

A simple web app that lets the user enter the name of a place and get various Weather related information on a single button click!  

**Visit [URL](https://rish-weather-app.herokuapp.com/) to try the app**

**To run the App locally, read the instructions below**

## Prerequisites
* [NodeJS](https://nodejs.org/) required  
* [DarkSky](https://darksky.net/dev) API Key
* [MapBox](https://www.mapbox.com/) API Key

## Installation
Install all the dependencies by running the following command from the root directory  

`npm install`

## Setup
1. Create a folder `config` in the root directory of the project  
1. Create a file `dev.env` inside `config`  
1. Paste the following code inside it  
`PORT=3000`  
`WEATHER_API_KEY=`_Darksky API Key_  
`GEOCODE_API_KEY=`_Mapbox API Key_
## Start Project
`npm run dev`
## Dependencies
* [express](https://www.npmjs.com/package/express)
* [hbs](https://www.npmjs.com/package/hbs)
* [request](https://www.npmjs.com/package/request)

## Development Dependencies
* [env-cmd](https://www.npmjs.com/package/env-cmd)
* [nodemon](https://www.npmjs.com/package/nodemon)

