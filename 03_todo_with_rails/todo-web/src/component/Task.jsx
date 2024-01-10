import { Box, Checkbox, Text } from "@chakra-ui/react"

const Task = (props) => {
  return (
    <Box mb="16px">
      <Checkbox
        isChecked={props.isDone}
        colorScheme="blue"
        size="lg"
        onChange={() => props.toggleIsChecked(props.id)}
      >
        <Text>{props.name}</Text>
      </Checkbox>
    </Box >
  )
}

export default Task