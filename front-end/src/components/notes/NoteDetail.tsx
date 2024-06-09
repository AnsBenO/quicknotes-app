import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNote, updateNote } from "../../services/noteService";
import { TNote } from "../../types/note";
import { FaPen, FaTrashAlt } from "react-icons/fa";

const NoteDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [note, setNote] = useState<TNote>();
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState("");
	const token = localStorage.getItem("authToken");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchNote = async () => {
			if (token) {
				const data = await getNote(id as string, token);
				setNote(data);
				setEditedText(data.text);
			}
		};

		fetchNote();
	}, [id, token]);

	const handleRemoveClick = async () => {
		try {
			const response = await deleteNote(id as string, token as string);
			if (response === 204) {
				alert("Note deleted successfully");
				navigate("/notes");
			}
		} catch (error) {
			alert("Failed to delete note");
		}
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditedText(e.target.value);
	};

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			try {
				if (note) {
					const updatedNote = { ...note, text: editedText };
					await updateNote(id as string, updatedNote, token as string);
					setNote(updatedNote);
					setIsEditing(false);
				}
			} catch (error) {
				alert("Failed to update note");
			}
		} else if (e.key === "Escape") {
			setIsEditing(false);
			setEditedText(note?.text ?? "");
		}
	};

	if (!note) {
		return (
			<div className="flex text-center mt-8 text-gray-500">
				No Note Found{" "}
				<button
					className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
					onClick={() => navigate("/notes")}
				>
					Back to Notes
				</button>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 relative">
			<h2 className="text-3xl font-extrabold mb-4 text-blue-900">
				{note.title}
			</h2>
			<div className="text-gray-700 text-lg break-words whitespace-pre-wrap p-4 border border-gray-200 rounded-lg">
				{isEditing ? (
					<textarea
						value={editedText}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						className="w-full border border-gray-300 rounded-lg p-2"
					/>
				) : (
					<p>{note.text}</p>
				)}
			</div>
			{isEditing && (
				<div className="mt-2 text-gray-500 text-sm">
					Press Enter to save or Esc to discard changes
				</div>
			)}
			<div className="mt-6 flex justify-between items-center">
				<button
					className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
					onClick={() => navigate("/notes")}
				>
					Back to Notes
				</button>
				<div className="flex gap-3">
					<FaPen
						className="text-gray-400 hover:text-gray-700 cursor-pointer transition-all"
						onClick={handleEditClick}
					/>
					<FaTrashAlt
						className="text-gray-400 hover:text-gray-700 cursor-pointer transition-all"
						onClick={handleRemoveClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default NoteDetail;
