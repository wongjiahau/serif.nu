import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import reducer from '../app/reducers';
import App from '../app/components/App';

const app = express();

function renderFullPage(html, preloadedState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Serif</title>

            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.1/fullcalendar.min.css">
            <link rel="stylesheet" href="materialFullCalendar.css">

            <link rel="apple-touch-icon" sizes="57x57" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-57x57.png">
            <link rel="apple-touch-icon" sizes="60x60" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-60x60.png">
            <link rel="apple-touch-icon" sizes="72x72" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-72x72.png">
            <link rel="apple-touch-icon" sizes="76x76" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-76x76.png">
            <link rel="apple-touch-icon" sizes="114x114" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-114x114.png">
            <link rel="apple-touch-icon" sizes="120x120" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-120x120.png">
            <link rel="apple-touch-icon" sizes="144x144" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-144x144.png">
            <link rel="apple-touch-icon" sizes="152x152" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-152x152.png">
            <link rel="apple-touch-icon" sizes="180x180" href="https://s3.amazonaws.com/serif-assets/apple-touch-icon-180x180.png">
            <link rel="icon" type="image/png" href="https://s3.amazonaws.com/serif-assets/favicon-32x32.png" sizes="32x32">
            <link rel="icon" type="image/png" href="https://s3.amazonaws.com/serif-assets/favicon-194x194.png" sizes="194x194">
            <link rel="icon" type="image/png" href="https://s3.amazonaws.com/serif-assets/favicon-96x96.png" sizes="96x96">
            <link rel="icon" type="image/png" href="https://s3.amazonaws.com/serif-assets/android-chrome-192x192.png" sizes="192x192">
            <link rel="icon" type="image/png" href="https://s3.amazonaws.com/serif-assets/favicon-16x16.png" sizes="16x16">
            <link rel="manifest" href="https://s3.amazonaws.com/serif-assets/manifest.json">
            <link rel="mask-icon" href="https://s3.amazonaws.com/serif-assets/safari-pinned-tab.svg" color="#520063">
            <link rel="shortcut icon" href="https://s3.amazonaws.com/serif-assets/favicon.ico">
            <meta name="msapplication-TileColor" content="#da532c">
            <meta name="msapplication-TileImage" content="https://s3.amazonaws.com/serif-assets/mstile-144x144.png">
            <meta name="msapplication-config" content="https://s3.amazonaws.com/serif-assets/browserconfig.xml">
            <meta name="theme-color" content="#520063">
        </head>

        <body>
            <div id="app">${html}</div>

            <script
                src="https://code.jquery.com/jquery-3.1.1.min.js"
                integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
                crossorigin="anonymous">
            </script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.16.0/moment.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.0.1/fullcalendar.min.js"></script>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
            </script>
            <script src="/bundle.js"></script>
        </body>
    </html>
  `;
}

function handleRender(req, res) {
  const store = createStore(reducer);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
}

app.use(handleRender);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
