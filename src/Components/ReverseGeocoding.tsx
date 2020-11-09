import React, {ChangeEvent, useState} from 'react';
import {Map, YMaps} from 'react-yandex-maps';
import {LasyMap} from './lazyMap';

export const ReverseGeocoding = () => {

  const [latitude, setLatitude] = useState(53.9006)
  const [longitude, setLongitude] = useState(27.5590)
  console.log(latitude)
  console.log(longitude)
  const onChangeLatitudeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLatitude(+e.currentTarget.value);
    console.log('latitude ', latitude);
  }
  const onChangeLongitudeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(+e.currentTarget.value);
    console.log('longitude ', longitude);
  }

  const onClickShowMapHandler = () => {
    console.log('onClick ');
  }

  return (
    <div>
      export const ReverseGeocoding
      <input type={'text'}
             name={'inputLatitudeValue'}
             onChange={onChangeLatitudeHandler}
             placeholder={'Latitude'}
      />
      <input type={'text'}
             name={'inputeLongitudeValue'}
             onChange={onChangeLongitudeHandler}
             placeholder={'Longitude'}/>

      {/*<input type={'button'} name={'button'} value={'set object'}/>*/}
      {/*<input type={'button'} name={'button'} value={'find object'}/>*/}
      {/*<input type={'button'} name={'button'} value={'show lasy map'} onClick={onClickShowMapHandler}/>*/}
      <YMaps>
        <div>
          My awesome application with maps!
          <Map state={{center: [latitude, longitude], zoom: 9}}/>
        </div>
      </YMaps>
      <LasyMap latitude={latitude} longitude={longitude}/>

    </div>
  )
}