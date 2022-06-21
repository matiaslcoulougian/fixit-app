import {Alert, Snackbar} from "@mui/material";
import React from "react";

export const BudgetNotification = (props) => {
    return (
        <Snackbar open={props.openSnackbar} autoHideDuration={6000} onClose={()=> props.setOpenSnackbar(false)}>
            <Alert onClose={()=> props.setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                {props.notificationMessage}
            </Alert>
        </Snackbar>
    );
}