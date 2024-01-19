import React, { useState, useEffect } from "react";
//import UnorderList from "./UnorderList";

const Home = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const [task, setTask] = useState(null);

	const loadTasks = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/mjulia")
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				setTask(resp);
			})
	};

	const updateTask = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/mjulia', {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true si la respuesta es exitosa
				console.log(resp.status); // El código de estado 200, 300, 400, etc.
				console.log(resp.text()); // Intentará devolver el resultado exacto como string
			})
	}


	useEffect(() => {
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
					id: Math.random(Math.floor() * 999999),
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

	const deleteItem = (idIndex) => {
		setTask((prevState) =>
			prevState.filter((elemento, id) => id !== idIndex)
		);
		updateTask();
	};


	return (
		<div className="container text-center">
			<h1 className="text-center mt-5"> To do list</h1>
			<input type="text" onChange={validateInput} value={input} onKeyDown={addItem} />
			<ul className="text-center">
				{task && task.map((task, index) => (
					<li key={index}>{task.label} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}> </i></li>
				))}
				<li className="itemLeft">{list.length === 0 ? "No hay tareas, añadir tareas" : `${list.length} item${list.length === 1 ? '' : 's'} left`}</li>
			</ul>
			<button>Eliminar todas</button>
		</div>
	);
};

export default Home;
