import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';
import { visuallyHidden } from '@mui/utils';
import AddItemDialog from '@/Items/dialog/AddItemDialog';
import UpdateItemDialog from '@/Items/dialog/UpdateItemDialog';
import DeleteConfirmDialog from '@/Items/dialog/DeleteConfirmDialog';

import useDynamicQuery from "@/hooks/useDynamicQuery";
import { showItems } from '@/Items/api/getItems';
import { FetchItemData } from '@/Items/types/index';
import useDeleteItem from '@/Items/hooks/use-deleteItem';

type Data = FetchItemData;


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    
    // Handle undefined/null values
    if (bValue == null && aValue == null) return 0;
    if (bValue == null) return -1;
    if (aValue == null) return 1;
    
    if (bValue < aValue) {
        return -1;
    }
    if (bValue > aValue) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: any, b: any) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'item',
        numeric: false,
        disablePadding: true,
        label: 'Item Prize',
    },
    {
        id: 'remaining',
        numeric: true,
        disablePadding: false,
        label: 'Remaining',
    },
    {
        id: 'reedem',
        numeric: true,
        disablePadding: false,
        label: 'Redeemed',
    },
    // {
    //     id: 'status',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Status',
    // },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* Select all checkbox removed - only individual row checkboxes */}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="center">Icon</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Actions</TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    onAdd?: () => void;
    onDelete?: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, onAdd, onDelete } = props;

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <>
                    {/* <Tooltip title="Edit">
                        <IconButton onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Add Item">
                        <IconButton onClick={onAdd}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('item');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = useState<FetchItemData | null>(null);

    const { deleteItemMutation, isPendingDelete } = useDeleteItem();

    // Fetch items
    const {
        data: items_data,
        isPending: isPending_items,
        isError: isError_items,
    } = useDynamicQuery( 
        ['Fetchitems'],
        showItems 
    );

    // Use fetched data or fallback to empty array
    const rows = items_data || [];

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (_event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = () => {
        if (selected.length > 0) {
            setDeleteDialogOpen(true);
        }
    };

    const handleConfirmDelete = () => {
        selected.forEach(id => {
            deleteItemMutation(id);
        });
        setSelected([]);
        setDeleteDialogOpen(false);
    };

    const handleAdd = () => {
        setDialogOpen(true);
    };

    const handleEditClick = (item: FetchItemData) => {
        setSelectedItem(item);
        setUpdateDialogOpen(true);
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows],
    );

    if (isPending_items) {
        return <Box sx={{ p: 3, textAlign: 'center' }}>Loading...</Box>;
    }

    if (isError_items) {
        return <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>Error loading items</Box>;
    }

    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: 1400, 
            margin: '0 auto', 
            padding: { xs: 2, sm: 3, md: 4 },
            mt: 3
        }}>
            <Paper sx={{ 
                width: '100%', 
                mb: 2,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                borderRadius: 2,
                overflow: 'hidden'
            }}>
                <EnhancedTableToolbar 
                    numSelected={selected.length} 
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.item}
                                        </TableCell>
                                        <TableCell align="right">{row.remaining}</TableCell>
                                        <TableCell align="right">{row.reedem}</TableCell>
                                        {/* <TableCell align="left">{row.status}</TableCell> */}
                                        <TableCell align="center">
                                            {row.icon ? (
                                                <i className={`bx ${row.icon}`} style={{ fontSize: '24px', color: '#000000ff' }} />
                                            ) : (
                                                <span style={{ color: '#999', fontSize: '12px' }}>No Icon</span>
                                            )}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Avatar
                                                src={row.image ? `${window.location.origin}/storage/${row.image}` : undefined}
                                                alt={row.item}
                                                sx={{ width: 40, height: 40, margin: 'auto' }}
                                            >
                                                {!row.image && <ImageIcon />}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton size="small" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditClick(row);
                                                }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <AddItemDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                itemCount={selected.length}
                isLoading={isPendingDelete}
            />

            <UpdateItemDialog 
                open={updateDialogOpen}
                onClose={() => {
                    setUpdateDialogOpen(false);
                    setSelectedItem(null);
                }}
                itemData={selectedItem}
            />
        </Box>
    );
}
