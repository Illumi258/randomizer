import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Paper,
} from '@mui/material';

import ReusableTableToolbar from '@/Components/ReusableComponents/Table/ReusableToolBar';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  title: string;
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => number;

  selected: number[];
  onSelect: (id: number) => void;

  onAdd?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onImport?: () => void;

  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export function ReusableTable<T>({
  title,
  rows,
  columns,
  getRowId,
  selected,
  onSelect,
  onAdd,
  onDelete,
  onExport,
  onImport,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props<T>) {
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <ReusableTableToolbar
        title={title}
        numSelected={selected.length}
        onAdd={onAdd}
        onDelete={onDelete}
        onExport={onExport}
        onImport={onImport}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {columns.map(col => (
                <TableCell key={String(col.id)} align={col.align || 'left'}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.map(row => {
              const id = getRowId(row);
              const isSelected = selected.includes(id);

              return (
                <TableRow
                  key={id}
                  hover
                  selected={isSelected}
                  onClick={() => onSelect(id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isSelected} />
                  </TableCell>

                  {columns.map(col => (
                    <TableCell key={String(col.id)} align={col.align || 'left'}>
                      {col.render
                        ? col.render(row)
                        : (row as any)[col.id]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={e =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
      />
    </Paper>
  );
}
