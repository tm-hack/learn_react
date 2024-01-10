import React, { useEffect, useState } from 'react';
import { Box, Center, CheckboxGroup, Text } from '@chakra-ui/react';
import Task from './component/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(initialTasks)
  }, []);

  const toggleIsChecked = (id) => {
    const tasksCopy = [...tasks];
    // console.log(tasksCopy);
    // console.log(id);
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

const initialTasks = [
  { name: "買い物", isDone: false },
  { name: "ランニング", isDone: false },
  { name: "プログラミングの勉強", isDone: false },
];

export default App;
