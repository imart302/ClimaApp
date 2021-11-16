const inquirer = require('inquirer');


function inquirerMenu() {
    return new Promise((resolve, reject) => {
        const questions = [
            {
                type: 'list',
                name: 'option',
                message: 'Seleccione una opcion',
                choices: [
                    {
                        value: 1,
                        name: '1. Buscar ciudad'
                    },
                    {
                        value: 2,
                        name: '2. Historial'
                    },
                    {
                        value: 0,
                        name: '3. Salir'
                    }
                ]
            }
        ];
        inquirer.prompt(questions).then(opcion => {
            resolve(opcion);
        }).catch(error => {
            reject(error);
        });
    });
}

async function inquireCity(cities) {

    const choices = cities.features.map ( (city, index) => {
        return {
            value: index,
            name: city.place_name
        }
    });
    const questions = [
        {
            type: 'list',
            name: 'index',
            message: 'Seleccione una opcion',
            choices
        }
    ];
    return await inquirer.prompt(questions);
}

const requireInput = async (message) => {
    const questions = {
        type: "input",
        name: "input",
        message
    }
    return await inquirer.prompt(questions);
}

module.exports = { inquirerMenu, requireInput, inquireCity};



