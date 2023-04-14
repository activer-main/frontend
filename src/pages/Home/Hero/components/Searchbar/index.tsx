import React from 'react';
import FormInput from 'components/FormInput';
import FormSelect from 'components/FormSelect';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function Searchbar() {
  const navigate = useNavigate();

  return (
    <form className="hero-search">
      <FormInput name="keyword" label="你想要什麼樣的活動?" />
      <FormSelect name="location" label="地點" options={['台北', '嘉義']} />
      <FormInput name="start" label="開始日期" type="date" />
      <FormInput name="end" label="結束日期" type="date" />
      <Button
        className="hero-search__button"
        text="搜尋"
        color="secondary"
      />
      <Button
        className="hero-search__button"
        text="進階搜尋"
        variant={{ outline: true }}
        onClick={() => navigate('/search')}
        color="secondary"
      />
    </form>
  );
}

export default Searchbar;
