const cheerio = require('cheerio');
const axios = require('axios');

function characterList() {
  axios.get('https://swgoh.gg/')
    .then(function (response) {
      console.log("=====================");
      console.log("      RESPONSE       ");
      console.log("=====================");
      console.log(response.data);

      const $ = cheerio.load(response.data)

      console.log($('li.media.list-group-item.p-0.character'));

    })
    .catch(function (error) {
      console.log("=====================");
      console.log("       ERROR         ");
      console.log("=====================");
      console.log(error);
    });
}

module.exports = { characterList }
