const settings = require('../../settings');
const pool = require('../../database');
const { discordBot } = require('../../settings/config');

const memberHasBeganStreaming = async (member, streamingRole) => {
  const streamsChannel = member.guild.channels.find(r => r.name === 'streams');
  member.addRole(streamingRole);
  try {
    await pool(async (conn) => {
      const [isAlreadyStreaming] = await conn.query(
        'SELECT * FROM streaming WHERE member_id = ?',
        [member.id],
      );
      if (!isAlreadyStreaming) {
        const streamsChannelMessage = `<@!${member.id}> is streaming OSM! ${
          member.presence.game.url
        }`;
        const sentMessage = await streamsChannel.send(streamsChannelMessage);
        const newStreamer = {
          member_id: member.id,
          message_id: sentMessage.id,
        };
        await conn.query('INSERT INTO streaming SET ?', [newStreamer]);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const memberHasStoppedStreaming = async (member, streamingRole) => {
  const streamsChannel = member.guild.channels.find(r => r.name === 'streams');
  member.removeRole(streamingRole);
  try {
    await pool(async (conn) => {
      const [messageData] = await conn.query(
        'SELECT message_id as messageId FROM streaming WHERE member_id = ?',
        [member.id],
      );
      if (messageData && messageData.messageId) {
        const message = await streamsChannel.fetchMessage(messageData.messageId);
        await conn.query('DELETE FROM streaming WHERE member_id = ?', [
          member.id,
        ]);
        await message.delete();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const isBannedStreamer = async username => new Promise(async (resolve) => {
  try {
    await pool(async (conn) => {
      const [bannedStreamer] = await conn.query(
        'SELECT * FROM osmwebsite.banned_streamers WHERE username = ?',
        [username],
      );
      if (bannedStreamer) {
        return resolve(true);
      }
    });
  } catch (err) {
    console.log(err);
  }

  return resolve(false);
});

const checkIfStreaming = async (oldMember, newMember) => {
  let oldMemberGame;
  let newMemberGame;
  try {
    if (!oldMember) {
      newMemberGame = newMember.user.presence.game;
    } else {
      oldMemberGame = oldMember.presence.game;
      newMemberGame = newMember.presence.game;
    }
  } catch (err) {
    /* */
  }
  const streamingRole = newMember.guild.roles.find(r => r.name === 'Streaming');
  const memberHasStreamingRole = newMember.roles.has(streamingRole.id);
  let oldMemberWasStreaming = false;
  let newMemberIsStreaming = false;
  if (oldMemberGame) {
    oldMemberWasStreaming = oldMemberGame.streaming;
  }
  if (newMemberGame) {
    newMemberIsStreaming = newMemberGame.streaming;
  }
  const stillStreaming = oldMemberWasStreaming && newMemberIsStreaming;
  const beganStreaming = !oldMemberWasStreaming && newMemberIsStreaming;
  const wasStreamingAndStopped = oldMemberWasStreaming && !newMemberIsStreaming;
  if (stillStreaming || beganStreaming) {
    const streamingTitle = newMember.presence.game.name;
    const streamingGame = newMember.presence.game.details;
    const streamingUrl = newMember.presence.game.url;
    const streamingUsername = streamingUrl.substring('https://www.twitch.tv/'.length);
    if (
      streamingTitle.toLowerCase().startsWith(settings.twitch.gameTag) &&
      (streamingGame === 'MapleStory' ||
        settings.twitch.featuredStreamers.includes(streamingUsername))
    ) {
      const isBanned = await isBannedStreamer(streamingUsername);
      if (!isBanned) {
        await memberHasBeganStreaming(newMember, streamingRole);
      }
    } else if (memberHasStreamingRole) {
      await memberHasStoppedStreaming(newMember, streamingRole);
    }
  } else if (wasStreamingAndStopped) {
    await memberHasStoppedStreaming(newMember, streamingRole);
  } else if (memberHasStreamingRole) {
    await memberHasStoppedStreaming(newMember, streamingRole);
  }
};

module.exports = async (oldMember, newMember, bot) => {
  if (!bot) {
    await checkIfStreaming(oldMember, newMember);
  } else {
    const channel = bot.guilds.find(item => item.name === discordBot.channelName);
    channel.members.forEach(async (discordMember) => {
      await checkIfStreaming(null, discordMember);
    });
  }
};
