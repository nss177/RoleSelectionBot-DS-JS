const { 
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType 
} = require('discord.js');


const data = { 
    name: "showrole",
    description: "Show a role",
};

/** 
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
*/
async function run ({ interaction }) {
    const role = [
        {  
            label: 'Ru',
            description: 'Country: Russia',
            Value: 'ru',
        },
        {  
            label: 'Eu',
            description: 'Country: Pendosyan',
            Value: 'eu',
        },
    ];

    const SelectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Pick a role')
    .setMinValues(0)
    .setMaxValues(role.length)
    .addOptions(
        role.map((banan) =>
     new StringSelectMenuOptionBuilder()
     .setLabel(banan.label)
     .setDescription(banan.description)
     .setValue(banan.Value)
        )
     );

     const ActionRow = new ActionRowBuilder().addComponents(SelectMenu);

   const reply = await interaction.reply({components: [ActionRow]});
    
    const collector = reply.createMessageComponentCollector({
        ComponentType: ComponentType.StringSelect,
        filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
        time: 60_000,
    });
    collector.on('collect', (interaction) =>{
        if (!interaction.values.length) {
            interaction.reply('You have emptied your selection');
            return;
        }

        interaction.reply(
            `You have now selected: ${interaction.values.join(', ')}`
        )

    });

}



module.exports =  { data, run };

