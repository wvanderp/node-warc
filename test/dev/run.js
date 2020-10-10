"use strict";
exports.__esModule = true;
var Warc = require('../../src/warc');
var axios = require("axios");
var archive = new Warc();
axios.get("https://jsonplaceholder.typicode.com/todos/1").then(function (res) {
    archive.addAxios(res);
});
console.log(archive.getWarcSize());
