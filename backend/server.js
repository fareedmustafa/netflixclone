import express from 'express';
import authroutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

console.log(ENV_VARS); // Add this line to log the contents of ENV_VARS

const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json());

app.use('/api/v1/auth', authroutes);

app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
connectDB();

});