// src/components/layout/ImageGrid.js
import { Grid, Box } from '@mui/material';

// Image imports
import imageOne from '../../assets/images/brazil.png';
import imageTwo from '../../assets/images/italy.png';
import imageThree from '../../assets/images/london.png';

const images = [imageOne, imageTwo, imageThree];

function ImageGrid() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ 
        mt: 1,   // margin-top
        paddingLeft: 2, // padding-left
        paddingRight: 2, // padding-right
      }}
    >
      {images.map((img, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Box
            sx={{
              width: '100%',
              height: { xs: '200px', sm: '300px' },
              background: `url(${img}) center / cover no-repeat`,
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageGrid;
