import dotenv from 'dotenv';
import express from 'express';
const WebTorrent = require('webtorrent');

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();
const client: WebTorrent = new WebTorrent();

const MAGNET_URI =
  'magnet:?xt=urn:btih:97533F2033BD41367C8D39D22EBCB7FD963E91C9&dn=The+Father+%282020%29+%5B1080p%5D+%5BWEBRip%5D+%5B5.1%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce+n';

app.get('/download', (req, res) => {
  client.add(MAGNET_URI, { path: '/home/mati/tmp' }, (torrent) => {
    torrent.on('done', () => {
      console.log('Torrent download finished.');
    });
    torrent.on('download', () => {
      console.log('just downloaded: ' + bytes);
      console.log('total downloaded: ' + torrent.downloaded);
      console.log('download speed: ' + torrent.downloadSpeed);
      console.log('progress: ' + torrent.progress);
    });
    const msg = `Downloading the torrent: ${torrent.infoHash}`;
    console.log(msg);
    res.send(msg);
  });
});

app.listen(port, () => {
  console.log('Server running on', port);
});
