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

	useEffect(() => {

		const userCreated = localStorage.getItem("userCreated");

		if (!userCreated) {
			createUser();
			localStorage.setItem("userCreated", "true");
		}
		loadTasks();
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
				updateTask([...task, inputChange]);
				console.log(task);
			} else {
				alert("Por favor, rellena el input antes de añadirlo");
			}
		}
	};

	const updateTask = async (updateTaskAgain) => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/mjulia', {
				method: "PUT",
				body: JSON.stringify(updateTaskAgain),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (!response.ok) {
				// Manejar el caso en que la respuesta no sea exitosa (por ejemplo, error 404, 500, etc.)
				console.error(`Error al actualizar la tarea. Código de estado: ${response.status}`);
				return;
			}

			const updatedData = await response.json();
			console.log("Tarea actualizada con éxito:", updatedData);
		} catch (error) {
			// Manejar errores de red u otros errores inesperados
			console.error("Error al actualizar la tarea:", error);
		}
	};

	const deleteItem = async (idIndex) => {
		try {
			const updatedTaskList = task.filter((elemento, id) => id !== idIndex);
			setTask(updatedTaskList);
			await updateTask(updatedTaskList);
		} catch (error) {
			console.error("Error al actualizar la tarea:", error);
		}
	};

	const deleteAllItems = async () => {
		try {

			const updatedTaskList = [];
			setTask(updatedTaskList);
			await updateTask(updatedTaskList);

			const newTask = {
				id: Math.floor(Math.random() * 999999 + 10) + Math.random().toString(36).substring(2, 5),
				label: "Nueva tarea de ejemplo",
				done: false,
			};

			await updateTask([newTask]);
		} catch (error) {
			console.error("Error al eliminar todas las tareas:", error);
		}
	};


	return (
		<div className="container text-center">
			<h1 className="text-center mt-5"> To do list</h1>
			<input type="text" onChange={validateInput} value={input} onKeyDown={addItem} />
			<ul className="text-center">
				{task && task.map((task, index) => (
					<li key={task.id}>{task.label} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}> </i></li>
				))}
				<li className="itemLeft">{task.length === 0 ? "No hay tareas, añadir tareas" : `${task.length} item${task.length === 1 ? '' : 's'} left`}</li>
			</ul>
			<button onClick={deleteAllItems}>Eliminar todas</button>
		</div>
	);
};

export default Home;
