import React from "react";
import Station from "./Station.tsx";
import { IStation } from "./BaseComponent";
import { List, Flex, Typography } from "antd";
const { Title } = Typography;

const StationList = ({
  stations,
  updateStations,
  selectedStation,
  setSelectedStation,
  setEditingStation,
}) => {
  return (
    <Flex vertical={true} style={{ textAlign: "center" }}>
      <Title level={2}>
        <span style={{ marginRight: "1em" }}>🚲</span> City Bikes Explorer
      </Title>
      <List
        style={{ width: "400px", overflow: "auto" }}
        bordered
        dataSource={stations}
        renderItem={(station: IStation) => (
          <Station
            station={station}
            updateStations={updateStations}
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
            setEditingStation={setEditingStation}
          />
        )}
      />
    </Flex>
  );
};

export default StationList;
