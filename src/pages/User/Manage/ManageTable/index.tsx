import React from 'react';
import { BiNavigation, BiTrash } from 'react-icons/bi';
import { ActivityDataType } from 'types/data';
import Button from 'components/Button';
import './index.scss';

interface ManageTableType {
  activities: ActivityDataType[];
}

function ManageTable({ activities }: ManageTableType) {
  return (
    <div className="manage-table">
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>活動日期</th>
            <th>狀態</th>
            <th>控制</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr>
              <td>{activity.title}</td>
              <td>2023/10/01</td>
              <td className="manage-table__select">
                <select>
                  <option value="願望">願望</option>
                  <option value="已註冊">已註冊</option>
                  <option value="已完成">已完成</option>
                </select>
                <span className="manage-table__select__arrow" />
              </td>
              <td className="manage-table__control">
                <td>
                  <Button
                    iconAfter={<BiNavigation />}
                    variant={{ round: true }}
                    color="transparent"
                  />
                </td>
                <td>
                  <Button
                    iconAfter={<BiTrash />}
                    variant={{ round: true }}
                    color="transparent"
                  />
                </td>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ManageTable;
