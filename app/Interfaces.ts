export interface FormData {
    textInput: string;
    batchSize: string
    guidanceScale: string;
}

export interface ImageData {
    name: string;
    url: string;
}

export interface CentralVisualProps{
    diffusionStep: number;
}