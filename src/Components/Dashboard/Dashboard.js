import { useState, useEffect, useCallback } from 'react';
import Spinner from '../../Helpers/Spinner';
import './Dashboard.scss'
import useCustom from '../../Api/CustomHooks/useCustom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import AddList from '../AddEditList/AddEditList';
import EditList from '../AddEditList/AddEditList';
import ConfirmBox from '../../Helpers/ConfirmBox/ConfirmBox';


const Dashboard = () => {
  const { loader, data, setData, userLists, modal, setModal, modalEdit, setModalEdit, modalDelete, setModalDelete, getAllUserLists } = useCustom();
  const [values, setValues] = useState({})
  const [tempList, setTempList] = useState([])

  const handleBoxEdit = (item) => {
    setModalEdit(true)
    setValues(item)
    setData({...data, ...item})
  }
  
  const handleBoxDelete = (item) => {
    setModalDelete(true)
    setValues(item)
  }

  const handleFilter = useCallback((e) => {
    if(e?.target?.value?.length > 0) {
        const filteredList = [...userLists].filter((items) => items.username.toLowerCase().includes(e?.target?.value?.toLowerCase()))
        setTempList(filteredList)
      } else {
        setTempList(userLists)
    }

  }, [userLists])

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  



  return (
        <>
          <div>
            <Spinner loading={loader}/>
          </div>
          {modal && <AddList type="Add" setModal={setModal}/>}
          {modalDelete && <ConfirmBox setModal={setModalDelete} values={values}/>}
          {modalEdit && <EditList type="Edit" setModal={setModalEdit} values={values}/>}
          <h1 className='main--heading'>Dashboard</h1>
          <div className='dashboard flex--6'>
            <div className='heading--button flex--2'>
              <h3>User List</h3>
              <div className='flex--4'>
                <input placeholder="Filter by Username" onChange={handleFilter}/>
                <button onClick={() => getAllUserLists()} className='reset'>Reset</button>
                <button onClick={() => setModal(true)}>Add New</button>
              </div>
            </div>
           {userLists.length > 0
            ?
            <div className='table-responsive'>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                {tempList?.map((item, i) => (
                  <tr key={item.id}>
                  <th scope="row">{i + 1}</th> 
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item?.address?.city}</td>
                  <td>
                    <button className='edit-button' onClick={() => handleBoxEdit(item)}><FaEdit/></button>
                    </td>
                  <td>
                    <button className='del-button' onClick={() => handleBoxDelete(item)}><RiDeleteBin6Line/></button>
                    </td>
                </tr>
                ))}
                </tbody>
              </table>
            </div>
            : 
            <div className='no-data'>
              <p>No user, add one . . .</p>
            </div>
          }
          </div>
        </>
    )
};

export default Dashboard;

