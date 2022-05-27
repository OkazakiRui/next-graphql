import { VFC, useState, FormEvent, ChangeEventHandler } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from '../queries/queries'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { UserItemMemo } from '../components/UserItem'

const HasuraCRUD: VFC = () => {
  // 新規ユーザーにはidが存在しない
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })
  const { data, error } = useQuery<GetUsersQuery>(getUsers, {
    fetchPolicy: 'cache-and-network',
  })
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(updateUser)
  const [insert_users_one] = useMutation<CreateUserMutation>(createUser, {
    // insert_users_one に insert されたユーザーデータが格納されている
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })

  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(deleteUser, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 新規ユーザーにはidが存在しない
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
    }
    // データの更新が完了したらstateを初期化する
    setEditedUser({ id: '', name: '' })
  }
  const usernameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEditedUser({ ...editedUser, name: e.target.value })

  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={usernameChangeHandler}
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user) => {
        return (
          <UserItemMemo
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        )
      })}
    </Layout>
  )
}
export default HasuraCRUD
