const { Client, IntentsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ] 
});
/** @type {import('commandkit').CommandData} */

/** @param {import('commandkit').SlashCommandProps} param0 */
// основная часть

const choice = [
    {
        label: 'RU',
        description: 'Russian',
        value: 'RU'
    },
    {
        label:'EU',
        description:'Europian',
        value:'EU',
    }
]

client.on('ready', () => {

    const SelectMenu = new StringSelectMenuBuilder()
     .setCustomId('LanguageSelect')
     .setPlaceholder("Select an option")
     .setMinValues(0)
     .setMaxValues(1)
     .setOptions(choice.map((func) =>
        new StringSelectMenuOptionBuilder()
         .setLabel(func.label)
         .setDescription(func.description)
         .setValue(func.value)   
     ))
    const channel = client.channels.cache.get(process.env.CHANNELID);
    const actionRow = new ActionRowBuilder().addComponents(SelectMenu);

    channel.send({components: [actionRow]})

    client.on('interactionCreate', async (interaction) => {
        const RoleClaimed = new EmbedBuilder()
         .setTitle("Moderation")
         .setDescription(`you got ${interaction.values[0]} role!`)
         .setColor(2895667)
        const AlreadyHaveRole = new EmbedBuilder()
         .setTitle("Moderation")
         .setDescription(`you already have ${interaction.values[0]} role!`)
         .setColor(2895667)
        const AnotherRole = new EmbedBuilder()
         .setTitle("Moderation")
         .setDescription(`you already have another role!`)
         .setColor(2895667)

        if (!interaction.values.length) return;
        switch (interaction.values[0]) {
            case 'RU':
                if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(process.env.RU_ROLE_ID)) {
                    interaction.reply({embeds: [AlreadyHaveRole], ephemeral: true})
                } else if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(process.env.EU_ROLE_ID)) {
                    interaction.reply({embeds: [AnotherRole], ephemeral: true})
                } else {
                    await interaction.guild.members.cache.get(interaction.user.id).roles.add(process.env.RU_ROLE_ID);
                    interaction.reply({embeds: [RoleClaimed], ephemeral: true})
                }
                break;
            case'EU':
                if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(process.env.EU_ROLE_ID)) {
                    interaction.reply({embeds: [AlreadyHaveRole], ephemeral: true})
                } else if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has(process.env.RU_ROLE_ID)) {
                    interaction.reply({embeds: [AnotherRole], ephemeral: true})
                } else {
                    await interaction.guild.members.cache.get(interaction.user.id).roles.add(process.env.EU_ROLE_ID);
                    interaction.reply({embeds: [RoleClaimed], ephemeral: true})
                }
                break;
        };
    })
});

/** @type {import('commandkit').CommandOptions} */
module.exports = {}

client.login(process.env.TOKEN)
