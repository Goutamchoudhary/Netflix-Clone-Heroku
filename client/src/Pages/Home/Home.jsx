import { useEffect, useState } from "react";
import Featured from "../../Components/Featured/Featured";
import List from "../../Components/List/List";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.scss";
import axios from "axios";
import FooterCompound from "../../compounds/FooterCompound";
import Seperator from "../../Components/Seperator/Seperator";

const Home = ({type}) => {
    const [lists, setLists] = useState([]);
    const [commonlists, setCommonLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(()=> {
        // let isMounted = true;
        const getRandomLists = async() => {
            // "proxy": "http://localhost:9000/api"
            // let url = `http://localhost:9000/api/lists${type ? "?type="+type: ""}${genre ? "&genre="+genre: ""}`;
            
            let token = "UserToken " + JSON.parse(localStorage.getItem("user")).accessToken;
            
            try{
                const listRes = await axios.get(`/api/lists/${type ? "?type="+type: ""}${genre ? "&genre="+genre: ""}`, { headers:{ token: token } })
                console.log(listRes.data);
                setLists(listRes.data);

                const commonListRes = await axios.get(`/api/commonLists/`, { headers:{ token: token } });
                console.log(commonListRes.data);
                setCommonLists(commonListRes.data);
                //console.log(lists);                
                
            }catch(err){
                console.log(err);
            }

        };
        getRandomLists();

    },[type]);

    // let img1 = "https://i.pinimg.com/564x/41/88/29/41882960bc135a47363f9f3f890f706d.jpg";
    // let img2 = "https://i.pinimg.com/originals/93/d3/30/93d330382e963458edb433ed100910d8.jpg";

    return (
        <div className="home" >
            <Navbar/>
            <Featured type={type} setGenre={setGenre}/>

            {lists && lists.map((list) => (
                <List key={list._id} list={list}/>
            ))}

            {commonlists && commonlists.map((list, index) => (
                <List key={index} list={list}/>
            ))}
            
            <FooterCompound />
        </div>
    )
}

export default Home

