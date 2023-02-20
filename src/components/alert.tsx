import { Collapse, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useStoreContext, StoreContextState } from '../hooks/use-stores-context';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';

export interface AlertMessageProps {
  alertSeverity: AlertSeverity;
  alertText: string;
}

function AlertMessage () {
  const { alert } = useStoreContext() as StoreContextState;
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (alert) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [alert, setShow]);
  
  return (
    <Collapse in={show}>
      <Alert severity={alert?.alertSeverity || 'info'} sx={{ mb: 2 }} action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>{ alert?.alertText || '' }</Alert>
    </Collapse>
  );
}

export default AlertMessage;