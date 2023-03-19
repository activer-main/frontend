import { LoaderFunction } from 'react-router-dom';
import { getTrendActivity, getNewActivity } from 'api/activity';

export const loader: LoaderFunction = async () => {
  const trendActivityRes = await getTrendActivity({ currentSegment: 4, countSegment: 1 });
  const newestActivityRes = await getNewActivity({ currentSegment: 4, countSegment: 1 });
  return ({
    trendActivityResData: trendActivityRes,
    newestActivityResData: newestActivityRes,
  });
};
