import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useRecoilState } from "recoil";
import { snackBarState } from "./atom";
import { Snackbar } from "@mui/material";
import Button from "../buttons/Button";

const SnackBar = () => {
  const [snackBarInfo, setSnackBarInfo] = useRecoilState(snackBarState);

  const Wrapper = (): ReactNode => {
    const handleClose = () => {
      setSnackBarInfo((prev) => ({ ...prev, open: false }));
    };
    const action = <Button primary>BUTTON</Button>;

    return (
      <Snackbar
        open={snackBarInfo.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBarInfo.message}
        action={action}
      />
    );
  };
  return ReactDOM.createPortal(
    <Wrapper />,
    document.getElementById("main") as HTMLElement
  );
};

export default SnackBar;
