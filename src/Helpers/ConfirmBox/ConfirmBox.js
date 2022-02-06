import { useEffect, useRef } from 'react';
import './ConfirmBox.scss'
import useCustom from '../../Api/CustomHooks/useCustom';
import Spinner from '../Spinner';


const ConfirmBox = ({ setModal, values }) => {
    const { deleteUser, loader } = useCustom();

    const menuRef = useRef();



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
    return (
        <div className='confirmBox flex--2 loader'>
            <div>
                <Spinner loading={loader}/>
            </div>
            <div className='box' ref={menuRef}>
                <h5>Are you sure you want to delete ?</h5>
                <button onClick={() => deleteUser(setModal, values)}>Delete</button>
            </div>
        </div>
    );
};

export default ConfirmBox;
