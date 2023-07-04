import React from 'react';

export default function Instructions() {
    const [showPopup, setShowPopup] = React.useState(false);

    const onShowPopup = () => {
        setShowPopup(true);
    };

    const onHidePopup = () => {
        setShowPopup(false);
    };

    const Popup = (): JSX.Element => {
        return (<div>
            <div className="fixed inset-0 z-50 flex h-fit w-fit items-center justify-center lg:h-full lg:w-full">
                <div className="relative mx-auto my-6 flex flex-col rounded-lg bg-white">
                    <div className="flex pb-3 pl-3 pt-4 font-display text-2xl text-black lg:pl-9 lg:pt-10 lg:text-3xl">
                        Instructions
                    </div>
                    <div className="flex pb-3 pl-3 pt-4 font-display text-2xl text-black lg:px-9 lg:py-10 lg:text-xl">
                        <ul>
                            <li>• Move the block by using your mouse/finger to click and drag the block. </li>
                            <li>• You can also move a block by clicking on the block and using your arrow keys or WASD keys.</li>
                            <li>• Try to get the red block to the green exit square to win!</li>
                        </ul>

                    </div>
                    <button className="m-3 rounded-md bg-[#5BC0EB] p-3 font-display text-black" onClick={onHidePopup}> Let&apos;s Play!</button>
                </div>
            </div>
        </div >)
    }

    return (
        <div>
            <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="bg-[#B08E8B] p-3 font-display text-white" onClick={onShowPopup} >How To Play</button>
            {showPopup ? <Popup /> : null}
        </div>

    )
}