import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGetManageActivityQuery } from 'store/auth/authService';
import Loading from 'components/Loading';
import './index.scss';
import ManageTable from './ManageTable';

function Manage() {
  const { data, isLoading } = useGetManageActivityQuery();

  return (
    <div className="manage">
      <h1 className="manage__header">活動管理</h1>
      <div className="manage__control">
        <NavLink to="/user/manage/" className="manage__control-link" replace>全部</NavLink>
        <NavLink to="/user/manage/願望" className="manage__control-link" replace>願望</NavLink>
        <NavLink to="/user/manage/已註冊" className="manage__control-link" replace>已註冊</NavLink>
      </div>

      {data
      && <ManageTable activities={data} />}
      {isLoading && <Loading />}
    </div>
  );
}

export default Manage;
