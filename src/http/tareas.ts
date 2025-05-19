import axios from "axios";
import type { ITarea } from "../types/iTarea";

const API_URL = "http://localhost:3000/tareas";

export const getAllTareas = async () => {
  try {
    const response = await axios.get<ITarea[]>(API_URL);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postTarea = async (tarea: ITarea) => {
  try {
    const response = await axios.post<ITarea>(API_URL, {
      ...tarea,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const putTarea = async (tareaEditada: ITarea) => {
  try {
    const response = await axios.put<ITarea[]>(
      `${API_URL}/${tareaEditada.id}`,
      { ...tareaEditada }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTarea = async (id: string) => {
  try {
    const response = await axios.delete<ITarea[]>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
