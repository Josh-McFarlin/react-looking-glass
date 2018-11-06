import React from 'react';
import PropTypes from 'prop-types';


class Magnifier extends React.Component {
    render() {
        let { size, cursorPosition, imageOffset, cursorOffset, imageRef, zoomFactor, zoomUrl } = this.props;

        let halfSize = size / 2;
        let bgX = (-zoomFactor * imageOffset.x) + halfSize;
        let bgY = (-zoomFactor * imageOffset.y) + halfSize;

        let imageWidth = imageRef.current.offsetWidth;
        let imageHeight = imageRef.current.offsetHeight;
        let imageSrc = imageRef.current.src;

        return (
            <div style={{
                position: 'absolute',
                display: 'block',
                top: cursorPosition.y,
                left: cursorPosition.x,
                width: size,
                height: size,
                marginLeft: cursorOffset.x - halfSize,
                marginTop: cursorOffset.y - halfSize,
                backgroundColor: 'white',
                borderRadius: "50%",
                boxShadow: `1px 1px 6px rgba(0,0,0,0.3)`,
                pointerEvents: 'none'
            }}>
                <div style={{
                    width: size,
                    height: size,
                    backgroundImage: `url("${zoomUrl != null ? zoomUrl : imageSrc}")`,
                    backgroundSize: `${imageWidth * zoomFactor}px ${imageHeight * zoomFactor}px`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${bgX}px ${bgY}px`,
                    borderRadius: size
                }}/>
            </div>
        );
    }
}

Magnifier.propTypes = {
    // the size of the magnifier window
    size: PropTypes.number.isRequired,

    // the position of the cursor on the screen
    cursorPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,

    // the position of the cursor within the image
    imageOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,

    // the offset of the zoom bubble from the cursor
    cursorOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,

    // the ref to the image object
    imageRef: PropTypes.object.isRequired,

    // the factor to zoom by
    zoomFactor: PropTypes.number.isRequired,

    // an optional high resolution url for the magnifier
    zoomUrl: PropTypes.string
};

export default Magnifier;