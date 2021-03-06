import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Schema } from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose our GraphQL endpoint
var graphQLServer = express();
graphQLServer.use('/', graphQLHTTP({schema: Schema, pretty: true}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server up on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app on webpack dev server
var compiler = webpack ({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: { stage: 0, plugins: ['./build/babelRelayPlugin']},
        test: /\.js$/,
      }
    ]
  },
  output: { filename: 'app.js', path: '/' }
});


// setup express server for our client

var app = new WebpackDevServer(compiler, {
  contentBase: '/public',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},
  publicPath: '/js/',
  stats: { colors: true },
  quiet: true,
});

// Serve static resources ( react components )
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
