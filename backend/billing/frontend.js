const FRONTEND_DEV_URLS = [ 'http://localhost:3000' ];

const FRONTEND_PROD_URLS = [
  'https://labs-next-leaderboard.herokuapp.com',
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;