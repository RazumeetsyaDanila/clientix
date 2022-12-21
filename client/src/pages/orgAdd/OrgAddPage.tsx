import React, { useState } from 'react';
import { org_add, anydesk_add, rdp_add } from '../../http/clientsAPI';
import { routes } from '../../consts';
import { Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import backBtnImg from '../../img/previous.png'

const OrgAddPage = () => {
    const [orgName, setOrgName] = useState('')
    const [simedAdminPass, setSimedAdminPass] = useState('')
    const [anydeskId, setAnydeskId] = useState('')
    const [anydeskPass, setAnydeskPass] = useState('')
    const [vpnIp, setVpnIp] = useState('')
    const [vpnLogin, setVpnLogin] = useState('')
    const [vpnPassword, setVpnPassword] = useState('')
    const [vpnType, setVpnType] = useState('автоматически')
    const [rdpIp, setRdpIp] = useState('')
    const [rdpLogin, setRdpLogin] = useState('')
    const [rdpPassword, setRdpPassword] = useState('')
    const [windowsLogin, setWindowsLogin] = useState('')
    const [windowsPassword, setWindowsPassword] = useState('')
    const [remoteAccess, setRemoteAccess] = useState('нет')
    const [city, setCity] = useState('')
    const [comment, setComment] = useState('')



    const currentUserRole = useTypedSelector(state => state.user.role)

    const navigate = useNavigate()

    const orgAdd = async () => {
        try {
            if (orgName && (remoteAccess === 'нет' || (remoteAccess === 'anydesk' && anydeskId && anydeskPass) || (remoteAccess === 'rdp' && rdpIp && rdpLogin && rdpPassword))) {
                let orgId = await org_add(orgName, simedAdminPass, remoteAccess, city, comment)
                if (remoteAccess === 'anydesk')
                    await anydesk_add(anydeskId, orgId, anydeskPass)
                if (remoteAccess === 'rdp')
                    await rdp_add(orgId, vpnIp, vpnLogin, vpnPassword, vpnType, rdpIp, rdpLogin, rdpPassword, windowsLogin, windowsPassword)
                currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
            }
        } catch (e: any) {
            alert(e.response.data.message)
        }
    }

    const selectRemoteAccess = (e: any) => {
        setRemoteAccess(e.target.value)
    }
    const selectVpnType = (e: any) => {
        setVpnType(e.target.value)
    }

    return (
        <div className='centerContainer h-screen'>

            <p className='text-2xl mb-[10px]'>Добавить организацию</p>

            <input className='authInput' type="text" placeholder="Наименование" value={orgName} onChange={e => setOrgName(e.target.value)} />
            <input className='authInput' type="text" placeholder="Пароль от админа в Симеде" value={simedAdminPass} onChange={e => setSimedAdminPass(e.target.value)} />
            <input className='authInput' type="text" placeholder="Город" value={city} onChange={e => setCity(e.target.value)} />
            <select className='border-[2px] border-[black] bg-[#fff] w-[300px] mb-[10px] h-[40px] pl-[8px]' onChange={e => selectRemoteAccess(e)} >
                <option value={'нет'}>нет</option>
                <option value={'anydesk'}>anydesk</option>
                <option value={'rdp'}>rdp</option>
            </select>

            {
                (() => {
                    switch (remoteAccess) {
                        case 'rdp':
                            return <div className='flex flex-col'>
                                <input className='authInput' type="text" placeholder="vpn ip" value={vpnIp} onChange={e => setVpnIp(e.target.value)} />
                                <input className='authInput' type="text" placeholder="vpn логин" value={vpnLogin} onChange={e => setVpnLogin(e.target.value)} />
                                <input className='authInput' type="text" placeholder="vpn пароль" value={vpnPassword} onChange={e => setVpnPassword(e.target.value)} />
                                <select className='w-[300px] mb-[10px] h-[40px] pl-[8px] border-[2px] border-[black] bg-[#fff]' onChange={e => selectVpnType(e)} >
                                    <option value={'автоматически'}>автоматически</option>
                                    <option value={'L2TP'}>L2TP</option>
                                    <option value={'PPTP'}>PPTP</option>
                                    <option value={'SMTP'}>SMTP</option>
                                </select>
                                <input className='authInput' type="text" placeholder="rdp ip" value={rdpIp} onChange={e => setRdpIp(e.target.value)} />
                                <input className='authInput' type="text" placeholder="rdp логин" value={rdpLogin} onChange={e => setRdpLogin(e.target.value)} />
                                <input className='authInput' type="text" placeholder="rdp пароль" value={rdpPassword} onChange={e => setRdpPassword(e.target.value)} />
                                <input className='authInput' type="text" placeholder="логин windows" value={windowsLogin} onChange={e => setWindowsLogin(e.target.value)} />
                                <input className='authInput' type="text" placeholder="пароль windows" value={windowsPassword} onChange={e => setWindowsPassword(e.target.value)} />
                            </div>

                        case 'anydesk':
                            return <div className='flex flex-col'>
                                <input className='authInput' type="text" placeholder="anydesk id" value={anydeskId} onChange={e => setAnydeskId(e.target.value)} />
                                <input className='authInput' type="text" placeholder="anydesk пароль" value={anydeskPass} onChange={e => setAnydeskPass(e.target.value)} />
                            </div>

                        default:
                            return <div></div>
                    }
                })()
            }

            <textarea className='bigAuthInput'  placeholder="Комментарий" value={comment} onChange={e => setComment(e.target.value)} />

            <button className='authButton mt-[20px]' onClick={orgAdd} >Добавить</button>

            <NavLink to='/admin' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>
        </div>
    );
};

export default OrgAddPage;