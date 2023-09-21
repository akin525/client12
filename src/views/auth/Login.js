import { Link } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import gh from 'lg.png'
export default function Login() {

  function handleAddToHomeScreen() {
    if ('standalone' in window.navigator && window.navigator.standalone) {
      // The app is already installed and running in standalone mode
      return;
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      // The app is running in standalone mode
      return;
    }

    // Prompt the user to add the app to the home screen
    // You can customize the UI and message based on your requirements
    window.alert('Add this app to your home screen for quick access.');
  }

  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password,setPassword] = useState("");
  const [isloading, setisloading]=useState(false);
  const baseURL = "https://server.savebills.com.ng/api/auth/signin";
  const baseURL1 = "https://server.savebills.com.ng/api/auth/google";
  const [loading, setloading]=useState(false);

  const [con, setcon] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  function spin(){
    window.web2app.spinandwin({'token': "1380001|5xfpeJUtI3FXLaOR43f32PI7Wjjz2HfYVRoEsUev"})
  }

  function googleCallback(data) {
    // alert(JSON.stringify(data.data.email));
    setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL1, {
            name:data.data.name,
            email:data.data.email,
            dob: '1990-04-12',
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              swal({
                title: "Ooops",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });


            }else{
              setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.token);
              // alert(response.data.token);
              try {
                window.web2app.biometric.saveauth({'password':password, 'username':username});
                window.web2app.pushNotification.subscribe(username);


              }catch (e) {
                console.log("Can not excecute for now");
              }
              // const [cookies, setCookie] = useCookies(response.data.username);
              window.location.href='/dashboard';
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
  function google(){
    window.web2app.googlesignin.signin(googleCallback);

  }


  function myCallback(data) {
    setcon(JSON.stringify(data.success));
    // alert(JSON.stringify(data));

  }
  function myCallback1(data) {
    setcon(JSON.stringify(data.success));
  }
  function myCall(data) {
    // alert(JSON.stringify(data));
  }

  function contactCallback(data) {
    console.log("I am in callback")
    console.log(JSON.stringify(data));
      // alert(JSON.stringify(data.data));
      // alert(JSON.stringify(data.data.username));
      // alert(JSON.stringify(data.data.password));

    setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL, {
            username:data.data.username,
            password:data.data.password,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              swal({
                title: "Ooops",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });


            }else{
              // setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.token);

              // const [cookies, setCookie] = useCookies(response.data.username);
              window.location.href='/dashboard';
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
  function pick(){
    window.web2app.biometric.start(contactCallback);
  }
  React.useEffect(()=> {
    try {
      window.web2app.confirmlogin.islogout(myCallback1);
      window.web2app.deviceInfo(myCallback);
     window.web2app.biometric.check(myCall)
    }catch (e) {
      console.log("Can not excecute for now");
    }
  },[]);
  const handleInputChange = (e) => {
    const {id , value} = e.target;

    if(id === "username"){
      setusername(value);
    }

    if(id === "password"){
      setPassword(value);
    }


  }
  const handleSubmit  = async () =>  {
      setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL, {
            username:username,
            password:password,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              swal({
                title: "Ooops",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });


            }else{
              localStorage.setItem('dataKey', response.data.token);
              try {
                window.web2app.biometric.saveauth({'password':password, 'username':username});
                window.web2app.pushNotification.subscribe(username);

              }catch (e) {
                console.log("Can not excecute for now");
              }
              // const [cookies, setCookie] = useCookies(response.data.username);
           window.location.href='/dashboard';
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
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                     width="200"
                      src={gh}
                    />
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              {con =="true" ?
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign in with
                </h6>
                <div className="btn-wrapper text-center">
                  {/*<button*/}
                  {/*    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                  {/*    type="button"*/}
                  {/*>*/}
                  {/*  <img*/}
                  {/*      alt="..."*/}
                  {/*      className="w-5 mr-1"*/}
                  {/*      src={require("assets/img/github.svg").default}*/}
                  {/*  />*/}
                  {/*  Github*/}
                  {/*</button>*/}
                  <button onClick={google}
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                  >
                    <img
                        alt="..."
                        className="w-5 mr-1"
                        src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                {/*<button type={'button'} className={'btn btn-success'} onClick={spin}>Click to spin</button>*/}

              </div>:true}
              {/*<button className="btn btn-success" onClick={handleAddToHomeScreen}>Add to Home Screen</button>*/}


              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                </div>
                {loading ? <div className="loader-container">
                      <div className="spinner"/>
                    </div> :
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                          Username
                        </label>
                        <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Username"
                            value={username} onChange={(e) => handleInputChange(e)} id="username"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                          Password
                        </label>

                        <div style={{
                          width: "auto",
                          position: "relative",
                          box_sizing: "border-box"
                        }}>
                          <input
                              type={passwordType}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Password"
                              value={password} onChange={(e) => handleInputChange(e)} id="password" name="password"
                          />
                          <i onClick={togglePassword} style={{
                            position: "absolute",
                            top: "28%",
                            right: "4%"
                          }} className={`fa ${passwordType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>

                        </div>

                      </div>
                      {con =="true" ?
                      <center>
                        <i onClick={pick} style={{
                          width:'100%',
                          fontSize:"xx-large"
                        }} id="number" className="fas fa-fingerprint"></i>
                        <h4><b>Login with Fingerprint</b></h4>
                      </center>:true}
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                              id="customCheckLogin"
                              type="checkbox"
                              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                        </label>

                      </div>

                      <div className="text-center mt-6">
                        <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button" onClick={isloading ? null : handleSubmit}
                        >
                          Sign In <span className="load loading"></span>
                        </button>
                      </div>
                    </form>
                }


              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/pass"
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
