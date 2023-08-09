/* eslint-disable @typescript-eslint/no-explicit-any */
const TestInput = ({ description, state, setState }: { description: string; state: any; setState: any }) => {
  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{description}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          value={state}
          onChange={(el) => setState(Number(el.target.value))}
        />
      </div>
    </>
  );
};

export default TestInput;
