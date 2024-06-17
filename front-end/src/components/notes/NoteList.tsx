import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteNote, getNotes } from "../../services/noteService";
import { TNote } from "../../types/note";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const NoteList: React.FC = () => {
	const [notes, setNotes] = useState<TNote[]>([]);
	const token = localStorage.getItem("authToken");

	useEffect(() => {
		const fetchNotes = async () => {
			if (token) {
				try {
					const data = await getNotes(token);
					setNotes(data);
					console.log(notes[0]);
				} catch (error) {
					console.error("Failed to fetch notes", error);
				}
			}
		};

		fetchNotes();
	});

	const handleRemoveClick = async (id: string, token: string | null) => {
		try {
			const response = await deleteNote(id, token as string);
			if (response === 204) {
				setNotes(notes.filter((note) => note._id !== id));
			}
		} catch (error) {
			alert("Failed to delete note");
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6 mt-8 bg-gray-100 rounded-lg shadow-xl">
			<h2 className="text-4xl font-extrabold text-center mb-6 text-blue-900">
				My Notes
			</h2>
			<Link
				to="/create-note"
				className="text-center bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-600 hover:scale-105 transition-all mb-6 items-center justify-center space-x-2 inline-flex"
			>
				<FaPlus />
				<span>Create Note</span>
			</Link>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{notes.map((note: TNote) => (
					<li
						key={note._id}
						className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 relative"
					>
						<Link
							to={`/notes/${note._id}`}
							className="block text-2xl font-bold text-blue-900 hover:text-blue-600 transition-colors"
						>
							{note.title}
						</Link>
						<p className="text-gray-700 mt-2 truncate">
							{note.text.slice(0, 100)}...
						</p>
						<p className="text-gray-500 mt-1 text-sm">
							{new Date(note.createdAt).toLocaleString()}
						</p>
						<FaTrashAlt
							className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 cursor-pointer"
							onClick={() => handleRemoveClick(note._id, token)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NoteList;
