import { Checkbox, Text, Flex } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

const Task = (props) => {
  return (
    <Flex mb="16px" justifyContent="space-between" alignItems="center">
      <Checkbox
        isChecked={props.isDone}
        colorScheme="blue"
        size="lg"
        onChange={() => props.toggleIsChecked(props.id)}
      >
        <Text>{props.name}</Text>
      </Checkbox>
      <CloseIcon onClick={() => props.destroyTaskById(props.id)} />
    </Flex >
  )
}

export default Task