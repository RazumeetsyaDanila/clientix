import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../../components/UI/modal/Modal';
import { org_delete } from '../../http/clientsAPI';
import { routes } from '../../consts';
import backBtnImg from '../../img/previous.png'
import mainBtnImg from '../../img/main-min.png'
import contactsBtnImg from '../../img/contacts_min.png'
import databaseBtnImg from '../../img/database-min.png'
import SideMenuItem from '../../components/UI/sideMenuItem/SideMenuItem';

const OrgPage = () => {
    const params = useParams();
    const orgId: string = params.id!; //string (not string | undefined)
    let orgIdNum: number = +orgId; //string to number

    const { clients, loading, error } = useTypedSelector(state => state.clients)
    const currentOrg = clients.find(clients => clients.org_id == orgId)

    const [view, setView] = useState("main")

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const startDeleteOrg = () => {
        setDeleteConfirmModal(true)
    }

    const deleteOrg = () => {
        org_delete(orgIdNum)
        setDeleteConfirmModal(false)
        navigate(routes.ADMIN_ROUTE)
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
                                главная
                            </div>

                        case 'sql':
                            return <div>
                                sql
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
                <div onClick={() => setView("sql")} className='cursor-pointer mb-[10px]'>
                    {view === 'sql' ? <SideMenuItem img={databaseBtnImg} description={"sql"} opacity={false} /> : <SideMenuItem img={databaseBtnImg} description={"sql"} opacity={true} />}
                </div>
                <div onClick={() => setView("contacts")} className='cursor-pointer'>
                    {view === 'contacts' ? <SideMenuItem img={contactsBtnImg} description={"контакты"} opacity={false} /> : <SideMenuItem img={contactsBtnImg} description={"контакты"} opacity={true} />}
                </div>
            </div>

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
        </div>
    );
};

export default OrgPage;