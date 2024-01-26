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
            label: 'Ban',
            description: 'Access blocked users',
            Value: 'ban',
        },
        {  
            label: 'Mute',
            description: 'Closed users voice muted',
            Value: 'mute',
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
        filter: (interaction) => i.user.id === interaction.user.id && i.customId === 'interaction.id',
        time: 60_000,
    });
    collector.on('collect', (interaction) =>{
        console.log(interacion.values);
    });
}



module.exports =  { data, run };

