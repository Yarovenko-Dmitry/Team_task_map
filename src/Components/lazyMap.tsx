import React, {ChangeEvent, useState} from 'react';
import {Map, YMaps} from 'react-yandex-maps';

type LasyMapType = {
  latitude: number
  longitude: number
}
export const LasyMap = ({latitude, longitude}: LasyMapType) => {
  return (
    <YMaps>
      <div>
        My awesome application with maps!
        <Map defaultState={{center: [latitude, longitude], zoom: 9}}/>
      </div>
    </YMaps>
  )
}