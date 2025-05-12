import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [nuevoToDo, setNuevoToDO] = useState("");
	const [toDos, setToDos] = useState([]);
	
	const getToDos =() =>{
		fetch(`https://playground.4geeks.com/todo/users/Tito`)
			.then(reponse => reponse.json())
			.then(data => {
				console.log(data)
				setToDos(data.todos)
			})

	}
	useEffect(() => {
		getToDos()

	}
		, [])


	const handleClick = () => {
		console.log("nueva tarea", nuevoToDo)
		createNewToDo(nuevoToDo)

	}

	const handleChange = (event) => {

		console.log(event.target.value)
		setNuevoToDO(event.target.value)

	}

	let createNewToDo = (data) => {
		fetch('https://playground.4geeks.com/todo/todos/Tito', {
			method: 'POST',
			body: JSON.stringify({
				"label": data,
				"is_done": false,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => {console.log('Success:', response) 

				setNuevoToDO("")
				getToDos()
				
			}) 
			.catch(error => console.error(error));
	}

	const deleteToDo = (id) => {
		 
		fetch('https://playground.4geeks.com/todo/todos/'+id, {
			method: 'DELETE',
		})
		.then(response => {
			if(response.ok){
				getToDos()
			}
		})
	}
	return (
		<div className="text-center">


			<h1 className="text-center mt-5">ToDo List</h1>
			<div className="container d-flex gap-2">
				<input id="toDo" type="text" className="form-control" onChange={handleChange} value={nuevoToDo} />
				<button onClick={handleClick} className="btn btn-primary">Agregar tarea</button>
			</div>


			<ul className="list-group">
				{toDos.map((toDo, index) => {
					return (
						<li className={`list-group-item d-flex justify-content-between aling-items-center ${index % 2 === 0 ? "bg-light" : ""}`} key={index}>
							{toDo.label} <button className="btn btn-danger" onClick={() => deleteToDo(toDo.id)}>x</button>
						</li>)
				})}

			</ul>
		</div>
	);
};

export default Home;