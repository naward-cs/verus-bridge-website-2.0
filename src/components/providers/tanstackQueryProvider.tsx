import {useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const ReactQueryProvider = (props: {children: React.ReactNode}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 6 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
        },
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
