"use strict";

const fs = require("fs");
const path = require("path");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const { extractText } = require('./extractText.js');
const { splitText } = require('./splitText.js');
const consola = require('consola');
const FIXED_CHUNK_SIZE = 300;

const createWriteableName = (name, format, idx) => {
    return `${name.replace(/https?:\/\/|\/|:|\\|\./g, '')}_part${idx}.${format.replace('low', '')}`.replace(/\//g, '\\');
};

const cleanText = (text) => {
    return text
        .replace(/\&/g, 'and')
        .replace(/\u{000c}|`/gu, '')
        .replace(/</g, 'less than')
        .replace(/>/g, 'greater than');
};

const ensureDirectoryExistence = (filePath) => {
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir)) {
        return true;
    }
    fs.mkdirSync(dir, { recursive: true });
};

const textToAudioFile = async ({ text, voice = 'en-US-JennyNeural', format = 'audio-16khz-32kbitrate-mono-mp3', out }) => {
    ensureDirectoryExistence(out);

    const speechConfig = sdk.SpeechConfig.fromSubscription("d75fd5769af04187bb777d4f4e6da373", "eastasia");
    speechConfig.speechSynthesisVoiceName = voice;
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(out);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    consola.info(`Generating audio file ${out}`);
    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(cleanText(text),
            function (result) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    consola.success(`Finished processing audio file ${out}`);
                    resolve(out);
                } else {
                    consola.error(`Failed to synthesize audio for ${out}: ${result.errorDetails}`);
                    reject(new Error(result.errorDetails));
                }
                synthesizer.close();
            },
            function (err) {
                consola.error(`Error processing audio file ${out}: ${err.message}`);
                synthesizer.close();
                reject(err);
            });
    });
};

async function textToAudio({ text, voice = 'en-US-JennyNeural', format = 'audio-16khz-32kbitrate-mono-mp3', out, idx }) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("d75fd5769af04187bb777d4f4e6da373", "eastasia");
    speechConfig.speechSynthesisVoiceName = voice;
    const chunkName = out || `chunk ${idx !== undefined ? idx + 1 : 1}`;
    consola.info(`Generating audio file ${chunkName} from a chunk of ${text.length} characters`);

    const audioConfig = out ? sdk.AudioConfig.fromAudioFileOutput(out) : sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(cleanText(text),
            function (result) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    consola.success(`Finished processing audio for ${chunkName}`);
                    resolve(out ? null : Buffer.from(result.audioData));
                } else {
                    consola.error(`Failed to synthesize audio for ${chunkName}: ${result.errorDetails}`);
                    reject(new Error(result.errorDetails));
                }
                synthesizer.close();
            },
            function (err) {
                consola.error(`Error processing audio for ${chunkName}: ${err.message}`);
                synthesizer.close();
                reject(err);
            });
    });
}

async function readForMe({ file, mimeType, format, voice, out, log = false, textractOptions }) {
    let text;
    if (typeof file !== 'string' && !mimeType) {
        throw new Error('mimeType is required when passing a buffer');
    }
    
    text = (typeof file === 'string') 
        ? await extractText(file, textractOptions) 
        : await extractText(file, mimeType, textractOptions);

    if (!text) {
        throw new Error('Could not extract text from file');
    }
    
    log && consola.success('Finished extracting text!');
    
    const lines = text.length < FIXED_CHUNK_SIZE 
        ? [text] 
        : splitText(text, FIXED_CHUNK_SIZE);
    
    const speechConfig = sdk.SpeechConfig.fromSubscription("d75fd5769af04187bb777d4f4e6da373", "eastasia");
    speechConfig.speechSynthesisVoiceName = voice || "en-US-JennyNeural";

    const buffers = await Promise.all(lines.map(async (line, idx) => {
        if (line.trim().length === 0) return null;
        const partFileName = out;
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(partFileName);
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        consola.info(`Generating audio file ${partFileName} from a chunk of ${line.length} characters`);
        
        return new Promise((resolve, reject) => {
            synthesizer.speakTextAsync(cleanText(line),
                function (result) {
                    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                        consola.success(`Finished processing audio file ${partFileName}`);
                        resolve(fs.readFileSync(partFileName));
                    } else {
                        consola.error(`Failed to synthesize audio for ${partFileName}: ${result.errorDetails}`);
                        reject(new Error(result.errorDetails));
                    }
                    synthesizer.close();
                },
                function (err) {
                    consola.error(`Error processing audio for ${partFileName}: ${err.message}`);
                    synthesizer.close();
                    reject(err);
                });
        });
    }));

    log && consola.success('Finished processing all slices!');
    
    return { 
        buffers: buffers.filter(Boolean), 
        fileNames: lines.map((_, idx) => createWriteableName(out || 'output', format, idx)) 
    };
}

module.exports = { readForMe, textToAudioFile, textToAudio };
