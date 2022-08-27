import {memo, useMemo} from 'react';
import {Contact} from '../../redux/contactSlice';

interface ListProps {
    filter: string;
    contacts: Contact[];
    setId: (id: null | number) => void;
    editHandler: (id: null | number) => void;
    handleDeleteAction: (id: number) => void;
};

const List = memo(({setId, filter, contacts, editHandler, handleDeleteAction}: ListProps) => {
    const valueRender = useMemo(() => contacts.filter(val => filter.length === 0 ? val : (val.name.toLowerCase() === filter.toLowerCase() || 
        val.email.toLowerCase() === filter.toLowerCase())).map(val => {

            return (
                <div className={'list'} key={val.id}>
                    <div 
                        className={'list-container'} 
                        onClick={() => {
                            setId(val.id);
                            editHandler(val.id);
                        }}
                    >
                        <div className={'list-top'}>
                            <p className={'list-email'}>Email: {val.email}</p>
                            <p className={'list-phone'}>Phone: {val.phone}</p>
                            <p className={'list-website'}>Website: {val.website}</p>
                        </div>

                        <p className={'list-bottom'}>
                            <span>Name: {val.name}</span>
                        </p>
                    </div>

                    <div className={'list-close'}>
                        <img 
                            alt={'close'} 
                            src={'./icons/close.svg'}
                            onClick={() => handleDeleteAction(val.id)}
                        />
                    </div>
                </div>
            );
    }), [setId, filter, contacts, editHandler, handleDeleteAction]);

    return (
        <div>
            {contacts.length === 0 ? <p className={'list-alert'}>The list is empty</p> : valueRender}
        </div>
    );
});

export default List;