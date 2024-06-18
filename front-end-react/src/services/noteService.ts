// src/services/noteService.ts
import axios from "axios";

const API_URL = "http://localhost:3003/api/notes";

export const getNotes = async (token: string) => {
	const response = await axios.get(API_URL, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const getNote = async (id: string, token: string) => {
	const response = await axios.get(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const createNote = async (
	note: { title: string; text: string },
	token: string
) => {
	const response = await axios.post(API_URL, note, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const updateNote = async (
	id: string,
	note: { title: string; text: string },
	token: string
) => {
	const response = await axios.patch(`${API_URL}/${id}`, note, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const deleteNote = async (id: string, token: string) => {
	const response = await axios.delete(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.status;
};
