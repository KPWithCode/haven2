import React from 'react';
import Banner from '../Rooms/Banner';
import EachMsg from './EachMessage';


export interface IMsgProps {

}

export interface IMsgState {
    msg: {
        id: string;
        _created: Date;
        content: string;
        userid: number;
        username: string
    }[]
    id: string;
    _created: Date;
    content: string;
    userid: number;
    username: string;
}



class Message2 extends React.Component<IMsgProps, IMsgState> {
    constructor(props: IMsgProps) {
        super(props);
        this.state = {
            msg: [], id: null, _created: new Date, content: '', userid: null, username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.logout = this.logout.bind(this)
    }
    async componentDidMount() {
        try {
            let r = await fetch('/api/message');
            let data = await r.json();
            let msg = Object.keys(data).map(key => {
                return {
                    id: key,
                    _created: data[key]._created,
                    content: data[key].content,
                    userid: data[key].userid,
                    username: data[key].username
                }
            })
            this.setState({ msg })
            // message.pop()
            // message.reverse()
        } catch (e) {
            console.log(e)
        }


    }

    async handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        if (this.state.msg) {
            let data = {
                content: this.state.content,
                // users: this.state.users
            };
            e.preventDefault();
            try {
                await fetch(`/api/message`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
            } catch (e) {
                console.log(e)
            }
            location.reload()
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ content: e.target.value })

    // Logout logic 
    logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    // Additional Styling
    styles = {
        container: {
            padding: 20,
            borderTop: '3px #7fffc8 solid',
            backgroundColor: '#9ecfe6',
            alignContent: 'bottom'
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

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#7fb6ff' }}>
                <div className="text-center" style={{ fontFamily: 'Playfair Display', color: '#7fffc8', fontSize: '15px' }}>
                    <div style={{ fontFamily: 'Playfair Display', color: '#7fffc8' }}>
                        <h1>CHAT NOW</h1>

                    </div>
                </div>
                {/* Logout Btn */}
                <div className="text-center float-bottom mt-5">
                    <a className="btn border border-warning rounded" style={{ fontFamily: 'Playfair Display', color: '#7fffc8', fontSize: '1.5em' }}
                        onClick={this.logout}>Logout</a>
                </div>

                <div className="border border-warning"
                    style={{ height: '100%', width: '100%', backgroundColor: '#9ecfe6' }}>
                    {/* Submitted content goes here */}
                    {this.state.msg.map(msg => {
                        return (<EachMsg key={msg.id} msg={msg} />)
                    })}


                </div>

                <div className="mt-5" style={this.styles.container}>
                    <div>
                        <form onSubmit={this.handleSubmit} style={this.styles.form} >
                            <input
                                className=""
                                type="text"
                                placeholder="Enter A Message Champ"
                                onChange={this.onChange}
                                value={this.state.content}
                                style={this.styles.input}
                            />
                            <button className="btn btn-info">Enter</button>
                        </form>
                    </div>
                </div>
            </div>

        )

    }

}
export default Message2;