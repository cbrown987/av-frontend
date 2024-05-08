'use client'
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRedo, faPlay, faPause, faForward} from '@fortawesome/free-solid-svg-icons';
import GithubCorner from "react-github-corner";

import styles from './style.module.css'
import './globals.css';
import {FormData} from "@/app/Interfaces";
import TextContent from "@/app/components/TextContent/TextContent";


const IndexPage: React.FC = () => {
  const EC2_BASE_URL = "http://44.222.116.200:5000"; // Ensure the protocol is included

    const [formData, setFormData] = useState<FormData>({
        textInput: '',
        batchSize: '1',
        guidanceScale: '1.0',
        headChannels: '8',
        xfHeads: '8'          
    });
    const [errors, setErrors] = useState<{
        batchSize?: string,
        guidanceScale?: string,
        textInput?: string
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [diffusionSteps, setDiffusionSteps] = useState<number>(0)
    const [isDiffusing, setIsDiffusing] = useState<boolean>(false)
    const [APIResponse, setAPIResponse] = useState<boolean>(false);

    // RegEx for ints
    const integerRegEx = /^[0-9]*$/;
    // RegEx for floats
    const floatRegEx = /^-?\d*(\.\d*)?$/;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        let error = '';
        if (name === 'batchSize') {
            if (!integerRegEx.test(value)) {
                error = 'Batch size must be an integer.';
            }
        } else if (name === 'guidanceScale') {
            if (!floatRegEx.test(value)) {
                error = 'Guidance scale must be a float.';
            }
        }
        if (error) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        } else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const dataToSend = {
                prompt: formData.textInput,
                batch_size: parseInt(formData.batchSize),
                guidance_scale: parseFloat(formData.guidanceScale),
                head_channels: parseInt(formData.headChannels),
                xf_heads: parseInt(formData.xfHeads)
            };
            await axios.post(`${EC2_BASE_URL}/api/submit`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 3600000,
            });
            // alert('Data submitted successfully!');
            setAPIResponse(true)
            setIsLoading(false)
        } catch (error) {
            console.error('Error submitting data:', error);
            alert(error);
        }
    };

    const handlePlayButtonClick = () => {
        setIsDiffusing(!isDiffusing)
        if (intervalId === null) {
            const id = setInterval(() => {
                setDiffusionSteps((diffusionSteps) => diffusionSteps + 1);
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
            <nav className="navbar">
                <div>
                    <span className="font-semibold text-xl tracking-tight">Unveiling <span
                        className="bold-word">Text-to-Image</span> AI: A Practical Showcase.</span>
                </div>
                <GithubCorner href="https://github.com/Jackles1234/Articulate-Visions" />
            </nav>
            <nav className="navbar_sub">
                <div className="timeline_controls">
                    <div
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <button
                            onClick={handleResetButtonClick}
                            style={{border: 'none', background: 'none', cursor: 'pointer'}}
                            className={`${styles.controlButton}`}>
                            <FontAwesomeIcon icon={faRedo} size="3x"/>
                        </button>
                        <button
                            onClick={handlePlayButtonClick}
                            style={{border: 'none', background: 'none', cursor: 'pointer'}}
                            className={`${styles.controlButton}`}>
                            <FontAwesomeIcon icon={isDiffusing ? faPause : faPlay} size="3x"/>
                        </button>
                        <button
                            onClick={handleFastForwardButtonClick}
                            style={{border: 'none', background: 'none', cursor: 'pointer'}}
                            className={`${styles.controlButton}`}>
                        <FontAwesomeIcon icon={faForward} size="3x"/>
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="header_sub_column">Diffusion Steps</span>
                    </div>
                    <div>
                        <span className="diffusion-step">{diffusionSteps.toFixed()}</span>
                    </div>
                </div>
                <div className={`${styles.formContainer}`}>
                    <form onSubmit={handleSubmit} className={`${styles.formContainer}`}>
                        <div className={`${styles.inputGroup}`}>
                            <span className="header_sub_column">Batch Size:</span>
                            <input
                                type="text"
                                value={formData.batchSize}
                                name={"batchSize"}
                                onChange={handleInputChange}
                                placeholder="Enter whole numbers only"
                                className={styles.inputField}
                            />
                            {errors.batchSize && <div className={styles.error}>{errors.batchSize}</div>}
                        </div>
                        <div className={`${styles.inputGroup}`}>
                            <span className="header_sub_column">Guidance Scale:</span>
                            <input
                                type="text"
                                value={formData.guidanceScale}
                                name={"guidanceScale"}
                                onChange={handleInputChange}
                                className={styles.inputField}
                            />
                            {errors.guidanceScale && <div className={styles.error}>{errors.guidanceScale}</div>}

                        </div>
                        <div className={`${styles.inputGroup}`}>
                            <span className="header_sub_column">Head Channels:</span>
                            <select
                                name="headChannels"
                                value={formData.headChannels}
                                onChange={handleSelectChange}
                                className={styles.inputFieldSelect}>
                                <option value={8}>8</option>
                                <option value={16}>16</option>
                                <option value={32}>32</option>
                                <option value={64}>64</option>
                                <option value={128}>128</option>
                            </select>
                        </div>
                        {/*<div className={`${styles.inputGroup}`}>*/}
                        {/*    <span className="header_sub_column">XF Heads:</span>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        name="xfHeads"*/}
                        {/*        value={formData.xfHeads}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        placeholder="Enter whole numbers only"*/}
                        {/*        className={styles.inputField}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className={`${styles.inputGroup}`}>
                            <input
                                type="text"
                                name="textInput"
                                value={formData.textInput}
                                onChange={handleInputChange}
                                placeholder="Enter prompt here"
                                className={styles.PromptInputField}
                            />
                            <div className={`${styles.inputGroup}`}>
                                <button type="submit" className={`${styles.sidebarButtonSubmit}`}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
                <div className="column" id={"imageDisplayContainer"}>
                    {APIResponse ?
                        <DynamicCentralVisuals diffusionStep={diffusionSteps}/> :
                        isLoading ? <div className={styles.loading}>Loading...</div> :
                            <div className={styles.loading}>Please submit some variables</div>
                    }
                    {/*For testing the central visuals without submitting to API*/}
                    {/*<DynamicCentralVisuals diffusionStep={diffusionSteps}/>*/}
                </div>
            <TextContent />
        </>
    );
};

export default IndexPage;



