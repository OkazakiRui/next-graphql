import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { initializeApollo } from '../libs/apolloClient'
import { getUsers } from '../queries/queries'
import { GetUsersQuery, Users } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

interface Props {
  users: ({
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>)[]
}
const HasuraSSG: VFC<Props> = ({ users }) => {
  return (
    <Layout title="Hasura SSG">
      <p className="mb-3 font-bold">SSG+ISR</p>
      {users?.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a className="my-1 cursor-pointer">{user.name}</a>
          </Link>
        )
      })}
    </Layout>
  )
}
export default HasuraSSG

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: getUsers,
  })
  return {
    props: { users: data.users },
    revalidate: 1,
  }
}
