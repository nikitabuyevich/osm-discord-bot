module.exports.updateDiscordCharacterDetailsEvery = '*/30 * * * *';
module.exports.checkForStreamersEvery = '*/5 * * * *';
module.exports.checkForNitroBoostEvery = '*/5 * * * *';

module.exports.momentDateFormat = 'YYYY-MM-DD HH:mm:ss';

module.exports.automatedType = {
  VOTE: 'vote',
  DONATION: 'donation',
  STREAM: 'stream',
  NITRO_BOOST: 'nitro boost',
  VIDEO: 'video',
  REPORT: 'repot',
  REFERRAL: 'referral',
};

module.exports.voting = {
  amount: (currentVoteStreak) => {
    let voteStreak = currentVoteStreak;
    if (voteStreak > 11) {
      voteStreak = 11;
    }

    const voteStreakMultiplier = 25;
    const baseAmount = 250 - voteStreakMultiplier;
    const voteStreakBonus = voteStreak * voteStreakMultiplier;
    return baseAmount + voteStreakBonus;
  },
  note: (username, voterIp, clientIp) =>
    `Automated Voting. Username receiving points: ${username} | Voter IP: ${voterIp} | GTOP IP: ${clientIp}`,
  cashtype: 'maplecash',
};

module.exports.nitroBoost = {
  checkForNitroBoostEveryInMinutes: 5,
  rewardEveryXAmountOfMinutes: 10080, // 7 Days
  rewardForNitroBoost: 3000,
  rewardCashType: 'maplecash',
  note: totalNumberOfMinutesWithNitroBoost => `Automated Nitro Boost. Nitro boosted for a total of ${totalNumberOfMinutesWithNitroBoost} minutes now.`,
};

module.exports.twitch = {
  gameTag: '[osm]',
  featuredStreamers: [],
};

module.exports.youtube = {
  discordChannel: {
    id: 'CHANGE_THIS_TO_SOME_ID',
    secret: 'CHANGE_THIS_TO_SOME_SECRET',
  },
  apiKey: 'CHANGE_THIS_TO_SOME_API_KEY',
  gameTagToLookFor: '[OSM]',
  rewardForCreatingVideo: 500,
  bannedChannelIds: [],
};

module.exports.incidents = {
  type: {
    BAN: 'ban',
    KICK: 'kick',
    MUTE: 'mute',
  },
};

module.exports.baseAPIUrl = 'https://oldschoolmaple.com/api/v1';
