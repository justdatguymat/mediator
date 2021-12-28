import axios, { AxiosRequestConfig } from 'axios';

const API_KEY = process.env.API_KEY;
const API_HOST = process.env.API_HOST;
const API_URL = process.env.API_URL;

function getApiOptions(query: string): AxiosRequestConfig {
  return {
    method: 'POST',
    url: API_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
    data: { query: query, page: 1 },
  };
}

async function searchTorrents(search: string) {
  const options = getApiOptions(search);
  console.log('Searching, ', options);
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function returnSampleApiResponse(query: string) {
  return [
    {
      query: query,
    },
    {
      name: 'Avengers Endgame (2019) 1080p.BluRay.x264.Full 744MB',
      magnet:
        'magnet:?xt=urn:btih:1E4A95C68E2B97E817D6FC726C22B1740BAD7023&dn=Avengers+Endgame+%282019%29+1080p.BluRay.x264.Full+744MB&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce',
      additionalInfo: 'Uploaded Today ;12:40, Size 690.52 ;MiB, ',
      seeds: '5304',
    },
    {
      name: 'Avengers.Endgame.2019.1080p.BRRip.x264-MP4',
      magnet:
        'magnet:?xt=urn:btih:223F7484D326AD8EFD3CF1E548DED524833CB77E&dn=Avengers.Endgame.2019.1080p.BRRip.x264-MP4&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce',
      additionalInfo: 'Uploaded 08-01 ;2019, Size 3.01 ;GiB, ',
      seeds: '1712',
    },
    {
      name: 'Avengers Endgame (2019) [BluRay] [720p]',
      magnet:
        'magnet:?xt=urn:btih:5A4140BD59D66BCAC57CF05AF4A8FAB4EBCAE1C1&dn=Avengers+Endgame+%282019%29+%5BBluRay%5D+%5B720p%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce',
      additionalInfo: 'Uploaded 08-01 ;2019, Size 1.43 ;GiB, ',
      seeds: '853',
    },
  ];
}

export { searchTorrents, returnSampleApiResponse };
