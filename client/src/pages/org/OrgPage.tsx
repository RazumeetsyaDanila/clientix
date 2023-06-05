import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../../components/UI/modal/Modal';
import { org_delete, org_get } from '../../http/clientsAPI';
import { routes } from '../../consts';
import backBtnImg from '../../img/previous.png'
import mainBtnImg from '../../img/main-min.png'
import contactsBtnImg from '../../img/contacts_min.png'
import databaseBtnImg from '../../img/database-min.png'
import queueBtnImg from '../../img/queue-min.png'
import edocBtnImg from '../../img/edoc-min.png'
import SideMenuItem from '../../components/UI/sideMenuItem/SideMenuItem';
import { anydesk_get, rdp_get, anydesk_update, anydesk_add, org_update, rdp_update, rdp_add, anydesk_delete, rdp_delete } from '../../http/clientsAPI';

const OrgPage = () => {
    const params = useParams();
    const orgId: string = params.id!; //string (not string | undefined)
    let orgIdNum: number = +orgId; //string to number

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    let currentOrg = clients.find(clients => clients.org_id == orgId)

    const [currentOrgRemoteAccess, setCurrentOrgRemoteAccess] = useState<any[]>([{}])

    const [view, setView] = useState("main")

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [mainEditModal, setMainEditModal] = useState(false)
    const [databaseEditModal, setDatabaseEditModal] = useState(false)
    const [queueEditModal, setQueueEditModal] = useState(false)
    const [egiszEditModal, setEgiszEditModal] = useState(false)
    const [contactsEditModal, setContactsEditModal] = useState(false)

    const [editOrgComment, setEditOrgComment] = useState('')
    const [editOrgRemoteAccess, setEditOrgRemoteAccess] = useState('')
    const [editOrgCity, setEditOrgCity] = useState('')
    const [editOrgSimedAdminPass, setEditOrgSimedAdminPass] = useState('')
    const [editOrgAnydeskId, setEditOrgAnydeskId] = useState('')
    const [editOrgAnydeskPassword, setEditOrgAnydeskPassword] = useState('')

    const [editOrgRdpVpnIp, setEditOrgRdpVpnIp] = useState('')
    const [editOrgRdpVpnLogin, setEditOrgRdpVpnLogin] = useState('')
    const [editOrgRdpVpnPassword, setEditOrgRdpVpnPassword] = useState('')
    const [editOrgRdpVpnType, setEditOrgRdpVpnType] = useState('')
    const [editOrgRdpIp, setEditOrgRdpIp] = useState('')
    const [editOrgRdpLogin, setEditOrgRdpLogin] = useState('')
    const [editOrgRdpPassword, setEditOrgRdpPassword] = useState('')
    const [editOrgRdpWindowsLogin, setEditOrgRdpWindowsLogin] = useState('')
    const [editOrgRdpWindowsPassword, setEditOrgRdpWindowsPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        getRemoteAccess(orgIdNum, currentOrg.remote_access)
    }, [])

    const getRemoteAccess = async (orgIdNum: number, accessType: string) => {
        if (accessType === "anydesk") {
            const accessData: any = await anydesk_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }
        if (accessType === "rdp") {
            const accessData: any = await rdp_get(orgIdNum)
            setCurrentOrgRemoteAccess(accessData)
        }

        // console.log(anydeskData[0].anydesk_id)
    }

    const startDeleteOrg = () => {
        setDeleteConfirmModal(true)
    }

    const startEditOrg = () => {
        if (view === 'main') {
            setMainEditModal(true)
            setEditOrgComment(currentOrg.comment)
            setEditOrgRemoteAccess(currentOrg.remote_access)
            setEditOrgCity(currentOrg.city)
            setEditOrgSimedAdminPass(currentOrg.simed_admin_pass)
            if(currentOrg.remote_access === 'anydesk'){
                setEditOrgAnydeskId(currentOrgRemoteAccess[0].anydesk_id)
                setEditOrgAnydeskPassword(currentOrgRemoteAccess[0].anydesk_password)
            }
            if(currentOrg.remote_access === 'rdp'){
                setEditOrgRdpVpnIp(currentOrgRemoteAccess[0].vpn_ip)
                setEditOrgRdpVpnLogin(currentOrgRemoteAccess[0].vpn_login)
                setEditOrgRdpVpnPassword(currentOrgRemoteAccess[0].vpn_password)
                setEditOrgRdpVpnType(currentOrgRemoteAccess[0].vpn_type)
                setEditOrgRdpIp(currentOrgRemoteAccess[0].rdp_ip)
                setEditOrgRdpLogin(currentOrgRemoteAccess[0].rdp_login)
                setEditOrgRdpPassword(currentOrgRemoteAccess[0].rdp_password)
                setEditOrgRdpWindowsLogin(currentOrgRemoteAccess[0].windows_login)
                setEditOrgRdpWindowsPassword(currentOrgRemoteAccess[0].windows_password)
            }
            
        }
        if (view === 'database') setDatabaseEditModal(true)
        if (view === 'queue') setQueueEditModal(true)
        if (view === 'egisz') setEgiszEditModal(true)
        if (view === 'contacts') setContactsEditModal(true)
    }

    const deleteOrg = () => {
        org_delete(orgIdNum)
        setDeleteConfirmModal(false)
        navigate(routes.ADMIN_ROUTE)
    }

    // const applyEditAnydesk = () => {
    //     anydesk_update(currentOrgRemoteAccess[0].anydesk_id, editOrgAnydeskId, editOrgAnydeskPassword)
    //     getRemoteAccess(orgIdNum, editOrgRemoteAccess)
    //     setMainEditModal(false)
    // }
    const applyEditOrg = () => {
        if (currentOrg.remote_access === editOrgRemoteAccess) {
            if(editOrgRemoteAccess === 'anydesk') anydesk_update(currentOrgRemoteAccess[0].anydesk_id, editOrgAnydeskId, editOrgAnydeskPassword)
            if(editOrgRemoteAccess === 'rdp') rdp_update(currentOrgRemoteAccess[0].rdp_id, editOrgRdpVpnIp, editOrgRdpVpnLogin, editOrgRdpVpnPassword, editOrgRdpVpnType, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpWindowsLogin, editOrgRdpWindowsPassword)
            getRemoteAccess(orgIdNum, editOrgRemoteAccess)
            org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
            setMainEditModal(false)
        }
        if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'anydesk'){
            rdp_delete(currentOrgRemoteAccess[0].rdp_id)
            anydesk_add(editOrgAnydeskId, orgIdNum, editOrgAnydeskPassword)
            org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
            setMainEditModal(false)
        }
        if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'rdp'){
            anydesk_delete(currentOrgRemoteAccess[0].anydesk_id)
            rdp_add(orgIdNum, editOrgRdpVpnIp, editOrgRdpVpnLogin, editOrgRdpVpnPassword, editOrgRdpVpnType, editOrgRdpIp, editOrgRdpLogin, editOrgRdpPassword, editOrgRdpWindowsLogin, editOrgRdpWindowsPassword)
            org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
            setMainEditModal(false)
        }
        if(currentOrg.remote_access !== editOrgRemoteAccess && editOrgRemoteAccess === 'нет'){
            anydesk_delete(currentOrgRemoteAccess[0].anydesk_id)
            rdp_delete(currentOrgRemoteAccess[0].rdp_id)
            org_update(orgIdNum, currentOrg.org_name, editOrgSimedAdminPass, editOrgRemoteAccess, editOrgCity, editOrgComment)
            setMainEditModal(false)
        }
    }


    if (loading) return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    if (error) return <h1 className='centerContainer h-screen text-2xl'>{error}</h1>
    return (
        <div className='centerContainer h-screen'>
            <p className='mb-[30px] text-3xl fixed top-4'>{currentOrg.org_name}</p>

            {
                (() => {
                    switch (view) {
                        case 'main':
                            return <div>
                                <p className='opacity-[0.4]'> ГЛАВНАЯ: инфо об организации, лаборатории, телефония, смс-центр, дадата </p>
                                <hr />
                                город: {currentOrg.city}
                                <br />
                                пароль админа: {currentOrg.simed_admin_pass}
                                <hr />
                                {currentOrg.remote_access !== 'нет' ? <p> Инфо о подключении:</p> : <div></div>}
                                {
                                    (() => {
                                        switch (currentOrg.remote_access) {
                                            case 'anydesk':
                                                return <div>
                                                    способ подключения: {currentOrg.remote_access}
                                                    <br />
                                                    ID: {currentOrgRemoteAccess[0].anydesk_id}
                                                    <br />
                                                    пароль: {currentOrgRemoteAccess[0].anydesk_password}
                                                </div>
                                            case 'rdp':
                                                return <div>
                                                    vpn_ip: {currentOrgRemoteAccess[0].vpn_ip}
                                                    <br />
                                                    vpn_login: {currentOrgRemoteAccess[0].vpn_login}
                                                    <br />
                                                    vpn_password: {currentOrgRemoteAccess[0].vpn_password}
                                                    <br />
                                                    vpn_type: {currentOrgRemoteAccess[0].vpn_type}
                                                    <br />
                                                    rdp_ip: {currentOrgRemoteAccess[0].rdp_ip}
                                                    <br />
                                                    rdp_login: {currentOrgRemoteAccess[0].rdp_login}
                                                    <br />
                                                    rdp_password: {currentOrgRemoteAccess[0].rdp_password}
                                                    <br />
                                                    windows_login: {currentOrgRemoteAccess[0].windows_login}
                                                    <br />
                                                    windows_password: {currentOrgRemoteAccess[0].windows_password}
                                                </div>
                                            default:
                                                return <div></div>
                                        }
                                    })()
                                }

                                <hr />
                                комментарий: {currentOrg.comment}
                            </div>

                        case 'database':
                            return <div>
                                базы данных sql и mongodb
                            </div>

                        case 'queue':
                            return <div>
                                очередь
                            </div>

                        case 'egisz':
                            return <div>
                                ЕГИСЗ
                            </div>

                        case 'contacts':
                            return <div>
                                контакты
                            </div>

                        default:
                            return <div></div>
                    }
                })()
            }

            <div className='orgSideMenu'>
                <div onClick={() => setView("main")} className='cursor-pointer mb-[10px]'>
                    {view === 'main' ? <SideMenuItem img={mainBtnImg} description={"главная"} opacity={false} /> : <SideMenuItem img={mainBtnImg} description={"главная"} opacity={true} />}
                </div>
                <div onClick={() => setView("database")} className='cursor-pointer mb-[10px]'>
                    {view === 'database' ? <SideMenuItem img={databaseBtnImg} description={"БД"} opacity={false} /> : <SideMenuItem img={databaseBtnImg} description={"БД"} opacity={true} />}
                </div>
                <div onClick={() => setView("queue")} className='cursor-pointer mb-[10px]'>
                    {view === 'queue' ? <SideMenuItem img={queueBtnImg} description={"очередь"} opacity={false} /> : <SideMenuItem img={queueBtnImg} description={"очередь"} opacity={true} />}
                </div>
                <div onClick={() => setView("egisz")} className='cursor-pointer mb-[10px]'>
                    {view === 'egisz' ? <SideMenuItem img={edocBtnImg} description={"ЕГИСЗ"} opacity={false} /> : <SideMenuItem img={edocBtnImg} description={"ЕГИСЗ"} opacity={true} />}
                </div>
                <div onClick={() => setView("contacts")} className='cursor-pointer'>
                    {view === 'contacts' ? <SideMenuItem img={contactsBtnImg} description={"контакты"} opacity={false} /> : <SideMenuItem img={contactsBtnImg} description={"контакты"} opacity={true} />}
                </div>
            </div>

            <button className='btn w-[90px] h-[30px] editBtnPos' onClick={() => startEditOrg()}>Изменить</button>
            <button className='redBtn w-[90px] h-[30px] deleteBtnPos' onClick={() => startDeleteOrg()}>Удалить</button>

            <NavLink to='/admin' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>

            <Modal visible={deleteConfirmModal} setVisible={setDeleteConfirmModal}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[20px] text-[20px]'>Удалить?</p>
                    <div className='flex justify-between w-[200px]'>
                        <button className='btn w-[60px] h-[30px]' onClick={deleteOrg}>Да</button>
                        <button className='btn w-[60px] h-[30px]' onClick={() => setDeleteConfirmModal(false)}>Нет</button>
                    </div>
                </div>
            </Modal>

            {/* модальные окна редактирования */}
            <Modal visible={mainEditModal} setVisible={setMainEditModal}>
                <div className='flex flex-col items-center w-[80vw] h-[82vh]'>
                    <div>
                        <br />
                        комментарий:
                        <input className='authInput' type="text" placeholder="комментарий" value={editOrgComment} onChange={e => setEditOrgComment(e.target.value)} />
                        <br />

                        город:
                        <input className='authInput' type="text" placeholder="город" value={editOrgCity} onChange={e => setEditOrgCity(e.target.value)} />
                        <br />
                        пароль админа:
                        <input className='authInput' type="text" placeholder="пароль админа в симед" value={editOrgSimedAdminPass} onChange={e => setEditOrgSimedAdminPass(e.target.value)} />
                        <hr />
                        Инфо о подключении:
                        <br />
                        удаленный доступ:
                        <select value={editOrgRemoteAccess} className='border-[2px] border-[black] bg-[#fff] w-[300px] mb-[10px] h-[40px] pl-[8px]' onChange={e => setEditOrgRemoteAccess(e.target.value)} >
                            <option value={'нет'}>нет</option>
                            <option value={'anydesk'} selected >anydesk</option>
                            <option value={'rdp'}>rdp</option>
                        </select>
                        <br />
                        {/* ID:
                        <input className='authInput' type="text" placeholder="id anydesk" value={editOrgAnydeskId} onChange={e => setEditOrgAnydeskId(e.target.value)} />
                        <br />
                        пароль:
                        <input className='authInput' type="text" placeholder="пароль anydesk" value={editOrgAnydeskPassword} onChange={e => setEditOrgAnydeskPassword(e.target.value)} /> */}
                        {
                                    (() => {
                                        switch (editOrgRemoteAccess) {
                                            case 'anydesk':
                                                return <div>
                                                    ID: <input className='authInput' type="text" placeholder="id anydesk" value={editOrgAnydeskId} onChange={e => setEditOrgAnydeskId(e.target.value)} />
                                                    <br />
                                                    пароль: <input className='authInput' type="text" placeholder="пароль anydesk" value={editOrgAnydeskPassword} onChange={e => setEditOrgAnydeskPassword(e.target.value)} />
                                                    <br />
                                                </div>
                                            case 'rdp':
                                                return <div>
                                                    vpn_ip: <input className='authInput' type="text" placeholder="vpn ip" value={editOrgRdpVpnIp} onChange={e => setEditOrgRdpVpnIp(e.target.value)} />
                                                    <br />
                                                    vpn_login: <input className='authInput' type="text" placeholder="vpn login" value={editOrgRdpVpnLogin} onChange={e => setEditOrgRdpVpnLogin(e.target.value)} />
                                                    <br />
                                                    vpn_password: <input className='authInput' type="text" placeholder="vpn password" value={editOrgRdpVpnPassword} onChange={e => setEditOrgRdpVpnPassword(e.target.value)} />
                                                    <br />
                                                    vpn_type: <input className='authInput' type="text" placeholder="vpn type" value={editOrgRdpVpnType} onChange={e => setEditOrgRdpVpnType(e.target.value)} />
                                                    <br />
                                                    rdp_ip: <input className='authInput' type="text" placeholder="rdp ip" value={editOrgRdpIp} onChange={e => setEditOrgRdpIp(e.target.value)} />
                                                    <br />
                                                    rdp_login: <input className='authInput' type="text" placeholder="rdp login" value={editOrgRdpLogin} onChange={e => setEditOrgRdpLogin(e.target.value)} />
                                                    <br />
                                                    rdp_password: <input className='authInput' type="text" placeholder="rdp password" value={editOrgRdpPassword} onChange={e => setEditOrgRdpPassword(e.target.value)} />
                                                    <br />
                                                    windows_login: <input className='authInput' type="text" placeholder="windows login" value={editOrgRdpWindowsLogin} onChange={e => setEditOrgRdpWindowsLogin(e.target.value)} />
                                                    <br />
                                                    windows_password: <input className='authInput' type="text" placeholder="windows password" value={editOrgRdpWindowsPassword} onChange={e => setEditOrgRdpWindowsPassword(e.target.value)} />
                                                </div>
                                            default:
                                                return <div></div>
                                        }
                                    })()
                                }
                        <button className='btn w-[300px] h-[40px] mb-[10px]' onClick={applyEditOrg}>Применить изменения организации</button>
                    </div>
                </div>
            </Modal>

            <Modal visible={databaseEditModal} setVisible={setDatabaseEditModal}>
                <div className='flex flex-col items-center w-[80vw] h-[82vh]'>
                    редактирование бд
                </div>
            </Modal>

            <Modal visible={queueEditModal} setVisible={setQueueEditModal}>
                <div className='flex flex-col items-center w-[80vw] h-[82vh]'>
                    редактировние очереди
                </div>
            </Modal>

            <Modal visible={egiszEditModal} setVisible={setEgiszEditModal}>
                <div className='flex flex-col items-center w-[80vw] h-[82vh]'>
                    редактирование ЕГИСЗ
                </div>
            </Modal>

            <Modal visible={contactsEditModal} setVisible={setContactsEditModal}>
                <div className='flex flex-col items-center w-[80vw] h-[82vh]'>
                    редактирование контактов
                </div>
            </Modal>
        </div>
    );
};

export default OrgPage;