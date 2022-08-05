import { useState } from 'react';
export default function Loader({}){
    const [show, setShow] = useState(true)
    return show ? <div className="loader"></div>: null;
}