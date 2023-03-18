import React from 'react';
import { BranchDataType } from 'types/data';
import { AiOutlineEye, AiTwotoneHeart } from 'react-icons/ai';
import Button from 'components/Button';
import './index.scss';

interface MainCardControlType {
  onClickFollow? :React.MouseEventHandler<HTMLButtonElement> | undefined;
  trend: number;
  status?: BranchDataType['status'];
}

function MainCardControl({
  onClickFollow, trend, status
}: MainCardControlType) {
  return (
    <div className="main-card-control">
      <div className="main-card-control__watch">
        <AiOutlineEye />
        {trend}
      </div>
      <Button
        iconBefore={<AiTwotoneHeart />}
        type="button"
        text={status !== '未註冊' ? '取消收藏' : '收藏'}
        onClick={onClickFollow}
        color="white"
        className={`main-card-control__follow${status !== '未註冊' ? '--active' : ''}`}
      />

    </div>
  );
}

export default MainCardControl;
