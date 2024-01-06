import { Box, Center, CheckboxGroup, Text } from '@chakra-ui/react';
import Task from './component/Task';

const App = () => {
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
            <Task name="買い物" />
            <Task name="ランニング" />
            <Task name="プログラミングの勉強" />
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
}

export default App;
