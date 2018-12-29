import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, object, select } from '@storybook/addon-knobs';

import LookingGlass from '../src/LookingGlass';
import waves from './static/kevin-lanceplaine-243768-unsplash.jpg';
import lake from './static/riccardo-chiarini-365677-unsplash.jpg';
import ocean from './static/shifaaz-shamoon-1113388-unsplash.jpg';
import pattern from './static/vanessa-ives-559179-unsplash.jpg';
import patternSmall from './static/vanessa-ives-559179-unsplash_small.jpg';


const stories = storiesOf('LookingGlass', module);
stories.addDecorator(withKnobs);

const StoryBase = props =>
    <div
        style={{
            width: 600,
            height: 600,
            maxWidth: '90%',
            maxHeight: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
    >
        { props.children }
    </div>;

stories.add('Basic Example', () => (
    <StoryBase>
        <LookingGlass src={lake} zoomFactor={4} hideCursor={false} />
    </StoryBase>
));


stories.add('Offset Cursor Example', () => (
    <StoryBase>
        <LookingGlass src={lake} zoomFactor={4} cursorOffset={{ x: -75, y: -75 }} hideCursor={false} />
    </StoryBase>
));


stories.add('Scrolling Example', () => (
    <StoryBase>
        <LookingGlass src={ocean} zoomFactor={4} />
    </StoryBase>
));

stories.add('zoomSrc Example', () => (
    <StoryBase>
        <LookingGlass src={patternSmall} zoomFactor={4} zoomSrc={pattern} />
        <p>zoomSrc is an image with 8x the resolution of the base image</p>
    </StoryBase>
));


class ChangeZoomExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zoom: 3
        };
    }

    render() {
        let { zoom } = this.state;

        return (
            <React.Fragment>
                <LookingGlass src={waves} zoomFactor={zoom} />
                <button onClick={() => this.setState(prevState => ({ zoom: prevState.zoom - 0.5 }))}>Decrease Zoom</button>
                <p>Current Zoom: {zoom}</p>
                <button onClick={() => this.setState(prevState => ({ zoom: prevState.zoom + 0.5 }))}>Increase Zoom</button>
            </React.Fragment>
        );
    }
}

stories.add('Change Zoom', () => (
    <StoryBase>
        <ChangeZoomExample />
    </StoryBase>
));

// Knobs as dynamic variables.
stories.add('With Dynamic Props', () => {
    const size = number('size', 200);

    const zoom = number('zoomFactor', 3);

    const offset = object('cursorOffset', {
        x: 0,
        y: 0
    });

    const image = select('Image', {
        Waves: waves,
        Lake: lake,
        Ocean: ocean
    }, lake);

    const linked = boolean('scrollLinked', true);

    const hideCursor = boolean('hideCursor', true);

    return (
        <StoryBase>
            <LookingGlass src={image} zoomFactor={zoom} size={size} cursorOffset={offset} scrollLinked={linked} hideCursor={hideCursor} />
            <p>(View the Knobs Tab)</p>
        </StoryBase>
    );
});
