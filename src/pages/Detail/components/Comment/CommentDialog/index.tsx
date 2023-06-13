import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button, Dialog,
  DialogActions, DialogContent,
  DialogTitle, Grid, Popover,
  Rating, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store';
import { usePostActivityCommentMutation } from 'store/activity/endpoints/comment';
import { selectUserInfo } from 'store/user/userSlice';

interface CommentModalType {
  title: string,
  onClose: () => void,
  open: boolean
}

function CommentDialog({ title, open, onClose } :CommentModalType) {
  const { id: activityId } = useParams();
  const userInfo = useAppSelector(selectUserInfo);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [postComment, { isLoading: isPostingComment }] = usePostActivityCommentMutation();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const onSubmit = (data: any) => {
    postComment({
      ...data,
      activityId,
    })
      .unwrap()
      .then(() => toast.success('成功評論!'))
      .then(onClose)
      .catch((e: any) => toast.error(e.data));
  };

  React.useEffect(() => {
    if (!userInfo && open) {
      sessionStorage.setItem('next', pathname);
      toast.warn('請先登入才能評論!');
      navigate('/login');
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} scroll="paper">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <DialogTitle id="modal-modal-title" variant="h5" component="h2" align="center">
          {title}
        </DialogTitle>

        {/* Content */}
        <DialogContent>
          <Grid container sx={{ alignItems: 'center' }} spacing={1}>
            {/* Avatar */}
            <Grid item xs={12} display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{ width: '2em', height: '2em' }}
                src={userInfo?.avatar || userInfo?.username || undefined}
                alt={userInfo?.username || 'avatar'}
              />

              <Box sx={{ flexGrow: 1 }}>
                {/* Username */}
                <Typography id="modal-modal-description" sx={{ ml: 0.8 }}>
                  {userInfo?.username || '使用者名稱'}
                </Typography>

                {/* Popover */}
                <Button
                  type="button"
                  size="small"
                  aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  endIcon={<ErrorOutlineIcon />}
                >
                  公開評論
                </Button>
              </Box>
            </Grid>

            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={openPopover}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              {' '}
              <Typography sx={{ p: 1 }}>您的貼文會與個人資料名稱及相片一併公開顯示。</Typography>
            </Popover>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Controller
                name="rate"
                control={control}
                defaultValue={0}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    name="rate"
                    sx={{ p: 2 }}
                    size="large"
                    onChange={onChange}
                    value={Number(value)}

                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                minRows={5}
                multiline
                placeholder="詳細說明你在這個活動的親身經驗"
                {...register('content')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>取消</Button>
          <LoadingButton
            loading={isPostingComment}
            type="submit"
            variant="contained"
          >
            張貼
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default CommentDialog;
