import React, { Component } from 'react'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            result: ''
        }
    }

    componentDidMount() {
        this.ping()
    }

    ping() {
        fetch("/ping")
        .then(res => res.text())
        .then((res => {
            this.setState({
                isLoaded: true,
                result: res
            })
        }))
    }

    render() {
        const { isLoaded, result } = this.state;

        if(!isLoaded) {
            return <div>Waiting for pong</div>
        } else {
            return <div>{result}</div>
        }
    }
}

export default Test