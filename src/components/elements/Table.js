import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useFlexLayout, useResizeColumns } from 'react-table';
import INDEXX from './INDEXX.json'
import { Button, Table as Tab } from 'reactstrap';
import _ from "lodash";
import './Table.css'

function Table({ col }) {
    const columns = React.useMemo(
        () => col, []
    )
    const data = useMemo(
        () => INDEXX, []
    )
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 50,
            width: 250
        }),
        []
    );

    const [visib, setVisib] = useState(true);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({ columns, data, initialState: { pageIndex: 0 }, defaultColumn },
        useSortBy,
        usePagination,
        useFlexLayout,
        useResizeColumns
    )

    return (
        <div className='m-auto' >
            <Tab {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {_.map(headerGroups,headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {_.map(headerGroup.headers,column => {
                                return (
                                    <div
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        <strong>{column.render('Header')}</strong>
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' ▼'
                                                    : ' ▲'
                                                : ''}
                                        </span>
                                    </div>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {_.map(page,row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {_.map(row.cells,cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Tab>
            {visib ?
                (<div className="pagination">
                    <Button onClick={() => setVisib(!visib)}>Hide</Button>
                    <div className='text-center m-auto'>
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'◄◄'}
                        </Button>{' '}
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'◄'}
                        </Button>{' '}

                        <span>
                            <strong>
                                {pageIndex + 1}/{pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                        </span>{' '}
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => nextPage()} disabled={!canNextPage}>
                            {'►'}
                        </Button>{' '}
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'►►'}
                        </Button>{' '}
                    </div>
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {_.map([10, 20, 30, 40, 50],pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>)
                : 
               ( <div>
                   <Button onClick={() => setVisib(!visib)}>Show</Button>
                </div>)
            }



        </div>

    )
}
export default Table
