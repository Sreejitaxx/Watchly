import { signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";



const Header = () => {



  const navigate = useNavigate();



  const handleLogout = () => {

    signOut(auth)

      .then(() => {

        navigate("/");

      })

      .catch((error) => {

        console.log(error);

      });

  };



  return (

    <div className="absolute w-full px-10 py-5 flex justify-end items-center z-20">



      <div className="flex items-center gap-4">



        <select className="bg-black text-white border border-gray-500 px-3 py-1 rounded">

          <option>English</option>

          <option>हिंदी</option>

        </select>



        <button

          onClick={handleLogout}

          className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:bg-red-700"

        >

          Logout

        </button>



      </div>



    </div>

  );

};



export default Header;
