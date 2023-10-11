import React from 'react'

export default function Footer() {
  return (
    <footer className='w-screen bg-green-950 p-4 fixed bottom-0' style={{ zIndex: "10" }}>
      <p className="text-neutral-100 text-xl lato">Contact us</p>
      <p className='sans-serif text-neutral-100 text-base'>contact@example.com</p>
      <p className='sans-serif text-neutral-100 text-base'>Call us at: +1 (123) 456-7890.</p>
    </footer >
  )
}
