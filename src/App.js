import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, Typography, Button, LinearProgress, Box } from '@mui/material';
import { VolumeUp, NavigateNext } from '@mui/icons-material';
import { translations } from './constant';
import girlReadingGif from './assets/GF_girl-reading-book-animated-clipart.gif';
import boyReadingGif from './assets/GF_boy-reading-a-book-green-background-animation.gif';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const englishAudioRef = useRef(null);
  const acholiAudioRef = useRef(null);

  useEffect(() => {
    setProgress(((currentIndex + 1) / translations.length) * 100);

    if (englishAudioRef.current) {
      englishAudioRef.current.load();
    }
    if (acholiAudioRef.current) {
      acholiAudioRef.current.load();
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length);
  };

  const playAudio = (ref) => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const getAudioPath = (filename) => {
    try {
      return require(`./assets/northern_audio/${filename}`);
    } catch (error) {
      console.error(`Audio file not found: ${filename}`);
      return '';
    }
  };

  const LanguageColumn = ({ language, text, color, audioRef, audioFile, gifSrc }) => (
    <Grid item xs={12} md={6}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="20px"
        textAlign="center"
        boxShadow={3}
        borderRadius="16px"
        bgcolor={color === 'green' ? '#4CAF50' : '#2196F3'}
        color="white"
        position="relative" 
      >
        {/* Display GIF in circular format */}
        <Box
          component="img"
          src={gifSrc}
          alt={`${language} animation`}
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />

        <Typography variant="h5" component="div" gutterBottom>
          {language}
        </Typography>

        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            marginBottom: '40px', // Add bottom margin for space between text and audio button
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <Typography variant="body1" fontSize="1.1rem">
            {text}
          </Typography>
        </Box>

        {/* Audio Button at Bottom-Left */}
        <Button
          variant="text"
          color="inherit"
          onClick={() => playAudio(audioRef)}
          sx={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            color: 'white',
          }}
        >
          <VolumeUp />
        </Button>

        <audio ref={audioRef} style={{ display: 'none' }}>
          <source src={getAudioPath(audioFile)} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </Box>
    </Grid>
  );

  return (
    <Container sx={{ minHeight: '100vh', backgroundColor: '#F5F5F5', padding: '32px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Read and Learn Acholi
      </Typography>

      {/* Progress bar */}
      <Box
        sx={{
          width: '50%',
          margin: '0 auto',
          marginBottom: '48px',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 12, borderRadius: 6, backgroundColor: '#e0e0e0' }}
        />
        <Typography variant="body2" align="center" sx={{ marginTop: '8px', color: '#666' }}>
          {currentIndex + 1} of {translations.length}
        </Typography>
      </Box>

      {/* Grid for Language Columns */}
      <Grid container spacing={4} justifyContent="center">
        <LanguageColumn
          language="English"
          text={translations[currentIndex].source}
          color="green"
          audioRef={englishAudioRef}
          audioFile={translations[currentIndex].source_filenames}
          gifSrc={girlReadingGif}
        />

        <LanguageColumn
          language="Acholi"
          text={translations[currentIndex].ac}
          color="blue"
          audioRef={acholiAudioRef}
          audioFile={translations[currentIndex].ac_filenames}
          gifSrc={boyReadingGif}
        />
      </Grid>

      {/* Next button at the bottom-right */}
      <Box sx={{ position: 'fixed', bottom: '32px', right: '32px' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNext}
          endIcon={<NavigateNext />}
          sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontSize: '1.1rem' }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default App;
