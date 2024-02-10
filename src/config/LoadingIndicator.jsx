import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { selectLoading } from '../redux/slice/loadingSlice';

const LoadingIndicator = () => {
  const isLoading = useSelector(selectLoading);

  return (
    <div className="loading-spinner" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: isLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999 }}>
      <BounceLoader color="#f3f013" size={60} speedMultiplier={2}/>
    </div>
  );
};

export default LoadingIndicator;