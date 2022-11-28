import { useEffect, useState } from 'react'

function CheckNetwork() {
    
    const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

    useEffect(() => {
        const setOffline = () => {
            setNetworkStatus(false)
        }
    window.addEventListener("offline", setOffline)

    return () => {
        window.removeEventListener("offline", setOffline)
    };
}, []);

  return networkStatus;
}

export default CheckNetwork;