const Shell = require('child_process');

const Screen = {

    init() {

    },
    updateConfig(dataConfig) {
        var config = dataConfig[0];
        const modeChoice = config.value.replace('@', ' --rate ');
        const screenInterface = config.name;
        req = 'xrandr --output ' + screenInterface + ' --mode ' + modeChoice;
        Shell.execSync(req);
    },
}
module.exports = Screen;