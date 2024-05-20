import React from 'react';
import { ModalProps } from "@/app/Interfaces";


const AlertPopup: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                background: 'white',
                padding: 20,
                borderRadius: 5,
                width: '50%',
                display: 'flex',
                flexDirection: 'column'  // Ensures vertical stacking of elements
            }}>
                <div style={{ marginBottom: 20 }}>
                    <h1>
                        Notice:
                    </h1>
                    <p>
                        This website is the hosted version of a Drake University Capstone project made in 2024.
                        The backend for this website was costly to keep running and, as such, was only run for a short time
                        for demonstration purposes. The image shown in the central visual demonstrates how the website would
                        visualize the diffusion process. If you want to see this website generate pictures, you can visit the
                        GitHub link in the top right and follow the instructions to run the entire website on your computer.
                    </p>
                </div>
                <button onClick={onClose} style={{ alignSelf: 'center' }}>Close</button>
            </div>
        </div>
    );
};

export default AlertPopup;
