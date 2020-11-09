import React from 'react';
import './App.css';
import {Map, RulerControl, TypeSelector, YMaps, ZoomControl} from 'react-yandex-maps';

function App() {

  return (
    <div className="App">
      <div className={'searchAddNavigation'}>
        {/* потом может зарефакторим в формик*/}
        <div className={'addObject'}>
          <div>добавить школу</div>
          <div>
            <div>название школы</div>
            <input type={'text'} name={'schoolName'}/>
          </div>
          <div>
            <div>описание</div>
            <input type={'text'} name={'description'}/>
          </div>
          <div>
            <div>координаты</div>
            <input type={'text'} name={'latitudeCoordinate'} placeholder={'Latitude'}/>
            <input type={'text'} name={'longitudeCoordinate'} placeholder={'Longitude'}/>
          </div>
          <input type={'button'} name={'selectCoordinate'} value={'Указать объект на карте'}/>
          <div>
            {/* возможно добавить изображение с видом метки*/}
            <input type={'button'} name={'changeMarkType'} value={'Сменить вид метки'}/>
          </div>
          <input type={'button'} name={'addObject'} value={'Добавить школу'}/>
        </div>
        <div className={'searchObject'}>
          <div>Найти объекты</div>
          <div>
            <div>Местность</div>
            <input type={'text'} name={'location'} placeholder={'Название региона'}/>
            <div>
              <div>координаты</div>
              <input type={'text'} name={'latitudeCoordinate'} placeholder={'Latitude'}/>
              <input type={'text'} name={'longitudeCoordinate'} placeholder={'Longitude'}/>
            </div>
          </div>
          <select>
            <option>Школа детей</option>
            <option>Курсы взрослых</option>
            <option>IT ВУЗ</option>
          </select>
          <div>
            <div>Количество объектов</div>
            <input type={'number'} name={'objectNumber'}/>
          </div>
          <input type={'button'} name={'searchObjects'} value={'Найти объекты'}/>
        </div>
      </div>
      <div className={'mapArea'}>
        <YMaps>
          <div>
            <Map className={'map'} defaultState={{center: [53.917512, 27.604740], zoom: 15}}>
              <ZoomControl options={{position: {right: 10, top: 10}}}/>
              <TypeSelector options={{position: {left: 10, top: 10}}}/>
              <RulerControl options={{position: {right: 50, top: 10}}}/>
            </Map>
          </div>
        </YMaps>
      </div>

    </div>
  );
}

export default App;
