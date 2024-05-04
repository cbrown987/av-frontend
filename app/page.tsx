'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import axios from 'axios';
import './globals.css';
import CentralVisuals from "@/app/CentralVisuals/CentralVisuals";
import {FormData, ImageData} from "@/app/Interfaces";


const IndexPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    textbox1: '',
    textbox2: '',
    textbox3: '',
  });

  const [images, setImages] = useState<ImageData[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const EC2_BASE_URL = "http://18.208.126.51:5000"; // Ensure the protocol is included
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
        prompt: formData.textbox1,  // Assuming the 'prompt' is stored in textbox1
        batch_size: parseInt(formData.textbox2),  // Assuming the 'batch_size' is stored in textbox2
        guidance_scale: parseFloat(formData.textbox3)  // Assuming the 'guidance_scale' is stored in textbox3
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
      }, 100); // Change the count every 2000 milliseconds (2 seconds)
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
      setIntervalId(null)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);


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
            <button className="control-button rewind" title="rewind">
              <i className="material-icons"></i>
            </button>
            <button
                className="control-button play-pause"
                id="play-pause-button"
                title="Run/Pause training"
                onClick={() => { handlePlayButtonClick() }}>
              <i id="play-pause-icon" className="material-icons"></i>
            </button>
            <button
                className="control-button fastforward"
                title="fastforward"
            >
              <i className="material-icons"></i>
            </button>
          </div>
          <div>
            <div>
              <span className="header_sub_column">Diffusion Steps</span>
            </div>
            <div>
              <span className="epoch-number">{diffusionSteps.toFixed()}</span>
            </div>
          </div>
          <div>
            <span className="header_sub_column">Batch Size</span>
          </div>
          <div>
            <span className="header_sub_column">Something</span>
          </div>
          <div>
            <span className="header_sub_column">Something</span>
          </div>
          <div>
            <span className="header_sub_column">Something</span>
          </div>
          <div>
            <span className="header_sub_column">Something</span>
          </div>

        </nav>

        <div className="columns">
          <div className="column">
              <div>
                <h2 className="text-lg font-semibold">Sidebar</h2>
                <form onSubmit={handleSubmit} className="sidebar-form">
                  <input
                      type="text"
                      name="textbox1"
                      value={formData.textbox1}
                      onChange={handleChange}
                      placeholder="Textbox 1"
                      className="sidebar-input"
                  />
                  <input
                      type="text"
                      name="textbox2"
                      value={formData.textbox2}
                      onChange={handleChange}
                      placeholder="Textbox 2"
                      className="sidebar-input"
                  />
                  <input
                      type="text"
                      name="textbox3"
                      value={formData.textbox3}
                      onChange={handleChange}
                      placeholder="Textbox 3"
                      className="sidebar-input"
                  />
                  <button type="submit" className="sidebar-button-submit">Submit</button>
                </form>
              </div>
            </div>


          <div className="column" id={"imageDisplayContainer"}>

            <h2>ML Model</h2>
            <CentralVisuals
              diffusionStep={10}
            />

          </div>
          <div className="column">
            <div className="images">
              <h2 className="text-lg font-semibold">Images</h2>
              <p>Output images</p>
              <div className="image-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-container">
                      <img src={`http://localhost:5000${image.url}`} alt={image.name} />
                      <p className="image-info">{image.name}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* scrolling part of the page!*/}
        <div id="main-part">
          <div className="first_row">
            <h2> A Technical Deep Dive into Text-to-Image AI
            </h2>
            <p>
              The ability to weave captivating visuals from the tapestry of language
              is no longer science fiction. Text-to-image AI is revolutionizing creative
              expression, empowering users to bridge the gap between imagination and
              digital canvas. But what lies beneath the hood of this transformative
              technology? Let&apos;s embark on a technical exploration, dissecting the core
              functionalities and the fascinating processes that bring your words to life
              as visuals.
            </p>
          </div>

          <div className="second_row">
            <h2> Deep Learning Models
            </h2>
            <p>
              At the heart of text-to-image AI lie deep learning models, specifically
              convolutional neural networks (CNNs) trained on massive datasets of text-image
              pairs. These datasets act as the Rosetta Stone for the AI, enabling it to
              decipher the complex relationships between textual descriptions and their
              corresponding visual representations. When you provide a text prompt, the
              model dissects your words, identifying key elements, objects, and their spatial
              relationships. This extracted information serves as the foundation for the
              image generation process.
            </p>
            <ul>
              <li>
                Encoder Networks: These CNNs process your text description, extracting a
                high-dimensional vector representation that captures the semantic meaning
                and relationships within your words.
              </li>
            </ul>
          </div>

          <div className="third_row">
            <h2> From Noise to Form: Demystifying Diffusion Models
            </h2>
            <p>
              One of the most prominent approaches in text-to-image AI is diffusion.
              Diffusion models operate by gradually refining an initial state of noise
              into a coherent image that aligns with your text description. Here&apos;s a
              breakdown of the diffusion process:
            </p>
            <ul>
              <li>
                Guiding with Text: Your text description is embedded into a latent space
                using another CNN (text encoder). This embedding is then incorporated into
                the diffusion process, guiding the model towards generating an image that
                reflects the semantic content of your words.
              </li>
              <li>
                Iterative Refinement: The core of the diffusion process lies in a series of
                denoising steps. At each step, the model predicts the &quot;cleaner&quot; version of
                the current noisy image, effectively removing noise and introducing image
                details based on the embedded text information.
              </li>
              <li>
                Predicting the Next Step: The model utilizes a U-Net like architecture to
                predict the &quot;denoised&quot; version of the current image. This prediction step
                leverages the embedded text information to ensure the denoised image aligns
                with your description.
              </li>
              <li>
                The Unveiling: After a predetermined number of denoising steps, the model
                outputs the final image - a visual representation meticulously crafted from
                your text prompt and guided by the iterative diffusion process.
              </li>
            </ul>
          </div>

          <div className="fourth_row">
            <h2> Exploring Alternative Text-to-Image Approaches
            </h2>
            <p>
              While diffusion models are currently at the forefront,
              other text-to-image approaches offer unique functionalities:
            </p>
            <ul>
              <li>
                Autoencoders: These models employ a two-part architecture: an encoder and
                a decoder. The encoder compresses your text description into a latent space
                representation, capturing its essence. The decoder then utilizes this latent
                representation to generate an image reflecting the encoded information. This
                approach excels at capturing the core semantic meaning of your text prompt and
                translating it into a visually coherent image.
              </li>
              <li>
                Attention-Based Models: These models incorporate attention mechanisms
                that focus on specific parts of the generated image based on the relative
                importance of different elements in your text prompt. Imagine the model
                strategically allocating its resources to render crucial details you mentioned
                in your description, like a flowing mane on a lion or the intricate scales of
                a dragon. Attention-based models are particularly adept at generating images
                with a high degree of fidelity to the specific details mentioned in the text prompt.
              </li>
              <li>
                Generative Adversarial Networks (GANs): These models involve two competing
                neural networks: a generator and a discriminator. The generator strives
                to produce an image that aligns with your text description and artistic
                style preferences. The discriminator, acting as a discerning critic,
                meticulously evaluates the generated image, providing feedback to the
                generator. Through this adversarial training process, the GANs refine the
                image iteratively, pushing it closer to a visually compelling and semantically
                accurate representation of your text prompt.
              </li>
            </ul>
          </div>
          <div className="fifth_row">
            <h2> Explore the Cutting Edge:
            </h2>
            <p>
              State-of-the-Art Models: Stay updated on the latest advancements by exploring these cutting-edge text-to-image models:
            </p>
            <ul>
              <li>
                Imagen by Google AI: [invalid URL removed]
              </li>
              <li>
                DALL-E 2 by OpenAI: [invalid URL removed]
              </li>
            </ul>
          </div>
        </div>
      </>
  );
};

export default IndexPage;



