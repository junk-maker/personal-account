import React, {memo} from 'react';
import Input from '../ui/input/Input';

interface SearcherProps {
    filter: string;
    setFilter: (value: string) => void;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Searcher = memo(({filter, setFilter, onChange}: SearcherProps) => {
    return (
        <div className={'searcher'}>
            <img src={'/icons/searcher.svg'} className={'searcher-img'} alt={'searcher'}/>
            <Input
                type={'text'}
                id={'searcher'}
                value={filter}
                onChange={onChange}
                autoComplete={'off'}  
                className={'search'} 
                placeholder={'Search by name or e-mail'}
            />
             <img 
                alt={'clear'}
                src={'/icons/close.svg'} 
                onClick={() => setFilter('')}
                className={filter.length !== 0 ? 'searcher-img-clear' : 'searcher-img-clear hide'}
            />
        </div>
    );
});

export default Searcher;