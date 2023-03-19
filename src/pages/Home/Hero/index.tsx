import React from 'react';
import Button from 'components/Button';
import { ReactComponent as Earth } from './components/Earth.svg';
import { ReactComponent as Planet } from './components/Planet.svg';
import { ReactComponent as Rocket1 } from './components/Rocket1.svg';
import './index.scss';
import Counter from './components/Counter';
import { ReactComponent as StarRing } from './components/StarRing.svg';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__header">
        <h1>Activer 活動者</h1>
        <h3 className="hero__h3">
          在這屬於
          <mark className="hero__h3--highlight">學生的社群中</mark>
          <br />
          尋找屬於你的活動

        </h3>
        <Button text="立即搜尋活動" color="secondary" />
        <div className="hero__count">
          <div className="hero__count__item">
            <h4>活動總數</h4>
            <Counter from={0} to={100} />
          </div>
          <div className="hero__count__item">
            <h4>爬蟲網站總數</h4>
            <Counter from={0} to={20} />
          </div>
          <div className="hero__count__item">
            <h4>總計瀏覽數</h4>
            <Counter from={0} to={20000} />
          </div>
        </div>
        <StarRing className="hero__star-ring" />
      </div>

      <div className="hero__resource">
        <h2 className="hero__resource__title">活動來源</h2>
        <div className="hero__resource__items">
          <div className="hero__resource__item">
            <img src="https://www.nlpi.edu.tw/images/header-logo.svg" alt="國立公共資訊圖書館" />
          </div>
        </div>
      </div>
      <div
        className="hero__item hero__item__earth"

      >
        <Earth />

      </div>
      <div className="hero__item hero__item__planet"><Planet /></div>
      <div className="hero__item hero__item__rocket"><Rocket1 /></div>
    </section>
  );
}

export default Hero;
