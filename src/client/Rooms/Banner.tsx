import React from 'react';







export default function Banner() {




    return (
        <div className="d-flex justify-content-center">
            <div className=" border-success rounded" style={{ backgroundColor: '#FF8723', width: '70%', height: '100px' }}>

                <div className="d-flex justify-content-center">Choose A Room</div>
                
                <hr />
                <div className="d-flex justify-content-center">
                    <a style={{color:'#3A5D58'}} href=""> MainRoom</a>
                    <a style={{color:'#3A5D58'}} className="ml-5" href=""> BioTech</a>
                    <a style={{color:'#3A5D58'}} className="ml-5" href=""> Climate</a>
                    <a style={{color:'#3A5D58'}} className="ml-5" href=""> AgriBusiness</a>
                </div>
            </div>
        </div>
    )


}