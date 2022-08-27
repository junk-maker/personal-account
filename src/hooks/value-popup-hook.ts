import {useState, useEffect} from 'react';

let timeout: undefined | number;
const useValue = () => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        timeout && clearTimeout(timeout);
        setValue('in');
    }, []);

    useEffect(() => {
        return () => {timeout && clearTimeout(timeout);};
    }, []);

    return {value, setValue,};
};

export default useValue;