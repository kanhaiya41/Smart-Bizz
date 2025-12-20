import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './utills/dbConnect.js';
import cors from 'cors'
import authApp from './routes/authRoutes.js';
import vectorApp from './routes/vector.routes.js';

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

app.get("/auth/instagram", (req, res) => {
    const oauthUrl =
        "https://www.facebook.com/v18.0/dialog/oauth" +
        "?client_id=" + process.env.META_APP_ID +
        "&redirect_uri=" + encodeURIComponent(process.env.META_REDIRECT_URI) +
        "&response_type=code" +
        "&scope=email,public_profile,pages_show_list" +
        // instagram
        // "&scope=instagram_basic,instagram_manage_messages" +
        "&state=" + "693ef33a3dfcb0a4a11c0ad4";

    res.redirect(oauthUrl);
});

app.use('/auth', authApp);
app.use('/vector_db', vectorApp);


// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// app.get('/*splat', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });



app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server successfully runs on port ${process.env.PORT}`))