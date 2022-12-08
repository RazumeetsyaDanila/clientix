import React, { useEffect, useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './adminPage.module.scss'
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useClipboard } from 'use-clipboard-copy';
import CopiedText from './../../components/UI/copiedText/CopiedText';
import Modal from '../../components/UI/modal/Modal';
import { anydesk_get, rdp_get } from '../../http/clientsAPI';

const AdminPage = () => {

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const [currentClients, setCurrentClients] = useState(clients)
    const [textFilter, setTextFilter] = useState('')
    const [remoteAccessModal, setRemoteAccessModal] = useState(false)
    const [anydeskData, setAnydeskData] = useState<any[]>([{}])
    const [rdpData, setRdpData] = useState<any[]>([{}])
    const [remoteAccessType, setRemoteAccessType] = useState("")
    const { isAuth } = useTypedSelector(state => state.user)
    const currentUserLogin = useTypedSelector(state => state.user.login)
    const { unsetUser, fetchClients, fetchTags } = useActions()
    const clipboard = useClipboard()

    const logOut = () => {
        unsetUser()
    }

    const copy = (text: string, targetSetState: any) => {
        clipboard.copy(text)
        targetSetState(true)
        setTimeout(() => { targetSetState(false) }, 1000)
    }

    useEffect(() => {
        fetchClients()
        fetchTags()
    }, [])

    useLayoutEffect(() => {
        setCurrentClients(clients)
    }, [clients])

    const showRemoteAccess = async (orgId: number, accessType: string) => {
        if (accessType === "anydesk") {
            const data: any = await anydesk_get(orgId)
            setAnydeskData(data)

        }
        if (accessType === "rdp") {
            const data: any = await rdp_get(orgId)
            setRdpData(data)
        }
        setRemoteAccessModal(true)
        setRemoteAccessType(accessType)

        // console.log(anydeskData[0].anydesk_id)
    }

    const showLog = () => {
        console.log(anydeskData)
    }

    if (loading) {
        return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    }


    if (!isAuth) return <div className='centerContainer h-screen'>
        <h1 className='text-[26px] mb-[10px]'>Время авторизации закончилось</h1>
        <NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink>
    </div>

    if (error) {
        return <div className='centerContainer h-screen text-center'><h1>{error}<NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink></h1></div>
    }
    return (
        <div className={s.container}>

            <p className='text-[20px]'>Добро пожаловать, {currentUserLogin}!</p>
            <div className='headerContainer w-[1100px]'>
                <NavLink to='/login' className='btn w-[90px] h-[30px]' onClick={logOut}>← Выйти</NavLink>
                <input placeholder='Поиск по наименованию организации' className='input w-[296px] mr-[10px]' type="text" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
                <div className='flex justify-between w-[510px]'>
                    <NavLink className='linkBtn w-[200px]' to='/org_add'>Добавить организацию</NavLink>
                    <NavLink className='linkBtn w-[80px]' to='/file'>Файлы</NavLink>
                    <NavLink className='linkBtn w-[80px]' to='/tags'>Теги</NavLink>
                    <NavLink className='linkBtn w-[120px]' to='/users'>Пользователи</NavLink>
                </div>
            </div>

            <table className='w-[1100px]'>
                <thead>
                    <tr>
                        <th className={s.tableTd + ' w-[430px]'}>Название организации</th>
                        <th className={s.tableTd + ' w-[300px]'}>Пароль админа</th>
                        <th className={s.tableTd + ' w-[170px]'}>Удаленный доступ</th>
                        <th className={s.tableTd + ' w-[200px]'}>Город</th>
                        {/* <th className={s.tableTd + ' w-[200px]'}>Комментарий</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentClients
                        .filter(c => c.org_name.toLowerCase().includes(textFilter.toLowerCase()))
                        .map(c => <tr key={c.org_id}>
                            <td className={s.tableTd + ' w-[430px]'} data-th="Название организации"> <NavLink to={'/org/' + c.org_id}>{c.org_name}</NavLink></td>
                            <td className={s.tableTd + ' w-[300px]'} data-th="Пароль админа">{<CopiedText text={c.simed_admin_pass} />}</td>
                            <td className={s.tableTd + ' w-[170px]'} data-th="Удаленный доступ"><div onClick={() => showRemoteAccess(c.org_id, c.remote_access)} className="hover:cursor-pointer">{c.remote_access}</div></td>
                            <td className={s.tableTd + ' w-[200px]'} data-th="Город">{c.city}</td>
                            {/* <td className={s.tableTd + ' w-[200px]'} data-th="Комментарий">{c.comment}</td> */}
                        </tr>
                        )}
                </tbody>
            </table>
            {/* <NavLink to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank" download> скачать сертификат соколмед</NavLink>
            <NavLink to='/files/cert_export_CA.sokolmed.itl-service.ru.p12' target="_blank"> скачать сертификат соколмед</NavLink>
            <p>test</p> */}




            <Modal visible={remoteAccessModal} setVisible={setRemoteAccessModal}>
                <div className='flex flex-col items-center w-[250px]'>
                    <p className='mb-[10px] text-[24px]'>Данные {remoteAccessType}</p>
                    <hr className='w-[230px] mb-[10px]'/>
                    <div>
                        {
                            (() => {
                                switch (remoteAccessType) {
                                    case 'rdp':
                                        if (rdpData[0].id_org != 0) {
                                            return <div className='flex flex-col items-center text-[20px]'>
                                                <div className='flex'><span className='mr-[10px]'>ip vpn:</span> <CopiedText text={rdpData[0].vpn_ip} /> </div>
                                                <div className='flex'><span className='mr-[10px]'>логин vpn:</span> <CopiedText text={rdpData[0].vpn_login} /> </div>
                                                <div className='flex'><span className='mr-[10px]'>пароль vpn:</span> <CopiedText text={rdpData[0].vpn_password} /> </div>
                                                <div className='flex'><span className='mr-[10px]'>тип vpn:</span> <CopiedText text={rdpData[0].vpn_type} /> </div>
                                                <hr className='w-[230px] mt-[4px] mb-[4px]'/>
                                                <div className='flex'><span className='mr-[10px]'>ip rdp:</span> <CopiedText text={rdpData[0].rdp_ip} /> </div>
                                                <div className='flex'><span className='mr-[10px]'>логин rdp:</span> <CopiedText text={rdpData[0].rdp_login} /> </div>
                                                <div className='flex'><span className='mr-[10px]'>пароль rdp:</span> <CopiedText text={rdpData[0].rdp_password} /> </div>
                                            </div>
                                        }
                                        else return <div>Нет данных rdp</div>

                                    case 'anydesk':
                                        if (anydeskData[0].id_org != 0) {
                                            return <div className='flex flex-col items-center justify-center text-[20px]'>
                                                <div className='flex'><span className='mr-[10px]'>ID:</span> <CopiedText text={anydeskData[0].anydesk_id} /></div>
                                                <div className='flex' ><span className='mr-[10px]'>пароль:</span><CopiedText text={anydeskData[0].anydesk_password} /> </div>
                                            </div>
                                        }
                                        else return <div>Нет данных anydesk</div>

                                    default:
                                        return <div></div>
                                }
                            })()
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminPage;