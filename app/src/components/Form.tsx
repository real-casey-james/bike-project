import React, { useState } from "react";
import { Input, Form as AntdForm, Button, Flex } from "antd";
import { toast } from "react-toastify";
import { create, update } from "../api/stations.tsx";
import Delete from "./Delete.tsx";

const Form = ({
  editingStation,
  setEditingStation,
  updateStations,
  setSelectedStation,
}) => {
  const [loading, setLoading] = useState(false);

  const handleValuesChange = (input) => {
    setEditingStation({
      ...editingStation,
      ...input,
    });
  };

  const handleOnFinish = async () => {
    setLoading(true);

    try {
      if (editingStation.station_id) {
        await update(editingStation);
        toast.success(`Station ${editingStation.name} updated`);
      } else {
        await create(editingStation);
        toast.success(`Station ${editingStation.name} created`);
      }

      await updateStations();

      setEditingStation(null);
    } catch (error) {
      console.error(error);
      toast.error(
        "Sorry, your request couldn't be completed. Please try again.",
      );
    }

    setLoading(false);
  };

  return (
    <AntdForm
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={editingStation}
      autoComplete="off"
      onValuesChange={handleValuesChange}
      onFinish={handleOnFinish}
    >
      <AntdForm.Item
        label="Station Name"
        name="name"
        rules={[{ required: true, message: "Please input station name" }]}
      >
        <Input />
      </AntdForm.Item>

      <AntdForm.Item
        label="Latitude"
        name="latitude"
        rules={[
          {
            required: true,
            pattern: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/,
            message: "Please input latitude, eg -56.387, max 10dp",
          },
        ]}
      >
        <Input />
      </AntdForm.Item>

      <AntdForm.Item
        label="Longitude"
        name="longitude"
        rules={[
          {
            required: true,
            pattern: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/,
            message: "Please input longitude, eg 127.485784, max 10dp",
          },
        ]}
      >
        <Input />
      </AntdForm.Item>

      <AntdForm.Item
        label="Bikes Available"
        name="bikes_available"
        rules={[
          {
            required: true,
            pattern: /^\d*$/,
            message: "Please input number of bikes available as digits, eg 6",
          },
        ]}
      >
        <Input />
      </AntdForm.Item>

      <Flex justify={"end"} gap={10}>
        {editingStation.station_id && (
          <Delete
            station={editingStation}
            setSelectedStation={setSelectedStation}
            updateStations={updateStations}
            setEditingStation={setEditingStation}
          />
        )}
        <Button onClick={() => setEditingStation(null)}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </Flex>
    </AntdForm>
  );
};

export default Form;
