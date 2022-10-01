import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const OrgPage = () => {
    const params = useParams();
    const orgId = params.id;

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const currentOrg = clients.find(clients => clients.org_id == orgId)

    useEffect(() => {
        
    }, [])

    if (loading) return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    if (error) return <h1 className='centerContainer h-screen text-2xl'>{error}</h1>
    return (
        <div className='centerContainer h-screen text-3xl'>
            <p>Организация № {orgId}</p> 
            <p>Название: {currentOrg.org_name}</p>
        </div>
    );
};

export default OrgPage;