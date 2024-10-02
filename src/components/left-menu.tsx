import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChartLine, LayoutDashboard, Train } from "lucide-react";
import Header from "./Header";

const LeftMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const rotaAtual = location.pathname;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menus = [
    {
      title: "Dashboard",
      route: "/",
      spacing: false,
      submenu: false,
      icon: <ChartLine size={25} />,
    },
    {
      title: "Frequência de linhas",
      route: "/frequencia-de-linhas",
      spacing: false,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
      ],
      icon: <Train size={25} />,
    },
  ];

  return (
    <div className="flex h-screen">
      <Header toggleMenu={toggleMenu} />

      <div
        className={`bg-black min-h-screen h-auto p-5 pt-8 md:relative ${
          isMenuOpen ? "w-full md:w-72" : "w-20"
        } duration-500 rounded-tr-[10px] rounded-br-[10px] z-10 hidden md:block flex-col gap-8`}
      >
        <ArrowLeft
          className={`bg-white text-userPrimary text-3xl rounded-full absolute -right-3 top-9 border border-userPrimary md:cursor-pointer duration-300 ${
            !isMenuOpen && "rotate-180"
          }`}
          onClick={toggleMenu}
        />
        <div className="inline-flex">
          <img
            className={`w-full ${isMenuOpen && "px-4 rotate-[360deg] mb-8"}`}
          />
          <hr />
        </div>
        <ul className={`${!isMenuOpen && "flex flex-col gap-5"} `}>
          {menus.map((menu, index) => (
            <div key={index}>
              <li
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-white hover:text-primary ${
                  rotaAtual === menu.route && "bg-white text-primary"
                } ${menu.spacing ? "mt-9" : "mt-2"} `}
                onClick={() => navigate(menu.route)}
              >
                <div className="text-4xl block float-left">
                  {menu.icon ?? <LayoutDashboard />}
                </div>
                <div
                  className={`text-base flex-1 duration-200 ${
                    !isMenuOpen && "hidden"
                  }`}
                >
                  {menu.title}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>

      <div
        className={`bg-primary min-h-screen h-auto p-5 pt-8 fixed inset-0 z-20 transform duration-500 overflow-hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <ArrowLeft
          className={`bg-white text-userPrimary text-3xl rounded-full absolute right-2 top-5 border border-userPrimary cursor-pointer duration-300 ${
            !isMenuOpen && "rotate-180"
          }`}
          onClick={toggleMenu}
        />
        <div className="inline-flex justify-center">
          <img
            // src={logo}
            className={`w-[90%] px-4 rotate-[360deg] mb-8${
              isMenuOpen ? "block" : "hidden"
            }`}
          />
          <hr />
        </div>
        <ul className="flex flex-col">
          {menus.map((menu, index) => (
            <div key={index} className={`${!isMenuOpen && "hidden"}`}>
              <li
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 hover:bg-white hover:text-primary ${
                  rotaAtual === menu.route && "bg-white text-primary"
                } ${menu.spacing ? "mt-9" : "mt-2"} `}
                onClick={() => {
                  navigate(menu.route);
                  closeMenu();
                }}
              >
                <div className="text-4xl block float-left">
                  {menu.icon ?? <LayoutDashboard />}
                </div>
                <div
                  className={`text-base flex-1 duration-200 ${
                    !isMenuOpen && "hidden"
                  }`}
                >
                  {menu.title}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
