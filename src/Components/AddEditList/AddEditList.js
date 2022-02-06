import { useEffect, useRef } from 'react';
import useCustom from '../../Api/CustomHooks/useCustom';
import Spinner from '../../Helpers/Spinner';
import './AddEditList.scss'
import ErrorMessage from '../../Helpers/ErrorMessage/index';

const AddEditList = ({ type, setModal, values }) => {
    const { handleChange, data, addNewUser, loader, setData, editUser, errors } = useCustom();

    const menuRef = useRef();

    useEffect(() => {
        setData(prev => ({...prev, ...values}));
    }, [values, setData]);
    

    useEffect(() => {
        const handler = (event) => {
          if(!menuRef.current?.contains(event.target)) {
            setModal(false);
          }
        }
        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler)
        }
    })

    const handleCloseModal = () => {
        if(type === "Add" ) {
            addNewUser(setModal)
        } else {
            editUser(setModal)
        }
        // setModal(false)
    }



    return (
        <div className='mainAddEdit flex--2 loader'> 
            <div>
                <Spinner loading={loader}/>
            </div>
            <div className='addEdit' ref={menuRef}>
                <h1>{type === "Add" ? "Add User" : "Edit User"}</h1>
                <div className='grid--label'>
                    <div className='flex--3'>
                        <label>Name</label>
                        <input className={`${Object.keys(errors).includes('name') && 'error-input'}`}  type="text" name='name' onChange={(e) => handleChange(e, 'edit')} value={data.name} />
                        {errors.name &&  
                            <ErrorMessage message={errors.name} />
                        }
                    </div>
                    <div className='flex--3'>
                        <label>Username</label>
                        <input className={`${Object.keys(errors).includes('username') && 'error-input'}`}  type="text" name='username' onChange={(e) => handleChange(e, 'edit')} value={data.username} />
                        {errors.username &&  
                            <ErrorMessage message={errors.username} />
                        }
                    </div>
                    <div className='flex--3'>
                        <label>Email</label>
                        <input className={`${Object.keys(errors).includes('email') && 'error-input'}`} type="text" name='email' onChange={(e) => handleChange(e, 'edit')} value={data.email} />
                        {errors.email &&  
                            <ErrorMessage message={errors.email} />
                        }
                    </div>
                    <div className='flex--3'>
                        <label>City</label>
                        <input className={`${Object.keys(errors).includes('city') && 'error-input'}`} type="text" name='city' onChange={(e) => handleChange(e, 'edit')} value={data.address.city} />
                        {errors.city &&  
                            <ErrorMessage message={errors.city} />
                        }
                    </div>
                </div>
                <div className='flex--1'>
                    <button onClick={() => handleCloseModal()}>{type === "Edit" ? "Update" : "Save"}</button>
                </div>
            </div>
        </div>
  )
};

export default AddEditList;
