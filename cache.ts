import { makeVar } from '@apollo/client'

type Task = {
  title: string
}

// makevar → global stateを生成する
export const todoVar = makeVar<Task[]>([])
