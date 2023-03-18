import { TagDataType, ActivityTagDataType } from 'types/data';
import { TagType } from 'components/Tag';

export const parseArrayTagDataToTag = (
  TagData: TagDataType[] | ActivityTagDataType[],
): Array<TagType> => (
  TagData.map((tag: TagDataType) => ({
    id: tag.id.toString(),
    text: tag.text,
    type: tag.type as TagType['type'],
  }))
);
