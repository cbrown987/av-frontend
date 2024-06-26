import React from "react";

export interface FormData {
    textInput: string;
    batchSize: string
    guidanceScale: string;
    headChannels: string;
    xfHeads: string;
}

export interface ImageData {
    name: string;
    url: string;
}

export interface CentralVisualProps{
    diffusionStep: number;
}


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}