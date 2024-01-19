//import React, { useState } from "react";

// const UnorderList = (props) => {
// 	const {list, deleteItem} = props;


// 	return (
// 		<div>
// 			<ul className="text-center">
// 				{list.map((elemento, index) => (
// 					<li key={index}>
// 						{elemento} <i className="icon fa-solid fa-x" onClick={() => deleteItem(index)}></i>
// 					</li>
// 				))}
// 				<li className="itemLeft">{list.length === 0 ? "No hay tareas, añadir tareas" : `${list.length} item${list.length === 1 ? '' : 's'} left`}</li>
// 			</ul>
// 		</div>
// 	);
// };

//export default UnorderList;