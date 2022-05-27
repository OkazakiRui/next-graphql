import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  children: ReactNode
  title: string
}
export const Layout: VFC<Props> = ({
  children,
  title = 'Welcome to Nextjs',
}) => (
  <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <nav className="bg-gray-800 w-screen">
        <div className="flex items-center pl-8 h-14">
          <div className="flex space-x-4">
            <Link href="/">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                Home
              </a>
            </Link>
            <Link href="/local-state-a">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                makeVar
              </a>
            </Link>
            <Link href="/hasura-main">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                fetchPolicy(Hasura)
              </a>
            </Link>
            <Link href="/hasura-crud">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                CRUD(Hasura)
              </a>
            </Link>
            <Link href="/hasura-ssg">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                SSG+ISR(Hasura)
              </a>
            </Link>
            <Link href="/hooks-memo">
              <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                custom hook + memo
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
    <main className="flex flex-1 flex-col justify-center items-center w-screen">
      {children}
    </main>
  </div>
)
