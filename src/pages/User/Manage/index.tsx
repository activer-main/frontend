import Card from 'components/Card';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetManageActivityQuery } from 'store/auth/authService';
import './index.scss';

function Manage() {
  const { data, isLoading } = useGetManageActivityQuery();

  return (
    <div className="manage">
      <h1 className="manage__header">活動管理</h1>
      <div className="manage__control">
        <NavLink to="?type=全部" className="manage__control-link" caseSensitive>全部</NavLink>
        <NavLink to="?type=願望" className="manage__control-link" caseSensitive>願望</NavLink>
        <NavLink to="?type=已註冊" className="manage__control-link" caseSensitive>已註冊</NavLink>
      </div>
      {isLoading && <h1>loading</h1>}
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
