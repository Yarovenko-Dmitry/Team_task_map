import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Map, RulerControl, TypeSelector, YMaps, ZoomControl, Placemark} from 'react-yandex-maps';
import {onClickSearchObjectsHandler} from './hendlers/apiHendler';
import {v1} from "uuid";

type ItMinskSchoolType = {
  schoolDescription: string,
  id: string,
  schoolName: string,
  newSchoolLatitude: any,
  newSchoolLongitude: any
}

function App() {

  const TESTitMinskSchools = [
    {
      id: "d2c832a0-28d6-11eb-a6bf-0d5927730644",
      newSchoolLatitude: 50.4292,
      newSchoolLongitude: 30.4931,
      schoolDescription: "тест 1",
      schoolName: "1"
    },
    {
      id: "d2c832a0-28d6-11eb-a6bf-0d5927730645",
      newSchoolLatitude: 50.4590,
      newSchoolLongitude: 30.5391,
      schoolDescription: "тест 2",
      schoolName: "2"
    },
    {
      id: "d2c832a0-28d6-11eb-a6bf-0d5927730646",
      newSchoolLatitude: 50.4149,
      newSchoolLongitude: 30.6057,
      schoolDescription: "тест 3",
      schoolName: "3"
    }
  ]

  const [schoolName, setSchoolName] = useState<string>('');
  const [schoolDescription, setSchoolDescription] = useState<string>('');
  const [newSchoolLatitude, setNewSchoolLatitude] = useState<any>(0);
  const [newSchoolLongitude, setNewSchoolLongitude] = useState<any>(0);
  const [itMinskSchools, setItMinskSchools] = useState<Array<ItMinskSchoolType>>(TESTitMinskSchools);

  const [locationSearchObject, setLocationSearchObject] = useState<string>('');
  const [searchObjectLatitude, setSearchObjectLatitude] = useState<number>(50.5000);
  const [searchObjectLongitude, setSearchObjectLongitude] = useState<number>(30.5000);


  const onChangeSchoolNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSchoolName(e.currentTarget.value);
  }

  const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 20) {
      console.log('Value is more')
    }
    setSchoolDescription(e.currentTarget.value)
  }

  const onChangeNewSchoolLatitudeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSchoolLatitude(e.currentTarget.value)
  }

  const onChangeNewSchoolLongitudeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSchoolLongitude(e.currentTarget.value)
  }

  const onClickAddSchoolButtonHandler = () => {
    addNewItSchoolMinsk(schoolDescription, schoolName)
    console.log(itMinskSchools)
  }

  const addNewItSchoolMinsk = (schoolDescription: string, schoolName: string) => {
    const newItSchoolMinsk = {
      id: v1(),
      schoolName,
      schoolDescription,
      newSchoolLatitude,
      newSchoolLongitude
    };
    setItMinskSchools([...itMinskSchools, newItSchoolMinsk]);
  }

  const onChangeLocationNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationSearchObject(e.currentTarget.value);
  }

  const onClickSearchObjectsButtonHeddler = () => {
    onClickSearchObjectsHandler(locationSearchObject).then((coordinates: Array<string>) => {
      if (coordinates.length) {
        setSearchObjectLatitude(Number(coordinates[0]));
        setSearchObjectLongitude(+coordinates[1]);
      }
    })
  }

  return (
    <div className="App">
      <div className={'searchAddNavigation'}>
        {/* потом может зарефакторим в формик*/}
        <div className={'addObject'}>
          <div>добавить школу</div>
          <div>
            <div>название школы</div>
            <input type={'text'} name={'schoolName'} value={schoolName}
                   onChange={onChangeSchoolNameHandler}/>
          </div>
          <div>
            <div>описание</div>
            <input type='text' onChange={onChangeDescriptionHandler}/>
          </div>
          <div>
            <div>координаты</div>
            <input type={'text'} onChange={onChangeNewSchoolLatitudeHandler}/>
            <input type={'text'} onChange={onChangeNewSchoolLongitudeHandler}/>
          </div>
          {/*<input type={'button'} name={'selectCoordinate'} value={'Указать объект на карте'}/>*/}
          <div>
            {/* возможно добавить изображение с видом метки*/}
            <input type={'button'} name={'changeMarkType'} value={'Сменить вид метки'}/>
            <input type={'text'} name={'markType'} placeholder={'Mark type'}/>
          </div>
          <input type={'button'} name={'addNewItSchoolMinsk'} value={'Добавить на карту'}
                 onClick={onClickAddSchoolButtonHandler}/>
        </div>
        <div className={'searchObject'}>
          <div>Найти объекты</div>
          <div>
            <div>Местность</div>
            <input type={'text'} name={'location'} placeholder={'Название региона'}
                   onChange={onChangeLocationNameHandler}/>
            <div>
              <div>координаты</div>
              <input type={'text'} name={'latitudeCoordinate'} placeholder={'Latitude'}/>
              <input type={'text'} name={'longitudeCoordinate'} placeholder={'Longitude'}/>
            </div>
          </div>
          <select>
            <option>Школа для детей</option>
            <option>Курсы для взрослых</option>
            <option>IT ВУЗ</option>
          </select>
          <div>
            <div>Количество объектов</div>
            <input type={'number'} name={'objectNumber'}/>
          </div>
          <input type={'button'} name={'searchObjects'} value={'Найти объекты'}
                 onClick={onClickSearchObjectsButtonHeddler}/>
        </div>
      </div>
      <div className={'mapArea'}>
        <YMaps>
          <div>
            <Map className={'map'} state={{center: [searchObjectLatitude, searchObjectLongitude], zoom: 10}}>
              <ZoomControl options={{position: {right: 10, top: 10}}}/>
              <TypeSelector options={{position: {left: 10, top: 10}}}/>
              <RulerControl options={{position: {right: 50, top: 10}}}/>

              {itMinskSchools.map((itMinskSchool:ItMinskSchoolType) => <Placemark
                  geometry={[itMinskSchool.newSchoolLatitude, itMinskSchool.newSchoolLongitude]}
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  properties={{
                    hintContent: itMinskSchool.schoolName,
                    balloonContent: itMinskSchool.schoolDescription,
                  }}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'https://image.freepik.com/free-vector/3d-gps-red-color-icon-dropping-on-street-map-on-white_175838-446.jpg',
                    iconImageSize: [80, 60],
                    iconImageOffset: [0, 0],
                  }}
                />
              )}
            </Map>
          </div>
        </YMaps>
      </div>
    </div>
  );
}

export default App;
