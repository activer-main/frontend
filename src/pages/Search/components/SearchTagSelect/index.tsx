import {
  Button,
  Checkbox, FormControlLabel, Grid, Skeleton, Stack, Typography,
} from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { TagDataType } from 'types/data';

interface SearchTagSelectType {
  label: string;
  isLoading: boolean;
  tagData?:TagDataType[];
  selectedTags? : TagDataType[];
  onChange:(tag: TagDataType) => void;
  onClear:React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function SearchTagSelect({
  label, isLoading, tagData, selectedTags, onChange, onClear,
} : SearchTagSelectType) {
  return (
    <Grid container>
      <Grid item xs={12} md={1}>
        <Typography variant="h5">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12} md={11}>
        {!isLoading ? tagData?.map((tag) => (
          <FormControlLabel
            componentsProps={{
              typography: { variant: 'caption' },
            }}
            checked={selectedTags?.some((t) => t.id === tag.id)}
            key={tag.id}
            control={<Checkbox />}
            label={tag.text}
            onChange={() => onChange(tag)}
          />
        )) : (
          <Stack spacing={3} direction="row">
            {_.times(5, (index) => <Skeleton variant="rectangular" width={40} key={index} />)}
          </Stack>
        ) }
        <Button onClick={onClear}>清除選擇</Button>
      </Grid>
    </Grid>
  );
}

export default SearchTagSelect;
