import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { homeLoaderType } from 'types/loader';

function Home() {
  const loaderData = useLoaderData() as homeLoaderType;

  return (
    <div className="home">
      <h1>Home</h1>
      <p>{loaderData.toString()}</p>
    </div>
  );
}

export default Home;
