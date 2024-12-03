
export default function Navbar({ onClickAddButton, onSearch }) {

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  }

    return (
        <>
       <div className="navbar bg-base-100 p-4">
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl">CLients</a>
  </div>

  <div className="navbar-center">
  <div className="form-control">
      <input type="text" placeholder="Search" onChange={handleSearchChange} className="input input-bordered w-48 md:w-auto" />
    </div>
  </div>

  <div className="navbar-end">
    <a className="btn btn-primary" onClick={onClickAddButton}>Add CLients</a>
  </div>
</div>
</>
    );
}