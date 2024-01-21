import React, { useState, useEffect } from "react";
//import UnorderList from "./UnorderList";

const Home = () => {
	const [input, setInput] = useState("");
	const [task, setTask] = useState([]);

	const createUser = async () => {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/mjulia",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
			.then(response => console.log(response.ok));

		return response;
	};

	const loadTasks = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/mjulia")
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				setTask(resp);
			})
			.catch((error) => console.error("Error al cargar las tareas:", error));
	};

	const updateTask = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/mjulia', {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		});
	};

	useEffect(() => {
		createUser().then(() => {
			loadTasks();
		});
	}, []);

	const validateInput = (e) => {
		setInput(e.target.value);
	};

	const addItem = (e) => {
		if (e.keyCode === 13) {
			if (input.trim() !== "") {
				const inputChange =
				{
					id: Math.floor(Math.random() * 999999 + 10) + Math.random().toString(36).substring(2, 5),
					label: input,
					done: false,
				}
				setTask([...task, inputChange]);
				setInput("");
				updateTask();
				console.log(task);
			} else {
				alert("Por favor, rellena el input antes de añadirlo");
			}
		}
	};

	const deleteItem = async (idIndex) => {
		await setTask((prevState) =>
			prevState.filter((elemento, id) => id !== idIndex)
		);
		updateTask();
	};

	const deleteAllItems = async () => {
		setTask([]);
		await updateTask();
	};


	return (
		<div className="container text-center">
			<h1 className="text-center mt-5"> To do list</h1>
			<input type="text" onChange={validateInput} value={input} onKeyDown={addItem} />
			<ul className="text-center">
				{task && task.map((task, index) => (
					<li key={index}>{task.label} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}> </i></li>
				))}
				<li className="itemLeft">{task.length === 0 ? "No hay tareas, añadir tareas" : `${task.length} item${task.length === 1 ? '' : 's'} left`}</li>
			</ul>
			<button onClick={deleteAllItems}>Eliminar todas</button>
		</div>
	);
};

export default Home;
