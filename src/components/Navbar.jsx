import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>

      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">

        <div className="logo font-bold text-2xl">

          <span className='text-green-700'>&lt;</span>
          Pass

          <span className='text-green-700'>Man/&gt;</span>
        </div>
        {/* {<ul>
          <li className='flex gap-3'>
            <a className='hover:font-bold' href='#'>Home</a>
            <a className='hover:font-bold' href='#'>About</a>
            <a className='hover:font-bold' href='#'>Contact</a>
          </li>
        </ul>} */}
        <button className='text-white bg-green-700 rounded-full my-5 flex justify-between items-center ring-green-300 ring-1 cursor-pointer  hover:bg-green-600'>
          <img className='invert w-10 p-1' src="github.svg" alt="" />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
