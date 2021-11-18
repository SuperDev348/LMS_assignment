import React from 'react'

import Header from '../../components/NavTwoStudent'
import Footer from '../../components/Footer'
import LoginForm from './LoginForm'

function Login() {
  
  return (
    <>
      {/* Header 2 */}
      <Header />
      <LoginForm />
      {/* Footer 2 */}
      <Footer />
    </>
  )
}

export default Login