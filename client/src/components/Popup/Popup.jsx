// Popup.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from '../../features/slice.js';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const Popup = () => {
  const dispatch = useDispatch();
  const { openPopup, title, msg, type } = useSelector((state) => state.dataReducer.popup);

  const handleClose = () => {
    dispatch(closePopup());
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div style={{ color: type === 'error' ? 'red' : 'black' }}>
        {msg.split("\n").map((line, index) => (
      <span key={index}>{line}<br /></span>
    ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

