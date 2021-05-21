import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import SurveyTableCSS from './../../styles/surveyTable.module.css';
import StarUnchecked from './../../assets/images/star_unchecked.svg';
import StarChecked from './../../assets/images/star_checked.svg';
import BlueArrowDown from './../../assets/images/dropdown-arrow-blue.svg';
import TrashCan from './../../assets/images/trash.svg';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

const DELETE_SURVEY = gql`
  mutation deleteSurvey($survId: ID!) {
    deleteSurvey(id: $survId) {
      _id
      name
    }
  }
`;

const SurveyTable = ({
  dataToDisplay,
  showStar,
  addSurveyToFav,
  removeSurveyFromFav,
  noDataText,
  refetchData,
}) => {
  let history = useHistory();
  const [emptyList, setEmptyList] = useState();
  const [deleteSurvey] = useMutation(DELETE_SURVEY);

  useEffect(() => {
    if (dataToDisplay !== null) {
      if (dataToDisplay.length === 0) {
        setEmptyList(true);
      } else {
        setEmptyList(false);
      }
    }
  }, [dataToDisplay]);

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'favorite',
        disableSortBy: true,
        maxWidth: 40,
        minWidth: 20,
      },
      {
        Header: '',
        accessor: 'picture',
        disableSortBy: true,
        maxWidth: 40,
        minWidth: 20,
      },
      {
        Header: 'survey name',
        accessor: 'name',
        maxWidth: 50,
        minWidth: 50,
      },
      {
        Header: 'created',
        accessor: 'created',
        maxWidth: 170,
        minWidth: 170,
      },
      {
        Header: 'description',
        accessor: 'description',
        disableSortBy: true,
        maxWidth: 250,
        minWidth: 250,
      },
      {
        Header: 'target',
        accessor: 'target',
        maxWidth: 50,
        minWidth: 50,
      },
      {
        Header: 'responses',
        accessor: 'responses',
        maxWidth: 50,
        minWidth: 20,
      },
      {
        Header: 'status',
        accessor: 'status',
        disableSortBy: true,
        maxWidth: 50,
        minWidth: 50,
      },
    ],
    []
  );

  const surveyTable = useTable(
    {
      columns: columns,
      data: dataToDisplay,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    surveyTable;

  const delSurvey = (id) => {
    deleteSurvey({
      variables: {
        survId: id,
      },
    }).catch((err) => console.error(err));
  };

  const updSurvey = (survey) => {
    history.push('/add-edit-form', {
      _id: survey._id,
      name: survey.name,
      picURL: survey.picURL,
      created: survey.created,
      description: survey.description,
      target: survey.target,
      responses: survey.responses,
      status: survey.status,
      isEditing: true,
    });
  };

  return (
    <table
      cellSpacing="0"
      className={SurveyTableCSS.survey_table}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((hGroup) => (
          <tr {...hGroup.getHeaderGroupProps()}>
            {hGroup.headers.map((column) => (
              <th
                key={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                &nbsp;
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <img
                      className={SurveyTableCSS.switch_direction}
                      width="7"
                      src={BlueArrowDown}
                      alt="White Arrow Down"
                    />
                  ) : (
                    <img
                      height="7"
                      src={BlueArrowDown}
                      alt="White Arrow Down"
                    />
                  )
                ) : (
                  <img
                    className={SurveyTableCSS.hidden}
                    height="7"
                    src={BlueArrowDown}
                    alt="White Arrow Down"
                  />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {!emptyList ? (
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={SurveyTableCSS.data_row}>
                {row.cells.map((cell) => {
                  switch (cell.column.id) {
                    case 'favorite':
                      return (
                        <td key={cell.column.id} {...cell.getCellProps()}>
                          {showStar ? (
                            <img
                              onClick={() => removeSurveyFromFav(cell.row.id)}
                              width="15"
                              src={StarChecked}
                              alt="Checked star"
                            />
                          ) : (
                            <img
                              onClick={() => addSurveyToFav(cell.row.id)}
                              width="15"
                              src={StarUnchecked}
                              alt="Unchecked star"
                            />
                          )}
                        </td>
                      );
                    case 'picture':
                      return (
                        <td key={cell.column.id}>
                          <div className={SurveyTableCSS.picture_wrapper}>
                            <img
                              width="40"
                              src={cell.row.original.picURL}
                              alt=""
                            />
                          </div>
                        </td>
                      );
                    case 'name':
                      return (
                        <td
                          key={cell.column.id}
                          onClick={() => updSurvey(row.original)}
                        >
                          <span>{cell.row.original.name}</span>
                          <br />
                          <span>client-email@buffl.be</span>
                        </td>
                      );
                    case 'status':
                      return (
                        <td
                          key={cell.column.id}
                          onClick={() => updSurvey(row.original)}
                        >
                          {cell.row.original.status ? 'Published' : 'Testing'}
                        </td>
                      );
                    default:
                      return (
                        <td
                          key={cell.column.id}
                          {...cell.getCellProps({
                            style: {
                              maxWidth: cell.column.maxWidth,
                              minWidth: cell.column.minWidth,
                              width: cell.column.width,
                            },
                          })}
                          onClick={() => updSurvey(row.original)}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                  }
                })}
                <td className={SurveyTableCSS.manage_survey}>
                  {/* ... */}
                  <button>...</button>
                  <div
                    className={SurveyTableCSS.trash_can}
                    onClick={() => delSurvey(row.original._id)}
                  >
                    <img src={TrashCan} alt="trash icon" />
                    <span>DELETE</span>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className={SurveyTableCSS.no_data_td} colSpan="8">
              {noDataText}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SurveyTable;
