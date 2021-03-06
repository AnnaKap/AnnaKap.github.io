import React, { useRef, useState } from 'react';
import { motion } from "framer-motion"
import Modal from '../components/modal'
import worksObj from '../constants/works';
import '../styles/home.scss'
import gif from '../static/giphy.gif';

const Work = (props) => {
    const {type, setModalOpen, setWorkType} = props;
    return (
        <div 
            className={`${type} works`}
            onClick={() => {setModalOpen(true); setWorkType(type);}}
        >
            {`${type.toUpperCase()}`}
        </div>
    )
}
const ListItem = (props) => {
    const { link, setLink, setSubModalOpen } = props;
    let hasSubModal = false;
    console.log("link", link.video, link.name)
    if (link.video || link.description || link.name === 'email') {
        hasSubModal = true;
    }
    if (hasSubModal === true) {
        return (
        <div 
            className="listItem"
            onClick={() => {setLink(link); setSubModalOpen(true)}}
        >
           {link.title}
        </div>)
    }
    return (<div  className="listItem"><a target="_blank" href={link.link}>{link.title}</a></div>)
}

const SubModal = props => {
    const { link } = props;
    return (
        <>
            {/* <div>{link.title}</div> */}
            <div>{link.description}</div>
            <div>{link.link}</div>
            {link.video && (<div><img src={gif}/></div>)}
        </>

    )
}
const Home = (props) => {
    const { changeRoute } = props
    const constraintsRef = useRef(null);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ subModalOpen, setSubModalOpen ] = useState(false);
    const [ workType, setWorkType ] = useState(null);
    const [ link, setLink ] = useState(null);
    const works = ['tech','art', 'contact', 'about'];
    return(
        <div className="constraint" ref={constraintsRef}>
        <div className="home">
            {works.map(w => (<Work key={`${w}-works`} type={w} setModalOpen={setModalOpen} setWorkType={setWorkType}/>))}
            {modalOpen && (
                    <Modal setModalOpen={setModalOpen} constraintsRef={constraintsRef} setSubModalOpen={setSubModalOpen}>
                        {worksObj[workType].links.map((l,i) => (<ListItem setSubModalOpen={setSubModalOpen} setLink={setLink} link={l} key={`links-${i}`}/>))}
                    </Modal>
                )}
            { subModalOpen && (
                <Modal modalOpen={subModalOpen} setModalOpen={setSubModalOpen} constraintsRef={constraintsRef}>
                    <SubModal modalOpen={subModalOpen} link={link}/>
                </Modal>
            )}
        </div>
        </div>
    );
}


export default Home;