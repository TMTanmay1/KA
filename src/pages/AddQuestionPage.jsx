import React, { useState } from 'react';
import { IconButton, Box, Typography, TextField, Button, Divider, Grid } from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

const AddQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [error, setError] = useState('');

  const handleAddQuestion = () => {
    // Check if all fields are filled
    if (!questionText || options.some(option => option === '') || !correctAnswer) {
      setError('Please fill in all fields before adding a question.');
      return;
    }

    const newQuestion = {
      questionNumber,
      questionText,
      options,
      correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setQuestionNumber(questionNumber + 1);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setError(''); // Clear error if any
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleDeleteQuestion = (index) => {
    // Remove the question from the array
    const updatedQuestions = questions.filter((_, i) => i !== index).map((q, idx) => ({
      ...q,
      questionNumber: idx + 1, // Reassign question numbers
    }));
    
    setQuestions(updatedQuestions);
    setQuestionNumber(updatedQuestions.length + 1); // Adjust question counter
  };

  const handleSubmit = () => {
    console.log('Submitted Questions:', questions);
    // Handle actual submit logic here, such as sending data to a server
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" align="center" color="primary" fontWeight="bold" gutterBottom>
        Add Question
      </Typography>
      <Divider sx={{ mb: 3, bgcolor: 'primary.main' }} />

      {error && (
        <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        label={`Question Number: ${questionNumber}`}
        variant="outlined"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        sx={{ mb: 2, bgcolor: 'background.default', borderRadius: 1 }}
        required
      />

      <Typography variant="subtitle1" color="text.secondary" fontWeight="medium">
        Enter Options
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {options.map((option, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TextField
              fullWidth
              label={`Option ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ bgcolor: 'background.default', borderRadius: 1 }}
              required
            />
          </Grid>
        ))}
      </Grid>

      <TextField
        fullWidth
        label="Correct Answer"
        variant="outlined"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        sx={{ mb: 3, bgcolor: 'background.default', borderRadius: 1 }}
        required
      />

      <Divider sx={{ my: 2, bgcolor: 'primary.main' }} />

      <Box display="flex" justifyContent="center" sx={{ gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Add Question
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: 3,
          }}
        >
          Submit
        </Button>
      </Box>

      {/* Display Questions */}
      <Box sx={{ mt: 4 }}>
        {questions.map((q, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, boxShadow: 2, position: 'relative' }}>
            <IconButton
              onClick={() => handleDeleteQuestion(index)}
              sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
              aria-label="delete question"
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="body1" color="text.primary" fontWeight="bold">
              {q.questionNumber}. {q.questionText}
            </Typography>
            {q.options.map((opt, i) => (
              <Typography variant="body2" color="text.secondary" key={i} sx={{ ml: 1 }}>
                Option {i + 1}: {opt}
              </Typography>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Correct Answer: {q.correctAnswer}
            </Typography>
            <Divider sx={{ my: 1, bgcolor: 'grey.400' }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AddQuestionPage;
