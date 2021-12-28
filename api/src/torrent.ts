import { prettyBytes } from './utils';
import WebTorrent, { Torrent } from 'webtorrent';

const client = new WebTorrent();

function downloadTorrent(uri: string) {
  client.add(uri, { path: '/plexmedia/Movies' }, (torrent: Torrent) => {
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
      console.log('number of peers: ' + torrent.numPeers);
      console.log('total downloaded: ' + prettyBytes(torrent.downloadSpeed));
      console.log('download speed: ' + torrent.downloadSpeed);
      console.log(`progress: ${percent}%`);
    }
  });
}

export { downloadTorrent };
