import {mainRequest} from '../api/api';

export const onClickSearchObjectsHandler = (location: string) => {
  return mainRequest.getObjectCoordinates(location)
    .then(res => {
        const pos = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        const coordinats = pos.split(' ').reverse()
        return coordinats
      }
    ).catch(err => {
    })
}

export const onClickShowNearbyObjectsHeddler = (objectType: string, location: string, streetName: string, objectCount: number) => {
  return mainRequest.getDesplayObjects(objectType, location, streetName, objectCount)
    .then(res => {
        const features = res.data.features
        return features
      }
    ).catch(err => {
    })
}