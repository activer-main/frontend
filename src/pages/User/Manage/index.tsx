import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetManageActivityQuery } from 'store/auth/authService';
import Loading from 'components/Loading';
import './index.scss';
import Button from 'components/Button';
import ManageTable from './ManageTable';

function Manage() {
  const { data, isLoading } = useGetManageActivityQuery();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="manage">
      <h1 className="manage__header">活動管理</h1>
      <div className="manage__control">
        <Button
          onClick={() => navigate('/user/manage', { replace: true })}
          className={`manage__control-link ${pathname === '/user/manage' ? 'active' : ''}`}
          text="全部"
          color="transparent"
        />
        <Button
          onClick={() => navigate('/user/manage/願望', { replace: true })}
          className={`manage__control-link ${pathname === encodeURI('/user/manage/願望') ? 'active' : ''}`}
          text="願望"
          color="transparent"
        />
        <Button
          onClick={() => navigate('/user/manage/已註冊', { replace: true })}
          className={`manage__control-link ${pathname === encodeURI('/user/manage/已註冊') ? 'active' : ''}`}
          text="已註冊"
          color="transparent"
        />
      </div>

      {data
      && <ManageTable activities={data} />}
      {isLoading && <Loading />}
    </div>
  );
}

export default Manage;
