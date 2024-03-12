import { FaCalendarAlt } from "react-icons/fa";

const Header = ({ myDateTime }) => {
     return (
          <>
               <h1 className="text-center text-violet-600 text-3xl sm:text-4xl font-extrabold">
                    What's the plan for today?
               </h1>
               <div className="flex items-center justify-center">
                    <div className="flex text-center">
                         <FaCalendarAlt className="text-slate-500 me-2 mt-4 sm:mt-3" />
                         <p className="mt-3 text-md  text-slate-500">{myDateTime}</p>
                    </div>
               </div>
          </>
     )
}

export default Header;