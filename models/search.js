const axios = require('axios').default;
const fs = require('fs');

class Search {

    historial = [];

    constructor () {
        if(fs.existsSync('db/history.json')){
            const f = fs.readFileSync('db/history.json');
            this.historial = JSON.parse(f);
        }
    }

    async ciudad( place = 'washington', limit=5){
        console.log(`${process.env.MAPBOXURL}${place}.json`);
        const url=`${process.env.MAPBOXURL}${place}.json/`;
        const instance = axios.create({
            baseURL: url,
            params: {
                access_token: process.env.MAPBOX_TOKEN,
                chachebuster: 1633894938527,
                autocomplete: true,
                limit,
                language: "es"
            }
        });
        const res = await instance.get();
        return res.data;
    }

    async weather(lat, lon) {
        const url = process.env.OPENWEATHER_URL;
        const inst = axios.create({
            baseURL: url,
            params: {
                lat,
                lon,
                appid: process.env.OPENWEATHER_TOKEN,
                units: "metric",
                lang: "es"
            }
        });
        const res = await inst.get();
        const resFact = {
            temp: res.data.main.temp,
            tempMin: res.data.main.temp_min,
            tempMax: res.data.main.temp_max,
            weather: res.data.weather[0].description,
            humidity: res.data.main.humidity,

        }

        return resFact;
    }

    pushHistory (obj){
        this.historial.push(obj);
        if(this.historial.length > 40){
            delete this.historial[0];
        }
        fs.writeFileSync('db/history.json', JSON.stringify(this.historial));
    }
}


module.exports = {Search};