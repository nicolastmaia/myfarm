import { Button, Icon, Text } from 'native-base';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

const CustomMap = (props, ref) => {
  const [editing, setEditing] = useState(false);
  const [remove, setRemove] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [polygonCoordinate, setPolygonCoordinate] = useState([]);

  useEffect(() => {
    setMarkers(props.markers);
  }, [props.markers]);

  useEffect(() => {
    if (markers.length) fetchCoordinateFromMarkers();
  }, [markers]);

  useImperativeHandle(ref, () => ({ getValores }));

  const toggleEditing = () => {
    setEditing((prevState) => !prevState);
    setRemove(false);
  };

  const toggleRemove = () => {
    setRemove((prevState) => !prevState);
  };

  const createMarker = (coordinate) => {
    if (editing) {
      setMarkers((prevState) => {
        let key = prevState.length;
        key++;
        return [...prevState, { key, coordinate }];
      });
    }
  };

  const updateMarkerCoordinate = (markerKey, coordinate) => {
    let editedMarkersArray = markers.filter((marker) => {
      return marker.key != markerKey;
    });
    editedMarkersArray.push({ key: markerKey, coordinate });
    editedMarkersArray.sort(function (a, b) {
      return a.key - b.key;
    });
    setMarkers(editedMarkersArray);
  };

  const removeMarker = (markerKey) => {
    if (remove) {
      let editedMarkersArray = markers.filter((marker) => {
        return marker.key != markerKey;
      });
      editedMarkersArray.sort(function (a, b) {
        return a.key - b.key;
      });
      setMarkers(editedMarkersArray);
    }
  };

  const fetchCoordinateFromMarkers = () => {
    setPolygonCoordinate([]);
    markers.map((marker) => {
      const { coordinate } = marker;
      setPolygonCoordinate((prevState) => [...prevState, coordinate]);
    });
  };

  const getValores = () => {
    return markers;
  };

  const renderMarker = (marker) => {
    return (
      <Marker
        pinColor='green'
        key={marker.key}
        draggable
        coordinate={marker.coordinate}
        title={`${marker.key}`}
        onPress={() => removeMarker(marker.key)}
        onDragEnd={(e) => {
          updateMarkerCoordinate(marker.key, e.nativeEvent.coordinate);
        }}
      />
    );
  };

  return (
    <>
      <MapView
        style={props.style}
        loadingEnabled={true}
        moveOnMarkerPress={false}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onLongPress={(e) => createMarker(e.nativeEvent.coordinate)}
      >
        {editing ? markers.map((marker) => renderMarker(marker)) : <></>}
        {polygonCoordinate.length > 0 ? (
          <Polygon
            ref={ref}
            coordinates={polygonCoordinate}
            fillColor='rgba(255, 138, 138, 0.5)'
          />
        ) : (
          <></>
        )}
      </MapView>
      {editing ? (
        <>
          <Button success style={styles.editingButton} onPress={toggleEditing}>
            <Icon type='Ionicons' name='checkmark-outline' />
            <Text>Salvar</Text>
          </Button>
          <Button
            danger={remove}
            warning={!remove}
            style={styles.removeButton}
            onPress={toggleRemove}
          >
            <Icon type='Ionicons' name='trash-outline' />
            <Text>Tirar Pino: {remove ? 'Ligado' : 'Desligado'}</Text>
          </Button>
        </>
      ) : (
        <Button success style={styles.editingButton} onPress={toggleEditing}>
          <Icon type='Ionicons' name='golf-outline' />
          <Text>Editar</Text>
        </Button>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  editingButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  removeButton: { position: 'absolute', bottom: 5, left: 5 },
});

export default forwardRef(CustomMap);
