import React, {useState} from 'react';
import { org_add } from '../../http/clientsAPI';
import { routes } from '../../consts';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const OrgAddPage = () => {
    const [orgName, setOrgName] = useState('')
    const [simedAdminPass, setSimedAdminPass] = useState('')
    const [remoteAccess, setRemoteAccess] = useState('')
    const [city, setCity] = useState('')
    const [comment, setComment] = useState('')

    const currentUserRole = useTypedSelector(state => state.user.role)

    const navigate = useNavigate()  

    const orgAdd = async () => {
        try {
            await org_add(orgName, simedAdminPass, remoteAccess, city, comment)
            currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className='centerContainer h-screen'>
            
            <p className='text-2xl mb-[10px]'>Добавить организацию</p>

            <input className='authInput' type="text" placeholder="Наименование" value={orgName} onChange={e => setOrgName(e.target.value)} />
            <input className='authInput' type="text" placeholder="Пароль от админа в Симеде" value={simedAdminPass} onChange={e => setSimedAdminPass(e.target.value)} />
            <input className='authInput' type="text" placeholder="Удаленный доступ" value={remoteAccess} onChange={e => setRemoteAccess(e.target.value)} />
            <input className='authInput' type="text" placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
            <textarea className='bigAuthInput'  placeholder="Комментарий" value={comment} onChange={e => setComment(e.target.value)} />

            <button className='authButton' onClick={orgAdd} >Добавить</button>
        </div>
    );
};

export default OrgAddPage;