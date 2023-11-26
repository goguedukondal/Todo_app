import React from "react";
import { useState } from "react";
import { Button,Box,Spacer,Flex,Select } from '@chakra-ui/react'

function TodoApp() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [edit, setEdit] = useState(-1);
  const AddTodo = () => {
    const updatedList = [...todoList, todoItem];
    setTodoList(updatedList);
    setTodoItem("");
  };
  const del = (index) => {
    const filteredList = todoList.filter((item, idx) => idx !== index);
    setTodoList(filteredList);
  };
  const startEdit = (index) => {
    setEdit(index);
    setTodoItem(todoList[index]);
  };
  const finishEditing=(index)=>{
    if(edit!==-1){
        const newList =[...todoList]
    newList[index] = todoItem
    setTodoList(newList);
    setTodoItem('')
    }
  }
  return (
    <div className="todo_Container">
      <div className="input_container">
        <input
          type="text"
          className="input"
          value={todoItem}
          onChange={(event) => setTodoItem(event.target.value)}
        />
        <Flex width="60vw" ml="20vw">
  <Box p='4' >
  <Button colorScheme='blue'  onClick={AddTodo}>Add Todo</Button>
  </Box>
  <Spacer />
  <Box p='4'>
  <Select placeholder='All'>
  <option value='option1'>All</option>
  <option value='option2'>Incomplete</option>
  <option value='option3'>Complete</option>
</Select>
  </Box>
</Flex>
      
        
      </div>
      <ul className="todolist">
        {todoList.length !== 0 &&
          todoList.map((item, index) => {
            return (
              <li>
                {item}
                <button className="edit" onClick={() => startEdit(index)}>
                  edit
                </button>
                <button className="save" onClick={()=>finishEditing(index)}>
                    save
                </button>
                <button className="del" onClick={() => del(index)}>
                  delete
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default TodoApp;
