
function Navbar() {
  return (
    <nav className="flex  justify-around bg-[linear-gradient(120deg,_#7f70f5,_#0ea0ff)] text-white py-2 " >
      <div className="font-bold mx-2 p-2 text-center text-2xl ">Task</div>
      <div>
      <ul className="flex gap-5 mx-9 py-2 text-xl ">
        <li className="cursor-pointer hover:font-bold  ">Home</li>
        <li className="cursor-pointer hover:font-bold">About</li>
      </ul>
    </div>
    </nav>
  )
}

export default Navbar
