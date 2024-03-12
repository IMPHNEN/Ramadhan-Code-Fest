(async () => {
  require("./config");
  const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
  } = require("@whiskeysockets/baileys");
  const { generate } = require("qrcode-terminal");
  const pino = require("pino");
  const WebSocket = require("ws");
  const path = require("path");
  const fs = require("fs");
  const yargs = require("yargs/yargs");
  const cp = require("child_process");
  const _ = require("lodash");
  const syntaxerror = require("syntax-error");
  const P = require("pino");
  const os = require("os");
  const chalk = require("chalk");
  const chokidar = require("chokidar");
  let serialized = require("./src/lib/whatsapp.serialized");
  var low;
  try {
    low = require("lowdb");
  } catch (e) {
    low = require("./src/lib/lowdb");
  }
  const { Low, JSONFile } = low;
  const { mongoDB, MongoDBV2 } = require("./src/lib/lib.mongodb");

  serialized.protoType();

  global.API = (name, path = "/", query = {}, apikeyqueryname) =>
    (name in global.APIs ? global.APIs[name] : name) +
    path +
    (query || apikeyqueryname
      ? "?" +
        new URLSearchParams(
          Object.entries({
            ...query,
            ...(apikeyqueryname
              ? {
                  [apikeyqueryname]:
                    global.APIKeys[
                      name in global.APIs ? global.APIs[name] : name
                    ],
                }
              : {}),
          })
        )
      : "");
  // global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
  global.timestamp = {
    start: new Date(),
  };

  const PORT = process.env.PORT || 3000;

  global.opts = new Object(
    yargs(process.argv.slice(2)).exitProcess(false).parse()
  );
  // console.log({ opts })
  global.prefix = new RegExp(
    "^[" +
      (opts["prefix"] || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(
        /[|\\{}()[\]^$+*?.\-\^]/g,
        "\\$&"
      ) +
      "]"
  );

  global.db = new Low(
    /https?:\/\//.test(opts["db"] || "")
      ? new cloudDBAdapter(opts["db"])
      : /mongodb(\+srv)?:\/\//i.test(opts["db"])
      ? opts["mongodbv2"]
        ? new mongoDBV2(opts["db"])
        : new mongoDB(opts["db"])
      : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`)
  );

  global.DATABASE = global.db; // Backwards Compatibility
  global.loadDatabase = async function loadDatabase() {
    if (global.db.READ)
      return new Promise((resolve) =>
        setInterval(function () {
          !global.db.READ
            ? (clearInterval(this),
              resolve(
                global.db.data == null ? global.loadDatabase() : global.db.data
              ))
            : null;
        }, 1 * 1000)
      );
    if (global.db.data !== null) return;
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      ...(global.db.data || {}),
    };
    global.db.chain = _.chain(global.db.data);
  };
  loadDatabase();

  const authFile = `${opts._[0] || "session"}`;
  global.isInit = !fs.existsSync(authFile);
  const { state, saveCreds } = await useMultiFileAuthState(authFile);
  const { version } = await fetchLatestBaileysVersion();
  const connectionOptions = {
    version,
    printQRInTerminal: true,
    browser: ["Abot Multi Device", "Edge", "1.0.0"],
    auth: state,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }

      return message;
    },
    logger: pino({ level: "silent" }),
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return {
        conversation: "hello, i'm aabot",
      };
    },
    // get message diatas untuk mengatasi pesan gagal dikirim, "menunggu pesan", dapat dicoba lagi
  };

  global.conn = serialized.makeWASocket(connectionOptions);

  if (!opts["test"]) {
    if (global.db)
      setInterval(async () => {
        if (global.db.data) await global.db.write();
        if (opts["autocleartmp"] && (global.support || {}).find)
          (tmp = [os.tmpdir(), "tmp"]),
            tmp.forEach((filename) =>
              cp.spawn("find", [
                filename,
                "-amin",
                "3",
                "-type",
                "f",
                "-delete",
              ])
            );
      }, 30 * 1000);
  }
  if (opts["big-qr"] || opts["server"])
    conn.ev.on("qr", (qr) => generate(qr, { small: false }));
  if (opts["server"]) require("./server")(global.conn, PORT);

  async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update;
    if (connection == "connecting")
      console.log(
        chalk.redBright("🕛 Mengaktifkan Bot, Harap tunggu sebentar...")
      );
    if (connection == "open") {
      console.log(chalk.green("Connected✅"));
    }
    if (connection == "close")
      console.log(
        chalk.red("⏹️Koneksi berhenti dan mencoba menghubungkan kembali...")
      );
    global.timestamp.connect = new Date();
    if (
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output &&
      lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut &&
      conn.ws.readyState !== WebSocket.CONNECTING
    ) {
      console.log(global.reloadHandler(true));
    }
    if (global.db.data == null) await loadDatabase();
    //console.log(JSON.stringify(update, null, 4))
  }

  process.on("uncaughtException", console.error);
  // let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

  const imports = (path) => {
    path = require.resolve(path);
    let modules,
      retry = 0;
    do {
      if (path in require.cache) delete require.cache[path];
      modules = require(path);
      retry++;
    } while (
      (!modules || Array.isArray(modules) || modules instanceof String
        ? !(modules || []).length
        : typeof modules == "object" && !Buffer.isBuffer(modules)
        ? !Object.keys(modules || {}).length
        : true) &&
      retry <= 10
    );
    return modules;
  };
  let isInit = true;
  global.reloadHandler = function (restatConn) {
    let handler = imports("./src/abot.js");
    if (restatConn) {
      try {
        global.conn.ws.close();
      } catch {}
      global.conn = {
        ...global.conn,
        ...serialized.makeWASocket(connectionOptions),
      };
    }
    if (!isInit) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.participantsUpdate);
      conn.ev.off("groups.update", conn.groupsUpdate);
      conn.ev.off("message.delete", conn.onDelete);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }

    conn.welcome = "Hai, @user!\nSelamat datang di grup @subject\n\n@desc";
    conn.bye = "Selamat tinggal @user!";
    conn.spromote = "@user sekarang admin!";
    conn.sdemote = "@user sekarang bukan admin!";
    conn.sDesc = "Deskripsi telah diubah ke \n@desc";
    conn.sSubject = "Judul grup telah diubah ke \n@subject";
    conn.sIcon = "Icon grup telah diubah!";
    conn.sRevoke = "Link group telah diubah ke \n@revoke";
    conn.sAnnounceOn =
      "Group telah di tutup!\nsekarang hanya admin yang dapat mengirim pesan.";
    conn.sAnnounceOff =
      "Group telah di buka!\nsekarang semua peserta dapat mengirim pesan.";
    conn.sRestrictOn = "Edit Info Grup di ubah ke hanya admin!";
    conn.sRestrictOff = "Edit Info Grup di ubah ke semua peserta!";

    conn.handler = handler.handler.bind(conn);
    conn.participantsUpdate = handler.participantsUpdate.bind(conn);
    conn.groupsUpdate = handler.groupsUpdate.bind(conn);
    conn.onDelete = handler.delete.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = ("creds.update", saveCreds);

    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.participantsUpdate);
    conn.ev.on("groups.update", conn.groupsUpdate);
    conn.ev.on("message.delete", conn.onDelete);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    isInit = false;
    return true;
  };

  const pluginFolder = path.join(__dirname, "src", "commands");
  const pluginFilter = (filename) => /\.js$/.test(filename);

  global.plugins = {};

  const readDirectoryRecursive = (folderPath) => {
    const files = fs.readdirSync(folderPath);
    for (let file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        readDirectoryRecursive(filePath); // Rekursif untuk folder di dalamnya
      } else if (pluginFilter(file)) {
        try {
          const pluginName = path.relative(pluginFolder, filePath);
          global.plugins[pluginName] = require(filePath);
        } catch (e) {
          conn.logger.error(e);
          delete global.plugins[pluginName];
        }
      }
    }
  };

  readDirectoryRecursive(pluginFolder);

  console.log(Object.keys(global.plugins));

  const fileWatcher = chokidar.watch(pluginFolder, {
    persistent: true,
    ignoreInitial: true,
  });

  fileWatcher
    .on("add", (filePath) => onFileAddedOrModified(filePath))
    .on("change", (filePath) => onFileAddedOrModified(filePath))
    .on("unlink", (filePath) => onFileDeleted(filePath));

  const onFileAddedOrModified = (filePath) => {
    if (pluginFilter(path.basename(filePath))) {
      const pluginName = path.relative(pluginFolder, filePath);
      try {
        delete require.cache[require.resolve(filePath)];
        const plugin = require(filePath);
        global.plugins[pluginName] = plugin;
        console.log(`Added or modified plugin: ${pluginName}`);
      } catch (e) {
        conn.logger.error(e);
      }
    }
  };

  const onFileDeleted = (filePath) => {
    if (pluginFilter(path.basename(filePath))) {
      const pluginName = path.relative(pluginFolder, filePath);
      delete global.plugins[pluginName];
      console.log(`Deleted plugin: ${pluginName}`);
    }
  };

  global.reloadHandler();

  // Auto Clear TMP
  const tmpFolderPath = "tmp"; // Ganti dengan jalur folder "tmp" Anda
  setInterval(() => {
    fs.readdir(tmpFolderPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      const currentTime = new Date();
      const expirationTime = new Date(currentTime.getTime() - 3 * 60 * 1000); // Hapus file yang berumur lebih dari 3 menit

      files.forEach((file) => {
        const filePath = path.join(tmpFolderPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error retrieving file stats:", err);
            return;
          }

          if (stats.isFile() && stats.atime < expirationTime) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted:", filePath);
              }
            });
          }
        });
      });
    });
  }, 5 * 60 * 1000);

  // Quick Test
  async function _quickTest() {
    let test = await Promise.all(
      [
        cp.spawn("ffmpeg"),
        cp.spawn("ffprobe"),
        cp.spawn("ffmpeg", [
          "-hide_banner",
          "-loglevel",
          "error",
          "-filter_complex",
          "color",
          "-frames:v",
          "1",
          "-f",
          "webp",
          "-",
        ]),
        cp.spawn("convert"),
        cp.spawn("magick"),
        cp.spawn("gm"),
        cp.spawn("find", ["--version"]),
      ].map((p) => {
        return Promise.race([
          new Promise((resolve) => {
            p.on("close", (code) => {
              resolve(code !== 127);
            });
          }),
          new Promise((resolve) => {
            p.on("error", (_) => resolve(false));
          }),
        ]);
      })
    );
    let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    console.log(test);
    let s = (global.support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find,
    });
    require("./src/lib/lib.sticker").support = s;
    Object.freeze(global.support);

    if (!s.ffmpeg)
      conn.logger.warn(
        "Please install ffmpeg for sending videos (pkg install ffmpeg)"
      );
    if (s.ffmpeg && !s.ffmpegWebp)
      conn.logger.warn(
        "Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)"
      );
    if (!s.convert && !s.magick && !s.gm)
      conn.logger.warn(
        "Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)"
      );
  }

  _quickTest()
    .then(() => conn.logger.info("Quick Test Done"))
    .catch(console.error);
})();
