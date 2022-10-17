import React, { useEffect,useLayoutEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import CopiedText from '../../components/UI/copiedText/CopiedText';
import Modal from '../../components/UI/modal/Modal';
import { delete_tag, update_tag } from '../../http/tagsAPI';

const TagsPage = () => {
    const { tags, tagsGroups, loading, error } = useTypedSelector(state => state.tags)
    const [currentTags, setCurrentTags] = useState(tags)
    const { fetchTags, fetchTagsGroups } = useActions()
    const currentUserRole = useTypedSelector(state => state.user.role)
    const [currentTagsGroup, setCurrentTagsGroup] = useState(0)
    const [textFilter, setTextFilter] = useState('')

    const [editTagModal, setEditTagModal] = useState(false)
    const [editTagSuccessModal, setEditTagSuccessModal] = useState(false)

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const [oldTagName, setOldTagName] = useState('')
    const [editTagName, setEditTagName] = useState('')
    const [editTagValue1, setEditTagValue1] = useState('')
    const [editTagValue2, setEditTagValue2] = useState('')
    const [editTagValue3, setEditTagValue3] = useState('')

    useEffect(() => {
        fetchTags()
        fetchTagsGroups()
    }, [])

    useLayoutEffect(() => {
        setCurrentTags(tags)
    }, [tags])

    useEffect(() => {
        if (currentTagsGroup != 0) {
            setCurrentTags(tags.filter(t => t.group_id == currentTagsGroup))
        } else setCurrentTags(tags)
    }, [currentTagsGroup])

    const filterTags = (e: any) => {
        setCurrentTagsGroup(e.target.value)
    }

    const startEditTag = (name: string, value1: string, value2: string) => {
        setEditTagModal(true)
        setEditTagName(name)
        setOldTagName(name)
        setEditTagValue1(value1)
        setEditTagValue2(value2)
    }

    const applyEdit = () => {
        update_tag( oldTagName, editTagName, editTagValue1, editTagValue2, editTagValue3)
        // fetchTags()
        setEditTagModal(false)
        setEditTagSuccessModal(true)
    }

    const refresh = () => {
        fetchTags()
        setCurrentTags(tags)
    }

    const startDeleteTag = (name: string) => {        
        setEditTagModal(false)
        setDeleteConfirmModal(true)        
    }

    const deleteTag = () => {
        delete_tag(editTagName)
        // fetchTags()
        setDeleteConfirmModal(false)
    }

    if (loading) return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    if (error) return <h1 className='centerContainer h-screen text-2xl'><p className='mb-[10px]'>{error}</p><NavLink to='/login' className='btn w-[420px] h-[40px]'>Вернуться на страницу авторизации</NavLink></h1>

    return (
        <div className='centerContainer mt-[10px]'>
            <p className='text-3xl select-none mb-[4px]'>Список тегов</p>

            <div className='headerContainer w-[950px]'>
                {currentUserRole === 'admin' ? <NavLink to='/admin' className='btn w-[90px] h-[30px]'>← Назад</NavLink> : <NavLink to='/slave' className='btn w-[90px] h-[30px]'>← Назад</NavLink>}
                <div className='flex'>
                    <input placeholder='Поиск по наименованию' className='input w-[196px] mr-[10px]' type="text" value={textFilter} onChange={e => setTextFilter(e.target.value)} />
                    <select className='btn w-[230px] h-[30px]' onChange={e => filterTags(e)} >
                        <option value={0}>Все</option>
                        {tagsGroups.map(t => <option key={t.group_id} value={t.group_id}>{t.group_name}</option>)}
                    </select>
                    <button className='w-[10px] ml-[10px]' onClick={refresh}>&#8635;</button>
                </div>
                
                <NavLink className='linkBtn w-[200px]' to='/tag_add'>Добавить тег</NavLink>
            </div>

            <table className='mt-[10px]'>
                <thead>
                    <tr>
                        <th className='w-[430px]'>Наименование</th>
                        <th className='w-[260px]'>Значение 1</th>
                        <th className='w-[260px]'>Значение 2</th>
                        {/* <th className='w-[280px]'>Значение 3</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentTags
                        .filter(t => t.tag_name.toLowerCase().includes(textFilter.toLowerCase()))
                        .map(t => <tr key={t.tag_name}>
                            <td className='w-[430px]  hover:after:content-["_\270E"] cursor-pointer' data-th="Наименование" onClick={() => startEditTag(t.tag_name, t.tag_value1, t.tag_value2)}>{t.tag_name}</td>
                            <td className='w-[260px]' data-th="Значение 1"><CopiedText text={t.tag_value1} /></td>
                            <td className='w-[260px]' data-th="Значение 2"><CopiedText text={t.tag_value2} /></td>
                            {/* <td className='w-[280px]' data-th="Значение 3"><CopiedText text={t.tag_value3} /></td> */}
                        </tr>
                        )}
                </tbody>
            </table>

            <Modal visible={editTagModal} setVisible={setEditTagModal}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[10px] text-xl'>Редактирование</p>
                    <input className='authInput' type="text" placeholder="Наименование тега" value={editTagName} onChange={e => setEditTagName(e.target.value)} />
                    <input className='authInput' type="text" placeholder="Значение 1" value={editTagValue1} onChange={e => setEditTagValue1(e.target.value)} />
                    <input className='authInput' type="text" placeholder="Значение 2" value={editTagValue2} onChange={e => setEditTagValue2(e.target.value)} />
                    <button className='btn w-[300px] h-[40px] mb-[10px]' onClick={applyEdit}>Применить изменения</button>
                    <button className='redBtn w-[300px] h-[40px]' onClick={() => startDeleteTag(editTagName)}>Удалить</button>
                </div>
            </Modal>

            <Modal visible={deleteConfirmModal} setVisible={setDeleteConfirmModal}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[20px]'>Удалить?</p>
                    <div className='flex justify-between w-[200px]'>
                        <button className='btn w-[60px] h-[30px]' onClick={deleteTag}>Да</button>
                        <button className='btn w-[60px] h-[30px]' onClick={() => setDeleteConfirmModal(false)}>Нет</button>
                    </div>
                </div>
            </Modal>

            <Modal visible={editTagSuccessModal} setVisible={setEditTagSuccessModal}>
                <div className='flex flex-col items-center'>
                    <p className='mb-[10px]'>Изменения сохранены!</p>
                    <button className='btn w-[60px] h-[30px]' onClick={() => setEditTagSuccessModal(false)}>ОК</button>
                </div>
            </Modal>
        </div>
    );
};

export default TagsPage;