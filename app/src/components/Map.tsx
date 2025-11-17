import React from "react";
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Result } from "antd";
import { IStation } from "./BaseComponent";

const Map = ({
  stations,
  selectedStation,
  setSelectedStation,
  setEditingStation,
}) => {
  const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleMapClick = async (input) => {
    setSelectedStation(null);
    setEditingStation({
      longitude: input.detail.latLng.lng.toFixed(6),
      latitude: input.detail.latLng.lat.toFixed(6),
    });
  };

  const handleMarkerClick = async (station: IStation) => {
    if (station === selectedStation) {
      setEditingStation(station);
    } else {
      setSelectedStation(station);
    }
  };

  const isStationSelected = (station: IStation): boolean =>
    selectedStation?.station_id === station.station_id;

  if (!api_key) {
    return (
      <Result
        status="warning"
        title="Please set Google Maps API Key in .env"
        style={{ width: "100%" }}
      />
    );
  }

  return (
    <APIProvider apiKey={api_key}>
      <GoogleMap
        mapId={"DEMO_MAP_ID"}
        defaultZoom={14}
        defaultCenter={{ lat: -41.29225, lng: 174.77629 }}
        onClick={handleMapClick}
        style={{ width: "100%" }}
      >
        {stations.map((station: IStation, index: number) => (
          <AdvancedMarker
            key={index}
            position={{
              lat: Number(station.latitude),
              lng: Number(station.longitude),
            }}
            onClick={() => handleMarkerClick(station)}
          >
            <Pin
              background={isStationSelected(station) ? "#e6f9ff" : "#FFFFFF"}
              borderColor={"black"}
              glyphColor={station.bikes_available ? "#3f8600" : "#FFA500"}
              glyphText={station.bikes_available.toString()}
              scale={isStationSelected(station) ? 2 : 1}
            />
          </AdvancedMarker>
        ))}
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
