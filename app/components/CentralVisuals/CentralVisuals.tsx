import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CentralVisualProps } from "@/app/Interfaces";
import styles from './style.module.css';

const CentralVisuals: React.FC<CentralVisualProps> = ({ diffusionStep }) => {
    const NUMBER_OF_IMAGES = 29;
    const IMAGE_PATH = '/dog_sample.png'; // Local path to the image in the public directory

    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasesRef = useRef<Array<HTMLCanvasElement>>([]);

    // Initialize canvases once
    useEffect(() => {
        canvasesRef.current = Array.from({ length: NUMBER_OF_IMAGES }, () => document.createElement('canvas'));
        canvasesRef.current.forEach(canvas => {
            canvas.width = 300;
            canvas.height = 300;
        });

        const image = new Image();
        image.src = IMAGE_PATH;
        image.onload = () => {
            createDiffusionImages(image);
            setIsLoading(false);
        };
    }, []); // Empty dependency array ensures this runs once on mount

    const createDiffusionImages = useCallback((image: HTMLImageElement) => {
        canvasesRef.current.forEach((canvas, index) => {
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const originalData = new ImageData(new Uint8ClampedArray(imageData.data), canvas.width, canvas.height);

            const frameRatio = index / NUMBER_OF_IMAGES;
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = interpolate(originalData.data[i], Math.random() * 255, frameRatio);
                imageData.data[i + 1] = interpolate(originalData.data[i + 1], Math.random() * 255, frameRatio);
                imageData.data[i + 2] = interpolate(originalData.data[i + 2], Math.random() * 255, frameRatio);
            }
            ctx.putImageData(imageData, 0, 0);
        });
    }, [NUMBER_OF_IMAGES]);

    const interpolate = useCallback((startValue: number, endValue: number, factor: number) => {
        return startValue + (endValue - startValue) * factor;
    }, []);

    const handleMouseEnter = useCallback(({ index }: { index: number }) => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        const timeout = setTimeout(() => {
            setActiveIndex(index);
        }, 100);

        setHoverTimeout(timeout);
    }, [hoverTimeout]);

    const handleMouseLeave = useCallback(() => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setActiveIndex(null);
    }, [hoverTimeout]);

    const renderCanvases = () => {
        return [...canvasesRef.current].reverse().map((canvas, index) => (
            <img key={index} src={canvas.toDataURL()} alt={`Noise frame ${index}`}
                 className={styles.canvasImage}
                 style={{
                     left: `${index * 50}px`,
                     display: index <= diffusionStep ? 'block' : 'none',
                     zIndex: activeIndex === index ? 10 : 1,
                     transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                 }}
                 onMouseEnter={() => handleMouseEnter({index})}
                 onMouseLeave={handleMouseLeave}
            />
        ));
    };

    return (
        <div ref={containerRef} className={styles.canvasContainer}>
            {isLoading && <div className={styles.loading}>Loading...</div>}
            {renderCanvases()}
        </div>
    );
};

export default CentralVisuals;
