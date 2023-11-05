import React from 'react'

export default function Footer() {
  return (
    <footer className='w-screen p-4 bottom-0 shadow-2xl drop-shadow-2xl' style={{ zIndex: "10" }}>
      <p className="text-xl lato">Contact us</p>
      <p className='sans-serif text-base'>contact@example.com</p>
      <p className='sans-serif text-base'>Call us at: +1 (123) 456-7890.</p>
      <a href="/tac" className='sans-serif text-base' style={{ color: "blue" }}>Terms and Conditions</a> <br />
      <a href="/policies" className='sans-serif text-base' style={{ color: "blue" }}>Privacy Policies</a>

    </footer >
  )
}
