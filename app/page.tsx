'use client';

import { use, useEffect, useState } from 'react';
import { supabase } from './utils/supabase';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [chara, setChara] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: chara, error: errorChara } = await supabase
        .from('chara')
        .select('*');

      const { data: equipment, error: errorEq } = await supabase
        .from('equipment')
        .select('*');

      if (errorChara || errorEq) {
        console.error('Error fetching data:', errorChara?.message || errorEq?.message);
      } else {
        setChara(chara || []);
        setEquipment(equipment || []);
      }
      setLoading(false);
    };
    fetchData();
  }, []);



  const handleDelete = async (id: number, table: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      alert('Delete failed: ' + error.message);
    } else {
      if (table === 'chara') {
        setChara(prev => prev.filter(item => item.id !== id));
      }
      if (table === 'equipment') {
        setEquipment(prev => prev.filter(item => item.id !== id));
      }
    }
  };
  if (loading) {
    return <div>Processing..</div>;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/iuno_bg.mp4" type="video/mp4" />
      </video>

      <main className={styles.main} style={{ color: 'white', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', gap: '60px', padding: '40px' }}>
        <div className='hide-scroll' style={{
          minWidth: '45%', backgroundColor: 'rgba(10, 10, 10, 0.75)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', overflowY: 'auto', maxHeight: '90vh',
        }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Battlesuit List</h2>
          <div className="mb-4 flex">
            <button onClick={() => router.push('/chara/create')} className="bg-green-500 text-white font-bold py-2 px-4 rounded-sm">Add New Battlesuit</button>
          </div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {chara.map((item) => (
              <li key={item.id}
                style={{
                  display: 'flex',
                  gap: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  marginBottom: '12px',
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}>
                {item.img_chara && (
                  <img
                    src={item.img_chara}
                    alt={item.nama_chara}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                )}
                <div>
                  <p>Battlesuit: {item.nama_chara}</p>
                  <p>Karakteristik: {item.karakteristik_chara}</p>
                  <p>Gender: {item.gender_chara}</p>
                  <p>Type: {item.type_chara}</p>
                  <div className='flex gap-5 mt-3'>
                    <button onClick={() => handleDelete(item.id, 'chara')} className='bg-red-600 text-white font-bold py-2 px-4 rounded-sm' style={{ marginTop: '10px', cursor: 'pointer' }}>Delete</button>
                    <button onClick={() => router.push(`/chara/edit/${item.id}`)} className='bg-blue-600 text-white font-bold py-2 px-4 rounded-sm' style={{ marginTop: '10px', cursor: 'pointer' }}>Edit</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            minWidth: '40%', backgroundColor: 'rgba(10, 10, 10, 0.75)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', overflowY: 'auto', maxHeight: '90vh',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Weapon List</h2>
          <div className='mb-4 flex'>
            <button onClick={() => router.push('equipment/create')} className='bg-green-500 text-white font-blod py-2 px-4 rounded-sm'>Add New Equipment</button>
          </div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {equipment.map((item) => (
              <li key={item.id}
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  marginBottom: '12px',
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}>
                {item.img_equipment && (
                  <img
                    src={item.img_equipment}
                    alt={item.nama_weap}
                    style={{ width: '250px', height: 'auto', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                )}
                <p>Nama Weapon: {item.nama_weap}</p>
                <p>Type Weapon: {item.type_weap}</p>
                <p>Synergy: {item.synergy_weap}</p>
                <p>Base Atk: {item.base_atk_weap}</p>
                <p>Base Crit: {item.base_crit_weap}</p>
                <p>Skill: {item.skill_senjata_weap}</p>
                <div className='flex gap-5 mt-3'>
                  <button onClick={() => handleDelete(item.id, 'equipment')} className='bg-red-600 text-white font-bold py-2 px-4 rounded-sm' style={{ marginTop: '10px', cursor: 'pointer' }}>Delete</button>
                  <button onClick={() => router.push(`/equipment/edit/${item.id}`)} className='bg-blue-600 text-white font-bold py-2 px-4 rounded-sm' style={{ marginTop: '10px', cursor: 'pointer' }}>Edit</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}