const { Player, useMainPlayer} = require('discord-player');
const { BridgeProvider, BridgeSource, SpotifyExtractor, SoundCloudExtractor } = require('@discord-player/extractor');
const { YandexMusicExtractor } = require("discord-player-yandexmusic");
const { music } = require(process.env.RESOURCE_PATH + '/source/messages')
const { SlashCommandBuilder, ComponentType } = require('discord.js');

require('dotenv').config();
module.exports = (client) => {
    client.music = async (client) => {
        const bridgeProvider = new BridgeProvider(BridgeSource.SoundCloud);

        client.player = new Player(client, {
            ytdlOptions: {
                quality: "highestaudio",
                highWaterMark: 1 << 25
            }
        });


        client.player.extractors.register(YandexMusicExtractor, { access_token: `${process.env.YANDEX_TOKEN}`, uid: `${process.env.YANDEX_UID}` })
        await client.player.extractors.register(SoundCloudExtractor)
        await client.player.extractors.register(SpotifyExtractor, {
            bridgeProvider
        });

        client.player.events.on('playerStart', async (queue, track) => {
            const sendmusic = await queue.metadata.channel.send({components: [music], content: `Started playing **${track.cleanTitle}**!`});

            const collector = sendmusic.createMessageComponentCollector({
                ComponentType: ComponentType.Button,
            })

            collector.on('collect', async (interaction) => {
                await interaction.deferUpdate();
                if (interaction.customId == `pause`)
                {
                    queue.node.pause();
                }
                else if (interaction.customId == `resume`)
                {
                    queue.node.resume();
                }
                else if (interaction.customId == `skip`)
                {
                    queue.node.skip();
                }
            })
            });
        };
    }
