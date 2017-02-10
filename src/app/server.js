import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './index';
import template from './template';

const server = express();

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const isMobile = true; // assume it's mobile
  const appString = renderToString(<App isMobile={isMobile} />);

  res.send(template({
    body: appString,
    title: 'Hello World from the server'
  }));
});

server.listen(8080);