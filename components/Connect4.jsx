import { Button, Center, Container, Space, Text } from '@mantine/core'
import { useReducer } from 'react'

export default function Connect4() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'plus':
        return { value: state.value + 1 }
      case 'minus':
        return { value: state.value - 1 }
      case 'reset':
        return { value: 0 }
    }
  }
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  return (
    <Container>
      <Center>
        <Text size={80}>{state.value}</Text>
      </Center>
      <Space h="md" />
      <Center>
        <Button color={'blue'} variant="light" onClick={() => dispatch({ type: 'plus' })}>
          <Text size={20}>+</Text>
        </Button>
        <Button color={'red'} variant="light" onClick={() => dispatch({ type: 'minus' })}>
          <Text size={20}>-</Text>
        </Button>
        <Button color={'gray'} variant="light" onClick={() => dispatch({ type: 'reset' })}>
          <Text size={20}>Reset</Text>
        </Button>
      </Center>
    </Container>
  )
}