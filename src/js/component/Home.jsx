import React, { useState, useEffect } from "react";
//import UnorderList from "./UnorderList";

const Home = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const [task, setTask] = useState(null);

	const loadTasks = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/dsmora")
			.then((resp) => {
				return resp.json();
			})
			.then((resp) => {
				setTask(resp);
			})
	};

	useEffect(() => {
		loadTasks();
	}, []);



	const validateInput = (e) => {
		setInput(e.target.value);
	};

	const addItem = (e) => {
		if (e.keyCode === 13) {
			if (input.trim() !== "") {
				setList([...list, input]);
				setInput("");
			} else {
				alert("Por favor, rellena el input antes de añadirlo");
			}
		}
	};

	const deleteItem = (indexItem) => {
		setList((prevState) =>
			prevState.filter((elemento, index) => index !== indexItem)
		);
	};


	return (
		<div className="container text-center">
			<h1 className="text-center mt-5"> To do list</h1>
			<input type="text" onChange={validateInput} value={input} onKeyDown={addItem} />
			<ul className="text-center">
				{list.map((elemento, index) => (
					<li key={index}>
						{elemento} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}></i>
					</li>
				))}
				{task && task.map((task, index) => (
					<li key={index}>{task.label} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}> </i></li>
				))}
				<li className="itemLeft">{list.length === 0 ? "No hay tareas, añadir tareas" : `${list.length} item${list.length === 1 ? '' : 's'} left`}</li>
			</ul>
		</div>
	);
};

export default Home;
