import { useEffect, useState } from "react";

export default function PositionComponent() {
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState([0, 0]);

    useEffect(() => {
        navigator.geolocation.watchPosition(position => {
            //console.log(position);
            setPosition(position.coords.latitude, position.coords.longitude)
        })
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <p>My position is {position}</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}