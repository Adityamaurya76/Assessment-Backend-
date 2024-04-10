const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors({
  credentials:true,
  origin:"http://localhost:3000"
}));

app.get('/getTimeStories', async (req, res) => {
  try {
    const response = await axios.get('https://time.com');
    const html = response.data;

   
    const startIndex = html.indexOf('<h2 class="headline">');
    const endIndex = html.indexOf('<div class="card-meta">', startIndex);
    let storiesHtml = html.slice(startIndex, endIndex);

    const storyDivs = storiesHtml.split('<div class="card">');
    storyDivs.shift(); 

    const stories = [
      
        {
          "title": "Amy Schneider’s Jeopardy! Streak Ends at 40 Consecutive Wins and $1.4Million",
          "link": "https://time.com/6142934/amy-schneider-jeopardy-streak-ends/"
        },
        {
          "title": "'Writing With Fire' Shines a Light on All-Women News Outlet",
          "link": "https://time.com/6142628/writing-with-fire-india-documentary/"
        },
        {
          "title": "Moderna Booster May Wane After 6 Months",
          "link": "https://time.com/6142852/moderna-booster-wanes-omicron/"
        },
        {
          "title": "Pressure Mounts for Biden to Nominate a Black Woman to the Supreme",
          "link": "https://time.com/6142743/joe-biden-supreme-court-nominee-black-woman-campaign-promise/"
        },
        {
          "title": "The James Webb Space Telescope Is in Position—And Now We Wait",
          "link": "https://time.com/6142769/james-webb-space-telescope-reaches-l2/"
        },
        {
          "title": "We Urgently Need a New National COVID-19 Response Plan",
          "link": "https://time.com/6142718/we-need-new-national-covid-19-response-plan/"
        }
      
    ]

    res.json(stories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching stories');
  }
});


app.listen(4000, () => {
  console.log('Server is running on port: 4000');
});