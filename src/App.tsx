import React from 'react';
import './App.css';
import {YMaps, Map} from "react-yandex-maps";

function App() {

    return (
        <div className="App">
            {/*<div>1) Belik85111111111111111</div>*/}
            {/*<div>2) Yarovenko-Dmitry</div>*/}
            {/*<div>3) NetFound</div>*/}
            {/*<div>4) alex170485</div>*/}
            {/*<div>5) KhazanAlexey</div>*/}
            <div>IT-IN-CUBATOR</div>
            <div>Where to get education IT</div>
            <YMaps>
                <div>
                   <Map defaultState={{ center: [53.893240, 27.566727], zoom: 9 }} />
                </div>
                <div>
                    <input type='text'/> <button>SEARCH</button>
                </div>
            </YMaps>
        </div>
    );
}

export default App;
