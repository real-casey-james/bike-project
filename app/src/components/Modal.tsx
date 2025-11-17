import React from "react";
import { Modal as AntdModal } from "antd";
import Form from "./Form.tsx";

const Modal = ({
  updateStations,
  editingStation,
  setEditingStation,
  setSelectedStation,
}) => {
  const titleText = editingStation?.station_id
    ? "Edit Station"
    : "Create Station";

  return (
    <AntdModal
      title={titleText}
      onCancel={() => setEditingStation(null)}
      open={!!editingStation}
      destroyOnHidden={true}
      footer={null}
    >
      <Form
        editingStation={editingStation}
        setEditingStation={setEditingStation}
        updateStations={updateStations}
        setSelectedStation={setSelectedStation}
      />
    </AntdModal>
  );
};

export default Modal;
