import { Link, useLocation } from 'react-router-dom';
const SideBar = () => {
  const link = [
    {
      name: 'Pagination',
      path: '/pagination',
    },
    {
      name: 'AllCheck',
      path: '/allcheck',
    },
    {
      name: 'Dropdown',
      path: '/dropdown',
    },
    {
      name: 'Modal',
      path: '/modal',
    },
  ];

  const location = useLocation();
  const lastPath = '/' + location.pathname.split('/')[location.pathname.split('/').length - 1];
  console.log(lastPath);
  return (
    <>
      <ul className="menu rounded-box w-56 fixed h-screen top-0 left-0 transition-all lg:ml-0 -ml-56 pt-20">
        {link.map((el: { name: string; path: string }, index: number) => (
          <li
            key={index}
            className={`text-l ${lastPath === el.path && 'bg-gray-700 rounded-xl text-white active::text-white'}`}
          >
            <Link to={el.path}>{el.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideBar;
