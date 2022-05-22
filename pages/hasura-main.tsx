import { VFC } from 'react'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { getUsers } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  // 型名はqueriesで命名した 関数名 + Query
  const { data, error } = useQuery<GetUsersQuery>(getUsers, {
    // fetchPolicy: 'network-only', // useQueryが実行されるたびにhasuraから取得する
    fetchPolicy: 'cache-and-network', // network-only + 通信の最中はcacheを表示しておく
    // fetchPolicy: 'cache-first', // :default: 一度取得したデータがキャッシュに存在する場合はキャッシュから読み込む
    // fetchPolicy: 'no-cache', // キャッシュを保存しない
  })

  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
