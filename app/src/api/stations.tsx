import { IStation } from "../components/BaseComponent";

const endpoint = "http://localhost:3001/stations";

export const getAll = async () => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Failed to fetch stations");
  }

  return response.json();
};

export const create = async (station: IStation) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
  });

  if (!response.ok) {
    throw new Error("Failed to create station");
  }
};

export const update = async (station: IStation) => {
  const response = await fetch(`${endpoint}/${station.station_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(station),
  });

  if (!response.ok) {
    throw new Error("Failed to update station");
  }
};

export const deleteStation = async (station: IStation) => {
  const response = await fetch(`${endpoint}/${station.station_id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete station");
  }
};
