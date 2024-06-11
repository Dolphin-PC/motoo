import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useRecoilState } from "recoil";
import { snackBarState } from "./atom";
import { IconButton, Snackbar } from "@mui/material";
import Button from "../buttons/Button";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const SnackBar = () => {
  const [snackBarInfo, setSnackBarInfo] = useRecoilState(snackBarState);

  const Wrapper = (): ReactNode => {
    const handleClose = () => {
      setSnackBarInfo((prev) => ({ ...prev, open: false }));
    };

    return (
      <Snackbar
        open={snackBarInfo.open}
        autoHideDuration={10 * 1000}
        message={snackBarInfo.message}
        action={
          <>
            <Link href={snackBarInfo.link}>
              <Button primary>Detail</Button>
            </Link>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </>
        }
      />
    );
  };
  return ReactDOM.createPortal(
    <Wrapper />,
    document.getElementById("main") as HTMLElement
  );
};

export default React.memo(SnackBar);
