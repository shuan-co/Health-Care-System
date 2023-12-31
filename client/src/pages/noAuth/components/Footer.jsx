import React from 'react'

export default function Footer() {
  return (
    <footer className='w-screen p-4 pr-10 bottom-0 shadow-2xl drop-shadow-2xl bg-white text-end' style={{ zIndex: "10" }}>
      <p className="text-xl lato">Contact us</p>
      <p className='sans-serif text-base'>contact@example.com</p>
      <p className='sans-serif text-base'>Call us at: +1 (123) 456-7890.</p>
      <a className='sans-serif text-base' style={{ color: "blue" }} href="/tac">Terms and Conditions</a> <br />
      <a className='sans-serif text-base' style={{ color: "blue" }} href="/policies">Privacy Policy</a>
    </footer >
  )
}
