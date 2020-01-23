![Logo of OSM](./logo.png)

# Old School Maple's Discord Bot &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)
> This project was originally created as part of Old School Maple (OSM), an Old School MapleStory private server which aimed to provide the most authentic and nostalgic GMS circa 2005-2007 MapleStory experience.

A general purpose Discord bot with a multitude of features.

## Features

The following features are meant to be used alongside a MapleStory private server and [OSM's Website](http://github.com/nikitabuyevich/osm-website).

* Track and reward users who `Nitro Boost` the Discord server.
* View the next time a user will receive their reward for `Nitro Boosting` the Discord server.
* Track a user's in-game level, job, and rank by setting their IGN as their Discord nickname.
* Mute, kick, and ban users.
* Ban/Unban streamers from appearing on the featured streamers list.
* Check the status of a coupon code.
* Clear multiple posts in the chat.
* Set and unset server messages in-game through Discord.
* Host random giveaways for Discord users to join. At the end of a giveaway, one or more winners are selected and rewarded with a coupon code.
* Generate new coupon codes to give away to anyone.
* Report a Discord user to the staff.
* Have the Discord bot say any message for you.
* Get the current time of the server.
* Manually link a `YouTube` video to be featured on the front page.
* Manually reward a player with a vote.
* Display a welcome message to anyone joining the server.
* Display a list of commands for normal and staff users.
* Display a list of frequently asked questions.
* Display information on how to get featured as a streamer.
* Display a list of common issues players have with launching the game.
* Display the referral link of a user who has connected their IGN to their Discord.
* Display a list of tips for new players.
* Display some basic information on the server.

## Note

This project likely contains some extra and unnecessary code and hasn't been thoroughly tested or optimized.

## Getting Started

First, import the [OSM Database](http://github.com/nikitabuyevich/osm-database) and retrieve the `discord` schema. That will contain the necessary tables this application requires.

Then to launch the Discord bot:

```bash
git clone https://github.com/nikitabuyevich/osm-discord-bot
cd osm-discord-bot/
npm install
npm start
```

### Prerequisites

* [Node - at least v11.x](https://nodejs.org/en/) - A JavaScript runtime environment that executes JavaScript code outside of a browser.
* [MySQL - v5.7.x](https://www.mysql.com/) - A relational database management system.
* [OSM Database](http://github.com/nikitabuyevich/osm-database) - Old School Maple's database structure.

### Configuration

Make sure to update all the variables inside the `settings/config.js` and `settings/index.js` files which start with `CHANGE_THIS_TO_*` to their appropriate values.

### Coding Style

This project utilizes [ESLint](https://eslint.org/) to uphold coding standards. You can view the configured ESLint settings inside the [.eslintrc.json](.eslintrc.json) file.

## Deployment

The easiest way to deploy and host this bot would be to:

* Install [Node](https://nodejs.org/en/) on a server.
* Run `npm install pm2 -g` to install [pm2](https://pm2.keymetrics.io/).
* Clone this repo and `cd` into its directory.
* Run `pm2 start bot.js --watch` - This will launch the bot and have it run in the background. Any new code changes will restart the instance.
* Run `pm2 save` - Will save the current settings of `pm2`.
* Run `pm2 startup` - Will run `pm2` on system startup.

## Built With

* [Babel](https://babeljs.io/) - Convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines.

## Authors

* **Nikita Buyevich** _(Roar / asdf)_ - [nikitabuyevich](https://github.com/nikitabuyevich)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

* Some code has been referenced from [Stan Barkmeijer's Discord.js Bot YouTube series](https://www.youtube.com/playlist?list=PLdnyVeMcpY78Hz8fFD1vqhYliBmZKaa7N).
