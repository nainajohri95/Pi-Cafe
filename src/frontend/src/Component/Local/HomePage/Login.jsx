import React from 'react'
import ImageLayout from '../../Global/ImageLayout'
import Logo from '../../Global/Logo'
import LoginForm from './LoginForm'

const Login = ({setUserDetails}) => {
  return (
    <div className="w-full justify-between max-h-screen flex items-start">
        {/* left pane */}
        <ImageLayout />

        {/* right pane */}
        <div className="lg:w-[55%] w-full">
            <>
              <Logo />
              <LoginForm setUserDetails={setUserDetails} />
            </>
        </div>
      </div>
  )
}

export default Login