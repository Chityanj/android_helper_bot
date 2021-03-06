const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const BotUtils = require('../utils')

class BootlegController extends TelegramBaseController {

    triggerCommand($) {
        BotUtils.getRomFilter($, this.searchBuild)
    }

    searchBuild($) {

        if (!$.command.success || $.command.arguments.length === 0) {
            $.sendMessage("Usage: /bootleg device", {
                parse_mode: "markdown",
                reply_to_message_id: $.message.messageId
            });
            return;
        }

        var device = $.command.arguments[0];

        BotUtils.getSourceForgeBuilds($, BootlegController.romInfos(), device);

    }

    static romInfos() {
        return {
            fullName: "Bootleggers",
            extraSFPath: "builds/{0}",
            projectName: "bootleggersrom",
            website: ""
        }
    }

    get routes() {
        return {
            'bootlegBuildHandler': 'triggerCommand',
        }
    }
}



module.exports = BootlegController;
