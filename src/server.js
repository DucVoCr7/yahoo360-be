import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import checkConnectDatabase from './config/connectDatabase'
import initAuthenticationRoutes from './routes/authentication';
import initAPIRoutes from './routes/api';

const app = express()
let port = process.env.PORT || 3000;

 // Enable All CORS Requests
app.use(cors())

// Cấu hình Express gửi POST request, hỗ trợ lấy tham số trên URL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Check connect with database
checkConnectDatabase();

// Set up view engine
viewEngine(app);

// Init web route
initWebRoutes(app)

// Init authentication
initAuthenticationRoutes(app)

// Init API route
initAPIRoutes(app)


app.listen(port, () => {
  console.log(`Backend Yahoo360 is running on port ${port}`)
})