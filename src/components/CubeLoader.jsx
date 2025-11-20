"use client";

const faces = [0, 1, 2, 3];

const CubeLoader = () => (
    <div className="cube-loader" role="status" aria-live="polite">
        <div className="cube-top" />
        <div className="cube-wrapper">
            {faces.map((i) => (
                <span key={i} style={{ "--i": i }} className="cube-span" />
            ))}
        </div>
    </div>
);

export default CubeLoader;