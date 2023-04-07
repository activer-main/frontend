import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link className="logo" to="/">
      <img src="/icon192.png" alt="activer-header-logo" width={64} />
    </Link>
  );
}

export default Logo;
