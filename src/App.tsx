import React, {useState} from 'react';

import './App.css';
import {YMaps, Map, Placemark, SearchControl, ZoomControl, TypeSelector} from 'react-yandex-maps';

const App = () => {

    let [newcoords, setCoords] = useState()   //sw северная широто vd восточная долгота


    const myPoints = [
        {coords: [55.77, 37.46], name: 'School!!1'},
        {coords: [55.66, 37.48], name: 'School2'},

    ];
    let cords

    function getcoord(e: any) {
        cords = e.get('coords')
        console.log(cords)
        setCoords(cords)
    }

    let [placemark, setPlacemark] = useState(myPoints)

    let lox = [...placemark]

    function addPlacemark() {
        if (newcoords) {
            let place: any = {coords: newcoords, name: input}
            lox.push(place)
            setPlacemark(lox)
            alert(lox)
            setInput("IncubaToR")
        }
    }

    let [input, setInput] = useState("IncubaToR")

    function onChangeHandler(e: any) {
        setInput(e.currentTarget.value)
    }

    return (
        <>
            <div>coordinati click:{newcoords}</div>
            <YMaps>
                <Map width="75vw" height="75vh" onClick={(e: any) => {
                    getcoord(e)
                }}
                     defaultState={{
                         center: [55.751574, 37.573856],
                         zoom: 5,
                     }}
                >
                    <SearchControl options={{float: 'right'}}/>
                    <ZoomControl options={{float: 'right'}}/>
                    <TypeSelector options={{float: 'right'}}/>
                    {placemark.map(coordinate => <Placemark geometry={coordinate.coords}

                                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                                            properties={{
                                                                hintContent: coordinate.name,
                                                                balloonContent: coordinate.name,
                                                            }}

                                                            options={{
                                                                iconLayout: 'default#image',
                                                                iconImageHref: 'https://i.ytimg.com/vi/fIzA4te9yBk/maxresdefault.jpg',
                                                                iconImageSize: [100, 36],
                                                                iconImageOffset: [-50, -18],
                                                            }}
                        />
                    )}

                </Map>
            </YMaps>

            <div>
                <div>NAme of school</div>
                <input value={input} onChange={onChangeHandler}/>
                <button onClick={addPlacemark}>AddSchool</button>
            </div>
        </>)
};
export default App