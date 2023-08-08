import { Link } from 'react-router-dom';
const SideBar = () => {
  const link = [
    {
      name: 'Pagination',
      path: '/pagination',
    },
    {
      name: 'Modal',
      path: '/modal',
    },
  ];

  return (
    <>
      <ul className="menu rounded-box w-56 fixed h-screen top-0 left-0 transition-all lg:ml-0 -ml-56 pt-20">
        {link.map((el: { name: string; path: string }, index: number) => (
          <li key={index} className="">
            <Link to={el.path}>{el.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideBar;
