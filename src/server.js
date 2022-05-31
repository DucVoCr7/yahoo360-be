import 'dotenv/config'
import express from 'express'
import viewEngine from './config/viewEngine';
import { initAPIRoutes } from './routes/api';
import { initWebRoutes } from './routes/web';
import { checkConnectDatabase } from './config/connectDatabase'
const app = express()
let port = process.env.PORT || 3000;

// Cấu hình Express gửi POST request, hỗ trợ lấy tham số trên URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine
viewEngine(app);

// Init web route
initWebRoutes(app)

// Init API route
initAPIRoutes(app)

// Check connect with database
checkConnectDatabase();

app.listen(port, () => {
  console.log(`Backend Yahoo360 is running on port ${port}`)
})