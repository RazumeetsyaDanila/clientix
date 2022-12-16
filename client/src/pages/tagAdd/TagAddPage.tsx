import React, { useState, useEffect } from 'react';
import { tag_add } from '../../http/tagsAPI';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { routes } from '../../consts';
import { useNavigate, NavLink } from 'react-router-dom';
import Modal from '../../components/UI/modal/Modal';
import { useActions } from '../../hooks/useActions';
import backBtnImg from '../../img/previous.png';

const TagAddPage = () => {

    useEffect(() => {
        fetchTagsGroups()
    }, [])

    const { fetchTags, fetchTagsGroups } = useActions()

    const [tagName, setTagName] = useState('')
    const [groupId, setGroupId] = useState(0)
    const [tagValue1, setTagValue1] = useState('')
    const [tagValue2, setTagValue2] = useState('')
    const [tagValue3, setTagValue3] = useState('')

    const [errorModal1, setErrorModal1] = useState(false)
    const [errorModal2, setErrorModal2] = useState(false)
    const [successModal, setSuccessModal] = useState(false)

    const { tags, tagsGroups } = useTypedSelector(state => state.tags)

    const navigate = useNavigate()  

    const tagAdd = async () => {
        try {
            if(groupId == 0){ 
                setErrorModal1(true) 
                return
            }
            if(tagName === '' || tagValue1 === ''){
                setErrorModal2(true) 
                return
            }
            await tag_add(tagName, groupId, tagValue1, tagValue2, tagValue3)
            setSuccessModal(true)
            setTagValue1('')
            setTagValue2('')
            setTagName('')
            fetchTags()
            // currentUserRole == 'admin' ? navigate(routes.ADMIN_ROUTE) : navigate(routes.SLAVE_ROUTE)
        } catch (e: any) {
            console.log(e.response.data.message)
        }
    }

    const selectGroup = (e: any) => {
        setGroupId(e.target.value)
    }

    return (
        <div>
            <div className='centerContainer h-screen w-screen'>
                <p className='mb-[10px] text-2xl'>Добавление тега</p>

                <input className='authInput' type="text" placeholder="Наименование тега" value={tagName} onChange={e => setTagName(e.target.value)} />
                <input className='authInput' type="text" placeholder="Значение 1" value={tagValue1} onChange={e => setTagValue1(e.target.value)} />
                <input className='authInput' type="text" placeholder="Значение 2" value={tagValue2} onChange={e => setTagValue2(e.target.value)} />
                {/* <input className='authInput' type="text" placeholder="Значение 3" value={tagValue3} onChange={e => setTagValue3(e.target.value)} /> */}
                <select className='btn w-[300px] h-[40px] mb-[20px] pl-[8px]' onChange={e => selectGroup(e)} >
                    <option value={0}>Выберите группу</option>
                    {tagsGroups.map(t => <option key={t.group_id} value={t.group_id}>{t.group_name}</option>)}
                </select>
                <button className='authButton' onClick={tagAdd} >Добавить</button>
            </div>

            {/* <NavLink to='/tags' className='btn w-[80px] h-[30px] backBtnPos'>
                ← назад
            </NavLink> */}

            <NavLink to='/tags' className='bigLeftBackBtnContainer'>
                <img src={backBtnImg} alt="" />
            </NavLink>

            <Modal visible={errorModal1} setVisible={setErrorModal1}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[10px]'>Выберите группу тегов</p>
                    <button className='btn w-[50px]' onClick={() => setErrorModal1(false)}>ОК</button>
                </div>
            </Modal>

            <Modal visible={errorModal2} setVisible={setErrorModal2}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[10px]'>Заполните данные о теге</p>
                    <button className='btn w-[50px]' onClick={() => setErrorModal2(false)}>ОК</button>
                </div>
            </Modal>

            <Modal visible={successModal} setVisible={setSuccessModal}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[10px]'>Тег добавлен!</p>
                    <button className='btn w-[50px]' onClick={() => setSuccessModal(false)}>ОК</button>
                </div>
            </Modal>
        </div>
    );
};

export default TagAddPage;