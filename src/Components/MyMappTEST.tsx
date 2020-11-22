import {Map, Placemark, RulerControl, TypeSelector, YMaps, ZoomControl} from 'react-yandex-maps';
import pointer from '../assets/cut-map-marker-final.jpg';
import React from 'react';
import {displaySearchObjectType, ItMinskSchoolType} from '../App';

type MyMappTestType = {
  getMapCoordinates: (e: any)=> void
  searchObjectLatitude: number
  searchObjectLongitude: number
  displaySearchObjects: Array<displaySearchObjectType>
  itMinskSchools: Array<ItMinskSchoolType>
}

export const MyMappTEST = React.memo((props: MyMappTestType) => {
  return (
    <YMaps>
      <div>
        <Map className={'map'}
             onClick={(e: any) => {
               props.getMapCoordinates(e)
             }}
             state={{center: [props.searchObjectLatitude, props.searchObjectLongitude], zoom: 10}}>
          <ZoomControl options={{position: {right: 10, top: 10}}}/>
          <TypeSelector options={{position: {left: 10, top: 10}}}/>
          <RulerControl options={{position: {right: 50, top: 10}}}/>
          {props.displaySearchObjects.map((displaySearchObject: displaySearchObjectType) => <Placemark
              geometry={[displaySearchObject.newSchoolLatitude, displaySearchObject.newSchoolLongitude]}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              properties={{
                hintContent: displaySearchObject.schoolName,
                balloonContent: displaySearchObject.description,
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: pointer,
                iconImageSize: [40, 50],
                iconImageOffset: [-20, -55],
              }}
            />
          )}
          {props.itMinskSchools.map((itMinskSchool: ItMinskSchoolType) => <Placemark
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
                iconImageOffset: [-40, -30],
              }}
            />
          )}
        </Map>
      </div>
    </YMaps>
  )
})