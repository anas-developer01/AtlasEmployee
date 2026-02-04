import React, { useContext, useEffect, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Modal, TextInput, ActivityIndicator, Image } from 'react-native';
import { Black, ButtonClr, Entypo, Grey, H, ImageBaseUrl, Ionicons, LightGrey, Primary, W, White } from "../../constant/Common";
import { AppContext } from "../../context/AppProvider";
import { ticketDetail, update_status } from "../../api/ticket";
import ImageCropPicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Ticket = (props) => {
    const { goBack, navigate } = props?.navigation;
    const [images, setImages] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const { user } = useContext(AppContext);
    const [isloading, setisLoading] = useState(false);
    const [details, setDetails] = useState();
    const [selectedImages, setSelectedImages] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [statuslist, setStatusList] = useState([
        {
            title:'Pending',
            value:'pending'
        },
        {
            title:'Waiting for Client Feedback',
            value:'waiting_for_client_feedback'
        },
        {
            title:'In Progress',
            value:'in_progress'
        },
        {
            title:'Resolved',
            value:'resolved'
        },
    ]);
    const [selectedStatus, setSelectedStatus] = useState();
    const [showModal, setshowModal] = useState(false);
    const [selectedShowImage, setSelectedShowImage] = useState();
    const [showImageModal, setShowImageModal] = useState(false);

    const selectImages = () => {
        ImageCropPicker.openPicker({
            width:300,
            height:400,
            mediaType: "photo",
            multiple:true,
            includeBase64:true
          }).then(image => {
            console.log('IMAGE',image);
            let data = selectImages?.length > 0 ? selectImages:[];
            console.log(selectImages);
            image?.map((item,i) => {data.push(item)});
            console.log(data?.length);
            setSelectedImages(data);
            let ref = refresh+1;
            setRefresh(ref);
          });
    }
    useEffect(() => {getData()},[user]);

    const getData = async () => {
        console.log('tickets_status',props?.route?.params?.item?.tickets_status?.id);
        const Res = await ticketDetail(user?.token,props?.route?.params?.item?.id);
        console.log('RES',Res?.data?.record);
        setDetails(Res?.data?.record);
        setImages(Res?.data?.record?.tickets_images);
        setTimeline(Res?.data?.record?.tickets_status);
    }

    const updateStatus = async () => {
        setisLoading(true);
        let imagesData = [];
        selectedImages?.map((item,i) => {
            imagesData.push('data:image/jpeg;base64,'+ item.data)
        });
        console.log(props?.route?.params?.item?.id);
        let data = {
            "ticket_id": props?.route?.params?.item?.id,
            "status": selectedStatus?.value,
            "feedback": feedback,
            "tickets_status_images": imagesData
        }
        const addNewPostRes = await update_status(user?.token,data);
        console.log('addNewPostRes',addNewPostRes);
        if(addNewPostRes?.status === 1){
            setisLoading(false);
            alert('Ticket Status Created Successfully');
            setshowModal(false);
            getData()
            // navigate('InProgress');
            // navigate('Ticket',{item:addNewPostRes?.data});
        } else {
            setisLoading(false);
        }

    }

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
            <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Ticket</Text>
            <TouchableOpacity onPress={() => {navigate('Chat',{item:props?.route?.params?.item})}} style={{marginRight:H(2),height:H(5),width:W(11),borderRadius:H(1),alignItems:'center',justifyContent:'center'}}>
                <Ionicons name={'chatbox-outline'} size={28} color={ButtonClr} />
            </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(3)}}>{details?.service_id?.title}</Text>
                <Text style={{color:Grey,fontSize:14,fontFamily:'Poppins-Regular',marginRight:H(3),marginTop:H(3)}}>{details?.category_id?.title}</Text>
            </View>

            <Text style={{color:Grey,fontSize:12,fontFamily:'Poppins-Regular',marginLeft:H(3),marginBottom:H(1),marginTop:H(1)}}>{details?.details}</Text>
            <View style={{
                // height:H(15),
                width:W(87),
                backgroundColor:'#0000000F',
                borderWidth:H(.2),
                borderColor:LightGrey,
                alignSelf:'center',
                borderRadius:H(.5),
                marginTop:H(.5),
            }}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Name <Text style={{color:Grey}}>{details?.customer_id?.name}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginRight:H(1),marginTop:H(1)}}>Date <Text style={{color:Grey}}>{details?.created_at}</Text></Text>
                </View>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Location <Text style={{color:Grey}}>{details?.customer_id?.location}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1)}}>Department <Text style={{color:Grey}}>{details?.department_id?.title}</Text></Text>
                <Text style={{color:BackHandler,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1),marginTop:H(1),marginBottom:H(1)}}>Category <Text style={{color:Grey}}>{details?.category_id?.title} {details?.subcategory_id?.title ? '> '+details?.subcategory_id?.title:''} {details?.childcategory_id?.title ? '> '+details?.childcategory_id?.title:''}</Text></Text>
            </View>

            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Images</Text>
            {images?.length > 0 ? (
            <View style={{height:H(13),marginLeft:H(2),marginTop:H(.5)}}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {images?.map((item,i) => {
                return(
                    <TouchableOpacity 
                    key={i}
                    onPress={() => {
                        setSelectedShowImage(item);
                        setShowImageModal(true);
                    }}>
                    <ImageBackground key={i} borderRadius={H(1)} source={{uri:ImageBaseUrl+item?.image}} style={{height:H(13),width:W(28),marginRight:H(.5),marginLeft:H(.5)}}/>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
            </View>
            ):null}
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Timeline</Text>
            {timeline?.map((item,i) => {
                return(
                    <View key={i} style={{flexDirection:'row',alignItems:'center',marginLeft:H(3),marginTop:H(1.5)}}>
                    <View style={{height:12,width:12,borderRadius:12/2,backgroundColor:i+1 === timeline?.length ? '#72BB13':ButtonClr}}></View>
                    <TouchableOpacity onPress={() => {navigate('InProgress',{item:item})}} style={{height:H(7.5),width:W(82),backgroundColor:White,borderWidth:H(.1),borderColor:Grey,marginLeft:H(1),borderRadius:H(1),flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                            <Text style={{color:Black,fontSize:13,fontFamily:'Poppins-Regular',marginLeft:H(2)}}>Ticket {item?.status}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(.5)}}>
                                <Ionicons name={'chatbox-outline'} size={16} color={ButtonClr} style={{marginLeft:H(2)}} />
                                <Text style={{color:Grey,fontSize:11,fontFamily:'Poppins-Regular',marginLeft:H(1)}}>{item?.tickets_status_posts_count} Post</Text>
                            </View>
                        </View>
                        <Text style={{color:Grey,fontSize:11,fontFamily:'Poppins-Regular',marginRight:H(1)}}>{item?.created_at}</Text>
                    </TouchableOpacity>
                </View>    
                )
            })}

            <Text style={{color:ButtonClr,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(2)}}>Change Status</Text>
            <TouchableOpacity
            onPress={() => {setshowModal(true)}}
            style={{
                height:H(6.6),
                width:W(88),
                alignSelf:'center',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                borderWidth:H(.05),
                borderColor:Grey,
                borderRadius:H(1),
                marginBottom:H(2),
                marginTop:H(1)
            }}>
                <Text style={{color:Grey,fontSize:15,marginLeft:H(2)}}>Work In Progress</Text>
                <Ionicons size={22} color={Grey} name={'arrow-forward'} style={{marginRight:H(2)}} />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {setshowModal(true)}}
            style={{
                height:H(6.6),
                width:W(88),
                backgroundColor:'#72BB13',
                alignSelf:'center',
                alignItems:'center',
                justifyContent:'center',
                borderWidth:H(.05),
                borderColor:Grey,
                borderRadius:H(1),
                marginBottom:H(2)
            }}>
                <Text style={{color:White,fontWeight:'600'}}>Update</Text>
            </TouchableOpacity>
            </ScrollView>
            <Modal visible={showModal} animationType={'fade'} transparent={true}>
                <KeyboardAwareScrollView contentContainerStyle={{flexGrow:2}} style={{
                    flex:1,
                    backgroundColor:'#F5F6F7'
                }}>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:H(4),marginBottom:H(1)}}>
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
                <Text style={{color:Black,fontSize:16,width:W(63),fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Change Status</Text>
                </View>
                {statuslist?.map((item,i) => {
                    return(
                        <TouchableOpacity 
                        onPress={() => {setSelectedStatus(item)}}
                        style={{
                            height:H(6.6),
                            width:W(88),
                            backgroundColor:White,
                            alignSelf:'center',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between',
                            borderWidth:H(.05),
                            borderColor:item?.title === selectedStatus?.title ? ButtonClr:Grey,
                            borderRadius:H(1),
                            marginTop:H(1)
                        }}>
                            <Text style={{color:item?.title === selectedStatus?.title ? ButtonClr:Black,fontSize:15,marginLeft:H(2),textTransform:'capitalize'}}>{item?.title}</Text>
                        </TouchableOpacity>        
                    )
                })}
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Add Images</Text>
            <TouchableOpacity onPress={() => {selectImages()}}>
                <Text style={{color:ButtonClr,fontSize:16,fontFamily:'Poppins-Medium',marginRight:H(3),marginTop:H(1.5)}}>Upload</Text>
            </TouchableOpacity>
            </View>
            <View style={{
                height:H(12),
                width:W(87),
                backgroundColor:'#D4D4D4',
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                marginTop:H(.5),
                justifyContent:'center'
            }}>
            {selectedImages?.length > 0 ? (
            <View style={{height:H(10)}}>
            <ScrollView horizontal>
            {selectedImages?.map((item,i) => {
                return(
                    <ImageBackground key={i} borderRadius={H(1)} source={{uri:item?.url ? item?.url:item?.path}} style={{height:H(10),width:W(20),marginRight:H(.5),marginLeft:H(.5)}}>
                        <TouchableOpacity 
                        onPress={() => {
                        images.splice(i,1);
                        let ref = refresh+1;
                        setRefresh(ref);
                        }} 
                        style={{backgroundColor:ButtonClr,height:18,width:18,borderRadius:18/2,alignItems:'center',justifyContent:'center',marginRight:H(.3),marginTop:H(.2),alignSelf:'flex-end'}}>
                            <Entypo name={'cross'} size={18} color={White} />
                        </TouchableOpacity>
                    </ImageBackground>
                )
                })}
                </ScrollView>
                </View>
                ):null}
                </View>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(3),marginTop:H(1.5)}}>Feedback</Text>
                <View style={{
                    height:H(15),
                    width:W(87),
                    backgroundColor:White,
                    borderWidth:H(.1),
                    borderColor:LightGrey,
                    alignSelf:'center',
                    elevation:1,
                    borderRadius:H(.5),
                    marginTop:H(.5),
                }}>
                    <TextInput value={feedback} onChangeText={(feedback) => setFeedback(feedback)} style={{paddingLeft:H(1),color:Black}} placeholder={'Type here'} placeholderTextColor={Grey}/>
                </View>
                <TouchableOpacity 
                onPress={() => {
                    if(isloading === false){
                        updateStatus();
                    }
                }}
                style={{
                    height:H(6.5),
                    width:W(87),
                    backgroundColor:'#72BB13',
                    alignSelf:'center',
                    elevation:5,
                    borderRadius:H(.5),
                    justifyContent:'center',
                    marginTop:H(6),
                    alignItems:'center',
                    justifyContent:'center',
                    marginBottom:H(2)
                }}>
                    {isloading === true ? (
                        <ActivityIndicator size={'small'} color={White} />
                    ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Update</Text>}
                </TouchableOpacity>

                </KeyboardAwareScrollView>
            </Modal>
            <Modal visible={showImageModal} animationType={'fade'} transparent={true}>
                <View style={{
                    flex:1,
                    backgroundColor:'#0004',
                }}>
                    <TouchableOpacity onPress={() => {setShowImageModal(false)}} style={{alignSelf:'flex-end',height:H(7),marginTop:H(2),marginRight:H(1),width:W(10)}}>
                        <Entypo name={'cross'} size={33} color={White} />
                    </TouchableOpacity>
                    <Image source={{uri:ImageBaseUrl+selectedShowImage?.image}} style={{height:H(80),width:W(100),resizeMode:'contain'}} />
                </View>
            </Modal>

        </View>
    );
};

export default Ticket;