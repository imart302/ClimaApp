const inquirer = require ('./helpers/inquirer');
const { Search } = require('./models/search');
require('dotenv').config();

const search = new Search;
async function main () {
    
        let opt
        do{
            opt = await inquirer.inquirerMenu();
            
            switch(opt.option){
                case 1 :
                    const cityInq = await inquirer.requireInput("Nombre de la locacion: ");
                    const city = cityInq.input;
                    const res = await search.ciudad(city, 7);
                    const citiesResponse = res.features;
                    const selecCity = await inquirer.inquireCity(res);
                    const citySelected = citiesResponse[selecCity.index];
                    const weather = await search.weather(citySelected.center[1], citySelected.center[0]);
                    search.pushHistory({ ...weather, place: citySelected.place_name_es});
        
                break;
                case 2:
                    console.log(search.historial);
                break;
                case 3:
                break;
            }
        }
        while(opt.option != 0);
    
       return;
}

console.log("App Weather");

main();
