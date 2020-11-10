import {mainRequest} from '../api/api';


export const onClickSearchObjectsHandler = (location: string) => {
  return mainRequest.getObjectCoordinates(location)
    .then(res=>{
      let pos = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
       let coordinats = pos.split(' ').reverse()
  return coordinats
    }
      ).catch(err => {

  })
}