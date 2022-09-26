import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NavLink } from 'react-router-dom';
import CopiedText from '../../components/UI/copiedText/CopiedText';

const TagsPage = () => {
    const { tags, tagsGroups, loading, error } = useTypedSelector(state => state.tags)
    const [currentTags, setCurrentTags] = useState(tags)
    const { fetchTags, fetchTagsGroups } = useActions()
    const currentUserRole = useTypedSelector(state => state.user.role)
    const [currentTagsGroup, setCurrentTagsGroup] = useState(0)

    useEffect(() => {
        fetchTags()
        fetchTagsGroups()
    }, [])

    useEffect(() => {
        if (currentTagsGroup != 0) {
            setCurrentTags(tags.filter(t => t.group_id == currentTagsGroup))
        } else setCurrentTags(tags)
    }, [currentTagsGroup])

    const filterTags = (e: any) => {
        setCurrentTagsGroup(e.target.value)
    }

    if (loading) return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    if (error) return <h1 className='centerContainer h-screen text-2xl'>{error}</h1>

    return (
        <div className='centerContainer mt-[40px]'>

            <div className='headerContainer w-[1120px]'>
                {currentUserRole === 'admin' ? <NavLink to='/admin' className='btn w-[90px] h-[30px]'>← Назад</NavLink> : <NavLink to='/slave' className='btn w-[90px] h-[30px]'>← Назад</NavLink>}
                {/* <select onChange={e => setCurrentTagsGroup(e.target.value)} value={currentTagsGroup}> */}
                <select className='btn w-[180px] h-[30px]' onChange={e => filterTags(e)} >
                    <option value={0}>все</option>
                    {tagsGroups.map(t => <option key={t.group_id} value={t.group_id}>{t.group_name}</option>)}
                </select>
                <NavLink className='linkBtn w-[200px]' to='#'>Добавить тег</NavLink>
            </div>

            <table className='mt-[10px]'>
                <thead>
                    <tr>
                        <th className='w-[280px]'>Наименование</th>
                        <th className='w-[280px]'>Значение 1</th>
                        <th className='w-[280px]'>Значение 2</th>
                        <th className='w-[280px]'>Значение 3</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTags.map(t => <tr key={t.tag_name}>
                        <td className='w-[280px]' data-th="Наименование">{t.tag_name}</td>
                        <td className='w-[280px]' data-th="Значение 1"><CopiedText text={t.tag_value1} /></td>
                        <td className='w-[280px]' data-th="Значение 2"><CopiedText text={t.tag_value2} /></td>
                        <td className='w-[280px]' data-th="Значение 3"><CopiedText text={t.tag_value3} /></td>
                        {/* <td data-th="Удалить">
                            {
                                u.login !== 'admin' && u.login !== 'slave' && u.login !== currentUserLogin &&
                                <div onClick={startDeleteUser.bind(this, u.login)} className='hover:cursor-pointer hover:text-[#ff1919]'> Удалить </div>
                            }
                        </td> */}
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

interface tagsProps {
    tags: [any]
}

const Tags: React.FC<tagsProps> = (props) => {
    const [currentTagGroup, setCurrentTagGroup] = useState("");
    const { tags } = props
    return (
        <div
            key="name"
            style={{ border: "1px solid black", margin: "1rem", padding: "1rem" }}
        >

            {/* <input
                value={filter}
                onChange={({ target: { value } }) => setFilter(value)}
                id="filter"
            /> */}

            <div>
                Tags :
                {/* {tags
                    .filter(t => t.name.toLowerCase().includes(filter.toLowerCase()))
                    .map(t => (
                        <div key={t.userId}>User name: {t.name}</div>
                    ))
                } */}
            </div>
        </div>
    );
};

export default TagsPage;