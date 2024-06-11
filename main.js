const TelegramBot = require("node-telegram-bot-api")

const token = "7139364821:AAGKrzHBuVhDv9AAQf3_TRssNGKd0cETfno"

const options = {
    polling: true
}

const bot = new TelegramBot(token, options)

const prefix = "!"

const gempa = new RegExp(`^${prefix}gempa$`)

bot.onText(gempa, async(callback) => {
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + "autogempa.json")
    const {
        Infogempa: { 
            gempa: {
                Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        } 
    } = await apiCall.json()
    const BMKGImage = BMKG_ENDPOINT + Shakemap
    const resultText = `
Info gempa terbaru

Waktu: ${Tanggal} | ${Jam}
Besaran: ${Magnitude} SR
Wilayah: ${Wilayah}
Potensi: ${Potensi}
Kedalaman: ${Kedalaman}

Sumber: BMKG`

    bot.sendPhoto(callback.from.id, BMKGImage, {
        caption: resultText
    })
})