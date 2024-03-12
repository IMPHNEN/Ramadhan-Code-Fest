const fetch = require("node-fetch");

const fetchJson = async (url, head = {}) => {
  try {
    const result = await (
      await fetch(url, {
        headers: head,
      })
    ).json();
    return result;
  } catch (e) {
    return {
      status: false,
    };
  }
};

module.exports = class NeoxrApi {
  baseUrl = "https://api.lolhuman.xyz";
  apiKey = null;

  constructor(apiKey) {
    this.apiKey = apiKey || "";
  }

  getCuaca = async (text) => {
    let json = await fetchJson(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        text +
        "&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273"
    );
    return json;
  };

  ig = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/instagram?apikey=ahmuq&url=" + url
    );
    return json;
  };

  ytplayv2 = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/ytplay?apikey=ahmuq" + "&query=" + text
    );
    return json;
  };

  ytVideo = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/ytvideo?apikey=ahmuq&url=" + url
    );
    return json;
  };

  spotifySearch = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/spotifysearch?apikey=ahmuq&query=" + text
    );
    return json;
  };

  dalle = async (text) => {
    return this.baseUrl + "/api/dall-e?apikey=ahmuq&text=" + text;
  };

  routeMap = async (from, to) => {
    let json = await fetchJson(
      this.baseUrl + "/api/travelroute?apikey=ahmuq&from=" + from + "&to=" + to
    );
    return json;
  };

  urlToImg = async (url) => {
    return this.baseUrl + "/api/urltoimg?apikey=ahmuq&url=" + url;
  };

  gdrive = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/downloader/gdrive?apikey=" + this.apiKey + "&url=" + url
    );
    return json;
  };

  animeDl = async (url) => {
    let json = await fetchJson(
      "https://xzn.wtf/api/oploverzdl?url=" + url + "&apikey=ahmuq"
    );
    return json;
  };

  sticker = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/stickerwa?apikey=ahmuq&query=" + text
    );
    return json;
  };

  animeSearch = async (text) => {
    let json = await fetchJson(
      "https://xzn.wtf/api/oploverz?search=" + text + "&apikey=ahmuq"
    );
    return json;
  };

  fbdl = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/facebook?apikey=ahmuq&url=" + url
    );
    return json;
  };

  gImage = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/gimage2?apikey=ahmuq&query=" + text
    );
    return json;
  };

  mediafire = async (url) => {
    let json = await fetchJson(
      this.baseUrl +
        "/downloader/mediafire?apikey=" +
        this.apiKey +
        "&url=" +
        url
    );
    return json;
  };

  igs = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/igstory/jeromepolin" + text + "?apikey=ahmuq"
    );
    return json;
  };

  chatgptv2 = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/openai-turbo?apikey=ahmuq&text=" + text
    );
    return json;
  };

  chatgptv3 = async (text) => {
    let json = await fetchJson(
      "https://xzn.wtf/api/openai?text=" + text + "&apikey=ahmuq"
    );
    return json;
  };

  teraboxDl = async (url) => {
    let json = await fetchJson("https://xzn.wtf/api/teraboxdl?url=" + url);
    return json;
  };

  tiktok = async (url) => {
    let json = await fetchJson(
      "https://api.tiklydown.me" + "/api/download?url=" + url
    );
    return json;
  };

  tiktokSlide = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/tiktokslide?apikey=ahmuq&url=" + url
    );
    return json;
  };

  stickerTele = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/telestick?apikey=ahmuq" + "&url=" + url
    );
    return json;
  };

  chordSearch = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/chord?apikey=ahmuq" + "&query=" + text
    );
    return json;
  };

  randomMeme = async () => {
    let json = await fetchJson("https://xzn.wtf/api/randommeme?apikey=ahmuq");
    return json;
  };

  infoGempa = async () => {
    let json = await fetchJson(this.baseUrl + "/api/infogempa?apikey=ahmuq");
    return json;
  };

  attp = async (text) => {
    return this.baseUrl + "/api/attp?apikey=ahmuq&text=" + text;
  };

  animeupdate = async () => {
    let json = await fetchJson(
      "https://xzn.wtf/api/oploverz/ongoing?apikey=ahmuq"
    );
    return json;
  };

  bypassOuo = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/ouo?apikey=ahmuq" + "&url=" + url
    );
    return json;
  };

  ssweb = async (url) => {
    return this.baseUrl + "/api/ssweb?apikey=ahmuq" + "&url=" + url;
  };

  jadwalSholat = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/sholat/" + text + "?apikey=ahmuq"
    );
    return json;
  };

  imgToText = async (img) => {
    let json = await fetchJson(
      this.baseUrl + "/api/ocr?apikey=ahmuq&img=" + img
    );
    return json;
  };

  niatSholat = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/niatsholat/" + text + "?apikey=ahmuq"
    );
    return json;
  };

  lirikLagu = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/lirik?apikey=ahmuq" + "&query=" + text
    );
    return json;
  };

  playstoreDl = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/apkdownloader?apikey=ahmuq" + "&package=" + text
    );
    return json;
  };

  tiktokstalk = async (username) => {
    let json = await fetchJson(
      "https://xzn.wtf" + "/api/ttstalk?user=" + username + "&apikey=ahmuq"
    );
    return json;
  };

  igstalk = async (username) => {
    let json = await fetchJson(
      this.baseUrl + "/api/stalkig/" + username + "?apikey=ahmuq"
    );
    return json;
  };

  upscaleImg = async (url) => {
    return this.baseUrl + "/api/upscale?apikey=ahmuq" + "&img=" + url;
  };

  spotifydl = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/spotify?apikey=ahmuq" + "&url=" + url
    );
    return json;
  };

  imagetopdf = async (url) => {
    return this.baseUrl + "/api/convert/imgtopdf?apikey=ahmuq" + "&img=" + url;
  };

  githubstalk = async (username) => {
    let json = await fetchJson("https://api.github.com" + "/users/" + username);
    return json;
  };

  playYt = async (text) => {
    let json = await fetchJson(
      "https://saipulanuar.ga/api/yt/playmp3?query=" + text
    );
    return json;
  };

  kisahNabi = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/kisahnabi/" + text + "?apikey=ahmuq"
    );
    return json;
  };

  igs = async (username) => {
    let json = await fetchJson(
      this.baseUrl + "/api/igstory/" + username + "?apikey=ahmuq"
    );
    return json;
  };

  removeBG = async (url) => {
    return this.baseUrl + "/api/removebg?apikey=" + "ahmuq" + "&img=" + url;
  };

  toAnime = async (url) => {
    return this.baseUrl + "/api/imagetoanime?apikey=" + "ahmuq" + "&img=" + url;
  };

  toWebtoon = async (url) => {
    let json = await fetchJson(
      "https://xzn.wtf" + "/api/aiwebtoon?url=" + url + "&apikey=ahmuq"
    );
    return json;
  };

  dlAnime = async (url) => {
    return url;
  };

  stalkTwitter = async (username) => {
    let json = await fetchJson(
      this.baseUrl + "/api/twitter/" + username + "?apikey=ahmuq"
    );
    return json;
  };

  twtVideo = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/twitter?apikey=ahmuq" + "&url=" + url
    );
    return json;
  };

  translate = async (bahasa, text) => {
    let json = await fetchJson(
      this.baseUrl +
        "/api/translate/auto/" +
        bahasa +
        "?apikey=ahmuq&text=" +
        text
    );
    return json;
  };

  ytSearch = async (text) => {
    let json = await fetchJson(
      this.baseUrl + "/api/ytsearch?apikey=ahmuq" + "&query=" + text
    );
    return json;
  };

  twtImg = async (url) => {
    let json = await fetchJson(
      this.baseUrl + "/api/twitterimage?apikey=ahmuq" + "&url=" + url
    );
    return json;
  };

  cekResi = async (resi) => {
    let json = await fetchJson(
      this.baseUrl + "/api/checkresi?apikey=ahmuq" + "&resi=" + resi
    );
    return json;
  };

  randomAnime = async () => {
    return this.baseUrl + "/randomanime/neko?apikey=" + this.apiKey;
  };
};
