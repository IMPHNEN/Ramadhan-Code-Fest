import { FiHeart } from "react-icons/fi";

const Footer = () => {
     return (
          <>
               <footer className="flex items-center justify-center mt-4">
                    <div className="flex">
                         <p className="text-slate-500 text-sm">Made with love by <a href="https://www.github.com/Anugerah20" className="font-bold">Nabil</a></p>
                         <FiHeart className="flex justify-center ms-2 text-slate-500 hover:text-pink-600" />
                    </div>
               </footer>
          </>
     )
}

export default Footer;
