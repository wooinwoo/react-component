const Header = () => {
  return (
    <>
      <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50 border-b-2 border-gray-500 shadow-sm">
        <div className="flex-none lg:hidden">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl btn-open-sidebar">
            WIWUI
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
