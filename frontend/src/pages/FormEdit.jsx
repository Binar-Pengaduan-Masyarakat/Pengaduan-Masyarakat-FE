import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormEdit.css'; // Sertakan file CSS Anda di sini

const FormEdit = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Mengambil data pengguna saat komponen di-mount
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/profile'); // Sesuaikan URL sesuai kebutuhan
        const userData = response.data.data;
        setFullName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!fullName || !email) {
      alert('Harap isi semua kolom');
      return;
    }

    const formData = {
      fullName,
      email,
    };

    try {
      const response = await axios.post('http://localhost:3000/users/profile', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Profil berhasil diperbarui', response.data);
      alert('Profil berhasil diperbarui');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profil');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="my-5">
            <h3>Profil Saya</h3>
            <hr />
          </div>
          <form className="file-upload">
            <div className="row mb-5 gx-5">
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Detail Kontak</h4>
                    <div className="col-md-6">
                      <label className="form-label">Nama Lengkap *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-3 d-md-flex justify-content-md-end text-center">
              <button type="button" className="btn btn-primary btn-lg" onClick={handleSave}>Simpan Profil</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;
