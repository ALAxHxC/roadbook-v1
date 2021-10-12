import React from 'react';
import { ReactPainter } from 'react-painter';

export default function Painter() { 
    return (
        <React.Fragment>
            <ReactPainter
                render={({ canvas, triggerSave, setColor }) => (
                    <div>
                        <div>Awesome heading</div>
                        <input type="color" onChange={e => setColor(e.target.value)} />
                        <div className="awesomeContainer">{canvas}</div>
                        <button onClick={triggerSave}>Save</button>
                    </div>
                )}
            />
        </React.Fragment>);
}