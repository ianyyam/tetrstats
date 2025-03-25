
import 'dotenv/config';
import app from './app.js';

app.listen(3010, () => {
  console.log('tetstats backend running: http://localhost:3010/api/v0/docs/');
});
