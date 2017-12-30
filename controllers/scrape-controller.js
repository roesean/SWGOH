const cheerio = require('cheerio');
const axios = require('axios');

function characterList(req, res) {
  axios.get('https://swgoh.gg/')
    .then(function (response) {

      const $ = cheerio.load(response.data)
      var characterList = $('.media-heading h5');
      var urlNames = []

      for(var i = 0; i < characterList.length; i++){
        urlNames.push($(characterList[i]).text()
                                         .toLowerCase()
                                         .replace(/[()"']/g, '')
                                         .replace(/( - )/g, '-')
                                         .replace(/[" "]/g, '-'))
      }

      res.json(urlNames)
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = { characterList }
