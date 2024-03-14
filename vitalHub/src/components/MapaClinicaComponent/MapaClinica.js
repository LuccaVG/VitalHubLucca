import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from 'expo-location'
import { useEffect, useRef, useState } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { mapskey } from '../../../utils/MapKey';
export default function MapaClinica() {
  const mapReference = useRef(null)
  const [initialPosition, setInitialPosition] = useState(null)
  const [finalPosition, setfinalPosition] = useState({
    latitude : -23.6826684,
    longitude : -46.5578845,
  })

  async function CapturarLocalizacao(){
    const { granted } = await requestForegroundPermissionsAsync()

    if( granted ){
      const currentPosition = await getCurrentPositionAsync()

      setInitialPosition( currentPosition )

      console.log( initialPosition )
    }
  }

  async function RecarregarVisualizacaoMapa(){
    if(mapReference.current && initialPosition)
    {
      await mapReference.current.fitToCoordinates(
        [
          { latitude : initialPosition.coords.latitude, longitude : initialPosition.coords.longitude },
          { latitude : finalPosition.latitude, longitude : finalPosition.longitude },
        ],
        {
          edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
          animated: true,
        }
      )

      console.log(mapReference);
    }
  }


  useEffect(() => {
    CapturarLocalizacao()
    watchPositionAsync({
      accuracy : LocationAccuracy.High,
      timeInterval : 1000,
      distanceInterval : 0.5,
    }, async (Response) => {
      await setInitialPosition( Response )

      mapReference.current?.animateCamera({
        pitch : 60,
        center : Response.coords,
      })
    })
  }, [10000])

  
  useEffect(() => {
    RecarregarVisualizacaoMapa()
  }, [initialPosition])

  return (
    <View style={styles.container}>
      {
        initialPosition != null
       ?(
          <MapView
          ref={mapReference}
        initialRegion={{
          latitude : initialPosition.coords.latitude,
          longitude : initialPosition.coords.longitude,
          latitudeDelta : 0.005,
          longitudeDelta : 0.005,
        }}
        style={ styles.map }
      >

      <Marker
        coordinate={{
          latitude : initialPosition.coords.latitude,
          longitude : initialPosition.coords.longitude,
        }}
      
        title='Minha Localizacao'
        description='AMIGOESTOUAQUI'
        pinColor={'blue'}
      />

      <MapViewDirections
        origin={initialPosition.coords}
        destination={{
          latitude : -23.6826684,
          longitude : -46.5578845,
          latitudeDelta : 0.005,
          longitudeDelta : 0.005,
        }}
        apikey={mapskey}


        strokeWidth={5}
        strokeColor='#496BBA'
      />

      <Marker
        coordinate={{
          latitude : -23.6826684,
          longitude : -46.5578845,
        }}
            
          title='Avenida Kennedy'
          description='Perto de Casa'
          pinColor={'red'}
      />

         </MapView>
        ) : (
          <>
            <Text>Localizacao nao encontrada</Text>

            <ActivityIndicator/>
          </>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    map : {
    flex : 1,
    width : '100%'
  }
});
