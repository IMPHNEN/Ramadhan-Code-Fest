require("dotenv").config()

const { Client, ApplicationCommandOptionType, EmbedBuilder } = require("discord.js")
const client = new Client({ intents: 3276799 })

const imsakSchedule = require("./imsakSchedule")
const moment = require("moment")

client.on("ready", c => {
  client.application.commands.set([{
    name: "imsakiyah",
    description: "Jadwal Imsakiyah",
    options: [
      {
        name: "kota",
        description: "Masukkan kota",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "tanggal",
        description: "Masukkan tanggal dalam format DD/MM",
        type: ApplicationCommandOptionType.String
      }
    ]
  }])
  console.log(`Berhasil login sebagai ${client.user.tag}`)
})

client.on("interactionCreate", async interaction => {
  const { options } = interaction

  await interaction.deferReply()

  const kota = options.getString("kota")
  let tanggal = options.getString("tanggal")

  const regex = /\d{2}\/\d{2}/

  if(!tanggal || !regex.test(tanggal)) tanggal = moment().format("DD/MM")

  let jadwal = JSON.parse(await imsakSchedule(kota, tanggal))

  if(!jadwal.status) return interaction.editReply("Data tidak ditemukan!")

  const schedule = jadwal.result.schedule[0]

  await interaction.editReply({ embeds: [
    new EmbedBuilder()
      .setTitle(`${schedule.tgl} - ${schedule.hari} Ramadhan`)
      .setDescription(`Imsak: ${schedule.imsak}\nShubuh: ${schedule.subuh}\nDzuhur: ${schedule.zuhur}\nAshar: ${schedule.asar}\nMaghrib: ${schedule.magrib}\nIsya: ${schedule.isya}`)
  ]})
})

client.login(process.env.TOKEN)
