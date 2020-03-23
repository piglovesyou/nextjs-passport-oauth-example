import React from 'react'
import { GetServerSideProps } from "next"
import { useIdentity, withIdentity, authenticate } from '../lib/authenticate'

export const getServerSideProps: GetServerSideProps = authenticate()

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
