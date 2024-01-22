import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const EditableLabel = ({
  value,
  caption,
  onValueSaved,
}: {
  value: string;
  caption: string;
  onValueSaved: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleDiscardChanges = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  const handleSaveChanged = () => {
    onValueSaved(inputValue);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <Box sx={{ display: 'flex' }}>
          <TextField
            id={`input-field-${caption}`}
            label={caption}
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <IconButton onClick={handleDiscardChanges}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handleSaveChanged}>
            <CheckIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ height: '48px', display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
            <Typography fontSize="small">{caption}</Typography>
            <Typography fontSize="large" color="text.secondary" whiteSpace="nowrap" textOverflow="ellipsis">
              {value}
            </Typography>
          </Box>
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};
