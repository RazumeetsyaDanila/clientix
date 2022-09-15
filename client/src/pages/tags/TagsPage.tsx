import React, {useEffect} from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const TagsPage = () => {
    const { tags, loading, error } = useTypedSelector(state => state.tags)
    const { fetchTags } = useActions()

    useEffect(() => {
        fetchTags()
    }, [])

    if (loading) {
        return <h1 className='centerContainer h-screen text-2xl'>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <div>
            tags page
        </div>
    );
};

export default TagsPage;