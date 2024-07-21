import React, { useState, useEffect, useContext } from "react";
import "/public/css/CreateReportModal.css";
import "/public/css/Modal.css";

const AssignRoleModal = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/superAdmin/institutions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            setTimeout(() => {
                setLoading(false);
                alert('User created successfully');
                onClose();
                window.location.reload();
              }, 1000);

        } catch (error) {
            console.error('Error creating user:', error);
            alert(`Error: ${error.message}`);
            setLoading(false);

        }
    };



    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Instansi</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ marginTop: "-10px" }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="name" style={{ marginBottom: "5px" }}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email" style={{ marginBottom: "5px" }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" style={{ marginBottom: "5px" }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="submit-container">
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        style={{
                                            backgroundColor: "#343a40",
                                            borderStyle: "none",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Create Instansi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignRoleModal;
