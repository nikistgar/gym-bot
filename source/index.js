require('dotenv').config();
const { AttachmentBuilder, EmbedBuilder, Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ComponentType, ButtonInteraction } = require('discord.js');
const { schedulepng, day1png, day2png, day3png, day4png, daycpng,
        scheduleembed, day1embed, day2embed, day3embed, day4embed,
        daycembed, day1button, day2button, day3button, day4button, daycbutton,
        schedulebuttons} = require('./messages')

const client = new Client({
 intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildScheduledEvents,
 ]
});
const prefix = '.';

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online`);
    // client.channels.cache.get('1059499932404433030').send({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] });
});

client.on('messageCreate', async (message) => {
    if (message.author.id === '418792454922305557')
    {
        if (message.content.includes('размут'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('раз'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('мут'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('<@422829728681033739>'))
        {
            message.delete();
            return;
        }
    }
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content !== prefix + 'расписание') return;

    const reply = await message.reply({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] })

    // const filter = (i) => i.user.id === message.author.id;

    const collector = reply.createMessageComponentCollector({
        ComponentType: ComponentType.Button,
        // filter
    });

    collector.on('collect', async (interaction) => {
        await interaction.deferUpdate();
        switch(interaction.customId){
            case 'day1':
                await interaction.message.edit({ embeds: [day1embed], components:[schedulebuttons], files: [day1png] });
                return;
            case 'day2':
                await interaction.message.edit({ embeds: [day2embed], components:[schedulebuttons], files: [day2png] });
                return;
            case 'day3':
                await interaction.message.edit({ embeds: [day3embed], components:[schedulebuttons], files: [day3png] });
                return;
            case 'day4':
                await interaction.message.edit({ embeds: [day4embed], components:[schedulebuttons], files: [day4png] });
                return;
            case 'dayc':
                await interaction.message.edit({ embeds: [daycembed], components:[schedulebuttons], files: [daycpng] });
                return;
        }
    })
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content !== prefix + 'расписание') return;
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'schedule') {
    const reply = await interaction.reply({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] })
  
      const collector = reply.createMessageComponentCollector({
          ComponentType: ComponentType.Button,
      });
  
      collector.on('collect', async (interaction) => {
          await interaction.deferUpdate();
          switch(interaction.customId){
            case 'day1':
                await interaction.message.edit({ embeds: [day1embed], components:[schedulebuttons], files: [day1png] });
                return;
            case 'day2':
                await interaction.message.edit({ embeds: [day2embed], components:[schedulebuttons], files: [day2png] });
                return;
            case 'day3':
                await interaction.message.edit({ embeds: [day3embed], components:[schedulebuttons], files: [day3png] });
                return;
            case 'day4':
                await interaction.message.edit({ embeds: [day4embed], components:[schedulebuttons], files: [day4png] });
                return;
            case 'dayc':
                await interaction.message.edit({ embeds: [daycembed], components:[schedulebuttons], files: [daycpng] });
                return;
          }
      })
    }

    if (interaction.commandName === 'startgym') {
        
    }

  });

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.author.bot) {
        return;
    }
    if (message.content === 'Привет')
    {
        message.reply();
    }
});

client.login(process.env.TOKEN);