
import { AlignJustify } from "lucide-react";

interface IHeaderProps {
  toggleMenu: () => void;
}

const Header = ({ toggleMenu }: IHeaderProps) => {

  return (
    <div className="bg-white items-center absolute shadow-md top-0 left-1/2 rounded-br-[10px] rounded-bl-[10px] transform -translate-x-1/2 md:mt-2 md:w-[90%] w-full duration-300 md:hidden">
      <div className="flex justify-between md:justify-end items-center h-20 px-8 md:gap-4">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <AlignJustify className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
