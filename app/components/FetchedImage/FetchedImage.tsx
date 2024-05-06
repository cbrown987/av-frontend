import React, {useEffect, useState} from "react";
import axios from "axios";
import {ImageData} from "@/app/Interfaces";

const FetchedImage: React.FC= () => {
    const EC2_BASE_URL = "http://3.236.122.207:5000"; // Ensure the protocol is included

    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const displayImage = async (): Promise<void> => {
        // try {
        //     const response = await axios.get<ImageData>(`${EC2_BASE_URL}/api/images`);
        //     console.log(response.data)
        //     setImageSrc(response.data.url);
        // } catch (error) {
        //     console.error('Error fetching images:', error);
        // }
        const response = await fetch(`https://3.236.122.207:5000/api/images/image_batch0.png`);
        console.log(response)
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL);


    };


    useEffect(() => {
        displayImage().then();
    }, []);

    return (
        <>
            <button onClick={displayImage}>Display Image</button>
            {imageSrc && <img src={imageSrc} alt="Downloaded" />}
        </>
    );
}

export default FetchedImage;
