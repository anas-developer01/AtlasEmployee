import React, { useState, useRef } from 'react';
import { Image, StatusBar, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Black, Blue, ButtonClr, Grey, H, Ionicons, LightGrey, Logo, W, White } from '../../constant/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SCROLL_OFFSET_ABOVE_KEYBOARD = 140;

const SignUp = (props) => {
    const { navigate, goBack } = props?.navigation;
    const [showpass, setShowPass] = useState(true);

    const nameRef = useRef(null);
    const designationRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const companyRef = useRef(null);
    const regionRef = useRef(null);
    const passwordRef = useRef(null);
    const scrollRef = useRef(null);
    const fieldYPositions = useRef({});

    const focusNextAndScroll = (nextInputRef, fieldKey) => {
        if (nextInputRef?.current) {
            nextInputRef.current.focus();
            setTimeout(() => {
                const y = fieldYPositions.current[fieldKey];
                if (typeof y === 'number' && scrollRef.current?.scrollTo) {
                    scrollRef.current.scrollTo({
                        x: 0,
                        y: Math.max(0, y - SCROLL_OFFSET_ABOVE_KEYBOARD),
                        animated: true,
                    });
                }
            }, 150);
        }
    };

    return(
        <View style={{flex:1}}>
            {/* <StatusBar backgroundColor={'#F5F6F7'} /> */}
            
            <View style={{flexDirection:'row',alignItems:'center',marginTop:H(5)}}>
            <TouchableOpacity
            onPress={() => {goBack()}}
            style={{
                height:H(4),
                width:W(10),
                borderWidth:H(.1),
                borderColor:Grey,
                borderRadius:H(.5),
                marginLeft:H(3),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Ionicons name={'arrow-back'} size={22} color={Grey} />
            </TouchableOpacity>
            <Text style={{color:Black,fontSize:22,fontFamily:'Poppins-Regular',marginLeft:H(2),marginTop:H(1)}}>Sign Up</Text>
            </View>

            <KeyboardAwareScrollView
                ref={scrollRef}
                style={{flex:1}}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                extraScrollHeight={120}
                extraHeight={120}
                keyboardOpeningTime={0}
                enableResetScrollToCoords={false}
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll={true}
                viewIsInsideTabBar={false}>
            <View onLayout={(e) => { fieldYPositions.current.name = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Name</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={nameRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(designationRef, 'designation')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.designation = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Designation</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={designationRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(emailRef, 'email')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.email = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Email</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={emailRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(phoneRef, 'phone')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.phone = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Phone</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={phoneRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(companyRef, 'company')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.company = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Company Name</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={companyRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(regionRef, 'region')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.region = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Region Coverage</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={regionRef}
                    style={{paddingLeft:H(1),color:Black}}
                    placeholder='Type here'
                    placeholderTextColor={Grey}
                    returnKeyType="next"
                    onSubmitEditing={() => focusNextAndScroll(passwordRef, 'password')}
                    blurOnSubmit={false}
                />
            </View>
            </View>
            <View onLayout={(e) => { fieldYPositions.current.password = e.nativeEvent.layout.y; }}>
            <Text style={{color:Black,fontFamily:'Poppins-Medium',fontSize:14,marginTop:H(2),marginLeft:H(3)}}>Password</Text>
            <View style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:White,
                borderWidth:H(.1),
                borderColor:LightGrey,
                alignSelf:'center',
                elevation:1,
                borderRadius:H(.5),
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginTop:H(.5)
            }}>
                <TextInput
                    ref={passwordRef}
                    secureTextEntry={showpass}
                    style={{paddingLeft:H(1),marginLeft:H(1),width:W(75),color:Black}}
                    placeholder='*********'
                    placeholderTextColor={Grey}
                    returnKeyType="done"
                    onSubmitEditing={() => passwordRef.current?.blur()}
                />
                <TouchableOpacity onPress={() => {
                    if(showpass === true){
                        setShowPass(false);
                    } else {
                        setShowPass(true);
                    }
                }} style={{marginRight:H(2)}}>
                    <Ionicons name={showpass === true ? 'eye-off-outline':'eye-outline'} size={22} color={ButtonClr} />
                </TouchableOpacity>
            </View>
            </View>

            <TouchableOpacity 
            onPress={() => {navigate('Home')}}
            style={{
                height:H(6.5),
                width:W(87),
                backgroundColor:ButtonClr,
                alignSelf:'center',
                borderRadius:H(.5),
                justifyContent:'center',
                marginTop:H(5),
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{color:White,fontFamily:'Poppins-Medium'}}>Sign Up</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:H(2),marginBottom:H(3)}}>
                <Text style={{color:Black,fontFamily:'Poppins-Medium'}}>Already have an Account, </Text>
                <TouchableOpacity onPress={() => {navigate('SignIn')}}>
                    <Text style={{color:ButtonClr,fontFamily:'Poppins-Medium'}}>Login</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default SignUp;