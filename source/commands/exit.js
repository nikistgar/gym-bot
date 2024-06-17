const { SlashCommandBuilder, ComponentType } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exit')
		.setDescription('Расписание качалки')
        .setDMPermission(true),
	async execute(interaction, client) {
        const queue = client.player.nodes.get(interaction.guild)

        queue.delete();

        interaction.reply("Bot left the channel")
    }
}