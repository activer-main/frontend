import Card from 'components/Card';
import React from 'react';

function Manage() {
  return (
    <div className="manage">
      <div className="manage__header">活動管理</div>
      <div className="manage__control">
        managecontorl
      </div>
      <Card id="test" imgUrl="foo.png" altText="foo" title="Activity" />
    </div>
  );
}

export default Manage;
