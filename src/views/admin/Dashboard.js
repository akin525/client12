

import React, {useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ig from 'ba1.png';
import spin1 from 'spin.png';
import goo from 'google.png';
import sp from 'sp.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";
import gh from "../../lg.png";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const refer1="http://savebills.com.ng/auth/register?refer=";


    const [totaldeposit, setTotaldeposit] = useState("0");
    const [totalbill, setTotalbill] = useState("0");
    const [allock, setallock] = useState("0");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("0");
    const [bonus, setbonus] = useState("0");
    const [account_number, setaccount_number] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [post, setPost] =useState(null);
    const [all, setall] = useState([]);
    const [noti, setnoti] = useState("");
    const [apikey, setapikey] = useState("");
    const [con, setcon] = useState("");

    const refer = `${refer1}${name}`;
    let token=localStorage.getItem('dataKey');
    function spin(){
        window.web2app.spinandwin({'token': "1380001|5xfpeJUtI3FXLaOR43f32PI7Wjjz2HfYVRoEsUev"})
    }

    function myCallback(data) {
        setcon(JSON.stringify(data.success));

    }
    React.useEffect(() => {
        try {
            window.web2app.deviceInfo(myCallback);

        }catch (e) {
            console.log("Can not excecute for now");
        }
        setLoading(true);
        axios
            .get(baseURL, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);

                if (response.data.status ==="0"){
                    window.location='/login';
                }
                // console.log(response.data);
                setusername(response.data.username);
                setName(response.data.username);
                setEmail(response.data.email);
                setBalance(response.data.wallet);
                setTotalbill(response.data.totalbill);
                setTotaldeposit(response.data.totaldeposit);
                setall(response.data.bills);
                setallock(response.data.allock);
                setaccount_number(response.data.account_number);
                setaccount_name(response.data.account_name);
                setbonus(response.data.referbonus);
                setnoti(response.data.noti);
                setapikey(response.data.apikey);

                setMessage(response.data.message);


                setPost(response.data);
                setLoading(false);
            });

    }, []);
    const profile= ()=>{
        try {
            {
                if(token && token.login)
                {
                    this.setState({login:true, token:token})
                }else {
                    window.location='login.js';
                }
            }

        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }

    }
    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert(copyText.value);
    }
    const a= {
        margin: 5,

    };
    const ul={
        listStyleType:'square',
    };
    return (
    <>
        <div className="card relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blue-900">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <h4 className="uppercase text-black mb-1 text-xs font-semibold">
                        <b>Important Notice! </b>
                    </h4>
                    <h6 className={'text-info'}><b>{noti}</b></h6>
                </div>
                <br></br>
                <p><b className={'italic'}>Account Type: &nbsp;</b>
                    {apikey ==null ?
                        <Link className={'btn btn-danger '} style={{margin: "5px"}}><b>Starter</b>
                        <i
                            className="text-white  fas fa-user"></i>
                    </Link>: true}
                    {apikey !=null ?
                        <Link className={'btn btn-danger '} style={{margin: "5px"}}><b>Reseller</b>
                            <i
                                className="text-white  fas fa-user"></i>
                        </Link>: true}
                    {apikey ==null ?
                    <button className="btn btn-success" style={{fontSize: "13px"}}>Upgrade<i
                        className="text-white  fas fa-user"></i></button>:true}
                    {apikey !=null ?
                    <button className="btn btn-success" style={{fontSize: "13px"}}>Upgraded! <i
                        className="text-white  fas fa-user"></i></button>:true}
                </p>
            </div>
        </div>
        <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Wallet
                                </h5>
                                <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{balance.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className=
                                        "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                >
                                    <i className="fa fa-wallet"></i>
                                </div>
                                <Link to="/fund">
                                <button  type={'button'} className={'btn btn-info'}>Fund Wallet</button>
                                </Link>


                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">

                            <span className="whitespace-nowrap">Wallet Balance</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                               Bonus
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                                ₦{bonus.toLocaleString()}
                                </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className=
                                    "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"
                            >
                                <i className="fa fa-wallet"></i>
                            </div>

                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">

                        <span className="whitespace-nowrap">Your Total Bonus</span>
                    </p>
                </div>
            </div>
            </div>
            {/*<div className="w-full lg:w-6/12 xl:w-3/12 px-4">*/}
            {/*    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">*/}
            {/*    <div className="flex-auto p-4">*/}
            {/*        <div className="flex flex-wrap">*/}
            {/*            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">*/}
            {/*                <h5 className="text-blueGray-400 uppercase font-bold text-xs">*/}
            {/*                    Bills*/}
            {/*                </h5>*/}
            {/*                <span className="font-semibold text-xl text-blueGray-700">*/}
            {/*                                   ₦{totalbill.toLocaleString()}*/}
            {/*                    </span>*/}
            {/*            </div>*/}
            {/*            <div className="relative w-auto pl-4 flex-initial">*/}
            {/*                <div*/}
            {/*                    className=*/}
            {/*                        "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-blueGray-500"*/}
            {/*                >*/}
            {/*                    <i className="fa fa-wallet"></i>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <p className="text-sm text-blueGray-400 mt-4">*/}

            {/*            <span className="whitespace-nowrap">Total Bills</span>*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                    <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                    Safe-lock
                                </h5>
                                <span className="font-semibold text-xl text-blueGray-700">
                                                   ₦{allock.toLocaleString()}
                                </span>
                            </div>
                            <div className="relative w-auto pl-4 flex-initial">
                                <div
                                    className=
                                        "text-info p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full text-red-500"
                                >
                                    <i className="fa fa-wallet"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-blueGray-400 mt-4">

                            <span className="whitespace-nowrap">Total Safe-lock</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <img src={spin1} />

                </div>
                {/*}*/}
                <center>
                    <span className={'list-group-item list-group-item-info'}>To enjoy spin and win bonus kindly download our app on Google Playstore</span>
                </center>
            </div>

        </div>
        <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="px-6">
                <center>
                    {con == "true" ?(
                        <img src={sp} onClick={spin}/>

                    ):(
                        <a href="https://play.google.com/store/apps/details?id=com.a5starcompany.savebills">
                        <img src={goo}/>

                        </a>

                    )}

                </center>

                </div>
            </div>
        </div>
        </div>

        <br></br>
        <img src={ig} />


        <br></br>


        <div className="card">
            <div className="card-body form-row">
                <h6>Your Referal Link</h6>
                <input id="myInput" type="text" className="form-control"
                       value={refer}/>
                    <button className="btn btn-info" onClick={myFunction}>Copy Referal Link</button>
            </div>
        </div>
        <br></br>
        <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
            {loading? <div className="loader-container">
                <div className="spinner"/>
            </div> : <CardLineChart balance = {balance} totaldeposit ={totaldeposit} totalbill = {totalbill} allock = {allock} />}
        </div>
        {/*<div className="w-full xl:w-4/12 px-4">*/}
        {/*    <CardBarChart />*/}
        {/*</div>*/}
      </div>
      {/*<div className="flex flex-wrap mt-4">*/}
      {/*  <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">*/}
      {/*    <CardPageVisits />*/}
      {/*  </div>*/}
      {/*  <div className="w-full xl:w-4/12 px-4">*/}
      {/*    <CardSocialTraffic />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
