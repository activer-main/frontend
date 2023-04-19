import React, { useState } from 'react';
import Loading from 'components/Loading';
import { useGetActivityQuery } from 'store/activity/activityService';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ImageSlide from 'components/ImageSlide';
import { ActivityTagDataType } from 'types/data';
import Tag, { TagType } from 'components/Tag';
import { Buffer } from 'buffer';
import './index.scss';
import {
  FcGraduationCap, FcList, FcPhone, FcReading, FcShare,
} from 'react-icons/fc';
import DetailProperties from './DetailProperties';

function Detail() {
  const { id = '1' } = useParams();
  const { data, isFetching, isError } = useGetActivityQuery(id as string);
  const navigate = useNavigate();
  const [currentBranchId, setCurrentBranchId] = useState<number>(0);

  if (isFetching) {
    return <Loading />;
  }

  if (isError || !data) {
    toast.error('載入發生錯誤');
    return <div className="error" />;
  }

  const {
    images,
    title,
    subTitle,
    tags,
    objective,
    connection,
    sources,
    content,
    holder,
    branches,
  } = data;

  return (
    <div className="detail" id="detail">
      {/* Introduction */}
      <div className="detail__hero">

        <div className="detail__hero-left">

          {/* Image */}
          <ImageSlide
            images={images}
            altText={title}
          />

          {/* Title */}
          <h2 className="detail__title">{title}</h2>

          {/* SubTitle */}
          {subTitle && (
            <h3>{subTitle}</h3>
          )}
          {/* Tags */}
          {tags && (
            <div className="detail__tags">
              {tags.map((tag: ActivityTagDataType) => {
                const variant = tag.type as TagType['type'];
                return (
                  <Tag
                    id={`detail-tag-${tag.id!.toString()}`}
                    key={`detail-tag-${tag.id!.toString()}`}
                    text={tag.text}
                    type={variant}
                  />
                );
              }).slice(0, 5)}
              {/* Add Tag Button */}
              <button
                type="button"
                className="detail__add-tag tag"
                onClick={() => navigate(`/detail/${id}/vote`, {
                  replace: true,
                })}
              >
                + 新增標籤
              </button>
            </div>
          )}

        </div>

        <div className="detail__hero-right">
          {branches.map((branch, index) => (
            <Button
              onClick={() => setCurrentBranchId(index)}
              text={branch.branchName || '一般'}
              color="white"
              variant={{
                underline: currentBranchId === index,
              }}
            />
          ))}
          <DetailProperties branch={branches[currentBranchId]} />

        </div>

      </div>

      {/* main content */}
      <div className="detail__main">

        {/* Object */}
        {objective
          && (
            <div className="detail__objective detail__item">
              <h2 className="detail__header">
                <FcReading />
                活動對象
              </h2>
              <p>{objective}</p>
            </div>
          )}

        {/* Content */}
        <div className="detail__content detail__item">
          <h2 className="detail__header">
            <FcList />
            活動內容
          </h2>
          <div
            className="detail__content__main"
            dangerouslySetInnerHTML={{ __html: Buffer.from(content, 'base64').toString('utf-8') }}
          />
        </div>

        {/* Sources */}
        {sources && sources.length !== 0 && (
          <div className="detail__source detail__item">
            <h2 className="detail__header">
              <FcShare />
              原始來源
            </h2>
            {sources.map((source: string, index: number) => (
              <a
                href={source}
                target="_blank"
                className="detail__a"
                key={`detail__source-${index}`}
                rel="noreferrer"
              >
                {source}
              </a>
            ))}
          </div>
        )}

        {/* Connection */}
        {connection && connection.length !== 0 && (
          <div className="detail__connection detail__item">
            <h2 className="detail__header">
              <FcPhone />
              聯絡資訊
            </h2>
            {connection.map((item: string, index: number) => (
              <p key={`detail-connection-${index}`}>
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Holder */}
        {holder && holder.length !== 0 && (
          <div className="detail__holder detail__item">
            <h2 className="detail__header">
              <FcGraduationCap />
              主辦單位
            </h2>
            {holder.map((item: string, index: number) => (
              <p key={`detail-holder-${index}`}>
                {item}
              </p>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Detail;
