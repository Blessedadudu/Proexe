import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addToList, addNewToList } from '../../Api/redux-manager/actions';
import { useSelector } from 'react-redux'; 
import { validateFields } from '../validator/validator'




const useCustom = () => {
    const dispatch = useDispatch(); 
    const [loader, setLoader] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [errors, setErrors] = useState({});

    
    const [data, setData] = useState({
        id: "",
        name: "",
        username: "",
        email: "",
        address: { city: "" }
    });
    


    const PersistedLists = useSelector(state => state.userLists)

    console.log(PersistedLists, 'PersistedLists.items')
    
    const handleChange = (e) => {
            const { name, value } = e.target;
            if(name === "city") {
                setData({
                  ...data,
                  address: {
                      [name]: value
                  },
                });
            } else {
                setData({
                    ...data,
                    [name]: value
                });
            }
    }
    
    const getAllUserLists = useCallback(async () => {
        setLoader(true);

        console.log('kept calling')
        try {
            const response = await axios.get("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")

            if(response.status === 200){
                setUserLists(response.data);
                dispatch(addToList(response.data))
                setLoader(false)
            } 
        } catch {
            
        } finally {

        }
    }, [dispatch])

    useEffect(() => {
        (PersistedLists.items.length === 0 && PersistedLists.reload ) ?  getAllUserLists() : setUserLists(PersistedLists.items);
    }, [PersistedLists.items, PersistedLists.reload, getAllUserLists]);


    const addNewUser = async (closeModal) => {

        setErrors(validateFields(data))
        console.log(validateFields(data), Object.keys(validateFields(data)), 'adsd')
        if(Object.keys(validateFields(data)).length > 0) return;


        setLoader(true);
        try {
            const finalData = {
                ...data,
                id: uuidv4()
            }

            const response = await axios.post("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data", finalData); 

            if(response.status === 201) {
                dispatch(addNewToList(finalData))
            }

        } catch (error) {
            
        } finally {
            setLoader(false);
            closeModal(false)
        }
    }

    const editUser = (closeModal) => {

        setErrors(validateFields(data))
        if(Object.keys(validateFields(data)).length > 0) return;

        setLoader(true);

        try {
                let arrayLists = userLists.map(items => {
                    if(items.id === data.id) {
                        items = {...items, ...data}
                    }
                    return items
                })

                dispatch(addToList(arrayLists))
        } catch (error) {
            
        } finally {
            setTimeout(() => {
                    setLoader(false);
                    closeModal(false);
            }, 1000);
                
        }
        
    }

    const deleteUser = (closeModal, delItem) => {
        setLoader(true);

        try {
            let arrayLists = [...userLists].filter(item => item.id !== delItem.id);
             dispatch(addToList(arrayLists))
        } catch (error) {
            
        } finally {
            setTimeout(() => {
                 setLoader(false);
                 closeModal(false);
            }, 1000);
        }
    }


    return {  setUserLists, getAllUserLists, errors, deleteUser, modalDelete, setModalDelete, setData, data, modalEdit, setModalEdit, editUser, loader, userLists, handleChange, addNewUser, modal, setModal }
};

export default useCustom;
