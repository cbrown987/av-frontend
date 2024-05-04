import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import { CentralVisualProps } from "@/app/Interfaces";
import styles from './style.module.css';

const CentralVisuals: React.FC<CentralVisualProps> = ({ diffusionStep }) => {
    const [maxImages, setMaxImages] = useState<number>(10);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [imageSrc, setImageSrc] = useState<string>('elkhound.jpg');
    const containerRef = useRef<HTMLDivElement>(null);

    const canvases = useMemo(() => {
        const frames = maxImages;
        let tempCanvases = Array.from({ length: frames }, () => document.createElement('canvas'));
        tempCanvases.forEach((canvas, index) => {
            canvas.width = 300;
            canvas.height = 300;
        });
        return tempCanvases.reverse();
    }, [maxImages]);

    useEffect(() => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            createDiffusionImages(image);
        };
    }, [imageSrc, maxImages]);

    const createDiffusionImages = useCallback((image: HTMLImageElement) => {
        canvases.slice().reverse().forEach((canvas, index) => {
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const originalData = new ImageData(new Uint8ClampedArray(imageData.data), canvas.width, canvas.height);

            const frameRatio = index / canvases.length;
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = interpolate(originalData.data[i], Math.random() * 255, frameRatio);
                imageData.data[i + 1] = interpolate(originalData.data[i + 1], Math.random() * 255, frameRatio);
                imageData.data[i + 2] = interpolate(originalData.data[i + 2], Math.random() * 255, frameRatio);
            }
            ctx.putImageData(imageData, 0, 0);
        });
    }, [canvases]);

    const interpolate = useCallback((startValue: number, endValue: number, factor: number) => {
        return startValue + (endValue - startValue) * factor;
    }, []);

    const handleMouseEnter = useCallback(({ index }: { index: number }) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);

        const timeout = setTimeout(() => {
            setActiveIndex(index);
        }, 300);

        setHoverTimeout(timeout);
    }, [hoverTimeout]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setActiveIndex(null);
    }, [hoverTimeout]);

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
            <div ref={containerRef} className={styles.canvasContainer}>
                {canvases.map((canvas, index) => (
                    <img key={index} src={canvas.toDataURL()} alt={`Noise frame ${index}`}
                         className={styles.canvasImage}
                         style={{
                             left: `${index * 20}px`,
                             zIndex: activeIndex === index ? 10 : 1,
                             transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                         }}
                         onMouseEnter={() => handleMouseEnter({index})}
                         onMouseLeave={handleMouseLeave}
                    />
                ))}
            </div>
        </>
    );
};

export default CentralVisuals;
