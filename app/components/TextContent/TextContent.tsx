import React from "react";
import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const TextContent: React.FC = () => {
    return (
        <>
            <div id="main-part">
            <div className="first_row">
                <h2> Exploring the Mechanics of Text-to-Image AI
                </h2>
                <p>
                    Text-to-image AI is a remarkable technology that transforms textual descriptions into vivid visual representations. It employs sophisticated deep learning models, which are neural networks trained on vast datasets of text-image pairs. These models serve as the backbone of the AI, enabling it to understand the complex relationships between language and visual content.
                </p>
            </div>

            <div className="second_row">
                <h2> Unveiling the Role of Deep Learning Models
                </h2>
                <p>
                    At the heart of text-to-image AI lie deep learning models, particularly convolutional neural networks (CNNs). Trained on extensive datasets, these models learn to extract meaningful features from textual descriptions and generate corresponding images. The process involves encoding textual inputs into high-dimensional vector representations, which capture semantic meanings and relationships.
                </p>
                <ul>
                    <li>
                        Encoder Networks: These CNNs process textual descriptions, extracting latent representations that encapsulate semantic information, serving as input for image generation.
                    </li>
                </ul>
            </div>

            <div className="third_row">
                <h2> Deciphering the Intricacies of Diffusion Models
                </h2>
                <p>
                    Diffusion models represent a prominent approach in text-to-image AI, wherein noisy initial states evolve into coherent images guided by textual descriptions. This iterative process involves embedding textual inputs into latent spaces, iteratively refining noisy images, and predicting denoised versions aligned with textual semantics.
                </p>
                <ul>
                    <li>
                        Guiding with Text: Text embeddings guide the diffusion process, ensuring that the generated images faithfully represent the semantic content of the input descriptions.
                    </li>
                    <li>
                        Iterative Refinement: The model iteratively refines noisy images, progressively enhancing details based on embedded text information.
                    </li>
                    <li>
                        Predicting the Next Step: Employing U-Net architectures, the model predicts denoised images aligned with textual descriptions, culminating in the generation of visually compelling outputs.
                    </li>
                </ul>
            </div>

            <div className="fourth_row">
                <h2> Exploring Alternative Text-to-Image Approaches
                </h2>
                <p>
                    While diffusion models dominate the landscape of text-to-image AI, alternative approaches offer unique functionalities, each with its own set of advantages:
                </p>
                <ul>
                    <li>
                        Autoencoders: These models leverage encoder-decoder architectures to generate images from textual descriptions, emphasizing semantic fidelity.
                    </li>
                    <li>
                        Attention-Based Models: Incorporating attention mechanisms, these models focus on salient regions of images based on textual emphasis, facilitating high-fidelity visual generation.
                    </li>
                    <li>
                        Generative Adversarial Networks (GANs): GANs employ adversarial training to iteratively refine images, balancing visual fidelity and semantic coherence in response to textual inputs.
                    </li>
                </ul>
            </div>

                <div className="fifth_row">
                    <h2> Explore the Cutting Edge:
                    </h2>
                    <p>
                        State-of-the-Art Models: Stay updated on the latest advancements by exploring these cutting-edge
                        text-to-image models:
                    </p>
                    <ul>
                        <li>
                            Imagen by Google AI: <a href="https://imagen.research.google/" target="_blank" rel="noopener noreferrer">https://imagen.research.google/</a>
                        </li>
                        <li>
                            Parti by Google AI: <a href="https://sites.research.google/parti/" target="_blank" rel="noopener noreferrer">https://sites.research.google/parti/</a>
                        </li>
                        <li>
                            DALL-E 3 by OpenAI: <a href="[https://openai.com/index/dall-e-3]" target="_blank" rel="noopener noreferrer">https://openai.com/index/dall-e-3</a>
                        </li>
                    </ul>
                </div>
                <div className="sixth_row">
                    <h2> Who are we?
                    </h2>
                    <p>
                        This was a project made as part of the AI major capstone at Drake university.
                    </p>
                    <ul className={`${style.aboutUL}`}>
                        <li>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{fontWeight: 'bold'}}>Jack Welsh</span>
                                <a href="https://github.com/Jackles1234" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="2x" style={{ color: 'black' }} />
                                </a>
                                <a href="https://www.linkedin.com/in/jack-welsh-bb849b250/" target="_blank"
                                   rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: 'black' }} />
                                </a>
                            </div>
                        </li>
                        <li>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{fontWeight: 'bold'}}>Cooper Brown</span>
                                <a href="https://github.com/cbrown987" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="2x" style={{ color: 'black' }} />
                                </a>
                                <a href="https://www.linkedin.com/in/cbrown987/" target="_blank"
                                   rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: 'black' }} />
                                </a>
                            </div>
                        </li>
                        <li>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <span style={{fontWeight: 'bold'}}>Conrad Ernst</span>
                                <a href="https://github.com/ConradErnst" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="2x" style={{ color: 'black' }} />
                                </a>
                                <a href="https://www.linkedin.com/in/conradernst/" target="_blank"
                                   rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: 'black' }} />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TextContent;