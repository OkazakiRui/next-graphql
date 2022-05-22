// next/examples/with-apollo/lib/apolloClient.js

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
const createApolloClient = () => {
  return new ApolloClient({
    // ブラウザじゃない場合はwindowがundefinedなのでssrModeをtrue
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
    }),
    cache: new InMemoryCache(),
  })
}

// SSGやISRの挙動が意図しないものになる恐れがある
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()
  // SSGとSSRは常に新しいApolloクライアントを作成する
  if (typeof window === 'undefined') return _apolloClient
  // Apolloクライアントをクライアントで一度作成する
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
