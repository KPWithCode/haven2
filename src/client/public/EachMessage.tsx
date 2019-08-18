import React, { useState, useEffect } from 'react';
import * as moment from 'moment'
import Message from './Message'

export interface EachMsgProps { }

export interface EachMsg {
    msg: {
        id: number,
        content: string,
        _created: Date,
        userid: number,
        username:string
    },

}



const EachMsg: React.SFC<EachMsg> = props => {


    const { content, _created, id,username } = props.msg
 
    const newDate = moment(_created).format('MMM Do YY, h:mm:ss a')
  
    let userLetter = username.split('')[0]

    if (id % 2 == 2) {
        return (
            <div style={{ color: '#3A5D58', width: '85%' }} className=" d-flex justify-content-start my-1">
                <div className="d-flex display-inline">
                    <small style={{fontSize:'2px'}}>{userLetter}</small>
                    <span className="badge badge-pill badge-info p-3">{content}</span>
                    <span style={{ fontSize: '9px' }} className="badge badge-pill badge-info p-3 ">{newDate}</span>
                </div>
                <hr style={{ borderWidth: '2px' }} />
            </div>
        )
    } else {
        return (
            <div style={{ color: '#3A5D58', width: '85%' }} className=" d-flex justify-content-end my-1">
                <div className="d-flex display-inline">
                    <span className="badge badge-pill badge-info p-3">{content}</span>
                    <span style={{ fontSize: '9px' }} className="badge badge-pill badge-info p-3 ">{newDate}</span>
                </div>
                <hr style={{ borderWidth: '2px' }} />
            </div>
        )
    }


}

export default EachMsg