const { 
    RoleSelectMenuBuilder, 
    ActionRowBuilder,
    ComponentType, 
} = require('discord.js');


const data = { 
    name: "select",
    description: "Show select meneu role",
};

/** 
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
*/
async function run ({ interaction }) {

    const roleMenu = new RoleSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setMinValues(0)
    .setMaxValues(3);


    const ActionRow = new ActionRowBuilder().setComponents(roleMenu);

   const reply = await interaction.reply( { components: [ActionRow] });

   const collector = reply.createMessageComponentCollector( { 
    componentType: ComponentType.RoleSelect,
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

