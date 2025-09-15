import { app } from './routes/index.js';
import 'dotenv/config';

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});