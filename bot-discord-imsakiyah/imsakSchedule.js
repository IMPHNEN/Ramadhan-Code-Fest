const axios = require("axios");
const cheerio = require("cheerio");

async function imsakSchedule(city = "jakarta", date = null) {
  try {
    city = city.toLowerCase();
    const res = await axios.get(`https://www.kompas.com/ramadhan/jadwal-imsakiyah/kota-${city}`);
    const $ = cheerio.load(res.data);

    const title = $("body > div > div > div > div > div > div > div > div.jadwalimsak-wrap > div > div > h3")
      .text()
      .trim()
      .replace("\n                                        di", " di");

    let scheduleAll = [];

    // Convert table rows to JSON
    $("body > div > div > div > div > div > div > div > div.jadwalimsak-wrap > div > table tbody tr").each((index, rowElement) => {
      const row = {};
      $(rowElement)
        .find('td')
        .each((colIndex, colElement) => {
          const columnHeader = $("body > div > div > div > div > div > div > div > div.jadwalimsak-wrap > div > table thead th")
            .eq(colIndex)
            .text()
            .toLowerCase();
          row[columnHeader] = $(colElement).text().trim();
        });
      scheduleAll.push(row);
    });

    let schedule;
    if (date) {
      schedule = scheduleAll.filter((d) => {
        const regex = new RegExp(date, "g");
        let isMatch = regex.test(d.tgl);
        if(isMatch) return d;
      })
    }
    if(!schedule) schedule = scheduleAll;
    let result = {
      status: true,
      result: {
        title,
        schedule
      },
    };
    if(schedule.length < 1) return JSON.stringify({ status: false, error: { message: "Schedule data not found!" }}, null, 2);
    return JSON.stringify(result, null, 2);
  } catch (e) {
    return { status: false, error: { message: e } };
  }
}

module.exports = imsakSchedule;