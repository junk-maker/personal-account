import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import useLogin from '../../hooks/useLogin';
import {useNavigate} from 'react-router-dom';
import {fetchLogin} from '../../redux/loginSlice';
import BtnLoader from '../ui/btn-loader/BtnLoader';
import React, {memo, useMemo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';

const Login: React.FC = memo(() => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {email, password, setEmail, setPassword} = useLogin();
    const {error, loading} = useAppSelector(state => state.login);
    const data = useMemo(() => {return {email, password, navigate}}, [email, password, navigate]);

    const signInHandler = useCallback(() => {
        setEmail('');
        setPassword('');
        dispatch(fetchLogin(data));
    }, [data, setEmail, dispatch, setPassword]);

    return (
        <div className={'body'}>
            <div className={'background'}>
                <form className={'login'} onClick={e =>  e.preventDefault()}>
                    {error ? <p className={'error'}>{error}</p> : <h3>Sign In Here</h3>}

                    <label htmlFor={'email'}>Email</label>
                    <Input 
                        id={'email'}
                        value={email}
                        type={'text'} 
                        autoComplete={'off'}    
                        className={'sign-in'}
                        placeholder={'Email'} 
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    />

                    <label htmlFor={'password'}>Password</label>
                    <Input 
                        id={'password'} 
                        value={password} 
                        type={'password'} 
                        autoComplete={'on'} 
                        className={'sign-in'} 
                        placeholder={'Password'} 
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />

                    <Button className={'btn-sign'} onClick={signInHandler}>{loading ? <BtnLoader/> : 'Sign In'}</Button>
                </form>
            </div>
        </div>
        
    );
});

export default Login;