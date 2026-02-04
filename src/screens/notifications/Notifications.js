import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground } from 'react-native';
import { Black, ButtonClr, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { notifications } from "../../api/ticket";

const Notifications = (props) => {
    const { goBack, navigate } = props?.navigation;
    const { user } = useContext(AppContext);
    const [data, setData] = useState();
 
    useEffect(() => {getData()},[user]);

    const getData = async () => {
        const Res = await notifications(user?.token);
        console.log(Res?.data);
        setData(Res?.data);
    }


    // notifications
    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}            
            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(5)}}>
            <TouchableOpacity
            onPress={() => {goBack()}}
            style={{
                height:H(4),
                width:W(9),
                borderWidth:H(.1),
                borderColor:Grey,
                borderRadius:H(.5),
                marginLeft:H(3),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Ionicons name={'arrow-back'} size={22} color={Grey} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Notifications</Text>
            <TouchableOpacity onPress={() => {navigate('Inbox')}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center',backgroundColor:White}}>
                    <Ionicons name={'chatbox-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            {data?.map((item,i) => {
                return(
                    <View key={i} style={{
                        // height:H(9),
                        width:W(88),
                        alignSelf:'center',
                        backgroundColor:White,
                        marginTop:H(2),
                        borderRadius:H(1),
                        borderWidth:H(.1),
                        borderColor:LightGrey
                    }}>
                        <Text style={{color:Black,fontSize:14,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>{item?.title}</Text>
                        <Text style={{color:Grey,fontSize:11,width:W(77),fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1),marginBottom:H(1)}}>{item?.message}</Text>
                    </View>        
                )
            })}
            </ScrollView>

        </View>
    );
};

export default Notifications;