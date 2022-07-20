import React from 'react';
import { useDragDropManager } from 'react-dnd';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const DragHandlerPreview = () => {
  const ref = React.useRef();
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();
  const cls = useStyle();
  const { t } = useTranslation('labels');

  React.useEffect(
    () =>
      monitor.subscribeToOffsetChange(() => {
        const offset = monitor.getClientOffset();
        const setDragging = (newDragValue) =>
          ref.current.setAttribute(
            'data-dragging',
            newDragValue,
          );

        try {
          if (monitor.isDragging() && ref?.current?.style) {
            const { x, y } = offset;

            setDragging(true);
            ref.current.style.left = `${x + 5}px`;
            ref.current.style.top = `${y + 5}px`;
          } else {
            setDragging(false);
          }
        } catch (e) {
          setDragging(false);
        }
      }),
    [monitor],
  );

  return (
    <div className={cls.preview} ref={ref}>
      <Paper elevation={5}>
        <Box
          alignItems="center"
          display="flex"
          justfyContent="center"
          p={1}
        >
          <FileCopyIcon />
          <Box ml={0.5}>
            <Typography>
              {t('dropFileToMoveOrUpload')}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default React.memo(DragHandlerPreview);
