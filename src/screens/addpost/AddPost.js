import React, { useContext, useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, BackHandler, ScrollView, ImageBackground, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Black, ButtonClr, Entypo, Grey, H, Ionicons, LightGrey, W, White } from "../../constant/Common";
import ImageCropPicker from "react-native-image-crop-picker";
import { addNewPost } from "../../api/ticket";
import { AppContext } from "../../context/AppProvider";

const AddPost = (props) => {
    const { goBack, navigate } = props?.navigation;
    const [images, setImages] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [refresh, setRefresh] = useState(0);
    const [isloading, setisLoading] = useState(false);
    const { user } = useContext(AppContext);

    const selectImages = () => {
        ImageCropPicker.openPicker({
            width:300,
            height:400,
            mediaType: "photo",
            multiple:true,
            includeBase64:true
          }).then(image => {
            console.log('IMAGE',image);
            let data = images?.length > 0 ? images:[];
            image?.map((item,i) => {data.push(item)});
            setImages(data);
            let ref = refresh+1;
            setRefresh(ref);
          });
    }

    console.log(props?.route?.params?.item.id)

    const addPost = async () => {
        setisLoading(true);
        let imagesData = [];
        images?.map((item,i) => {
            imagesData.push('data:image/jpeg;base64,'+ item.data)
        });
        let data = {
            "tickets_status_id": props?.route?.params?.item?.id,
            "feedback":feedback,
            "tickets_status_post_images":imagesData
        }
        const addNewPostRes = await addNewPost(user?.token,data);
        console.log('addNewPostRes',addNewPostRes);
        if(addNewPostRes?.status === 1){
            setisLoading(false);
            alert('Ticket Status Post Created Successfully');
            navigate('Home');
        } else {
            setisLoading(false);
        }

    } 

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}            
                <View style={{flexDirection:'row',alignItems:'center',marginTop:H(5),marginBottom:H(2)}}>
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
                    justifyContent:'center',
                }}>
                    <Ionicons name={'arrow-back'} size={22} color={Grey} />
                </TouchableOpacity>
                <Text style={{color:Black,fontSize:16,fontFamily:'Poppins-Medium',marginLeft:H(2),marginTop:H(1)}}>Add Post</Text>
                </View>
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
            {images?.length > 0 ? (
            <View style={{height:H(10)}}>
            <ScrollView horizontal>
            {images?.map((item,i) => {
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
                        addPost();
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
                    marginTop:H(38),
                    alignItems:'center',
                    justifyContent:'center',
                    marginBottom:H(2)
                }}>
                    {isloading === true ? (
                        <ActivityIndicator size={'small'} color={White} />
                    ):<Text style={{color:White,fontFamily:'Poppins-Medium'}}>Submit</Text>}
                </TouchableOpacity>
        </View>
    );
};

export default AddPost;