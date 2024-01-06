import { Box, Center, CheckboxGroup, Text } from '@chakra-ui/react';
import Task from './component/Task';

const App = () => {
  const initialTasks = [
    {
      name: "買い物",
      isDone: false
    },
    {
      name: "ランニング",
      isDone: false
    },
    {
      name: "プログラミングの勉強",
      isDone: false
    },
  ];

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
            {initialTasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  name={task.name}
                  isDone={task.isDone} />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}

export default App;
