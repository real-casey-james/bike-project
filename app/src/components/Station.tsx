import React from "react";
import { Button, Flex, List, Popover, Statistic } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Delete from "./Delete.tsx";

const Station = ({
  station,
  updateStations,
  selectedStation,
  setSelectedStation,
  setEditingStation,
}) => {
  const handleStationClick = async () => {
    if (station !== selectedStation) {
      setSelectedStation(station);
    }
  };

  const isStationSelected = station.station_id === selectedStation?.station_id;

  return (
    <List.Item
      key={station.station_id}
      style={
        isStationSelected
          ? { backgroundColor: "#e6f9ff" }
          : { cursor: "pointer" }
      }
      onClick={handleStationClick}
      extra={
        <Flex
          vertical={true}
          gap={5}
          style={isStationSelected ? {} : { visibility: "hidden" }}
        >
          <Popover content={"Edit station"}>
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditingStation(station)}
            />
          </Popover>
          <Popover content={"Delete station"}>
            <Delete
              station={station}
              setSelectedStation={setSelectedStation}
              updateStations={updateStations}
              mini={true}
            />
          </Popover>
        </Flex>
      }
    >
      <Statistic
        title="Bikes available"
        value={station.bikes_available}
        valueStyle={{ color: station.bikes_available ? "#3f8600" : "#FFA500" }}
      />
      <List.Item.Meta
        title={station.name}
        description={`${station.latitude} ${station.longitude}`}
      />
    </List.Item>
  );
};

export default Station;
