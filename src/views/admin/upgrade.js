import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";
import gh from "../../lg.png";
import ig from "../../ba.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Upgrade() {
    const [network, setnetwork] = useState("");
    const [con, setcon] = useState("");
    const [amount, setamount] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [userid, setuserid] = useState("");
    const [number,setnumber] = useState("");
    const [refid,setrefid] = useState("");
    const baseURL1 = "https://server.savebills.com.ng/api/auth/dashboard";
    const [loading, setloading]=useState(false);
    const baseURL = "https://server.savebills.com.ng/api/auth/upgrade";
    let token=localStorage.getItem('dataKey');

    function myCallback(data) {
        setcon(JSON.stringify(data.success));
    }

    function contactCallback(data) {
        console.log("I am in callback")
        console.log(JSON.stringify(data));
        alert(JSON.stringify(data));
        document.getElementById('number').value=data.data;
        setnumber(data.data);
    }
function pick(){
    window.web2app.showinterstitial(contactCallback);
}
console.log()
    React.useEffect(() => {
        try {//
            window.web2app.deviceInfo(myCallback);
        }catch (e) {
            console.log("Can not excecute for now");
        }
        setrefid("airtime"+Math.floor((Math.random() * 1000000000) + 1));
        axios
            .get(baseURL1, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                setuserid(response.data.id);
                if (response.data.status ==="0"){
                    window.location='login';
                }
                console.log(response.data);

            });

    }, []);

    const btns = document.querySelectorAll('button');
    btns.forEach((items)=>{
        items.addEventListener('click',(evt)=>{
            evt.target.classList.add('activeLoading');
        })
    })
    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "network"){
            setnetwork(value);
        }
        if(id === "amount"){
            setamount(value);
        }
        if(id === "number"){
            setnumber(value);
        }





    }


    const handleSubmit  = async () =>  {
        // console.log(name,username,email,number,password,confirmPassword);

        setloading(true);

        try {
            axios
                .post(baseURL, {
                    userId:userid,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    },

                }).then(response => {
                setError("");
                setMessage(response);
                setloading(false);
                if (response.data.status === "0") {
                    setError(response.data.message);
                    // swal({
                    //     title: "Fail",
                    //     text: response.data.message,
                    //     icon: "error",
                    //     confirmButtonText: "OK",
                    // })
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 3000, // Time in milliseconds, or false to disable autoclose
                    });

                }else{
                    setMessage(response.data.message);
                    // const [cookies, setCookie] = useCookies(response.data.username);
                    swal({
                        title: "Success",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(function () {
                        // Redirect the user
                        window.location.href = "/dashboard";
                    });
                }
                // setPost(response.data);
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Upgrade</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Become Reseller
                                </button>
                            </div>
                        </div>
                        {/*{loading ? <div className="loader-container">*/}
                        {/*        <div className="spinner"/>*/}
                        {/*    </div> :*/}
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <img src={ig} />

                            </div>
                        {/*}*/}
                    </div>

                </div>
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <ToastContainer/>

                                <div className="text-center mt-12">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-success"> Note That ₦1,000 Will be charged to upgrade your account to reseller<span
                                            id="RightT"> </span></li>

                                        <li className="list-group-item list-group-item-info"> You can request for a website after you upgrade. You will have access to cheaper prices of products too!<span
                                            id="RightT"> </span></li>

                                        {loading ? <div className="loader-container">
                                                <div className="spinner"/>
                                            </div> :
                                            <form>
                                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                                    Upgrade Now
                                                </h6>
                                                <div className="flex flex-wrap">

                                                    <div className="w-full ">
                                                        <div className="relative w-full mb-3">
                                                            <label
                                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                                htmlFor="grid-password"
                                                            >
                                                                Amount To pay
                                                            </label>
                                                            <input
                                                                type="number"
                                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                                value={'1000'} onChange={(e) => handleInputChange(e)}
                                                                id="amount"
                                                                readOnly/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={handleSubmit}
                                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                                    Upgrade Now
                                                </button>
                                                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                            </form>
                                        }
                                    </ul>

                                    <br></br>
                                    <br></br>


                                </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
