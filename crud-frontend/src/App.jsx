import { useState } from 'react'
import './App.css'
import ModalForm from './components/Modalform'
import Navbar from './components/Navbar'
import Tabelist from './components/Tabelist'
import axios from 'axios'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setmodalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState('');
  const [clientData, setClientData] = useState(null);

  const handleOpen = (mode, client) =>{
    setClientData(client);
    setIsOpen(true);
    setmodalMode(mode);
  }

  const handleSubmit = async (newClientData) =>{
    if (modalMode === 'add'){
      try {
        const response = await axios.post('http://localhost:3000/api/clients', newClientData); // Replace with your actual API URL
        console.log('Client added:', response.data); // Log the response
        // setTableData((prevData) => [...prevData, response.data]);
        // Optionally, update your state here to reflect the newly added client
        } catch (error) {
            console.error('Error adding client:', error); // Log any errors
        }
      console.log('modal mode add');
    } else{
      console.log('Updating client with ID:', clientData.id); // Log the ID being updated
            try {
                const response = await axios.put(`http://localhost:3000/api/clients/${clientData.id}`, newClientData);
                console.log('Client updated:', response.data);
                setTableData((prevData) =>
                  prevData.map((client) => (client.id === clientData.id ? response.data : client))
                );
                } catch (error) {
                console.error('Error updating client:', error); 
            }
    }
  }

  return (
    <>
     <Navbar onClickAddButton={() => handleOpen('add')} onSearch={setSearchTerm} />
     <Tabelist handleOpen={handleOpen} searchTerm={searchTerm} />
     <ModalForm 
     isOpen={isOpen} 
     onSubmit = {handleSubmit}
     onClose={() => setIsOpen(false)}
     mode = {modalMode} clientData={clientData}
     />
    </>
  )
}

export default App
