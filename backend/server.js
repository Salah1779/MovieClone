const express = require('express');
const  cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));


const RAPID_API_KEY = 'd02d0cc686msh732302a1eee80c2p11de5fjsnbb38a6775fb3';
const RAPID_API_HOST = 'imdb236.p.rapidapi.com';


const fetchFromIMDB = async (endpoint, queryParams = '') => {
    const url = `https://${RAPID_API_HOST}/imdb/${endpoint}?${queryParams}`;
    console.log(`Calling API: ${url}`);

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPID_API_KEY,
            'x-rapidapi-host': RAPID_API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data from IMDb API');
    }
};

app.get('/imdb/top250-movies', async (req, res) => {
   
    try {
        const data = await fetchFromIMDB('top250-movies');
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/imdb/most-popular-movies', async (req, res) => {
   
    try {
        const data = await fetchFromIMDB('most-popular-movies');
        res.json(data);
       
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/imdb/top-box-office', async (req, res) => {
   
    try {
        const data = await fetchFromIMDB('top-box-office');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});