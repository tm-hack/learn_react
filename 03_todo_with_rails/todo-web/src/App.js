import React, { useEffect, useState } from 'react';
import { Box, Button, Center, CheckboxGroup, Flex, Input, Text } from '@chakra-ui/react';
import Task from './component/Task';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    try {
      const res = await axios.get('http://localhost:3010/tasks');
      setTasks(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const createTask = async () => {
    try {
      await axios.post('http://localhost:3010/tasks', {
        name: name,
        isDone: false
      });
      setName("");
      fetch();
    } catch (e) {
      console.log(e);
      //#TODO エラーメッセージを画面に表示する
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  const toggleIsChecked = (id) => {
    const tasksCopy = [...tasks];
    const isDone = tasksCopy[id].isDone;
    tasksCopy[id].isDone = !isDone;
    setTasks(tasksCopy);
  }

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <Flex mb="24px">
            <Input
              placeholder="タスク名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  id={index}
                  name={task.name}
                  isDone={task.isDone}
                  toggleIsChecked={toggleIsChecked} />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}

export default App;
