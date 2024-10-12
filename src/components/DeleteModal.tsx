import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@suid/material";
import { Signal } from "solid-js";

export function DeleteModal(a: { openSignal: Signal<boolean>, message: Signal<string>, onDelete: () => void }) {
  const [open, setOpen] = a.openSignal;
  const [message, setMessage] = a.message;
  const cancelDelete = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    const id = 0;
    if (id !== null) {
      a.onDelete();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open()} onClose={cancelDelete}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDelete} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
