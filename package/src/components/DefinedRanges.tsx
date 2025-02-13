import React from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import {isSameDay} from 'date-fns';
import {DateRange, DefinedRange} from '../types';

type DefinedRangesProps = {
  setRange: (range: DateRange) => void;
  selectedRange: DateRange;
  ranges: DefinedRange[];
};

const isSameRange = (first: DateRange, second: DateRange) => {
  const { startDate: fStart, endDate: fEnd } = first;
  const { startDate: sStart, endDate: sEnd } = second;
  if (fStart && sStart && fEnd && sEnd) {
    return isSameDay(fStart, sStart) && isSameDay(fEnd, sEnd);
  }
  return false;
};

const DefinedRanges: React.FunctionComponent<DefinedRangesProps> = ({
  ranges,
  setRange,
  selectedRange,
}: DefinedRangesProps) => (
  <List>
    {ranges.map((range, idx) => (
      <ListItem button key={idx} onClick={() => setRange(range)}>
        <ListItemText
          primaryTypographyProps={{
            variant: 'body2',
            sx: {
              fontWeight: isSameRange(range, selectedRange)
                ? 'bold'
                : 'normal',
            },
          }}
        >
          {range.label}
        </ListItemText>
      </ListItem>
    ))}
  </List>
);

export default DefinedRanges;
