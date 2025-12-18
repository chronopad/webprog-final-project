import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import MainLayout from '@/Layouts/MainLayout';
import Button from '@/Components/button';
import FormField from '@/Components/formField';

export default function LoginForm() {
    const form = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        form.transform((data) => ({
            name: data.username,
            email: data.email,
            password: data.password,
            password_confirmation: data.confirmPassword,
        }))

        form.post('/register');
    };

    const handleChange = (e) => {
        form.setData(e.target.name, e.target.value);
    };

    return (
        <MainLayout>
            <Head title="Sign Up" />
            
            <div className="min-h-screen bg-[#087592] py-48 pt-20 px-4 flex justify-center">
                <div className="w-full max-w-[90%] flex gap-8">
                    {/* Left - Image container */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#065a70] rounded-2xl h-[600px] items-center justify-center">
                        <div className='text-[170px] text-white font-fredoka'>
                            🎮+💧
                        </div>
                        {/* <div className="text-white text-center">
                            <p className="font-fredoka text-2xl">Welcome</p>
                        </div> */}
                    </div>  

                    {/* Right - Form */}
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-[42px] font-bold mb-6 font-fredoka text-white text-center">Sign Up</h1>
                        
                        <form onSubmit={handleSubmit} className="w-[80%] mx-auto space-y-4">
                            <FormField name='username' value={form.data.username} onChange={handleChange} error={form.errors.name} required />

                            <FormField name='email' value={form.data.email} onChange={handleChange} error={form.errors.email} required />

                            <FormField name='password' value={form.data.password} onChange={handleChange} error={form.errors.password} required />

                            <FormField name='confirmPassword' value={form.data.confirmPassword} onChange={handleChange} error={form.errors.password_confirmation} required />

                            <Button type='submit' disabled={form.processing}>Continue</Button>

                            <div className='text-center'>
                                <Link href='/login' className='font-poppins text-xs text-white hover:text-gray-300 underline'>
                                    Or log in to your account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}