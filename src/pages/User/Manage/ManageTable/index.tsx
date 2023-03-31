import React from 'react';
import { ActivityDataType } from 'types/data';
import {
  createColumnHelper, getCoreRowModel, useReactTable, flexRender,
} from '@tanstack/react-table';
import './index.scss';
import Button from 'components/Button';
import { BiNavigation } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineCloseCircle } from 'react-icons/ai';

interface ManageTableType {
  activities: ActivityDataType[]
}

/* eslint-disable react/no-unstable-nested-components */
function ManageTable({ activities } :ManageTableType) {
  const columnHelper = createColumnHelper<ActivityDataType>();
  const defaultColumn = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('subTitle', {
      header: 'Subtitle',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'action',
      cell: () => (
        <>
          <Button
            color="white"
            iconAfter={<BiNavigation />}
            variant={{ round: true }}
          />
          <Button
            color="white"
            iconAfter={<AiOutlineEdit />}
            variant={{ round: true }}
          />
          <Button
            color="white"
            iconAfter={<AiOutlineCloseCircle />}
            variant={{ round: true }}
          />
        </>
      ),

    }),
  ];
  const table = useReactTable({
    data: activities,
    columns: defaultColumn,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="manage-table">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTable;
/* eslint-enable react/no-unstable-nested-components */
