import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Map, RulerControl, TypeSelector, YMaps, ZoomControl} from 'react-yandex-maps';
import {onClickSearchObjectsHandler} from './hendlers/apiHendler';
import {v1} from "uuid";


function App() {
    const [latitude, setLatitude] = useState(50.5000)
    const [longitude, setLongitude] = useState(30.5000)
    const [locationName, setLocationName] = useState('')
    // название школы
    const [schoolName, setSchoolName] = useState('')
    const [coordinate, setCoordinate] = useState('')
    const [latitudeNewSchool, setLatitudeNewSchool] = useState<any>(0)
    const [longitudeNewSchool, setLongitudeNewSchool] = useState<any>(0)

    // const AddCoordinatsNewSchool = (e: any) => {
    //     setCoordinate(e.currentTarget.value)
    //     if (e.currentTarget.value === '1' || '2' || '3') {
    //         setCoordinate('.')
    //     } else {
    //         setCoordinate(e.currentTarget.value)
    //     }
    //
    // }


    const onChangeSchoolNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.currentTarget.value);
    }


    const onChangeLocationNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocationName(e.currentTarget.value);
    }

    const handleClickSearchObjectsButton = () => {
        onClickSearchObjectsHandler(locationName).then((coordinates: Array<string>) => {
            if (coordinates.length) {
                setLatitude(Number(coordinates[0]));
                setLongitude(+coordinates[1]);

            }
        })
    }

    //стейт для добавления школ
    type ItMinskSchoolType = {
        description: string,
        id: string,
        schoolName: string,
        latitude: any,
        longitude: any


    }
    let [itMinskSchools, setItMinskSchools] = useState<Array<ItMinskSchoolType>>([])

    const handleClickAddSchoolButton = () => {
        addNewItSchoolMinsk(description, schoolName)
        console.log(itMinskSchools)
    }


    let addNewItSchoolMinsk = (description: string, schoolName: string) => {
        let NewItSchoolMinsk = {
            id: v1(),
            schoolName,
            description,
            latitude: latitudeNewSchool,
            longitude: longitudeNewSchool
        };
        let addNewItSchoolMinsk = [NewItSchoolMinsk, ...itMinskSchools];
        setItMinskSchools(addNewItSchoolMinsk);
    }


    // стейт для инпута и кнопки
    let [description, setTitle] = useState('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 20) {
            console.log('Value is more')
        }
        setTitle(e.currentTarget.value)
    }
    const AddLatitudeCoordinateNewSchool = (e: ChangeEvent<HTMLInputElement>) => {
        setLatitudeNewSchool(e.currentTarget.value)
    }
    const AddLongitudeCoordinateNewSchool = (e: ChangeEvent<HTMLInputElement>) => {
        setLongitudeNewSchool(e.currentTarget.value)
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
                        <input type='text' onChange={onChangeHandler}/>
                    </div>
                    <div>
                        <div>координаты</div>
                        <input type={'text'} onChange={AddLatitudeCoordinateNewSchool} />
                        <input type={'text'} onChange={AddLongitudeCoordinateNewSchool}/>
                    </div>
                    <input type={'button'} name={'selectCoordinate'} value={'Указать объект на карте'}/>
                    <div>
                        {/* возможно добавить изображение с видом метки*/}
                        <input type={'button'} name={'changeMarkType'} value={'Сменить вид метки'}/>
                    </div>
                    {/*<AddNewSchoolsButton addNewItSchoolMinsk={addNewItSchoolMinsk} value={title}/>*/}
                    <input type={'button'} name={'addNewItSchoolMinsk'} value={'Найти объекты'}
                           onClick={handleClickAddSchoolButton}/>
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
                           onClick={handleClickSearchObjectsButton}/>
                </div>
            </div>
            <div className={'mapArea'}>
                <YMaps>
                    <div>
                        <Map className={'map'} state={{center: [latitude, longitude], zoom: 10}}>
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
