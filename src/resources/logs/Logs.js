//import
const fs = require('fs');
const util = require('util');
const _config = require(`../Config.js`);

//class
class Logs {
    constructor(path = "/log") {
        const _date = new Date()
        const _file_name = _date.getUTCFullYear() + "-" + _date.getUTCMonth() + "-" + _date.getUTCDate() + "_" + _date.getUTCHours()

        this.path = __dirname + `${path}/${_file_name}.log`

        if (!fs.existsSync(this.path)) {
            this.new();
        } else {
            this.file = fs.readFileSync(this.path);
        }
    }

    async new() {
        if (_config.logs.mode) {
            await fs.createWriteStream(this.path, { flags: 'w' });

            this.file = await fs.readFileSync(this.path);

            await this.log("Logs file created.");
        }
    }

    async log(data, mode = 'log', showup = _config.logs.show) {
        if (_config.logs.mode) {
            switch (mode.toLowerCase()) {
                case 'err' || 'error':
                    if (showup) {
                        console.error(data);
                        data = new Error(data);
                    }
                case 'log':
                    if (showup) {
                        console.log(data);
                    }
                default:
                    this.file += `[${new Date().toISOString()}] <${String(mode).toLowerCase()}> "` + await util.format(data) + `"\n`;
                    break;
            }

            await fs.writeFileSync(this.path, this.file);
        }
    }

    async get(showup = _config.logs.show) {
        if (!fs.existsSync(this.path)) {
            const _getFile = String(this.file);
            const _getFile_split = _getFile.split("\n");

            if (showup) {
                console.log(_getFile_split);
            }

            return await util.format(_getFile_split);
        }
    }

    static async logSync(data, mode = 'log', showup = _config.logs.show){
        const newLog = new Logs();
        await newLog.log(data, mode, showup);
    }
}

//export
Logs.log = Logs.logSync;

module.exports.new = new Logs();
module.exports = Logs;