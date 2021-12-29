import WebTorrent from "webtorrent";
import databank from "../../../databank";

const client = new WebTorrent();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function prettyBytes(num) {
  const neg = num < 0;
  const units = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (neg) num = -num;
  if (num < 1) return (neg ? "-" : "") + num + " B";
  const exponent = Math.min(
    Math.floor(Math.log(num) / Math.log(1000)),
    units.length - 1
  );
  num = Number((num / Math.pow(1000, exponent)).toFixed(2));
  const unit = units[exponent];
  return (neg ? "-" : "") + num + " " + unit;
}

function downloadTorrent(id, uri) {
  client.add(uri, { path: "." }, (torrent) => {
    console.log(`Downloading the torrent: ${torrent.infoHash}`);

    databank.add(id);
    torrent.on("done", () => {
      console.log(`Torrent '${id}' finished.`);
      databank.complete(id);
    });

    torrent.on("download", (bytes) => {
      console.log(`[${id}] Downloaded: ${prettyBytes(bytes)}`);
      onProgress();
    });

    function onProgress() {
      const percent = Math.round(torrent.progress * 100 * 100) / 100;
      console.log("bytes received: " + prettyBytes(torrent.received));
      console.log("number of peers: " + torrent.numPeers);
      console.log("total downloaded: " + prettyBytes(torrent.downloadSpeed));
      console.log("download speed: " + torrent.downloadSpeed);
      console.log(`progress: ${percent}%`);
      databank.update(id, percent);
    }
  });
}

export default async function handler(req, res) {
  const id = new Date().getTime();
  console.log(id, req.url, req.method);
  console.log(req.query);

  console.log(req.body);

  switch (req.method) {
    case "GET":
      res.status(200).json({ data: databank.getAll() });
      break;
    case "POST":
      downloadTorrent(id, req.body.uri);
      res.status(200).json({ message: "Download started.", id });
      break;
    default:
      res.status(400).json({ message: "Method not supported." });
  }
}
