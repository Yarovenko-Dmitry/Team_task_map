import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import {MuiThemeProvider} from '@material-ui/core/styles';
//import {getMuiTheme} from '@material-ui/core/styles';
//import  {lightsBaseTheme } from 'material-ui/styles/index';

//injectTapEventPlugin()

ReactDOM.render(

  <React.StrictMode>
      {/*<MuiThemeProvider muiTheme={getMuiTheme(lightsBaseTheme)}>*/}
    <App />
          {/*</MuiThemeProvider>*/}
  </React.StrictMode>

        , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
