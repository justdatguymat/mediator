import 'source-map-support/register';

import dotenv from 'dotenv';
const env = dotenv.config();
console.log(env.parsed);

import express, { Request, Response } from 'express';
import { returnSampleApiResponse, searchTorrents } from './piratebay';
import { downloadTorrent } from './torrent';

const MAGNET_URI = 'https://webtorrent.io/torrents/sintel.torrent';

const app = express();
const port = process.env.SERVER_PORT;

app.get('/test/:query', (req: Request, res: Response) => {
  const { query } = req.params;
  res.json(returnSampleApiResponse(query));
});

app.get('/search/:query', async (req: Request, res: Response) => {
  const { query } = req.params;
  const data = await searchTorrents(query);
  if (!data) {
    res.writeProcessing;
    res.send('Nope');
  }
  res.send(data.data);
});

app.get('/download', (_req: Request, res: Response) => {
  downloadTorrent(MAGNET_URI);
  res.send(MAGNET_URI);
});

app.listen(port, () => {
  console.log('Server running on', port);
});
