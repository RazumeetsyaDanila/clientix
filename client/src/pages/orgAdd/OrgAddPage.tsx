import React, {useState} from 'react';
import { org_add } from '../../http/clientsAPI';
import { routes } from '../../consts';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const OrgAddPage = () => {
    const [orgName, setOrgName] = useState('')
    const [anydesk, setAnydesk] = useState('')
    const [sqlName, setSqlName] = useState('')
    const [rdp, setRdp] = useState('')
    const [saPassword, setSaPassword] = useState('')
    const [mongoDb, setMongoDb] = useState('')
    const [egisz, setEgisz] = useState('')
    const [simedAdminPass, setSimedAdminPass] = useState('')

    const currentUserRole = useTypedSelector(state => state.user.role)

    const navigate = useNavigate()  

    const orgAdd = async () => {
        try {
            await org_add(orgName, anydesk, sqlName, rdp, saPassword, mongoDb, egisz, simedAdminPass)
            currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className='centerContainer h-screen'>
            org add page

            <input className='authInput' type="text" placeholder="orgName" value={orgName} onChange={e => setOrgName(e.target.value)} />
            <input className='authInput' type="text" placeholder="anydesk" value={anydesk} onChange={e => setAnydesk(e.target.value)} />
            <input className='authInput' type="text" placeholder="sqlName" value={sqlName} onChange={e => setSqlName(e.target.value)} />
            <input className='authInput' type="text" placeholder="rdp" value={rdp} onChange={e => setRdp(e.target.value)} />
            <input className='authInput' type="text" placeholder="saPassword" value={saPassword} onChange={e => setSaPassword(e.target.value)} />
            <input className='authInput' type="text" placeholder="mongoDb" value={mongoDb} onChange={e => setMongoDb(e.target.value)} />
            <input className='authInput' type="text" placeholder="egisz" value={egisz} onChange={e => setEgisz(e.target.value)} />
            <input className='authInput' type="text" placeholder="simedAdminPass" value={simedAdminPass} onChange={e => setSimedAdminPass(e.target.value)} />

            <button className='authButton' onClick={orgAdd} >Добавить</button>
        </div>
    );
};

export default OrgAddPage;