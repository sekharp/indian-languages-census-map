# Indian Languages US Census Map
[Click here to check it out!](https://us-indians.netlify.app/)

[Built on the US Census API's American Community Survey 2009-13 Dataset](https://www.census.gov/data/developers/data-sets/language-stats.html)<br>

* Created a 50-state map visualizing speaker statistics on 17 major Indian languages across the United States.
* Used Leaflet library to render dynamic mobile-friendly JavaScript map with React front end.
* This data is pretty underutilized and powerful, covering 380 languages/language groups. It's a unique window into the Indian-American/South Asian-American community.<br><br>
**Tech Stack: JavaScript (React), React-Bootstrap, Lodash, Leaflet, React-Leaflet, Census API**

![Indian Languages US Census Map GIF](http://g.recordit.co/RO999H9gu5.gif)

## Setup

* `yarn`
* `yarn start` - hosted at `http://localhost:3000/` by default

A census API key is needed, and can be stored as a `REACT_APP_SECRET` in a local `.env` file. You can request one here: https://api.census.gov/data/key_signup.html.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).