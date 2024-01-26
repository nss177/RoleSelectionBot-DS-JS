const { 
    ChannelSelectMenuBuilder, 
    ActionRowBuilder,
    ComponentType, 
    ChannelType,
} = require('discord.js');


const data = { 
    name: "show-channel",
    description: "Show channel using shannel select menu",
};

/** 
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
*/
async function run ({ interaction }) {

    const channelMenu = new ChannelSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setMinValues(0)
    .setMaxValues(3)
    .setChannelTypes(ChannelType.GuildText)


    const ActionRow = new ActionRowBuilder().setComponents(channelMenu);

   const reply = await interaction.reply( { components: [ActionRow] });

   const collector = reply.createMessageComponentCollector( { 
    componentType: ComponentType.ChannelSelect,
    filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
    time: 60_000
});

    collector.on('collect', (interaction) => {
        if (!interaction.values.length) {
        interaction.reply('You have emptied your selection.');
        return;
        }

        interaction.reply(`You have now selected: ${interaction.values.join(`, `)} `
        );
});

}

module.exports =  { data, run };

