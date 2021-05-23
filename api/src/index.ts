import dotenv from 'dotenv';
import request from 'request';
import express, { Request, Response } from 'express';
import WebTorrent, { Torrent } from 'webtorrent';

dotenv.config();

const API_KEY = '2cb9f04a7fmsh358ce8dfb6d4721p117554jsn2eb963a3f3f9';
const API_HOST = 'ThePirateBayvolodimir-kudriachenkoV1.p.rapidapi.com';
const MAGNET_URI ='https://webtorrent.io/torrents/sintel.torrent';

const app = express();
const port = process.env.SERVER_PORT;

const client = new WebTorrent();


const options = (query: string) => ({
  method: 'POST',
  url: 'https://thepiratebayvolodimir-kudriachenkov1.p.rapidapi.com/search',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': API_KEY,
    'x-rapidapi-host': API_HOST,
    useQueryString: true
  },
  form: {query: query, orderBy: 'seeds'}
});


function downloadTorrent(uri: string) {
  client.add(uri, {path: './downloads'}, (torrent: Torrent) => {
    console.log(`Downloading the torrent: ${torrent.infoHash}`);

    torrent.on('done', () => {
      console.log('Torrent download finished.');
    });

    torrent.on('download', (bytes) => {
      console.log('just downloaded: ' + prettyBytes(bytes));
      onProgress();
    });

    function onProgress() {
      const percent = Math.round(torrent.progress * 100 * 100) / 100;
      console.log('bytes received: ' + prettyBytes(torrent.received));
      console.log('number of peers: ' +  torrent.numPeers);
      console.log('total downloaded: ' + prettyBytes(torrent.downloadSpeed));
      console.log('download speed: ' + torrent.downloadSpeed);
      console.log(`progress: ${percent}%`);
    }
    
  });
}

app.get('/search', (_req: Request, res: Response) => {
  request(options('avengers endgame'), (error: any, _response: request.Response , body : any)=> {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.get('/download', (_req: Request, res: Response) => {
  downloadTorrent(MAGNET_URI);
  res.send(MAGNET_URI);
});

app.listen(port, () => {
  console.log('Server running on', port);
});

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  process.kill(process.pid, 'SIGINT');
});

function prettyBytes(num: number) {
  const neg = num < 0;
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (neg) num = -num;
  if (num < 1) return (neg ? '-' : '') + num + ' B';
  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = Number((num / Math.pow(1000, exponent)).toFixed(2));
  const unit = units[exponent];
  return (neg ? '-' : '') + num + ' ' + unit;
}
