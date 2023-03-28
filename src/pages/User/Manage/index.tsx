import Card from 'components/Card';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useGetManageActivityQuery } from 'store/auth/authService';
import Loading from 'components/Loading';
import './index.scss';

function Manage() {
  const { data, isLoading } = useGetManageActivityQuery();
  const { type } = useParams();

  return (
    <div className="manage">
      <h1 className="manage__header">活動管理</h1>
      <div className="manage__control">
        <NavLink to="/user/manage/全部" className="manage__control-link" replace>全部</NavLink>
        <NavLink to="/user/manage/願望" className="manage__control-link" replace>願望</NavLink>
        <NavLink to="/user/manage/已註冊" className="manage__control-link" replace>已註冊</NavLink>
      </div>
      {isLoading && <Loading />}
      <h2>{type}</h2>
      {data && data.map((activity) => (
        <Card
          id={`manage-activity-${activity.id}`}
          title={activity.title}
          imgUrl={activity.images ? activity.images[0] : '/DefaultActivityImage.svg'}
          altText={activity.title}
        />
      ))}
    </div>
  );
}

export default Manage;
