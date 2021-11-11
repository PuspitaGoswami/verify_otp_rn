import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import style from "../../Styles/style";

import Constant from "../../Components/Constant";
import Colors from "../../Components/Colors";
import { Ionicons } from "@expo/vector-icons";
import DropdownAlert from 'react-native-dropdownalert';




const Verification = ({navigation}) => {
  const inputE1 = useRef(null);
  const inputE2 = useRef(null);
  const inputE3 = useRef(null);
  const inputE4 = useRef(null);
  const inputE5 = useRef(null);
  const inputE6 = useRef(null);

  const [counter, setCounter] = useState(30);
  const [isSecurityEntry, setIsSecurityEntry] = useState(true);
  const [isSecurityConfirm, setIsSecurityConfirm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  const ownerName = navigation.getParam("ownerName");
  const phone = navigation.getParam("phone");
  const password = navigation.getParam("password");


  const [input1,setInput1]=useState(false);
  const [input2,setInput2]=useState(false);
  const [input3,setInput3]=useState(false);
  const [input4,setInput4]=useState(false);
  const [input5,setInput5]=useState(false);
  const [input6,setInput6]=useState(false);
  

  const [otp1,setOtp1]=useState('');
  const [otp2,setOtp2]=useState('');
  const [otp3,setOtp3]=useState('');
  const [otp4,setOtp4]=useState('');
  const [otp5,setOtp5]=useState('');
  const [otp6,setOtp6]=useState('');

  
  
  useEffect(() =>{
   
        timer();
}, [counter]);


const timer = () =>{


  if(counter >= 0){
    let c = counter;

  var oneSecInterval = setInterval(() => {  
    if(c > 0) {
    c= c-1;
    }

    setCounter(c)
      if (c === 0) {
        setTimeOut(true);
          setCounter(0);
          clearInterval(oneSecInterval);
            
      }
      if(counter === 0){
        inputE1.current.focus()
   
    }

  }, 1000);
  }


}


const submitHandler = async () =>{
              try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              phone: phone,
              password: password,
              otp:otp1+otp2+otp3+otp4+otp5+otp6,
            });


            let respn = await fetch(
              Constant.Api+"owner/registration",
              {
                method: "post",
                mode: "no-cors",
                headers: myHeaders,
                body: raw,
              }
            );
            console.log(respn.status,"status");
            let response = await respn.json();
            if(respn.status === 400){
              dropDownAlertRef.alertWithType(
                "error",
                "Error",
                response.message
              );
            }
          
            else{
              dropDownAlertRef.alertWithType(
                "success",
                "Success",
                response.message
              );
              if(respn.status === 201){
              setTimeout(() => {
                setIsLoading(true);
                navigation.navigate('SignInScreen');
              }, 3000);
            }
            }
          
          } catch (error) {
          
            dropDownAlertRef.alertWithType("error","Error",error);
    
       
          }
}



  

const resendOTP= async() =>{
  try {
    setTimeOut(false);
    setCounter(30)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");;

    var raw = JSON.stringify({
      phone: phone,
    });

    let respn = await fetch(Constant.Api + "owner/send-reset-otp", {
      method: "post",
      mode: "no-cors",
      headers: myHeaders,
      body: raw,
    });

    let response = await respn.json();
    let otp = response.data.otp;
    console.log(respn.status);
    if(respn.status === 500){
  
      setIsLoading(false);
      return
    }
    else{
      dropDownAlertRef.alertWithType(
        "success",
        "Success",
        response.message
      );
  
       
    }
     

  } catch (err) {
    console.log(err);
  }
  
}

  

  return (
    <View style={{flex:1,marginTop:50}}>
      
      <View style={{marginTop:100, justifyContent:'center',alignItems:'center'}}>
        <View style={{alignItems:'center', marginBottom:25}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>Sent a varification code to verify </Text>
          <Text style={{fontWeight:'bold', fontSize:16}}>your mobile number</Text>
        </View>
        <View>
          <Text style={{color:"#707070"}}>
            sent to +88{phone}
          </Text>
        </View>
        <View style={{flexDirection:'row', marginTop:50 }}>
          <View style={{marginRight:5}}>
          <Ionicons name='md-alarm' size={25} color={Colors.orange}/>
          </View>
         
          <Text>00:{counter}</Text>
        </View>
      </View>
      <View style={{marginTop:50, marginLeft:30,justifyContent:'center', flexDirection:'row'}}>
        <TextInput
         style={{marginRight:5,padding:12,fontSize:20, alignSelf:'center',fontWeight:'bold', height:50, width:40,borderRadius:5, borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         maxLength={1}
         ref={inputE1} 
         onChangeText={(value)=>{ 
          if(value.length === 0)
          {
            setInput1(false);
            setOtp1('');
            inputE1.current.focus()
          }
          else{ 
            setInput1(true);
            setOtp1(value)
          inputE2.current.focus()}}
          }
          value={otp1}
        />
        <TextInput
         maxLength={1}
         style={{marginRight:5, height:50,padding:12,fontSize:18,fontWeight:'bold', width:40,borderRadius:5,  borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         ref={inputE2} 
         onChangeText={(value)=>{ 
          if(value.length === 0)
          { 
            setOtp2("")
            setInput2(false);
            inputE1.current.focus()
          }
          else{ 
            setInput2(true);
            setOtp2(value)
          inputE3.current.focus()}}
          }
          value={otp2}
        />
        <TextInput
         maxLength={1}
         style={{marginRight:5, height:50,padding:12,fontSize:18,fontWeight:'bold', width:40,borderRadius:5, borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         ref={inputE3} 
          onChangeText={(value)=>{ 
          if(value.length === 0)
          { 
            setOtp3('')
            setInput3(false)
            inputE2.current.focus()
          }
          else{ 
            setInput3(true)
            setOtp3(value)
          inputE4.current.focus()}}
          }
          value={otp3}
        />
        <TextInput
         maxLength={1}
         style={{marginRight:5, height:50,padding:12,fontSize:18,fontWeight:'bold', width:40,borderRadius:5,  borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         ref={inputE4} 
         onChangeText={(value)=>{ 
          if(value.length === 0)
          { 
            setOtp4('')
            setInput4(false)
            inputE3.current.focus()
          }
          else{ 
            setInput4(true)
            setOtp4(value)
          inputE5.current.focus()}}
          }
          value={otp4}
        />
        <TextInput
         maxLength={1}
         style={{marginRight:5, height:50,padding:12,fontSize:18,fontWeight:'bold', width:40,borderRadius:5,  borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         ref={inputE5} 
         onChangeText={(value)=>{ 
          if(value.length === 0)
          {
            setOtp5("")
            setInput5(false)
            inputE4.current.focus()
          }
          else{ 
          setInput5(true)
          setOtp5(value)
          inputE6.current.focus()}}
          }
          value={otp5}
        />
        <TextInput
         maxLength={1}
         style={{marginRight:25, height:50,padding:12,fontSize:18,fontWeight:'bold', width:40,borderRadius:5,  borderColor: "#707070",borderWidth:1,justifyContent:'center', alignItems:'center'}}
         ref={inputE6} 
         onChangeText={(value)=>{ 
          if(value.length === 0)
          {
            setOtp6("")
            setInput6(false)
           
            inputE5.current.focus()
          }
          else{ 
            setInput6(true)
            setOtp6(value)
          inputE6.current.focus()}}
          }
          value={otp6}
        />

        </View>
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:30}}>
          <Text style={{color:"#707070"}}>
            Didn't get code yet?
          </Text>
          {timeOut===true &&  <TouchableOpacity onPress={resendOTP}>
         <Text style={{color: Colors.orange}}>
            Resend OTP
          </Text>
          </TouchableOpacity>}
        </View>
        <View>
              <TouchableOpacity onPress={()=> input1 && input2 && input3 && input4 && input5 && input6===true ?(submitHandler()): alert("Please Enter OTP")}  style={styles.btn}>
                <Text style={style.txt}>Verify</Text>
              </TouchableOpacity>
        </View>
            <DropdownAlert
        name="eye"
        size={20}
        successColor={Colors.orange}
        ref={(ref) => (dropDownAlertRef = ref)}
        inactiveStatusBarStyle={"dark-content"}
        inactiveStatusBarBackgroundColor={"white"}
        defaultContainer={{ padding: 5 }}
        updateStatusBar={false}
   />
          
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 85,
    padding: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: Colors.orange,
    marginBottom: 30,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#000000aa',

  },
  modalView: {
    height: 350,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5
  },

});

export default Verification;

