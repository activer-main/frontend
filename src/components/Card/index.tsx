import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TagIcon from '@mui/icons-material/Tag';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ActivityDataType, TagDataType } from 'types/data';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import { Skeleton } from '@mui/material';

export interface CardType {
  id: string;
  imgUrl: string,
  title: string | null,
  altText: string,
  tags?: TagDataType[],
  detail?: React.ReactNode;
  control? : React.ReactNode;
  isLoading?: boolean
}

export default function ActionCard({
  imgUrl, title, tags, altText, detail, control, isLoading, id,
}: CardType) {
  const [imageSrc, setImageSrc] = React.useState(imgUrl);

  const handleImageError = () => {
    setImageSrc('/DefaultActivityImage.svg');
  };

  const handleLoad = () => (<Skeleton sx={{ height: '40%' }} />);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card image */}
      {isLoading
        ? <Skeleton sx={{ height: '40%' }} />
        : (
          <CardMedia
            onLoad={handleLoad}
            component="img"
            sx={{
              height: '40%',
            }}
            onError={handleImageError}
            image={imageSrc}
            alt={altText}
          />
        )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {title || `Activity#${id.slice(0, 5)}...`}
        </Typography>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
        >
          {tags?.slice(0, 3).map((tag) => (
            <Chip key={tag.id} icon={<TagIcon />} label={tag.text} size="small" color={activityTypeToColor(tag.type)} variant="outlined" />
          ))}
        </Stack>
        <Typography variant="body2" gutterBottom>
          {detail}
        </Typography>
      </CardContent>
      <CardActions>
        {control}
      </CardActions>
    </Card>
  );
}
interface MainCardType extends ActivityDataType {
  isLoading?: boolean;
}

export function MainCard({ ...props }:MainCardType) {
  const {
    title, tags, images, trend, id,
  } = props;
  const navigate = useNavigate();

  return (
    <ActionCard
      id={id.toString()}
      title={title}
      tags={tags?.map((tag) => ({ text: tag.text, id: tag.id, type: tag.type }))}
      imgUrl={images ? images[0] : '/DefaultActivityImage.svg'}
      detail=""
      altText={title || 'activity-image'}
      control={(
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs>
            <Typography>
              &#128065;
              {' '}
              {trend}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="navigate" onClick={() => navigate(`/detail/${id}`)}>
              <SendIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} size="small" color="warning" />
          </Grid>
        </Grid>
      )}
    />
  );
}
