import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CentralVisualProps } from "@/app/Interfaces";
import styles from './style.module.css';

const CentralVisuals: React.FC<CentralVisualProps> = ({ diffusionStep }) => {
    const [canvases, setCanvases] = useState<HTMLCanvasElement[]>([]);
    const [maxImages, setMaxImages] = useState<number>(10);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const imageRef: React.MutableRefObject<HTMLImageElement> = useRef(new Image());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const image = imageRef.current;
        if (!image.src) image.src = 'elkhound.jpg';
        image.onload = () => createDiffusionImages(image);
        return () => { image.onload = null; };
    }, [diffusionStep]);

    const createDiffusionImages = useCallback((image: HTMLImageElement) => {
        const frames = 49;
        let tempCanvases: HTMLCanvasElement[] = canvases.length ? canvases : Array.from({ length: frames + 1 }, () => document.createElement('canvas'));

        tempCanvases.forEach((canvas, index) => {
            canvas.width = 300;
            canvas.height = 300;
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const originalData: ImageData = new ImageData(new Uint8ClampedArray(imageData.data), canvas.width, canvas.height);

            const frameRatio = index / frames;
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = interpolate(originalData.data[i], Math.random() * 255, frameRatio);
                imageData.data[i + 1] = interpolate(originalData.data[i + 1], Math.random() * 255, frameRatio);
                imageData.data[i + 2] = interpolate(originalData.data[i + 2], Math.random() * 255, frameRatio);
            }
            ctx.putImageData(imageData, 0, 0);
        });

        setCanvases([...tempCanvases.reverse()]);
    }, [canvases]);

    const interpolate = useCallback((startValue: number, endValue: number, factor: number) => {
        return startValue + (endValue - startValue) * factor;
    }, []);

    return (
        <>
            <input
                type="number"
                value={maxImages}
                onChange={(e) => setMaxImages(Number(e.target.value))}
                min="1"
                max="49"
                style={{ marginBottom: '20px' }}
            />
            <div ref={containerRef} className={styles.canvasContainer} style={{
                width: `${300 + (maxImages - 1) * 20}px`,
                overflowX: 'auto',
                overflowY: 'hidden',
                whiteSpace: 'nowrap'
            }}>
                {canvases.slice(0, maxImages).map((canvas, index) => (
                    <img key={index} src={canvas.toDataURL()} alt={`Noise frame ${index}`}
                         className={styles.canvasImage}
                         style={{
                             left: `${index * 20}px`,
                             zIndex: activeIndex === index ? 10 : 1,
                             transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                         }}
                         onMouseEnter={() => setActiveIndex(index)}
                         onMouseLeave={() => setActiveIndex(null)}
                    />
                ))}
            </div>
        </>
    );
};

export default CentralVisuals;
