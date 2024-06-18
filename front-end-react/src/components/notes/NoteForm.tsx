import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../services/noteService";
import { FaHeading, FaPlus, FaStickyNote } from "react-icons/fa";

const NoteForm: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");
	const navigate = useNavigate();
	const token = localStorage.getItem("authToken");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (token) {
				await createNote({ title, text }, token);
				navigate("/notes");
			}
		} catch (error) {
			console.error(error);
			alert("Failed to create note");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
			>
				<div className="flex justify-center items-center gap-3 text-2xl font-bold mb-6">
					<FaPlus />
					<h2>Create Note</h2>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2">Title</label>
					<div className="relative">
						<FaHeading className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
						/>
					</div>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 mb-2">Text</label>
					<div className="relative">
						<FaStickyNote className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-900 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200"
				>
					Create Note
				</button>
			</form>
		</div>
	);
};

export default NoteForm;
