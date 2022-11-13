import React, {useEffect} from 'react';
import { useParams, NavLink } from 'react-router-dom';
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
        <div className='centerContainer h-screen'>
            <p className='text-3xl'>Организация № {orgId}</p> 
            <p className='mb-[30px] text-3xl'>Название: {currentOrg.org_name}</p>

            <NavLink to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank" download> скачать сертификат соколмед</NavLink>
            <NavLink to='/files/rdp-cdt2.bat' target="_blank" download> скачать батник rdp-cdt2.bat </NavLink>
            <NavLink to='/files/rdp-ldc2.bat' target="_blank" download> скачать батник rdp-ldc2.bat </NavLink>

            <NavLink to='/admin' className='btn w-[90px] h-[30px] backBtnPos'>
                ← назад
            </NavLink>
        </div>
    );
};

export default OrgPage;