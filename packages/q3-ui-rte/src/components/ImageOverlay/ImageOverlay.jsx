import React from 'react';
import Quill from 'quill';
import { Box, Hidden } from '@material-ui/core';
import { get, isFunction } from 'lodash';
import useStyle from '../useStyle';
import MediaAttributes from '../MediaAttributes';
import MediaResizeHandler from '../MediaResizeHandler';

const ImageOverlay = React.forwardRef((props, ref) => {
  const classes = useStyle();
  const [styles, setStyles] = React.useState({
    display: 'none',
  });

  const img = React.useRef();

  const calculateStyles = () => {
    const parent = ref.current.root.parentNode;
    const parentRect = parent.getBoundingClientRect();
    const imgRect = img.current.getBoundingClientRect();

    if (imgRect.width === 0 && imgRect.height === 0) {
      setStyles({
        display: 'none',
      });
    } else {
      setStyles({
        left:
          imgRect.left -
          parentRect.left -
          1 +
          parent.scrollLeft,
        top:
          imgRect.top - parentRect.top + parent.scrollTop,
        width: imgRect.width,
        height: imgRect.height,
      });
    }
  };

  const handleClick = (e) => {
    const Parchment = Quill.import('parchment');
    const ImageBlot = Quill.import('formats/image');
    const el = Parchment.find(e.target);

    if (el instanceof ImageBlot) {
      ref.current.setSelection(
        el.offset(ref.current.scroll),
        1,
        'user',
      );

      img.current = el.domNode;

      const observer = new MutationObserver(
        calculateStyles,
      );
      const resizeObserver = new ResizeObserver(
        calculateStyles,
      );

      if (img.current) {
        resizeObserver.observe(img.current);
        observer.observe(img.current, {
          attributes: true,
        });

        observer.observe(img.current.parentNode, {
          childList: true,
          subtree: true,
        });
      }

      calculateStyles();
    } else {
      setStyles({
        display: 'none',
      });
    }
  };

  React.useEffect(() => {
    if (
      !isFunction(get(ref, 'current.root.addEventListener'))
    )
      return undefined;

    ref.current.root.addEventListener(
      'click',
      handleClick,
      true,
    );
  }, []);

  return (
    <Hidden smDown>
      <Box className={classes.overlay} style={styles}>
        <MediaAttributes ref={img} />
        {['ne', 'se', 'sw', 'nw'].map((coordinate) => (
          <MediaResizeHandler
            key={coordinate}
            coordinate={coordinate}
            ref={img}
          />
        ))}
      </Box>
    </Hidden>
  );
});

export default ImageOverlay;

/** *


    return () => {
      if (ref?.current?.root)
        ref.current.root.removeEventListener(
          'click',
          handleClick,
        );

      if (img.current) {
        observer.disconnect();
        resizeObserver.unobserve(img.current);
      }
    };
 */
