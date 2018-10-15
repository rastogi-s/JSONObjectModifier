module.exports = function (app) {

    const md5 = require('md5');
    const fs = require("fs");
    const {promisify} = require('util');
    const readFileAsync = promisify(fs.readFile);
    const writeFileAsync = promisify(fs.writeFile);
    const fileName = "./jsonobject.json";

    // configure end points.
    app.post('/api/objects', createObject);
    app.put('/api/objects/:uid', updateObject);
    app.get('/api/objects/:uid', getObjectById);
    app.get('/api/objects', getAllObjects);
    app.delete('/api/objects/:uid', deleteObject);


    /**
     * Creates new object.
     *
     * @param req request object.
     * @param res response object.
     */
    function createObject(req, res) {
        var obj = req.body;
        if (!isEmpty(obj))
            writeToJSONFile(obj, res);
        else
            res.status(400).json({
                "verb": req.method,
                "url": req.protocol + '://' + req.get('host') + req.originalUrl,
                "message": "Object is Empty!"
            });
    }

    /**
     * Write to a json file.
     *
     * @param obj object to be written to the file.
     * @param res response object.
     * @param uid unique id of the object [ only in case of PUT request.]
     */

    function writeToJSONFile(obj, res, uid = null) {
        let jsonObject = {
            list: []
        };

        readFile().then(data => {
            var fileData = JSON.parse(data);
            if (fileData != undefined && fileData.list != undefined)
                jsonObject.list = fileData.list;
            if (uid === null) {
                let randomNum = Math.floor(Math.random() * 100);
                if (jsonObject.list.length === 0)
                    uid = md5(1 + JSON.stringify(obj) + randomNum);
                else
                    uid = md5(jsonObject.list.length + 1 + JSON.stringify(obj) + randomNum);

                obj['uid'] = uid;
                jsonObject.list.push(obj);
            } else {
                obj['uid'] = uid;
                var index = jsonObject.list.findIndex(object =>
                    object.uid === uid
                );

                if (index > -1)
                    jsonObject.list[index] = obj;
                else
                    jsonObject.list.push(obj);
            }
            return jsonObject;
        }).then((jsonObject) =>
            writeFile(jsonObject)).then(() =>
            res.status(200).json(obj)).catch(error =>
            console.log(error));

    }

    /**
     * Updates existing or creates a new object.
     *
     * @param req request object.
     * @param res response object.
     */
    function updateObject(req, res) {
        var uid = req.params['uid'];
        var obj = req.body;
        if (!isEmpty(obj)) {
            if (uid != null && uid != undefined)
                writeToJSONFile(obj, res, uid);
            else
                res.status(400).json({
                    "verb": req.method,
                    "url": req.protocol + '://' + req.get('host') + req.originalUrl,
                    "message": "UID of the object is either null or undefined"
                });
        } else
            res.status(400).json({
                "verb": req.method,
                "url": req.protocol + '://' + req.get('host') + req.originalUrl,
                "message": "Object is Empty!"
            });
    }


    /**
     * Fetches a new object corresponding to an uid.
     *
     * @param req request object.
     * @param res response object.
     */
    function getObjectById(req, res) {
        var uid = req.params['uid'];
        readFile().then(data => {
            let jsonObj = JSON.parse(data);
            if (jsonObj !== undefined && jsonObj.list !== undefined) {
                let index = jsonObj.list.findIndex(obj => obj.uid === uid);
                if (index > -1)
                    res.status(200).json(jsonObj.list[index]);
                else
                    res.status(404).json({
                        "verb": req.method,
                        "url": req.protocol + '://' + req.get('host') + req.originalUrl,
                        "message": "No object to corresponding uid was found."
                    });
            }
        })
    }


    /**
     * Fetches a new object corresponding to a uid.
     *
     * @param req request object.
     * @param res response object.
     */
    function getAllObjects(req, res) {
        readFile().then(data => {
            let jsonObj = JSON.parse(data);
            if (jsonObj !== undefined && jsonObj.list !== undefined && jsonObj.list.length !== 0)
                res.status(200).json(jsonObj.list);
            else
                res.status(404).json({
                    "verb": req.method,
                    "url": req.protocol + '://' + req.get('host') + req.originalUrl,
                    "message": "No object present."
                });
        })
    }

    /**
     * Fetches a new object corresponding to a uid.
     *
     * @param req request object.
     * @param res response object.
     */
    function deleteObject(req, res) {
        var uid = req.params['uid'];
        readFile().then(data => {
            let jsonObj = JSON.parse(data);
            if (jsonObj !== undefined && jsonObj.list !== undefined) {
                let index = jsonObj.list.findIndex(obj => obj.uid === uid);
                if (index > -1) {
                    jsonObj.list.splice(index, 1);

                }
                return jsonObj;
            }
        }).then((jsonObject) =>
            writeFile(jsonObject)).then(() =>
            res.sendStatus(200)).catch(error =>
            console.log(error));
    }


    /**
     *  Writes a json object to the file.
     *
     * @param jsonObject
     * @returns Promise a promise object.
     */
    function writeFile(jsonObject) {

        return writeFileAsync(fileName, JSON.stringify(jsonObject));
    }

    /**
     *  Reads a json object from the file.
     *
     * @param jsonObject
     * @returns Promise a promise object.
     */
    function readFile() {
        return readFileAsync(fileName, 'utf-8');
    }


    /**
     * Checks if the object is Empty or not.
     *
     * @param obj object
     * @returns {boolean}
     */
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}
;
