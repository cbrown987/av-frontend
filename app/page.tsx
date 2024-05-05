'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

import './globals.css';
import {FormData, ImageData} from "@/app/Interfaces";
import TextContent from "@/app/components/TextContent/TextContent";


const IndexPage: React.FC = () => {
  const NUMBER_OF_IMAGES: number = 39
  const EC2_BASE_URL = "http://18.208.126.51:5000"; // Ensure the protocol is included


  const [formData, setFormData] = useState<FormData>({
    textInput: '',
    batchSize: '1',
    guidanceScale: '3.0',
  });

  const [images, setImages] = useState<ImageData[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [diffusionSteps, setDiffusionSteps] = useState<number>(0)


  useEffect(() => {
    fetchImages().then();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get<ImageData[]>(`${EC2_BASE_URL}/api/images`);
      console.log(response.data)
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSend = {
        prompt: formData.textInput,
        batch_size: parseInt(formData.batchSize),
        guidance_scale: parseFloat(formData.guidanceScale)
      };

      await axios.post(`${EC2_BASE_URL}/api/submit`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 3600000,
      });
      alert('Data submitted successfully!');
      fetchImages();  // Fetch images again after submitting new data
    } catch (error) {
      console.error('Error submitting data:', error);
      alert(error);
    }
  };

  const handlePlayButtonClick = () => {
    if (intervalId === null) {
      const id = setInterval(() => {
        setDiffusionSteps((diffusionSteps) => diffusionSteps +1);
      }, 100);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null)
    }
  }
  const handleResetButtonClick = () => {
    setDiffusionSteps(0);
  }
  const handleFastForwardButtonClick = () => {
    setDiffusionSteps(39)
  }

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const DynamicCentralVisuals = dynamic(
      () => {
        return import('.//components/CentralVisuals/CentralVisuals');
      },
      { ssr: false }
  );


  return (
      <>
        {/* First header, 2xheight of second heder, contains text */}
        <nav className="navbar">
          <div>
            <span className="font-semibold text-xl tracking-tight">Unveiling <span className="bold-word">Text-to-Image</span> AI: A Playground for Creativity!</span>
          </div>
        </nav>


        {/* Second header, contains model parameter dropdowns */}
        <nav className="navbar_sub">
          <div className="timeline_controls">
            <button
                className="control-button rewind"
                  title="rewind"
                onClick={handleResetButtonClick}
            >
              <i className="material-icons"></i>
            </button>
            <button
                className="control-button play-pause"
                id="play-pause-button"
                title="Run/Pause training"
                onClick={handlePlayButtonClick}>
              <i id="play-pause-icon" className="material-icons"></i>
            </button>
            <button
                className="control-button fastforward"
                title="fastforward"
                onClick={handleFastForwardButtonClick}
            >
              <i className="material-icons"></i>
            </button>
          </div>
          <div>
            <div>
              <span className="header_sub_column">Diffusion Steps</span>
            </div>
            <div>
              <span className="diffusion-step">{diffusionSteps.toFixed()}</span>
            </div>
          </div>
          <div>
            <span className="header_sub_column">Batch Size</span>
            <input
                type="text"
                value={formData.batchSize}
                name={"batchSize"}
                onChange={handleChange}
                placeholder="Enter whole numbers only"
            />
          </div>
          <div>
            <span className="header_sub_column">Guidance Scale</span>
            <input
                type="text"
                value={formData.guidanceScale}
                name={"guidanceScale"}
                onChange={handleChange}
            />
          </div>


        </nav>

        <div className="columns">
          <div className="column">
              <div>
                <h2 className="text-lg font-semibold">Sidebar</h2>
                <form onSubmit={handleSubmit} className="sidebar-form">
                  <input
                      type="text"
                      name="textInput"
                      value={formData.textInput}
                      onChange={handleChange}
                      placeholder="Enter prompt here"
                      className="sidebar-input"
                  />
                  <button type="submit" className="sidebar-button-submit">Submit</button>
                </form>
              </div>
            </div>


          <div className="column" id={"imageDisplayContainer"}>

            <h2>ML Model</h2>
            <DynamicCentralVisuals
              diffusionStep={diffusionSteps}
            />

          </div>
          <div className="column">
            <div className="images">
              <h2 className="text-lg font-semibold">Images</h2>
              <p>Output images</p>
              <div className="image-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`http://localhost:5000${image.url}`} alt={image.name} />
                      <p className="image-info">{image.name}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <TextContent />
      </>
  );
};

export default IndexPage;



