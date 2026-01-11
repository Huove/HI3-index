'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/utils/supabase'

export default function CreateEquipment() {
    const router = useRouter()
    const [errorMSG, setErrorMSG] = useState('')
    const [form, setForm] = useState({
        nama_weap: '',
        type_weap: '',
        synergy_weap: '',
        base_atk_weap: '',
        base_crit_weap: '',
        skill_senjata_weap: '',
        img_equipment: '',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !form.nama_weap ||
            !form.type_weap ||
            !form.synergy_weap ||
            !form.base_atk_weap ||
            !form.base_crit_weap ||
            !form.skill_senjata_weap
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
            <img src="/eq_bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
            <form onSubmit={handleSubmit} className="space-y-2 bg-black/70 backdrop-blur rounded-xl p-5 shadow-xl shadow-black/70">
                <h2 className="text-2xl font-semibold text-purple-200">Add Equipment</h2>
                {errorMSG && <p className="text-red-500">{errorMSG}</p>}
                <Input label="Nama Weapon" name="nama_weap" onChange={handleChange} />
                <Input label="Type Weapon" name="type_weap" onChange={handleChange} />
                <Input label="Synergy" name="synergy_weap" onChange={handleChange} />
                <Input label="Base ATK" name="base_atk_weap" onChange={handleChange} />
                <Input label="Base Crit" name="base_crit_weap" onChange={handleChange} />
                <Input label="Skill" name="skill_senjata_weap" onChange={handleChange} />
                <Input label="Image URL" name="img_equipment" onChange={handleChange} />
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