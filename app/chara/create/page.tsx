'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/utils/supabase'

export default function CreateChara() {
    const router = useRouter()
    const [errorMSG, setErrorMSG] = useState('')
    const [form, setForm] = useState({
        nama_chara: '',
        karakteristik_chara: '',
        gender_chara: '',
        type_chara: '',
        img_chara: '',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !form.nama_chara ||
            !form.karakteristik_chara ||
            !form.gender_chara ||
            !form.type_chara
        ) {
            setErrorMSG('Tolong isi semua Form, Gambar opsional')
            return
        }
        setErrorMSG('')

        const { error } = await supabase.from('chara').insert([form])

        if (error) {
            setErrorMSG(error.message)
        } else {
            router.push('/')
        }
    }

    return (
        <section className="w-full max-w-xl mx-auto pt-20">
            <img src="/chara_bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
            <form className="mt-6 space-y-4 bg-black/70 backdrop-blur rounded-xl p-6 shadow-xl shadow-black/70" onSubmit={handleSubmit}>
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-200">Add Character</h2>
                {errorMSG && <p className="text-red-500">{errorMSG}</p>}
                <Input label="Nama Chara" name="nama_chara" onChange={handleChange} />
                <Input label="Karakteristik" name="karakteristik_chara" onChange={handleChange}/>
                <Input label="Gender" name="gender_chara" onChange={handleChange} />
                <Input label="Type" name="type_chara" onChange={handleChange} />
                <Input label="Image URL" name="img_chara" onChange={handleChange} />
                <div className='flex gap-5 mt-3'>
                    <button type="submit" className='bg-green-500 text-white font-blod py-2 px-4 rounded-sm'>Save</button>
                    <button type="button" onClick={() => router.back()} className='bg-red-500 text-white font-blod py-2 px-4 rounded-sm'>Cancel</button>
                </div>
            </form>
        </section>
    )
}

const Input = ({ label, ...props }: any) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-purple-300">{label}</label>
        <input
            {...props}
            className="mt-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-transparent"
        />
    </div>
)