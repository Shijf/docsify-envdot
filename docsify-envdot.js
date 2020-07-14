/*
 * @Github: https://github.com/shijf
 * @Author: shijf
 * @Date: 2020-07-14 15:32:05
 * @LastEditTime: 2020-07-14 17:09:00
 * @LastEditors: shijf
 * @Description: Load different parameters according to different environments and use {{}} or cunstom
 */
(function () {
    var config; // envdot 
    var startSymbol = '{{'; // default startSymbol
    var endSymbol = '}}';   // default endSymbol
    var env; // current environment

    /**
     * @description: setStartSymbol
     * @param { String } value startSymbol
     * @return: void
     */
    function setStartSymbol(value) {
        if (value) {
            startSymbol = value;
        }
    }
    /**
     * @description: setEndSymbol
     * @param { String } value endSymbol
     * @return: void
     */
    function setEndSymbol(value) {
        if (value) {
            endSymbol = value;
        }
    }
    /**
     * @description: init 
     * @param { Object } vm  
     * @return: void
     */
    function init(vm) {
        config = vm.config.env ? vm.config.env : undefined;
        env = config[config.current];
        config.interpolate && config.interpolate.startSymbol ? setStartSymbol(config.interpolate.startSymbol) : '';
        config.interpolate && config.interpolate.endSymbol ? setEndSymbol(config.interpolate.endSymbol) : '';
    }

    /**
     * @description: interpolateHandle
     * @param { String } content current page content
     * @return: worked content 
     */
    function interpolateHandle(content) {
        var regex = new RegExp(startSymbol + "(.*?)" + endSymbol, 'g');
        if (regex.test(content)) {
            var temp = content.match(regex);
            for (let index = 0; index < temp.length; index++) {
                var element = temp[index];
                // Remove  Symbol， just a temp
                var tempElement = element.replace(startSymbol, '');
                tempElement = tempElement.replace(endSymbol, '');
                // According to the text to the configuration to match, if not matching nothing
                if (env[tempElement]) {
                    content = content.replace(element, env[tempElement])
                }
            }
        }

        return content;
    }

    var install = function (hook, vm) {
        hook.beforeEach(function (content) {

            return interpolateHandle(content);
        });

        hook.mounted(function () {
            init(vm)
        });
    }

    $docsify.plugins = [].concat(install, $docsify.plugins);
})();