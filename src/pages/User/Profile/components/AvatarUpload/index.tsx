import {
  Avatar,
  Button,
  Dialog, DialogContent, DialogTitle, Grid, Skeleton, Slider, Stack, Typography,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store';
import { useUpdateAvatarMutation } from 'store/auth/authService';
import { selectUserInfo } from 'store/auth/authSlice';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

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
  const { avatar } = useAppSelector(selectUserInfo)!;
  const [imgSrc, setImgSrc] = useState(avatar); // crop image src
  const [scale, setScale] = useState(1); // crop scale variable
  const [rotate, setRotate] = useState(0); // crop rotate variable
  const [display, setDisplay] = useState(false); // crop panel display
  // crop result
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(avatar?.concat(`?${new Date().getTime()}`) || undefined);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const blobUrlRef = useRef('');
  const [updateAvatar] = useUpdateAvatarMutation();

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleConfirm = async () => {
    if (!previewCanvasRef.current) {
      toast.error('圖像載入錯誤，請重試一次');
    } else {
      previewCanvasRef.current.toBlob((blob) => {
        if (!blob) {
          toast.error('圖像建立錯誤，請重試一次');
        }
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
        }
        if (blob) {
          const formData = new FormData();
          formData.append('file', blob, 'avatar.png');
          updateAvatar(formData)
            .unwrap()
            .then(() => setCurrentAvatar(avatar?.concat(`?${new Date().getTime()}`)))
            .then(() => setDisplay(false));
        }
      });
    }
  };

  const handleCancel = () => {
    setDisplay(false);
  };

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
            <Grid item xs={12}>
              {/* Preview */}
              <canvas
                hidden
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  borderColor: 'transparent',
                }}
              />
            </Grid>
          </Grid>
          {/* Scale control */}
          <Grid item xs={2}>
            <Typography variant="body1" color="initial" gutterBottom>
              縮放:
              {Math.round(scale * 100)}
              %
            </Typography>

          </Grid>
          <Grid item xs={10}>
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
          <Grid item xs={10}>
            <Slider
              min={-180}
              max={180}
              value={rotate}
              disabled={!imgSrc}
              onChange={(e, value) => setRotate(Math.min(180, Math.max(-180, value as number)))}
            />
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
                  alt="Crop"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, maxHeight: 250 }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            {!imgSrc && (
              <Skeleton height={250} />
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs>
              <Button component="label" variant="outlined">
                上傳頭像
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleSelectFile}
                />
              </Button>
            </Grid>
            <Grid item>
              <Stack spacing={2} direction="row">
                <Button onClick={handleConfirm} variant="contained"> 確認</Button>
                <Button onClick={handleCancel}>取消</Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* current avatar */}
      <Stack spacing={2} direction="row" alignItems="flex-end">
        <Avatar
          src={currentAvatar}
          sx={{ width: 70, height: 70 }}
        />

        {/* upload button */}
        <Button component="label" onClick={() => setDisplay(true)}>
          更改頭像
        </Button>
      </Stack>
    </>
  );
}
