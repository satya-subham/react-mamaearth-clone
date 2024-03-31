import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
    <h1>404 page not found</h1>
    <Link to='/'>home</Link>
    </>
  )
}
