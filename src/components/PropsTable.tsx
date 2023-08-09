const PropsTable = ({ propsList }: { propsList: { name: string; type: string; description: string }[] }) => {
  return (
    <div className="py-10 rounded-2xl my-5">
      <div className="overflow-x-auto w-[80%] p-auto m-auto">
        <h4 className="text-white">props</h4>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-gray-300">
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {propsList?.map((el, idx: number) => (
              <tr>
                <th>{idx + 1}</th>
                <td>{el.name}</td>
                <td>{el.type}</td>
                <td>{el.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropsTable;
