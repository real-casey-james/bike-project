import React, { useState } from "react";
import { deleteStation } from "../api/stations.tsx";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const Delete = ({
  station,
  setSelectedStation,
  updateStations,
  setEditingStation = (_) => {},
  mini = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteStation(station);

      setSelectedStation(null);

      await updateStations();

      setShowDeleteModal(false);

      setEditingStation(null);

      toast.success(`Station ${station.name} deleted`);
    } catch (error) {
      console.error(error);
      toast.error("Sorry, station failed to delete. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        color="danger"
        variant="outlined"
        loading={loading}
        onClick={() => setShowDeleteModal(true)}
        icon={mini && <DeleteOutlined />}
      >
        {!mini && "Delete"}
      </Button>

      <Modal
        open={showDeleteModal}
        okText={"Delete"}
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        okButtonProps={{ color: "danger", variant: "solid" }}
      >
        Do you really want to delete station {station.name}?
      </Modal>
    </>
  );
};

export default Delete;
