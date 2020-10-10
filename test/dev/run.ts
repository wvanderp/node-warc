import {AxiosResponse} from "axios";

const Warc = require('../../src/warc');
const axios = require("axios");

const archive = new Warc();

axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res: AxiosResponse) => {
   archive.addAxios(res);
   archive.writeWarc('./test.warc')
   console.log(archive.getWarcSummary());
});



