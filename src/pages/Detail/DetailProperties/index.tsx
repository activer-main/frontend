import React from 'react';
import './index.scss';
import { BranchDataType } from 'types/data';

interface DetailPropertyType {
  branch: BranchDataType
}

function DetailProperty({ branch }: DetailPropertyType) {
  const {
    dateStart,
    dateEnd,
    applyStart,
    applyEnd,
    applyFee,
    location,
  } = branch;

  return (
    <div className="detail-properties">
      {/* 活動日期 */}
      <div className="detail-properties__date detail-properties__item">
        <h4 className="detail-properties__title">活動日期</h4>

        <div className="detail-properties__content">
          {(dateStart && dateEnd)
            ? `${Object.keys(dateStart)[0]
            + Object.values(dateStart)[0]
            } ~ ${
              dateEnd[0]}`
            : '請查看原始連結'}

        </div>
      </div>

      {/* 報名日期 */}
      <div className="detail-properties__apply detail-properties__item">
        <h4 className="detail-properties__title">報名日期</h4>
        <div className="detail-properties__content">
          {(applyStart && applyEnd) ? `${applyStart[0]} ~ ${applyEnd[0]}` : '請查看原始連結'}
        </div>
      </div>
      {/* 報名費 */}
      <div className="detail-properties__fee detail-properties__item">
        <h4 className="detail-properties__title">報名費</h4>
        <div className="detail-properties__content">
          {(applyFee) || '請查看原始連結'}
        </div>
      </div>
      {/* 地點 */}
      <div className="detail-properties__location detail-properties__item">
        <h4 className="detail-properties__title">活動地點</h4>
        <div className="detail-properties__content">
          {(location) ? location[0] : '請查看原始連結'}
        </div>
      </div>

    </div>
  );
}

export default DetailProperty;
