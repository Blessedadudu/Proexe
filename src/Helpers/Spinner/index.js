import Loader from '../../assets/loaderio.svg'


function Spinner({ loading }) {
  return (
    <div>
     {loading &&
      <div className='flex--2 loader'>
          <img src={Loader} alt=''/>
      </div>}
    </div>
  );
} 


export default Spinner;
