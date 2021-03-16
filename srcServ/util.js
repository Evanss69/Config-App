const Util = {
    checkExistingConnection(connectionList, name) {
        var result = false;
        for (i = 0; i < connectionList.length; i++) {
            if (connectionList[i] == name) {
                result = true;
                //console.log(result);
                return result;
            }
        }
        //console.log(result);
        return result;
    }

}

module.exports = Util;