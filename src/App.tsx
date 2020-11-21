import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import {onClickSearchObjectsHandler, onClickShowNearbyObjectsHeddler} from './hendlers/apiHendler';
import {v1} from 'uuid';
import {MyMappTEST} from './Components/MyMappTEST';

export type ItMinskSchoolType = {
  schoolDescription: string,
  id: string,
  schoolName: string,
  newSchoolLatitude: number,
  newSchoolLongitude: number
}

export type displaySearchObjectType = {
  description: string,
  id: string,
  schoolName: string,
  newSchoolLatitude: number,
  newSchoolLongitude: number
  phone: any
}

function App() {

  const TESTitMinskSchools: Array<ItMinskSchoolType> = [];
  const StartDisplaySearchObjects: Array<ItMinskSchoolType> = [];

  const [schoolName, setSchoolName] = useState<string>('');
  const [schoolDescription, setSchoolDescription] = useState<string>('');
  const [newSchoolLatitude, setNewSchoolLatitude] = useState<any>(0);
  const [newSchoolLongitude, setNewSchoolLongitude] = useState<any>(0);
  const [itMinskSchools, setItMinskSchools] = useState<Array<ItMinskSchoolType>>(TESTitMinskSchools);

  const [searchObjectLocation, setSearchObjectLocation] = useState<string>('');
  const [searchObjectType, setSearchObjectType] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [searchObjectCount, setSearchObjectCount] = useState<number>(1);
  const [displaySearchObjects, setDisplaySearchObjects] = useState<Array<any>>(StartDisplaySearchObjects);


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
    const reg = /[^\d\.]/g
    setNewSchoolLatitude(e.currentTarget.value.replace(reg, ''))
  }

  const onChangeNewSchoolLongitudeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reg = /[^\d\.]/g
    setNewSchoolLongitude(e.currentTarget.value.replace(reg, ''))
  }

  const onClickAddSchoolButtonHandler = () => {
    addNewItSchoolMinsk(schoolDescription, schoolName);
    setSearchObjectLatitude(newSchoolLatitude);
    setSearchObjectLongitude(newSchoolLongitude);
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
    setSearchObjectLocation(e.currentTarget.value);
  }

  const onClickSearchLocationButtonHeddler = () => {
    onClickSearchObjectsHandler(searchObjectLocation).then((coordinates: Array<string>) => {
      if (coordinates.length) {
        setSearchObjectLatitude(Number(coordinates[0]));
        setSearchObjectLongitude(+coordinates[1]);
      }
    })
  }

  const onChangeSearchObjectTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchObjectType(e.currentTarget.value);
  }

  const onChangeSearchObjectCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchObjectCount(Math.round(+e.currentTarget.value));
  }

  const onChangeStreetNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStreetName(e.currentTarget.value);
  }

  const onClickShowNearbyObjectsButtonHeddler = () => {
    onClickShowNearbyObjectsHeddler(searchObjectType, searchObjectLocation, streetName, searchObjectCount).then((foundObjects: any[]) => {
      if (foundObjects.length) {
        let shownObjects: Array<displaySearchObjectType> = new Array()
        for (let i = 0; i < foundObjects.length; i++) {
          shownObjects[i] = {
            description: foundObjects[i].properties.description,
            id: v1(),
            schoolName: foundObjects[i].properties.name,
            newSchoolLatitude: foundObjects[i].geometry.coordinates[1],
            newSchoolLongitude: foundObjects[i].geometry.coordinates[0],
            phone: 777654
          }
        }
        setDisplaySearchObjects(shownObjects);
      }
    })
  }

  const getMapCoordinates = useCallback((e: any) => {
    let coordinatesSchool = e.get('coords');
    setNewSchoolLatitude(+coordinatesSchool[0]);
    setNewSchoolLongitude(+coordinatesSchool[1]);
  }, [])

  return (
    <div className="App">
      <div className={'searchAddNavigation'}>
        <div className={'addObject'}>
          <div>Добавить школу</div>
          <div>
            <input type={'text'} name={'schoolName'} value={schoolName} placeholder={'Название школы'}
                   onChange={onChangeSchoolNameHandler}/>
          </div>
          <div>
            <input type={'text'} name={'schoolDescription'} value={schoolDescription} placeholder={'Описание'}
                   onChange={onChangeDescriptionHandler}/>
          </div>
          <div>
            <div>Координаты</div>
            <input type={'text'} value={newSchoolLatitude} placeholder={'Широта'}
                   onChange={onChangeNewSchoolLatitudeHandler}/>
            <input type={'text'} value={newSchoolLongitude} placeholder={'Долгота'}
                   onChange={onChangeNewSchoolLongitudeHandler}/>
          </div>
          <input type={'button'} name={'addNewItSchoolMinsk'} value={'Добавить на карту'}
                 onClick={onClickAddSchoolButtonHandler}/>
        </div>
        <div className={'searchObject'}>
          <div>Найти объект(ы)</div>
          <div>
            <input type={'text'} name={'locationName'} value={searchObjectLocation} placeholder={'Локация'}
                   onChange={onChangeLocationNameHandler}/>
            <input type={'button'} name={'searchLocation'} value={'Показать локацию на карте'}
                   onClick={onClickSearchLocationButtonHeddler}/>
          </div>
          <div>
            <div>Уточнение поиска</div>
            <input type={'text'} name={'searchObjectType'} value={searchObjectType} placeholder={'Тип объекта'}
                   onChange={onChangeSearchObjectTypeHandler}/>
            <input type={'text'} value={streetName} name={'streatName'} placeholder={'Название улицы'}
                   onChange={onChangeStreetNameHandler}/>
            <input type={'number'} name={'objectCount'} value={searchObjectCount} min="1" max="20"
                   title={'Сколько максимально вывести объектов от 1 до 20'}
                   placeholder={"мах кол-во"} onChange={onChangeSearchObjectCountHandler}/>
          </div>
          <input type={'button'} name={'showNearbyObjects'} value={'Показать объект(ы) на карте'}
                 onClick={onClickShowNearbyObjectsButtonHeddler}/>
          <p>Объектов найдено : </p> {displaySearchObjects.length}
        </div>
      </div>
      <div className={'mapArea'}>
        <MyMappTEST getMapCoordinates={getMapCoordinates}
                    searchObjectLatitude={searchObjectLatitude}
                    searchObjectLongitude={searchObjectLongitude}
                    displaySearchObjects={displaySearchObjects}
                    itMinskSchools={itMinskSchools}/>
      </div>
    </div>
  );
}

export default App;


