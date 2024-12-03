import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Tabelist( {handleOpen, searchTerm}) {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/clients');
                setTableData(response.data);
                // console.log(response);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async() =>{
            try{
                const response = await axios.get(`http://localhost:3000/api/clients/search?q=${searchTerm}`);
                setTableData(response.data);
            }catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, [searchTerm]);

    // const filteredData = tableData.filter(client => 
    //     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     client.job.toLowerCase().includes(searchTerm.toLowerCase()) 
    // );



    // const clients = [
    //     {id:1, name: "John Doe", email: "John.Doe@gmail.com", job:"Developer", rate:"100", isactive: true  },
    //     {id:2, name: "John1 Doe", email: "John1.Doe@gmail.com", job:"Developer1", rate:"100", isactive: true  },
    //     {id:3, name: "John2 Doe", email: "John2.Doe@gmail.com", job:"Developer2", rate:"100", isactive: false  },
    // ]

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/clients/${id}`); // API call to delete client
                setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        }
    };


  return (
    <div>

        {error && <div className='alert alert-error'>{error} </div>}
      <div className="overflow-x-auto mt-10">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job</th>
                <th>Rate</th>
                <th>Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody className='hover'>
            {/* row 1 */}
            {tableData.map((client) => (
            <tr key={client.id}>
                <th>{client.id}</th>
                <th>{client.name}</th>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                    <button className={`btn rounded-full w-20 ${client.isactive ? `btn-primary` : `btn-outline btn-primary` } `}>
                        {client.isactive ? 'Active' : 'Inactive'}
                    </button>
                </td>
                <td>
                    <button onClick={() => handleOpen('edit', client)} className='btn btn-secondary'> Update</button>
                </td>
                <td>
                    <button onClick={() => handleDelete(client.id)} className='btn btn-accent' > Delete</button>
                </td>
                

            </tr>
            ))}
            
            </tbody>
        </table>
        </div>
    </div>
  )
};
