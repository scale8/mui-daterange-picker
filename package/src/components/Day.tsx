import * as React from 'react';
import {Box, IconButton, Typography, useTheme} from '@mui/material';

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

const Day: React.FunctionComponent<DayProps> = ({
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  outlined,
  filled,
  onClick,
  onHover,
  value,
}: DayProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: startOfRange ? '50% 0 0 50%' : endOfRange ? '0 50% 50% 0' : undefined,
        backgroundColor: !disabled && highlighted ? theme.palette.action.hover : undefined,
      }}
    >
      <IconButton
        sx={{
          height: 36,
          width: 36,
          padding: 0,
          border: !disabled && outlined ? `1px solid ${theme.palette.primary.dark}` : undefined,
          ...(!disabled && filled ? {
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            backgroundColor: theme.palette.primary.dark,
          } : {})
        }}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        size="large">
        <Typography
          color={!disabled ? 'textPrimary' : 'textSecondary'}
          sx={{
            lineHeight: 1.6,
            color: !disabled && filled ? theme.palette.primary.contrastText : undefined,
          }}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </Box>
  );
};

export default Day;
