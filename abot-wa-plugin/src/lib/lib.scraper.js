const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const FormData = require("form-data");
const { fromBuffer, fileTypeFromBuffer } = require("file-type");
global.creator = `@ahmuq – Ahlul Mukhramin`;

module.exports = class Scraper {
  /* Chat AI
   * @param {String} bid
   * @param {String} key
   * @param {String} text
   */
  chatAI = (bid, key, text) => {
    return new Promise(async (resolve) => {
      try {
        let json = await (
          await axios.get(
            "http://api.brainshop.ai/get?bid=" +
              bid +
              "&key=" +
              key +
              "&uid=neoxr&msg=" +
              encodeURI(text)
          )
        ).data;
        if (typeof json.cnt == "undefined")
          return resolve({
            creator: global.creator,
            status: false,
          });
        resolve({
          cretor: global.creator,
          status: true,
          msg: json.cnt,
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  /* Simsimi Chat
   * @param {String} text
   */
  simsimi = (text, lang = "id") => {
    return new Promise(async (resolve) => {
      try {
        let json = await (
          await axios.post(
            "https://simsimi.vn/web/simtalk",
            `text=${encodeURI(text)}&lc=${lang}`,
            {
              headers: {
                Accept: "*/*",
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
                Referer: "https://simsimi.net/",
                "User-Agent":
                  "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
              },
            }
          )
        ).data;
        if (json.success.match(new RegExp("Aku tidak mengerti", "g")))
          return resolve({
            creator: global.creator,
            status: false,
          });
        resolve({
          cretor: global.creator,
          status: true,
          msg: json.success,
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  /* Simsimi Chat V2
   * @param {String} text
   */
  simsimiV2 = (text) => {
    return new Promise(async (resolve) => {
      try {
        // https://simsimi.net/ & https://simsimi.info
        let json = await (
          await axios.get(
            "https://api.simsimi.net/v2/?text=" + encodeURI(text) + "&lc=id"
          )
        ).data;
        if (json.success.match(new RegExp("Aku tidak mengerti", "g")))
          return resolve({
            creator: global.creator,
            status: false,
          });
        resolve({
          cretor: global.creator,
          status: true,
          msg: json.success,
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  /* URL Shortener
   * @param {String} url
   */
  shorten = (url) => {
    return new Promise(async (resolve) => {
      try {
        let params = new URLSearchParams();
        params.append("url", url);
        let json = await (
          await fetch("https://s.nxr.my.id/api", {
            method: "POST",
            body: params,
          })
        ).json();
        if (json.error)
          return resolve({
            creator: global.creator,
            status: false,
          });
        resolve({
          creator: global.creator,
          status: true,
          data: {
            url: "https://s.nxr.my.id/r/" + json.data.code,
          },
        });
      } catch (e) {
        console.log(e);
        resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  /* Image Uploader (telegra.ph)
   * @param {Buffer} buffer
   */
  uploadImage = async (str) => {
    return new Promise(async (resolve) => {
      try {
        const image = Buffer.isBuffer(str)
          ? str
          : str.startsWith("http")
          ? await (
              await axios.get(str, {
                responseType: "arraybuffer",
              })
            ).data
          : str;
        const { ext } = await fromBuffer(image);
        let form = new FormData();
        form.append("file", Buffer.from(image), "image." + ext);
        const json = await (
          await axios.post("https://telegra.ph/upload", form, {
            headers: {
              Accept: "*/*",
              "User-Agent":
                "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
              Origin: "https://telegra.ph",
              Referer: "https://telegra.ph",
              "Referrer-Policy": "strict-origin-when-cross-origin",
              "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
              "sec-ch-ua-platform": "Android",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              ...form.getHeaders(),
            },
          })
        ).data;
        if (!json || json.length < 1)
          return resolve({
            creator: global.creator,
            status: false,
            msg: "Failed to upload!",
          });
        resolve({
          creator: global.creator,
          status: true,
          data: {
            url: "https://telegra.ph" + json[0].src,
          },
        });
      } catch (e) {
        console.log(e);
        resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  uploadImageXzn = (buffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { ext } = await fromBuffer(buffer);
        let form = new FormData();
        form.append("file", buffer, `${~~(Math.random() * 9e5)}.${ext}`);
        let response = await axios
          .post("https://xzn.wtf/up/upload", form, {
            headers: form.getHeaders(),
          })
          .catch((e) => e.response);
        resolve(response.data);
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  /* Image Uploader V2 (srv.neoxr.tk) [Temp]
   * @param {Buffer} buffer
   */
  uploadImageV2 = (buffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { ext } = await fromBuffer(buffer);
        let form = new FormData();
        form.append("someFiles", buffer, "tmp." + ext);
        let json = await (
          await fetch(`https://srv.neoxr.tk/api/upload`, {
            method: "POST",
            body: form,
          })
        ).json();
        resolve(json);
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  /* File Uploader (srv.neoxr.tk) [Permanent]
   * @param {Buffer} buffer
   */
  uploadFile = (buffer) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { ext } = await fromBuffer(buffer);
        let form = new FormData();
        form.append("someFiles", buffer, "file." + ext);
        let json = await (
          await fetch(`https://srv.neoxr.tk/v2/upload`, {
            method: "POST",
            body: form,
          })
        ).json();
        resolve(json);
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  /* Temp File Upload (file.io)
   * @param {Buffer} buffer
   * @param {String} name
   */
  uploadFileV2 = (buffer, name) => {
    return new Promise(async (resolve) => {
      try {
        if (!Buffer.isBuffer(buffer))
          return resolve({
            status: false,
          });
        let { ext } = (await fromBuffer(buffer)) || {};
        let extention = typeof ext == "undefined" ? "txt" : ext;
        let form = new FormData();
        form.append("file", buffer, name + "." + extention);
        const json = await (
          await fetch("https://file.io/", {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Accept-Language": "en-US,enq=0.9",
              "User-Agent": "GoogleBot",
            },
            body: form,
          })
        ).json();
        if (!json.success)
          return resolve({
            creator: global.creator,
            status: false,
          });
        delete json.success;
        delete json.status;
        resolve({
          creator: global.creator,
          status: true,
          data: json,
        });
      } catch (e) {
        resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  detailMahasiswa = (text) => {
    return new Promise(async (resolve) => {
      try {
        let json = await axios.get(
          "https://api-frontend.kemdikbud.go.id/detail_mhs/" + text
        );
        const data = json.data;
        resolve({
          cretor: global.creator,
          status: true,
          msg: data,
        });
      } catch (e) {
        console.log(e);
        resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  mahaSiswa = (text) => {
    return new Promise(async (resolve) => {
      try {
        let json = await axios.get(
          "https://api-frontend.kemdikbud.go.id/hit_mhs/" + text
        );
        const data = json.data;
        const result = [];
        for (const mahasiswa of data.mahasiswa) {
          const nama = mahasiswa.text.split("(")[0].trim();
          const nim = mahasiswa.text.match(/\((.*?)\)/)[1].trim();
          const prodi = mahasiswa.text.match(/Prodi: (.*?)(?=(,|$))/)[1].trim();
          const pt = mahasiswa.text.match(/PT : (.*?)(?=(,|$))/)[1].trim();
          const website_link = mahasiswa["website-link"].split("/").pop();

          const mahasiswaObj = {
            Nama: nama,
            Nim: nim,
            Prodi: prodi,
            Kampus: pt,
            id: website_link,
          };

          result.push(mahasiswaObj);
        }

        resolve({
          cretor: global.creator,
          status: true,
          msg: result,
        });
      } catch (e) {
        console.log(e);
        resolve({
          creator: global.creator,
          status: false,
          msg: e.message,
        });
      }
    });
  };

  goFile = (text) => {
    return new Promise(async (resolve) => {
      try {
        let json = await (
          await axios.get(
            "https://api.gofile.io/getContent?contentId=" +
              encodeURI(text) +
              "&token=LA7frN7agUl4YBLD7pFHhNRqWNu6FPFH" +
              "&websiteToken=7fd94ds12fds4"
          )
        ).data;
        resolve({
          cretor: global.creator,
          status: true,
          msg: Object.values(json.data.contents)[0].link,
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  sfileSearch = (query, page = 1) => {
    return new Promise(async (resolve) => {
      try {
        let res = await fetch(
          `https://sfile.mobi/search.php?q=${query}&page=${page}`
        );
        let $ = cheerio.load(await res.text());
        let result = [];
        $("div.list").each(function () {
          let title = $(this).find("a").text();
          let size = $(this).text().trim().split("(")[1];
          let link = $(this).find("a").attr("href");
          if (link) result.push({ title, size: size.replace(")", ""), link });
        });
        resolve({
          cretor: global.creator,
          status: true,
          msg: result,
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  sFileDl = (url) => {
    return new Promise(async (resolve) => {
      try {
        let res = await fetch(url);
        let $ = cheerio.load(await res.text());
        let filename = $("div.w3-row-padding").find("img").attr("alt");
        let mimetype = $("div.list").text().split(" - ")[1].split("\n")[0];
        let filesize = $("#download")
          .text()
          .replace(/Download File/g, "")
          .replace(/\(|\)/g, "")
          .trim();
        let download =
          $("#download").attr("href") +
          "&k=" +
          Math.floor(Math.random() * (15 - 10 + 1) + 10);
        resolve({
          cretor: global.creator,
          status: true,
          msg: { filename, filesize, mimetype, download },
        });
      } catch (e) {
        console.log(e);
        return resolve({
          creator: global.creator,
          status: false,
        });
      }
    });
  };

  ytPlay(text) {
    return new Promise((resolve, reject) => {
      let configd = {
        k_query: text,
        k_page: "mp3",
        q_auto: 1,
      };
      let headerss = {
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Cookie:
          'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
      };
      axios("https://www.y2mate.com/mates/analyzeV2/ajax", {
        method: "POST",
        data: new URLSearchParams(Object.entries(configd)),
        headers: headerss,
      })
        .then(({ data }) => {
          let v = data.vitems;
          var v2 = v[Math.floor(Math.random() * v.length)].v;
          let url = "https://www.youtube.com/watch?v=" + v2;
          let config = {
            url: "https://www.youtube.be/" + url,
            q_auto: 0,
            ajax: 1,
          };
          axios("https://www.y2mate.com/mates/en68/analyze/ajax", {
            method: "POST",
            data: new URLSearchParams(Object.entries(config)),
            headers: headerss,
          }).then(({ data }) => {
            const $ = cheerio.load(data.result);
            let img = $("div.thumbnail.cover > a > img").attr("src");
            let title = $("div.thumbnail.cover > div > b").text();
            let size = $(
              "#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)"
            ).text();
            let size_mp3 = $(
              "#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)"
            ).text();
            let id = /var k__id = "(.*?)"/.exec(data.result)[1];
            let idElement = $('input[data-extractor="youtube"]');
            let vid = idElement.attr("data-id");
            let configs = {
              type: "youtube",
              _id: id,
              v_id: vid,
              ajax: "1",
              token: "",
              ftype: "mp4",
              fquality: 480,
            };
            axios("https://www.y2mate.com/mates/en68/convert", {
              method: "POST",
              data: new URLSearchParams(Object.entries(configs)),
              headers: headerss,
            }).then(({ data }) => {
              const $ = cheerio.load(data.result);
              let link = $("div > a").attr("href");
              let configss = {
                type: "youtube",
                _id: id,
                v_id: vid,
                ajax: "1",
                token: "",
                ftype: "mp3",
                fquality: 128,
              };
              axios("https://www.y2mate.com/mates/en68/convert", {
                method: "POST",
                data: new URLSearchParams(Object.entries(configss)),
                headers: headerss,
              }).then(({ data }) => {
                const $ = cheerio.load(data.result);
                let audio = $("div > a").attr("href");
                resolve({
                  id: vid,
                  url: url,
                  title: title,
                  thumb: img,
                  size_mp3: size_mp3,
                  link: audio,
                });
              });
            });
          });
        })
        .catch(reject);
    });
  }
};
