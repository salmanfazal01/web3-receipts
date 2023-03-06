import { Dialog, Typography } from "@mui/material";
import React from "react";

const FormDialog = ({ open, handleClose, title, children }) => {
  return (
    <Dialog
      onClose={handleClose}
      open={!!open}
      PaperProps={{
        // elevation: 1,
        sx: {
          borderRadius: 5,
          p: 2,
          width: 420,
          bgcolor: "background.primary",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {title}
        </Typography>
      )}

      <React.Fragment>{children}</React.Fragment>
    </Dialog>
  );
};

export default FormDialog;
