import React, { useState, useEffect } from 'react';
import Banner from '../Rooms/Banner';
import EachMsg from './EachMessage';
import { User } from '../utils/api'
import io from 'socket.io-client'


export interface IMessageProps { }

export interface IMessage {
    msg: {
        id: number,
        content: string,
        _created: Date,
        userid: number
        username: string
    }[]
    id: number,
    content: string,
    _created: Date,
    userid: number,
    username:string

    
}

// let socket;
const Message = () => {
    const [messageCount, setMessageCount] = useState(0);
    const [messages, setMessages] = useState<Array<IMessage> | undefined>([]);
    const [content, setContent] = useState<string>('')

        // if (!socket) {
        //     socket = io(':3001')
        // }

    useEffect(() => {
        const getMessages = async () => {
            try {
                let r = await fetch('/api/message');
                let messages = await r.json();
                setMessages(messages)
            } catch (err) {
                console.log(err)
            }
        }
        getMessages();
    }, [])
    


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (content && User) {
            let data = {
                content,
                userid: User.userid
            };

            e.preventDefault();
            try {
                await fetch("/api/message", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (e) {
                console.log(e);
            }
            location.reload();
        }
    }


    // Component did mount
    const getMsg = async () => {
        try {
            let r = await fetch('/api/message');
            let data = await r.json();
            let msg = Object.keys(data).map(key => {
                return {
                    id: key,
                    userid: data[key].userid,
                    content: data[key].content
                }
            })
            msg.pop()
            msg.reverse()
            setMessages(messages)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getMsg;
    }, [])

    // Logout logic 
    const logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }
    // Styling
    const styles = {
        container: {
            padding: 20,
            borderTop: '1px #4C758F solid',
            marginBottom: 20,
        },
        form: {
            display: 'flex',
        },
        input: {
            color: 'inherit',
            background: 'none',
            outline: 'none',
            border: 'none',
            flex: 1,
            fontSize: 16,
        }
    }

    return (
        <div>
            <div className="" style={{ color: '#3A5D58', fontSize: '20px' }}>< Banner /></div>
            {/* Logout Btn */}
            <div className="d-flex justify-content-center float-bottom">
                <a className="btn border border-warning rounded" style={{ fontFamily: 'Playfair Display', color: '#A1FFCE' }} 
                onClick={logout}>Logout</a>
            </div>

            <div className="border rounded border-warning" style={{
                width: '80vh', height: '80vh',
                backgroundColor: '#3A5D58',
                fontSize: '18px',
                margin: 'auto',
                marginTop: '3%'
            }}>

                <div
                    style={{ height: '95%', width: '100%' }}>
                    {/* Submitted content goes here */}
                    {messages.map(msg => {
                        return (<EachMsg key={msg.id} msg={msg} />)
                    })}


                </div>

                <div className="mt-5" style={styles.container}>
                    <div>
                        <form onSubmit={handleSubmit} style={styles.form} >
                            <input
                                className=""
                                type="text"
                                placeholder="Enter A Message Champ"
                                onChange={onChange}
                                value={content}
                                style={styles.input}
                            />
                            <button className="btn btn-info">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Message