HEAD
require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'plat',
        description: 'Converts platinum to gold.',
        options: [
            {
                name: 'amount',
                type: 4, // Integer
                description: 'Amount of platinum',
                required: true
            }
        ]
    },
    {
        name: 'gold',
        description: 'Converts gold to platinum.',
        options: [
            {
                name: 'amount',
                type: 4, // Integer
                description: 'Amount of gold',
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Slash commands registered!');
    } catch (error) {
        console.error(error);
    }
})();

require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'plat',
        description: 'Converts platinum to gold.',
        options: [
            {
                name: 'amount',
                type: 4, // Integer
                description: 'Amount of platinum',
                required: true
            }
        ]
    },
    {
        name: 'gold',
        description: 'Converts gold to platinum.',
        options: [
            {
                name: 'amount',
                type: 4, // Integer
                description: 'Amount of gold',
                required: true
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Slash commands registered!');
    } catch (error) {
        console.error(error);
    }
})();
d595a01 (Added Express to keep bot alive)
