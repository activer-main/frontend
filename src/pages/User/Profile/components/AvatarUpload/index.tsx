import React, { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop';
import {
  Button,
  Dialog, DialogContent, DialogTitle, Grid, Slider, Typography,
} from '@mui/material';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      1 / 1,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export default function AvatarUpload() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [display, setDisplay] = useState(false); // crop page display

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(true);
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width
        && completedCrop?.height
        && imgRef.current
        && previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  return (
    <>
      {/* crop panel  */}
      <Dialog open={display} onClose={() => setDisplay(false)}>

        <DialogTitle>裁切</DialogTitle>
        <DialogContent>
          <Grid container alignItems="center">
            {/* Scale control */}
            <Grid item xs={2}>
              <Typography variant="body1" color="initial" gutterBottom>
                縮放:
                {Math.round(scale * 100)}
                %
              </Typography>

            </Grid>
            <Grid xs={10}>
              <Slider
                sx={{ mt: 2 }}
                step={0.1}
                value={scale}
                max={3}
                disabled={!imgSrc}
                onChange={(e, value) => setScale(value as number)}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" color="initial" gutterBottom>
                旋轉:
                {' '}
                {rotate}
              </Typography>
            </Grid>
            <Grid xs={10}>
              <Slider
                min={-180}
                max={180}
                value={rotate}
                disabled={!imgSrc}
                onChange={(e, value) => setRotate(Math.min(180, Math.max(-180, value as number)))}
              />
            </Grid>

          </Grid>
          <Grid item xs={12}>
            {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1 / 1}
                circularCrop
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => setDisplay(false)} variant="contained" sx={{ mr: 2 }}> 確認</Button>
            <Button onClick={() => setDisplay(false)}>取消</Button>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* preview */}
      {!!completedCrop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            width: 100,
            height: 100,
            borderRadius: '50%',
          }}
        />
      )}

      {/* upload button */}
      <Button component="label">
        上傳頭像
        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleSelectFile}
        />
      </Button>
    </>
  );
}
