import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box } from '@mui/material';

interface Props {
  title: string;
  numSelected: number;
  onAdd?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onImport?: () => void;
}

export default function ReusableTableToolbar({
  title,
  numSelected,
  onAdd,
  onDelete,
  onExport,
  onImport,
}: Props) {
  return (
    <Toolbar
      sx={[
        { pl: 2, pr: 1 },
        numSelected > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6">
        {numSelected > 0 ? `${numSelected} selected` : title}
      </Typography>

      {numSelected > 0 ? (
        onDelete && (
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onExport && (
            <Tooltip title="Export CSV">
              <IconButton onClick={onExport}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
          )}
          {onImport && (
            <Tooltip title="Import CSV">
              <IconButton onClick={onImport}>
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
          )}
          {onAdd && (
            <Tooltip title="Add">
              <IconButton onClick={onAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Toolbar>
  );
}
