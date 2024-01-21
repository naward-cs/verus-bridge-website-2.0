'use client'

// Error components must be Client Components
import {useEffect} from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex max-w-sm flex-col space-y-5 text-center">
      <h2>Something went wrong!</h2>
      <button
      className="flex items-center justify-center rounded-lg bg-bluePrimary px-4 py-3 text-center font-geo text-base font-normal text-white disabled:bg-[#969696] md:text-lg"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
