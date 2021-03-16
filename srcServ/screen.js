const Shell = require('child_process');
const ShellXrndr = require('child_process');
const { stderr } = require('process');
const xrandrParser = require('./parserXrandr');
const Screen = {

    init() {

    },

    getResolutionList() {

        return new Promise
            (
                (resolve, reject) => {

                    ShellXrndr.exec('xrandr', function (err, stdout, stderr) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            //parsage
                            var resolutionList = xrandrParser.parseXrandr(stdout);
                            //console.log(xrandrParser.parseXrandr(stdout));
                            resolve(resolutionList);
                        }
                    });
                });
    },

    updateConfig(dataConfig) {
        //console.log(dataConfig);
        return new Promise((resolve,reject)=>{
            var config = dataConfig;
            const modeChoice = config.mode.replace('@', ' --rate ');
            const screenInterface = config.name;
            req = 'xrandr --output ' + screenInterface + ' --mode ' + modeChoice;
            Shell.exec(req,(err,stdout,stderr)=>{
                if(err){
                    reject(err);
                }if (stdout.match(/^Error:/)){
                    reject(stdout);
                }else{
                    resolve(JSON.stringify({Result: 'ok'}))
                }
            });
        })
       
    },
}
module.exports = Screen;