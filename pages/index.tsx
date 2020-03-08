import React from 'react'
import withIdentity, { useIdentity } from '../lib/withIdentity'

export default withIdentity(() => {
  const identity = useIdentity()
  if (!identity) {
    return null
  }

  return (
    <main>
      <h1>{JSON.stringify(identity)}</h1>
    </main>
  )
})
