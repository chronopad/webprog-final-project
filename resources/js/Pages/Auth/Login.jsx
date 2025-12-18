import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import MainLayout from '@/Layouts/MainLayout';
import Button from '@/Components/button';
import FormField from '@/Components/formField';

export default function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <MainLayout>
            <Head title="Log In" />
            
            <div className="min-h-screen bg-[#087592] py-48 pt-20 px-4 flex justify-center">
                <div className="w-full max-w-2xl">
                    <h1 className="text-[42px] font-bold mb-6 font-fredoka text-white text-center">Log In</h1>
                    
                    <form onSubmit={handleSubmit} className="w-[80%] mx-auto space-y-4">
                        <FormField name='email' value={data.email} onChange={handleChange} error={errors.email} required />

                        <FormField name='password' value={data.password} onChange={handleChange} error={errors.password} required />

                        <Button type='submit' disabled={processing}>Continue</Button>

                        <div className='text-center'>
                            <Link href='/register' className='font-poppins text-xs text-white hover:text-gray-300 underline'>
                                Or sign up for an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}