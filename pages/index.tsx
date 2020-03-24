import React from 'react'
import { GetServerSideProps } from "next"
import { withIdentity, useIdentity, authenticate } from '../lib/withIdentity'

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

export const getServerSideProps: GetServerSideProps = authenticate()
