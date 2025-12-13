import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './utills/dbConnect.js';
import cors from 'cors'
import authApp from './routes/authRoutes.js'

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: process.env.URI,
        credentials: true
    }
));

app.use(express.json());
// app.use(cookieParser());


dbConnect();

app.get('/', async (req, res) => {
    res.send('all runs');
})

app.use('/auth',authApp)



// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// app.get('/*splat', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });



app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server successfully runs on port ${process.env.PORT}`))