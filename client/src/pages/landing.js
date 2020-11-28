import React from 'react';
import ReactDOM from 'react-dom';
import './landing.css';

class Landing extends React.Component {
    render() {
        return (
            <section>
                <div id="titleText" title="titleText" class="titleText">AllTunes</div><br></br><br></br>
                <div id="bodyText" title="bodyText" class="bodyText">Please choose whether you will like to create a new room as a DJ, or join a room as a Listener.</div><br></br><br></br>
                <div class="button_cont" align="center"><a class="buttoncss" href="" target="_blank" rel="nofollow noopener">Host a room</a></div><br></br>
                <div class="button_cont" align="center"><a class="buttoncss" href="" target="_blank" rel="nofollow noopener">Join a room</a></div>
            </section>
        );
        
    }
}

export default Landing