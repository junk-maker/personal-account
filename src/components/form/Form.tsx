import React, {memo} from 'react';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';

interface FormProps {
    name: string;
    email: string;
    phone: string;
    website: string;
    onClickForButton: () => void;
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPhone: (value: string) => void;
    setWebsite: (value: string) => void;
};

const Form = memo(({name, email, phone, website, setName, setEmail, setPhone, setWebsite, onClickForButton}: FormProps) => {
    return (
        <form onClick={e => e.preventDefault()}>
            <div className={'form'}>
                <div className={'form-container'}>
                    <div className={'form-raw form-space'}>
                        <Input
                            id={'name'}
                            value={name}
                            type={'text'} 
                            autoComplete={'off'}    
                            placeholder={'Name'}
                            className={'form-input'} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                        />
                    </div>

                    <div className={'form-raw form-space'}>
                        <Input
                            id={'email'}
                            value={email}
                            type={'text'} 
                            autoComplete={'off'}    
                            placeholder={'Email'}
                            className={'form-input'} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                        />
                        <Input
                            id={'phone'}
                            value={phone}
                            type={'text'} 
                            autoComplete={'off'}    
                            placeholder={'Phone'}
                            className={'form-input'} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setPhone(e.currentTarget.value)}
                        />
                        <Input
                            id={'website'}
                            value={website}
                            type={'text'} 
                            autoComplete={'off'}    
                            placeholder={'Website'}
                            className={'form-input'} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setWebsite(e.currentTarget.value)}
                        />
                    </div>

                </div>

                <div className={'form__btn'}>
                    <Button
                        className={'main-add'}
                        onClick={onClickForButton}
                    >
                        <span>Add</span>
                    </Button>
                </div>
            </div>
        </form>
    );
});

export default Form;