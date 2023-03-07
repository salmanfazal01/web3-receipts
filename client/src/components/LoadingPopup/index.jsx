import {
  Button,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useStateContext } from "../../context";
import Title from "../Title";

const LoadingPopup = () => {
  const { loadingPopup, closeLoadingPopup } = useStateContext();

  return (
    <Dialog
      onClose={closeLoadingPopup}
      open={!!loadingPopup}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 5,
          p: 2,
          width: 420,
          bgcolor: "background.primary",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
          },
        },
      }}
    >
      <Stack alignItems="center">
        <Title variant={{ xs: "h6" }} sx={{ fontWeight: 500 }}>
          {loadingPopup?.title}
        </Title>

        <CircularProgress size="90px" thickness={1} sx={{ my: 6 }} />

        <Typography sx={{ mb: 5 }} color="text.secondary">
          {loadingPopup?.message}
        </Typography>

        <Button
          onClick={closeLoadingPopup}
          fullWidth
          sx={{
            borderRadius: 3,
            height: 48,
            color: "primary.main",
            bgcolor: "rgba(47, 138, 245, .16)",
            "&:hover": {
              bgcolor: "rgba(47, 138, 245, .3)",
            },
          }}
        >
          Close
        </Button>
      </Stack>
    </Dialog>
  );
};

export default LoadingPopup;
