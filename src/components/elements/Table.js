import React, { useState,  useMemo } from 'react';
import { useTable, usePagination, useSortBy, useFlexLayout, useResizeColumns } from 'react-table';
import DATA from './DATA.json'
import { Button, Table as Tab } from 'reactstrap';
import _ from "lodash";
import './Table.css'

function Table({ col }) {
    // Importladığım kütüphanelerden bootstrapi table'ın stili için kullanıyorum lodash'i map için kullanıyorum. 

    // Column bilgilerini App.js den parametre olarak aliyorum bilgileri ise DATA adli json dosyasindan aliyorum
    const columns = React.useMemo(
        () => col, [col]
    )
    const data = useMemo(
        () => DATA, []
    )
    // FlexLayout kullanmak için defaultColumn belirlememiz gerekiyor ben de ekranı 
    // tam kaplayacak şekilde defaultColumn'u ayarladım
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 50,
            width: 250
        }),
        []
    );
    // Pagination componentinin gözüküp gözükmeyeceğini belirleyen state
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
            <Tab {...getTableProps()} style={{ border: 'solid 1px' }}>
                <thead>
                    {_.map(headerGroups,headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {_.map(headerGroup.headers,column => {
                                return (

                                    <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                         {/* getSortByToggleProps fonksiyonu sayesinde columndaki elemanlar sayi ise sayının büyüklüğüne göre
                                         eğer harf ise alfabetik sıraya göre sıralanıyor */}
                                        <strong>{column.render('Header')}</strong>
                                        {/* Table elemanlarinin sıralanıp sıralanmadığını kontrol ediliyor ve ona göre yanına sembol konuluyor */}
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
            {/* Kullandığım visib statei eğer false ise pagination componentini göstermiyor
             ve ne zaman göster veya gizle butonuna basarsak visib statei tam tersi oluyor 
             bu sayede pagination istediğimiz zaman gizleniyor veya gözüküyor. */}
            {visib ?
                (<div className="pagination">
                    <Button onClick={() => setVisib(!visib)}>Hide</Button>
                    <div className='text-center m-auto'>
                        {/* Ekranda gozuken page'i degistiren butonlar page indexini azaltip ya da arttiriyor */}
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'◄◄'}
                        </Button>{' '}
                        <Button className='btn btn-dark btn-circle btn-md' onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'◄'}
                        </Button>{' '}
                        {/* Hangi pagede oldugumuz yaziliyor */}
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
                    {/* Alttatki select componenti tablein bir sayfasinda kac tane row gozukecegini belirliyor istedigimiz zaman degistirebiliyoruz */}
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
                   {/* Pagination componentini acmak icin kullanilan buton */}
                   <Button onClick={() => setVisib(!visib)}>Show</Button>
                </div>)
            }



        </div>

    )
}
export default Table
