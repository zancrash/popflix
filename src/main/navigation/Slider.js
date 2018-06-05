// Slider.js

import React from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import './Slider.css';

// This component will recieve the onChange method and the 'data' object from the Navigation component

class Slider extends React.Component {
    // onChange will be called whenever the value (range) of the slider changes
    onChange = range => {
        this.props.onChange({
            type: this.props.data.label,
            value: range //this method will recieve a value with minimium and maximum values whenever the slider changes
        });
    }

    render() {
        // deconstructing the 'data' object to get the values required by the InputRange component:
        const {min, max, step, value, label} = this.props.data;
        return (
            <div className="slider">
                <label>{label}</label>
                <InputRange
                    minValue={min}
                    maxValue={max}
                    step={step}
                    onChange={this.onChange}
                    value={value}
                />
            </div>
        )
    }
}

export default Slider;