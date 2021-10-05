import React, {ChangeEvent, useCallback, useState} from 'react';
import './App.css';
import {onClickSearchObjectsHandler, onClickShowNearbyObjectsHeddler} from './hendlers/apiHendler';
import {v1} from 'uuid';
import {MyMapp} from './Components/MyMapp';
import {Switch} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {maxLengthCreator, required} from "./hendlers/validators";





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
    const [schoolName, setSchoolName] = useState<string>('');
    const [schoolDescription, setSchoolDescription] = useState<string>('');
    const [newSchoolLatitude, setNewSchoolLatitude] = useState<any>(0);
    const [newSchoolLongitude, setNewSchoolLongitude] = useState<any>(0);
    const [itMinskSchools, setItMinskSchools] = useState<Array<ItMinskSchoolType>>([]);

    const [searchObjectLocation, setSearchObjectLocation] = useState<string>('Киев');
    const [searchObjectType, setSearchObjectType] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [searchObjectCount, setSearchObjectCount] = useState<number>(1);
    const [displaySearchObjects, setDisplaySearchObjects] = useState<Array<any>>([]);

    const [searchObjectLatitude, setSearchObjectLatitude] = useState<number>(50.5000);
    const [searchObjectLongitude, setSearchObjectLongitude] = useState<number>(30.5000);

    const [showingAddObjectNavigation, setShowingAddObjectNavigation] = useState<boolean>(true);

    const changeToggle = (e: any) => {
        setShowingAddObjectNavigation(e.target.checked)
    };

    const onChangeSchoolNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSchoolName(e.currentTarget.value);
    }

    const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 20) {
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
        setSchoolName('');
        setSchoolDescription('');
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
                const shownObjects: Array<displaySearchObjectType> = foundObjects.map((obj: any) => {
                    return {
                        description: obj.properties.description,
                        id: v1(),
                        schoolName: obj.properties.name,
                        newSchoolLatitude: obj.geometry.coordinates[1],
                        newSchoolLongitude: obj.geometry.coordinates[0],
                        phone: 777654
                    }
                })
                setDisplaySearchObjects(shownObjects);
            }
        })
    }

    const getMapCoordinates = useCallback((e: any) => {
        const coordinatesSchool = e.get('coords');
        setNewSchoolLatitude(+coordinatesSchool[0]);
        setNewSchoolLongitude(+coordinatesSchool[1]);
    }, []);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 5,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 56,
                padding: '0 30px',
            },
        }));

    const classes = useStyles();

    // const maxLength10 =


    return (
        <div className="App">
            <div className={'navigation'}>
                <div>
                    <p className={'changeMode'}>Сменить режим</p>
                    <Switch
                        checked={showingAddObjectNavigation}
                        onChange={changeToggle}
                        name="toggle"
                    />
                </div>
                {showingAddObjectNavigation
                    ? <div className={'addObjectPanel'}>
                        <div><p>Добавить школу</p></div>
                        <div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    value={schoolName}
                                    onChange={onChangeSchoolNameHandler}
                                    id="outlined-helperText"
                                    label="Название школы"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                /></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    value={schoolDescription}
                                    onChange={onChangeDescriptionHandler}
                                    id="outlined-helperText"
                                    label="Описание"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                /></div>
                        </div>
                        <div>
                            <div><p>Координаты</p></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    title={'Широта'}
                                    value={newSchoolLatitude}
                                    onChange={onChangeNewSchoolLatitudeHandler}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    validate = {[required,maxLengthCreator(3)]}
                                /></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    title={'Долгота'}
                                    value={newSchoolLongitude}
                                    onChange={onChangeNewSchoolLongitudeHandler}
                                    defaultValue="Default Value"
                                    variant="outlined"
                                    validate = {[required,maxLengthCreator(3)]}
                                /></div>
                        </div>
                        <Button className={classes.root}
                                variant="contained"
                                type={'button'}
                                name={'addNewItSchoolMinsk'}
                                value={'Добавить на карту'}
                                onClick={onClickAddSchoolButtonHandler}>Добавить на карту</Button>
                    </div>
                    : <div className={'searchObjectPanel'}>
                        <div><p>Найти объект(ы)</p></div>
                        <div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    value={searchObjectLocation}
                                    onChange={onChangeLocationNameHandler}
                                    id="outlined-helperText"
                                    label="Локация"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                /></div>
                            <Button className={classes.root}
                                    variant="contained"
                                    type={'button'}
                                    name={'searchLocation'}
                                    value={'Показать локацию на карте'}
                                    onClick={onClickSearchLocationButtonHeddler}>Показать локацию на карте</Button>
                        </div>
                        <div>
                            <div><p>Уточнение поиска</p></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    value={searchObjectType}
                                    onChange={onChangeSearchObjectTypeHandler}
                                    id="outlined-helperText"
                                    label="Тип объекта"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                /></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    value={streetName}
                                    onChange={onChangeStreetNameHandler}
                                    id="outlined-helperText"
                                    label="Название улицы"
                                    defaultValue="Default Value"
                                    variant="outlined"
                                /></div>
                            <div className={'TextFieldInput'}>
                                <TextField
                                    name={'objectCount'}
                                    value={searchObjectCount}
                                    InputProps={{inputProps: {min: 1, max: 20}}}
                                    title={'Сколько максимально вывести объектов от 1 до 20'}
                                    placeholder={'мах кол-во'}
                                    onChange={onChangeSearchObjectCountHandler}
                                    id="outlined-number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                /></div>
                        </div>
                        <div className={'displaySearchObjectsBox'}>
                            <div>Объектов найдено :</div>
                            {displaySearchObjects.length} </div>
                        <Button className={classes.root}
                                variant="contained"
                                type={'button'}
                                name={'showNearbyObjects'}
                                value={'Показать объект(ы) на карте'}
                                onClick={onClickShowNearbyObjectsButtonHeddler}>Показать объект(ы) на карте</Button>

                    </div>}
            </div>
            <div className={'mapArea'}>
                <MyMapp getMapCoordinates={getMapCoordinates}
                        searchObjectLatitude={searchObjectLatitude}
                        searchObjectLongitude={searchObjectLongitude}
                        displaySearchObjects={displaySearchObjects}
                        itMinskSchools={itMinskSchools}/>
            </div>
        </div>
    );
}

export default App;


