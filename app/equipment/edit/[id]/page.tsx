'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/app/utils/supabase'

export default function EditEquipment() {
    const { id } = useParams()
    const router = useRouter()

    const [form, setForm] = useState<any>(null)

    useEffect(() => {
        supabase
            .from('equipment')
            .select('*')
            .eq('id', Number(id))
            .single()
            .then(res => setForm(res.data))
    }, [id])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { id: _, ...data } = form
        const { error } = await supabase
            .from('equipment')
            .update(data)
            .eq('id', id)

        if (!error) router.push('/')
    }

    if (!form) return <p className="text-white">Loading...</p>

    return (
        <section className="w-full max-w-xl mx-auto pt-20">
            <img src="/eq_bg.jpg" className="absolute inset-0 w-full h-full object-cover" />
            <form onSubmit={handleSubmit} className="space-y-2 bg-black/70 backdrop-blur rounded-xl p-5 shadow-xl shadow-black/70">
                <h2 className="text-3xl font-semibold text-purple-200">Edit Equipment</h2>
                <Input label="Nama Weapon" name="nama_weap" value={form.nama_weap} onChange={handleChange} />
                <Input label="Type Weapon" name="type_weap" value={form.type_weap} onChange={handleChange} />
                <Input label="Synergy" name="synergy_weap" value={form.synergy_weap} onChange={handleChange} />
                <Input label="Base ATK" name="base_atk_weap" value={form.base_atk_weap} onChange={handleChange} />
                <Input label="Base Crit" name="base_crit_weap" value={form.base_crit_weap} onChange={handleChange} />
                <Input label="Skill" name="skill_senjata_weap" value={form.skill_senjata_weap} onChange={handleChange} />
                <Input label="Image URL" name="img_equipment" value={form.img_equipment} onChange={handleChange} />
                <div className='flex gap-5 mt-3'>
                    <button type="submit" className='bg-green-500 text-white font-blod py-2 px-4 rounded-sm'>Update</button>
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