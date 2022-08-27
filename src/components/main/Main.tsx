import Form from '../form/Form';
import List from '../list/List';
import Button from '../ui/button/Button';
import useMain from '../../hooks/useMain';
import Searcher from '../searcher/Searcher';
import ContactPopup from '../ui/popup/contactPopup';
import BounceLoader from '../ui/bounce-loader/BounceLoader';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import React, {memo, useMemo, useEffect, useCallback} from 'react';
import {addContact, editContact, fetchContacts, deleteContact} from '../../redux/contactSlice';

const Main: React.FC = memo(() => {
    const dispatch = useAppDispatch();
    const {id, name, open, email, phone, filter, toggle, website, setId,
            setName, setOpen, setEmail, setPhone, setFilter, setToggle, setWebsite
        } = useMain()
    ;
    const {error, loading, contacts} = useAppSelector(state => state.contacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);
    
    const add = useMemo(() => {return {name, email, phone, website}}, [name, email, phone, website]);
    const edit = useMemo(() => {return {id, name, email, phone, website,}}, [id, name, email, phone, website]);

    const helpers = useCallback(() => {
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
    }, [setName, setEmail, setPhone, setWebsite]);

    const handleAddAction = useCallback(() => {
        helpers();
        dispatch(addContact(add));
    }, [add, helpers, dispatch]);

    const handleEditAction = useCallback(() => dispatch(editContact(edit)), [edit, dispatch]);

    const handleDeleteAction = useCallback((id: number) => dispatch(deleteContact(id)), [dispatch]);
    const onClickForButton = useMemo(() => toggle === 'add' ? handleAddAction : handleEditAction, [toggle, handleAddAction, handleEditAction]);

    const logoutHandler = useCallback(() => {
        window.location.reload();
        localStorage.removeItem('access');
    }, []);

    const addHandler = useCallback(() => {
        helpers();
        setToggle('add');
        setOpen(prev => !prev);
    }, [helpers, setOpen, setToggle]);

    const editHandler = useCallback((id: null | number) => {
        let index = contacts.findIndex(val => val.id === id);

        setToggle('edit');
        setOpen(prev => !prev);
        setName(contacts[index].name);
        setEmail(contacts[index].email);
        setPhone(contacts[index].phone);
        setWebsite(contacts[index].website);
    }, [setName, setOpen, contacts, setPhone, setEmail, setToggle, setWebsite]);

    const popup = <ContactPopup onClose={() => setOpen(prev => !prev)}>
        <Form 
            name={name}
            email={email}
            phone={phone}
            website={website}
            setName={setName}
            setEmail={setEmail} 
            setPhone={setPhone}
            setWebsite={setWebsite} 
            onClickForButton={onClickForButton}
        />
    </ContactPopup>

    return (
        <>
            <div className={'main'}>
                <div className={'main-logout'}>
                    <Button className={'main-add'} onClick={logoutHandler}><span>Logout</span></Button>
                </div>
                <div className={'main-error'}>
                    <p>{error ? error : null}</p>
                </div>
                {loading ? <BounceLoader/> : <>
                    <div className={'main-searcher'}>
                        <Searcher 
                            filter={filter} 
                            setFilter={setFilter} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setFilter(e.currentTarget.value)}
                        />
                    </div>
                    <div className={'main-btn'}>
                        <Button className={'main-add'} onClick={addHandler}><span>Add</span></Button>
                    </div>
                    <div className={'main-list'}>
                        <List setId={setId} filter={filter} contacts={contacts} editHandler={editHandler} handleDeleteAction={handleDeleteAction}/>
                    </div>
                </>}
            
            </div>
            {open && popup}
        </>
        
    );
});

export default Main;