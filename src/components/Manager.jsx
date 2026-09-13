import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()

  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPaswordArray] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setPaswordArray(passwords)
  }
  

  useEffect(() => {
    getPasswords()
    

  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/open.png")) {
      ref.current.src = "icons/cross.png"
      passwordRef.current.type = "text"
    }
    else {
      ref.current.src = "icons/open.png"
      passwordRef.current.type = "password"
    }
  }
  const savePassword = async () => {
    if(form.site.length>3 && form.password.length>3 && form.username.length>3 ){
      await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({id:form.id})})

      let newPassword = { ...form, id: uuidv4() }
      setPaswordArray([...passwordArray, newPassword])
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]))
      await fetch("http://localhost:3000/",{method: "POST",headers:{"Content-type":"application/json"},body:JSON.stringify(newPassword)})
      // console.log([...passwordArray, form])
      setform({ site: "", username: "", password: "" })
      if (isEditing) {
      toast('password edited!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsEditing(false)
    }
    else {
      toast('password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }
  else{
    toast('ERROR: PASSWORD NOT SAVED!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  }

  }
  const deletePassword = async (id) => {

    console.log("Deleting password with id", id)
    let c = confirm("Do you want to delete this password?")
    if (c) {


      setPaswordArray(passwordArray.filter(item => item.id !== id))
      let res= await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content-type":"application/json"},body:JSON.stringify({ id})})
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('password deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }
  const editPassword = (id) => {

    console.log("Editing password with id", id)
    setform({...passwordArray.filter(i => i.id === id)[0],id:id})
    setPaswordArray(passwordArray.filter(item => item.id !== id))
    setIsEditing(true)

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div className=" absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:mycontainer min-h-[87.5vh]">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>
          Pass

          <span className='text-green-700'>Man/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>A Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input name='site' id='site' value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" className='rounded-lg p-4 py-1 border w-full border-green-700' />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input name='username' id='username' value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-lg p-4 py-1 border w-full border-green-700' />
            <div className="relative">

              <input ref={passwordRef} name='password' id='password' value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-lg p-4 py-1 border w-full border-green-700' />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} src="icons/open.png" className='p-1' width={26} alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className="flex justify-center items-center gap-2 hover:bg-green-300 bg-green-400 rounded-full px-8 border border-green-900 py-2 w-fit text-lg font-semibold">


            Save Password
            <lord-icon
              src="icons/plus.json"
              trigger="hover"
              style={{ width: "35px", height: "35px" }}
            ></lord-icon>
          </button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>

                    <td className='py-2 border border-white text-center w-32'>
                      <div className='flex items-center justify-center gap-1' onClick={() => copyText(item.site)}>
                        <a href={item.site} target='_blank'>
                          <span>{item.site}</span>
                        </a>

                        <div className='size-7 cursor-pointer'>
                          <lord-icon
                            src="icons/copy.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px"
                            }}
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center w-32'>
                      <div className='flex items-center justify-center gap-1' onClick={() => copyText(item.username)}>
                        <span>{item.username}</span>

                        <div className='size-7 cursor-pointer'>
                          <lord-icon
                            src="icons/copy.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px"
                            }}
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center w-32'>
                      <div className='flex items-center justify-center gap-1' onClick={() => copyText(item.password)}>
                        <span>{"*".repeat(item.password.length)}</span>

                        <div className='size-7 cursor-pointer'>
                          <lord-icon
                            src="icons/copy.json"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px"
                            }}
                            trigger="hover"
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className='py-2 border border-white text-center w-32'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="/icons/edit.json"
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "3px",
                            paddingLeft: "3px"
                          }}
                          trigger="hover"
                        >
                        </lord-icon></span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                        src="/icons/delete.json"
                        style={{
                          width: "25px",
                          height: "25px",
                          paddingTop: "3px",
                          paddingLeft: "3px"
                        }}
                        trigger="hover"
                      >
                      </lord-icon></span>

                    </td>

                  </tr>
                })}

              </tbody>
            </table>}
        </div>
      </div>
    </>
  )
}

export default Manager