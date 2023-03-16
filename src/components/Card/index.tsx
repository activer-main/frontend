// components/Card/Default
import React from 'react';
import Tag, { TagType } from 'components/Tag';
import './index.scss';

export interface CardType {
  id: string;
  imgUrl: string,
  title: string,
  altText: string,
  tags?: Array<TagType>,
  detail?: string | null,
  control? : React.ReactNode;
}

function CardDefault({
  id, imgUrl, title, tags, altText, detail, control,
}: CardType) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={encodeURI(imgUrl)} alt={altText} />
      </div>
      <div className="card__content">
        {/* title */}
        <p className="card__title">{title}</p>

        {/* detail */}
        <p className="card__detail">
          {detail}
        </p>

        {/* tags */}
        {tags
        && (
          <div className="card__tags">
            {tags.splice(0, 3).map((tag) => (
              <Tag
                key={`${id}-${tag.id}`}
                type={tag.type}
                text={tag.text}
                icon={tag.icon}
                id={`${id}-${tag.id}`}
                link
              />
            )).slice(0, 5)}
          </div>
        ) }
        {/* Contorls */}
        {control && <div className="card__control">{control}</div>}
      </div>
    </div>

  );
}

CardDefault.defaultProps = {
  detail: null,
  control: null,
  tags: null,
};

export default CardDefault;
