import React, { useEffect, useState } from "react";
import StationList from "./StationList.tsx";
import Map from "./Map.tsx";
import { Flex } from "antd";
import { getAll } from "../api/stations.tsx";
import Modal from "./Modal.tsx";
import { Bounce, toast } from "react-toastify";

export interface IStation {
  station_id?: number;
  name: string;
  latitude: string;
  longitude: string;
  bikes_available: number;
}

const BaseComponent = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState<IStation | null>(null);
  const [editingStation, setEditingStation] = useState<IStation | null>(null);

  useEffect(() => {
    updateStations();

    toast.info(
      <Flex vertical={true} gap={15}>
        <span>🚲 Welcome to City Bikes Explorer!</span>
        <span>Create a new station by clicking an empty part of the map</span>
        <span>
          Click a station on the map to select it, click it again to edit
        </span>
      </Flex>,
      {
        position: "top-right",
        autoClose: false,
        theme: "colored",
        transition: Bounce,
      },
    );
  }, []);

  const updateStations = async () => {
    try {
      const stations = await getAll();

      setStations(stations as IStation[]);
    } catch (error) {
      console.error(error);
      toast.error("Sorry, unable to load stations. Please try again.");
    }
  };

  return (
    <>
      <Flex style={{ height: "98vh" }} gap={10}>
        <StationList
          stations={stations}
          updateStations={updateStations}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          setEditingStation={setEditingStation}
        />
        <Map
          stations={stations}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          setEditingStation={setEditingStation}
        />
      </Flex>
      <Modal
        editingStation={editingStation}
        updateStations={updateStations}
        setEditingStation={setEditingStation}
        setSelectedStation={setSelectedStation}
      />
    </>
  );
};

export default BaseComponent;
