import React from 'react';
import PropTypes from 'prop-types';

import Magnifier from "./Magnifier";


class LookingGlass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursorPosition: {
                x: 0,
                y: 0
            },
            imageOffset: {
                x: 0,
                y: 0
            },
            mouseE: {
                clientX: 0,
                clientY: 0,
                pageX: 0,
                pageY: 0
            },
            hover: false,
            opacity: 0
        };

        this.imageRef = React.createRef();

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    onMouseEnter() {
        this.setState({
            hover: true
        });
    }

    onMouseLeave() {
        this.setState({
            hover: false
        });
    }

    onMove(e) {
        let cRect = this.imageRef.current.getBoundingClientRect();

        let mouseE = this.state.mouseE;
        if (e.hasOwnProperty("clientX") && e.hasOwnProperty("pageX")) {
            mouseE = {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY
            };
        }

        this.setState({
            cursorPosition: {
                x: mouseE.clientX + window.scrollX,
                y: mouseE.clientY + window.scrollY
            },
            imageOffset: {
                x: mouseE.pageX - cRect.left - window.pageXOffset,
                y: mouseE.pageY - cRect.top - window.pageYOffset
            },
            mouseE
        });
    }

    render() {
        let { url, displayZoomOne, zoomFactor, scrollLinked, ...restProps } = this.props;
        let { hover, ...restState } = this.state;

        return (
            <div
                onScroll={scrollLinked ? this.onMove : undefined}
                style={{
                    width: "100%",
                    height: "100%",
                    overflowY: "auto"
                }}
            >
                <img
                    src={url}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onMouseMove={this.onMove}
                    ref={this.imageRef}
                    style={{
                        width: "100%",
                        height: "auto"
                    }}
                />

                {
                    (hover && zoomFactor >= 1 && (displayZoomOne || zoomFactor !== 1)) &&
                        <Magnifier
                            imageRef={this.imageRef}
                            zoomFactor={zoomFactor}
                            {...restState}
                            {...restProps}
                        />
                }
            </div>
        );
    }
}

LookingGlass.defaultProps = {
    size: 200,
    cursorOffset: { x: 0, y: 0 },
    alt: "",
    displayZoomOne: false,
    scrollLinked: true
};

LookingGlass.propTypes = {
    // the size of the magnifier window
    size: PropTypes.number,

    // the offset of the zoom bubble from the cursor
    cursorOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),

    // the factor to zoom by
    zoomFactor: PropTypes.number.isRequired,

    // large image url
    url: PropTypes.string.isRequired,

    // an optional higher resolution photo for the magnifier
    zoomUrl: PropTypes.string,

    // will hide the magnifier when equal to zoom if equal to 1 if enabled
    displayZoomOne: PropTypes.bool,

    // will update the magnifier when the container scrolls, but this might break on some browsers
    scrollLinked: PropTypes.bool
};

export default LookingGlass;
