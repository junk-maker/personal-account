import {useState} from 'react';

const useMain = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [id, setId] = useState<null | number>(null);
    const [website, setWebsite] = useState<string>('');
    const [toggle, setToggle] = useState<string>('add');

    return {
        id,
        name,
        open,
        email,
        phone,
        filter,
        toggle,
        website,

        setId,
        setName,
        setOpen,
        setEmail,
        setPhone,
        setFilter,
        setToggle,
        setWebsite,
    };
};

export default useMain;