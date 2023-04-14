import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useGetLocationTagQuery } from 'store/tag/tagService';

function Search() {
  const { data: locationTagData } = useGetLocationTagQuery();

  return (
    <div className="search">
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <TextField label="關鍵字" variant="standard" />
          <TextField
            label="地點"
            select
            SelectProps={{
              native: true,
            }}
            defaultValue="全部"
            variant="standard"
          >
            {locationTagData?.map((tag) => (
              <option value={tag.text}>
                {tag.text}
              </option>
            ))}

          </TextField>
        </Grid>
      </Grid>
    </div>
  );
}

export default Search;
