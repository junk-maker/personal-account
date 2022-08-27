import React, {memo}from 'react';

interface FrameProps {
    children: React.ReactNode;
};

const Frame = memo(({children}: FrameProps) => <div className={'frame'}>{children}</div>);

export default Frame;