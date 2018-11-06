import React from 'react';
import PropTypes from 'prop-types';


class Magnifier extends React.Component {
    render() {
        let { imageRef, zoomFactor, size, cursorOffset, zoomSrc, cursorPosition, imageOffset, squareMagnifier, zoomClassName } = this.props;

        let halfSize = size / 2;
        let bgX = (-zoomFactor * imageOffset.x) + halfSize;
        let bgY = (-zoomFactor * imageOffset.y) + halfSize;

        let imageWidth = imageRef.current.offsetWidth;
        let imageHeight = imageRef.current.offsetHeight;
        let imageSrc = imageRef.current.src;

        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'block',
                    top: cursorPosition.y,
                    left: cursorPosition.x,
                    width: size,
                    height: size,
                    marginLeft: cursorOffset.x - halfSize,
                    marginTop: cursorOffset.y - halfSize,
                    backgroundColor: 'white',
                    borderRadius: !squareMagnifier ? "50%" : undefined,
                    boxShadow: `1px 1px 6px rgba(0,0,0,0.3)`,
                    touchAction: 'none',
                    pointerEvents: 'none'
                }}
                className={zoomClassName}
            >
                <div
                    style={{
                        width: size,
                        height: size,
                        backgroundImage: `url("${zoomSrc != null ? zoomSrc : imageSrc}")`,
                        backgroundSize: `${imageWidth * zoomFactor}px ${imageHeight * zoomFactor}px`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${bgX}px ${bgY}px`,
                        borderRadius: !squareMagnifier ? "50%" : undefined,
                        touchAction: 'none',
                        pointerEvents: 'none'
                    }}
                />
            </div>
        );
    }
}

Magnifier.propTypes = {
    // the ref to the image object
    imageRef: PropTypes.object.isRequired,

    // the factor to zoom by
    zoomFactor: PropTypes.number.isRequired,

    // the size of the magnifier window
    size: PropTypes.number.isRequired,

    // the offset of the zoom bubble from the cursor
    cursorOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,

    // an optional high resolution image for the magnifier
    zoomSrc: PropTypes.string,

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

    // if true will display the magnifier as a square instead of a circle
    squareMagnifier: PropTypes.bool,

    // the name of the class for the magnifying glass
    zoomClassName: PropTypes.string
};

export default Magnifier;
