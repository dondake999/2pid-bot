require('dotenv').config();
const express = require('express'); // Added Express
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');

const app = express(); // Create an Express app

// Keep the bot alive by serving a simple webpage
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Define a PORT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const amount = interaction.options.getInteger('amount');

    // Function to format numbers with commas and short units (K, M, B, T)
    function formatNumber(num) {
        if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`; // Trillions
        if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`; // Billions
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`; // Millions
        if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`; // Thousands
        return num.toLocaleString(); // Default format
    }

    if (interaction.commandName === 'plat') {
        const goldAmount = amount * 10_000_000;

        const response = `\u200B\n\u200B\n🟦 **${amount.toLocaleString()} Platinum (${formatNumber(amount)})**\n\n` +
                         `⬇️ Converts to\n\n` +
                         `🟨 **${goldAmount.toLocaleString()} Gold (${formatNumber(goldAmount)})**\n\n` +
                         `🔗 [Click Me For The Calculator!](https://dondake999.github.io/GAIA-TOOLS/)`;

        await interaction.reply(response);
    } else if (interaction.commandName === 'gold') {
        const platAmount = amount / 10_000_000;

        const response = `\u200B\n\u200B\n🟨 **${amount.toLocaleString()} Gold (${formatNumber(amount)})**\n\n` +
                         `⬇️ Converts to\n\n` +
                         `🟦 **${platAmount.toLocaleString()} Platinum (${formatNumber(platAmount)})**\n\n` +
                         `🔗 [Click Me For The Calculator!](https://dondake999.github.io/GAIA-TOOLS/)`;

        await interaction.reply(response);
    } else if (interaction.commandName === 'converter') {
        const response = `\u200B\n\u200B\n❗ **Gold-Plat Calculator**\n\n🔗 [Click Here](https://dondake999.github.io/GAIA-TOOLS/)`;

        await interaction.reply(response);
    }
});

// Register commands
const commands = [
    new SlashCommandBuilder()
        .setName('plat')
        .setDescription('Convert Platinum to Gold.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Amount of Platinum')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('gold')
        .setDescription('Convert Gold to Platinum.')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Amount of Gold')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('converter')
        .setDescription('Sends the Gold-Plat Calculator link.')
].map(command => command.toJSON());

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

client.login(process.env.TOKEN);
