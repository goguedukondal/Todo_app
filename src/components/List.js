import React, { useState } from "react";
import {


    Select,
  Box,
  Spacer,
  Flex,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const TodoApp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [edit, setEdit] = useState(-1);
  const [filter, setFilter] = useState("All");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      if (edit !== -1) {
        // If editing an existing task
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === edit ? { ...task, text: newTask } : task
          )
        );
        setEdit(-1);
      } else {
        // If adding a new task
        setTasks((prevTasks) => [
          ...prevTasks,
          { id: Date.now(), text: newTask, completed: false },
        ]);
      }
      setNewTask("");
      onClose();
    }
  };
console.log(tasks)
  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const startEdit = (taskId) => {
    setEdit(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setNewTask(taskToEdit.text);
    onOpen();
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Incomplete") {
      return !task.completed;
    } else {
      return task.completed;
    }
  });

  return (
    <VStack p={4} direction="column">
      <Flex width="60vw" ml="20vw" direction="column" >
        <Flex>
        <Box p="4">
          <Button
            colorScheme="blue"
            onClick={() => {
              setEdit(-1);
              onOpen();
            }}
          >
            Add Todo
          </Button>
        </Box>
        <Spacer />
        <Box p="4">
        <Select
              placeholder="All"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </Select>
        </Box>
        </Flex>
        <Box>
        {filteredTasks.length !== 0 ? (
  filteredTasks.map((task) => (
    <HStack key={task.id} w="100%" spacing={4} align="center" ml="10vw" gap="5vw" width="40vw" mt="3vh">
      <Checkbox
        isChecked={task.completed}
        onChange={() => handleToggleTask(task.id)}
      />
      <Text textDecoration={task.completed ? "line-through" : "none"}>
        {task.text}
      </Text>
      <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
      <Button className="edit" onClick={() => startEdit(task.id)}>
        Edit
      </Button>
    </HStack>
  ))
) : (
  <Text fontSize="xl" mt={4}>
    No tasks added
  </Text>
)}

        </Box>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setEdit(-1);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{edit !== -1 ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task</FormLabel>
              <Input
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter your task"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
              {edit !== -1 ? "Save Changes" : "Add Task"}
            </Button>
            <Button
              onClick={() => {
                setEdit(-1);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default TodoApp;
